import { computed } from 'vue'
import { Dark, setCssVar, LocalStorage } from 'quasar'
import { use_auto_color } from './use.colors.utils'

const get_and_set_theme = (store) => {

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
            throw `There was an error retrieving the theme. ${e}`
        })
    }

    const set_theme = async (theme) => {

        const {
            is_dark,
        } = use_auto_color()

        Dark.set(is_dark(theme.primary))

        setCssVar('primary', theme.primary)
        setCssVar('secondary', theme.secondary)
        setCssVar('warning', theme.warning)
        setCssVar('negative', theme.negative)

        // setCssVar('text', theme.text)
        // setCssVar('emphasis', theme.emphasis)

        document.body.style.setProperty('--q-emphasis', theme.emphasis)
        document.body.style.setProperty('--q-text', theme.text)

        // Color scales
        for ( let i=0; i<9; i++ ) {
            const string_01 = `--q-scale-secondary-${i.toString()}`
            const string_02 = `--q-scale-text-${i.toString()}`
            // setCssVar( string_01, theme.scale_secondary[i] )
            // setCssVar( string_02, theme.scale_text[i] )

            document.body.style.setProperty(string_01, theme.scale_secondary[i])
            document.body.style.setProperty(string_02, theme.scale_text[i])
        }

    }

    return {
        set_theme_from_preferences,
        get_theme,
        get_theme_from_storage,
        set_theme
    }

}

export { get_and_set_theme }