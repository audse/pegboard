
import { uid, LocalStorage } from 'quasar'
import firebase from 'firebase'

export default {

    getCacheKey: function (path) {

        // Creates an identifier to store database data at a specific path.
        // E.g. lists would be stored as 'users/userxyz_collection/boards_document/userxyz_collection/lists'

        let cacheKeyString = ''

        for ( let [ pathIndex, pathObj ] of path.entries() ) {

            // If the last path is a document, cache it within the full collection instead, so nothing is written more than once
            if ( pathIndex == path.length-1 && pathObj.document ) {
                // skip
            } else {
                if ( pathIndex != 0 ) cacheKeyString += '_' 
                if ( pathObj.collection ) cacheKeyString += 'collection/'+pathObj.collection
                if ( pathObj.document ) cacheKeyString += 'document/'+pathObj.document
            }
        }

        return cacheKeyString
    },

    getFromCache: function (path) {

        const cacheKey = this.getCacheKey(path)

        // Set database reference path and queries
        // Gets all results that are updated more recently than the most recently updated cached item (maxUpdatedAt)
        
        const maxUpdatedAt = this.getMaxUpdatedAt(cacheKey)
        const queries = [ {key: 'updatedAt', operator: '>', value: maxUpdatedAt} ]
        
        // Check the database for any newer entries.
        return this.getFromDb(cacheKey, path, queries).then ( (results) => {
            const value = LocalStorage.getItem(cacheKey)

            console.log('Cache retrieved!')
            if ( this.lastPath(path).document ) {
                // If the user is fetching a specific document,
                // return only that item in the cache array.
                return value.find( (cacheItem) => cacheItem.id === this.lastPath(path).document )
            } else if ( value ) {
                // Return the whole LocalStorage cache
                return value.sort(this.sortCache)
            } else {
                return null
            }
        })
    },

    getMaxUpdatedAt: function (cacheKey) {
        // Returns the most recently updated date in the cache,
        // or 0 if that information is not available

        let cache = LocalStorage.getItem(cacheKey)

        if ( cache && Array.isArray(cache) ) {

            try {
                return cache.reduce( (a, b) => Math.max(a.updatedAt ? a.updatedAt : 0, b.updatedAt ? b.updatedAt : 0) )
            } catch (e) {
                return 0
            }

        } else if ( cache ) {

            return cache.updatedAt ? cache.updatedAt : 0

        } else {
            return 0
        }
    },
    
    createRefPath: function (path, queries=[]) {

        // Returns a firebase/firestore object
        // set to the correct path

        let refPath = firebase.firestore()

        for ( const location of path ) {

            if ( location.collection) refPath = refPath.collection(location.collection)
            if ( location.document ) refPath = refPath.doc(location.document)
        }

        if ( queries.length > 0 && this.lastPath(path).collection ) {

            for ( let query of queries ) {
                refPath = refPath.where(query.key, query.operator, query.value)
            }

        } 

        return refPath
    },

    lastPath: function (path) {

        // .slice() with no arguments creates a copy of the original path, 
        // which is then reversed, and we return the first (last) entry, e.g.: { document: 'documentIdPath' }

        let newPath = path.slice().reverse()
        return newPath[0]

    },

    getFromDb: function (cacheKey, path, queries) {

        // When the cache fails to have the required information, 
        // it's retreived from the database and stored in the cache

        let results = []

        let refPath = this.createRefPath(path, queries)

        return refPath.get().then( (docs) => {

            if ( !docs.empty ) {
                if ( docs.size >= 1) {

                    docs.forEach( (doc) => {
                        results.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })

                } else {
                    results.push({
                        id: docs.id,
                        data: docs.data()
                    })
                }
            }

        }).then( () => {
            if ( results.length > 0 ) console.log('Reading Database...')

            if ( results.length > 0 ) this.saveToCache(cacheKey, results)
            return results
        })

    },

    saveToDb: function (path, data, id=null) {

        console.log('Writing to database...')

        // Create or update an existing document

        let cacheKey = this.getCacheKey(path)

        let refPath = this.createRefPath(path)

        // Make sure to save updatedAt
        data.updatedAt = Date.now()

        return refPath.set(data).then( (result) => {
            console.log('Database updated.')
            this.saveToCache(cacheKey, [ { id: id ? id : result.id, data: data } ])

            // Returns a key to update the original component
            return uid()
        })

    },

    sortCache: function (objectA, objectB) {

        // Sort the items in a cache array before saving them, in order to correctly
        // order them later in the components. Sorts by the `order` field if it exists,
        // the `updatedAt` if that doesn't work, or equally if all else fails.

        try {
            return objectA.data.order - objectB.data.order

        } catch (error) {

            try {
                return ( objectA.data.updatedAt - objectB.data.updatedAt) * -1
            } catch (error) {
                return 0
            }

        }
    },

    saveToCache: function (cacheKey, data) {

        let cache = LocalStorage.getItem(cacheKey)

        // Cache must be an array of documents in a collection
        // If it's not an array, save a new version correctly as an array
        if ( !cache || !Array.isArray(cache) ) cache = []

        for ( const document of data ) {

            if ( document.id && document.data ) {

                const entry = {
                    id: document.id,
                    data: document.data,
                    updatedAt: Date.now()
                }

                // Check if item ID already exists in cache
                let index = cache.findIndex( (cacheEntry) => cacheEntry.id === document.id )

                // If so, update that entry. If not, create a new entry
                if ( cache[index] ) {
                    // If document is updated and set to delete, then remove it from the cache
                    if ( document.data.deletedAt ) {
                        cache.splice(index, 1)
                    } else {
                        cache[index] = entry
                    }

                } else {
                    if ( !document.data.deletedAt ) cache.push(entry)
                }

            } else {
                console.log('Save to local storage failed.')
            }
        }

        // Create a new cache object
        try {
            
            if ( cache ) cache.sort(this.sortCache)

            LocalStorage.set(cacheKey, cache)
        } catch (e) {
            console.log('Save to local storage failed.')
        }
    }
    
}