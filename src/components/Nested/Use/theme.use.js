
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

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
        find_by_id_and_delete
    }
}

export { use_theme }