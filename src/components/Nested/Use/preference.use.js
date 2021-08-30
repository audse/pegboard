
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

const use_preference = () => {

    const store = useStore()
    const q = useQuasar()

    const user_id = store.getters['auth/user_id']

    const preference_theme = computed( () => store.state.preference ? store.state.preference.theme_id : null )

    // Form Data
    const form = reactive( {
        theme_id: preference_theme.value || null,
    })
    const error = ref(null)

    const reload = async () => {
        store.dispatch('preference/reload', user_id).catch( e => {
            store.dispatch('preference/add', user_id)
        })
    }

    const find_by_user_id_and_update = async () => {
        form.user_id = user_id
        store.dispatch('preference/find_by_user_id_and_update', form ).then( result => {
            q.notify( { color: 'secondary', message: 'Preferences Saved.' })
        })
    }

    return {
        
        form,
        error,

        reload,
        find_by_user_id_and_update,
    }
}

export { use_preference }