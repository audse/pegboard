
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar, setCssVar, getCssVar, LocalStorage } from 'quasar'

import { use_auto_color } from './../Use/colors.use'

const use_theme = ( current_theme, emit ) => {

    const {
        auto_scale
    } = use_auto_color()

    const store = useStore()
    const q = useQuasar()

    const error = ref(null)
    const saved = ref(false)

    // Methods
    const add_theme = async (form) => {

        form.user_id = store.getters['auth/user_id']

        form.scale_secondary = auto_scale(form.primary, form.secondary)
        form.scale_text = auto_scale(form.primary, form.text)

        if ( form.user_id ) store.dispatch('theme/add', form).then( result => {
            q.notify({ color: 'primary', message: 'Theme Added!' })
        })
    }

    const find_by_id_and_update = async (form) => {
        if ( current_theme ) store.dispatch('theme/find_by_id_and_update', form).then( result => {
            q.notify( { color: 'primary', message: 'Theme Updated.' })
            saved.value = true
            emit('hide')
        })
    }

    const find_by_id_and_delete = async () => {
        if ( current_theme ) store.dispatch('theme/find_by_id_and_delete', current_theme._id ).then( result => {
            q.notify( { color: 'primary', message: 'Theme Deleted.' })
            emit('hide')
        })
    }

    return {
        error,
        saved,

        add_theme,
        find_by_id_and_update,
        find_by_id_and_delete,
    }
}

const get_and_set_theme = (store, Dark, setCssVar) => {

    const set_theme_from_preferences = async (user_id) => {
        const theme_id = await get_preference_theme_id(user_id)

        if ( theme_id ) {
            get_theme_from_storage(theme_id).then( result => {
                if ( result ) set_theme(result)
            })
            
        } else throw `The theme could not be found. ${theme_id}`
    }

    const get_preference_theme_id = async () => {
        const theme_preference = computed( () => store.state.preference.theme_id)
        if ( !theme_preference.value ) store.dispatch('preference/reload').then( () => {
            return theme_preference.value
        })
        else return theme_preference.value
    }

    const get_theme = async (theme_id) => {

        return new Promise( resolve => {
            const theme = computed( () => store.getters['theme/find_by_id'](theme_id) )
            if ( theme.value ) resolve(theme.value)
            else store.dispatch('theme/find_by_id_and_reload', theme_id).then( result => {
                resolve(theme.value)
            })
        }).catch( e => {
            throw 'No theme could be found.'
        })
        

    }

    const get_theme_from_storage = async (theme_id) => {
        return new Promise( resolve => {
            const theme = LocalStorage.getItem(theme_id)
            if ( theme ) resolve(theme)
            else {
                get_theme(theme_id).then( result => {
                    LocalStorage.set(theme_id, result)
                    resolve(theme)
                }).catch( e => {
                    throw 'No theme could be found.'
                })
            }
        }).catch( e => {
            throw 'There was an error retrieving the theme.'
        })
    }

    const set_theme = async (theme) => {

        console.log('Setting theme...', theme)
        const q = useQuasar()

        const {
            is_dark,
        } = use_auto_color()

        Dark.set(is_dark(theme.primary))

        setCssVar('primary', theme.primary)
        setCssVar('secondary', theme.secondary)
        setCssVar('text', theme.text)
        setCssVar('emphasis', theme.emphasis)
        setCssVar('warning', theme.warning)
        setCssVar('negative', theme.negative)

        // Color scales
        for ( let i=0; i<9; i++ ) {
            const string_01 = `scale-secondary-${i.toString()}`
            const string_02 = `scale-text-${i.toString()}`
            setCssVar( string_01, theme.scale_secondary[i] )
            setCssVar( string_02, theme.scale_text[i] )
        }

    }

    return {
        set_theme_from_preferences,
        get_theme,
        get_theme_from_storage,
        set_theme
    }

}

export { use_theme, get_and_set_theme }