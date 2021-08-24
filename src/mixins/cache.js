import db from './db'
import { uid } from 'quasar'

const cache = {

    data: function () {
        return {
            path: null,
            data: null,

            showForm: false,
            form: {},
            formId: null,
            error: null,
        }
    },

    watch: {
        path: function () {
            this.get()
        },
    },

    computed: {
        cachePath: function () {
            return this.createPath(this.path)
        },
        defaultData: function () {
            if ( this.data ) {
                return this.data
            } else {
                return [ { id: uid() } ]
            }
        }
    },

    methods: {

        get: function () {

            db.getFromCache(this.cachePath).then( (result) => {
                this.data = result
            })
        },

        set: function (data, id=null) {

            let currentPath = [...this.cachePath]

            if ( !id ) {
                id = uid()
            }

            if (currentPath[currentPath.length-1].collection ) currentPath = currentPath.concat([ { document: id } ])

            db.saveToDb( currentPath, data, id).then( (result) => {
                this.$q.notify({ color: 'primary', textColor: 'accent', message: 'Changes Saved.' })
                this.get()
                this.resetForms()
            })
        },

        setOrder: function () {

            if ( this.data ) {
                for ( const [index, entry] of this.data.entries() ) {
                    if ( entry.data ) {

                        // If an entry was just created, it may not have an order yet.
                        let order
                        try {
                            order = entry.data.order
                        } catch ( e ) {
                            order = null
                        }

                        if ( ( ( order === 0 ) && ( index !== 0 ) ) || ( order !== index) ) {
                            // We update only entries that do not have an order set,
                            // or have an order set that doesn't match the current order.

                            entry.data.order = index
                            this.set(entry.data, entry.id)
                        }
                    }
                }
            }
        },

        setForms: function (data, id) {
            this.form = Object.assign({}, data)
            this.formId = id
            this.showForm = true
        },

        resetForms: function () {
            this.form = {}
            this.showForm = false
            this.formId = null
            this.error = null
        },

        createPath: function ( path ) {

            /*

            This function accepts one argument, `path`.
            The `path` object is formatted as:

            { 
                user: 'userId' or 'all',
                board: 'boardId' or 'all',
                theme: 'themeId' or 'all',
                list: 'listId' or 'all',
                card: 'cardId' or 'all',
            }
            
            The key defines the path location.
            The value defines two things: the nested collection, and the document, if it is provided.

            The function then returns a path to the database location like:

            [
                { collection: 'users' },
                { document: 'userID' },
                { collection: 'boards' }, // gets all boards
            ]

            */

            let formattedPath = []

            if ( path.user ) formattedPath.push( {collection: 'users'} )
            if ( path.user && path.user !== 'all' ) formattedPath.push( { document: path.user } )

            if ( path.board ) formattedPath.push( {collection: 'boards'} )
            if ( path.board && path.board !== 'all' ) formattedPath.push( { document: path.board}  )

            if ( path.theme ) formattedPath.push( {collection: 'themes'} )
            if ( path.theme && path.theme !== 'all' ) formattedPath.push( { document: path.theme } )

            if ( path.list ) formattedPath.push( {collection: 'lists'} )
            if ( path.list && path.list !== 'all' ) formattedPath.push( { document: path.list } )

            if ( path.card ) formattedPath.push( {collection: 'cards'} )
            if ( path.card && path.card !== 'all' ) formattedPath.push( { document: path.card } )

            return formattedPath

        },

    }

}

export { cache }