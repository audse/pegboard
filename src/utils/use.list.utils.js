
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

const use_list = ( emit, board_id, current_list ) => {

    const store = useStore()
    const q = useQuasar()

    const form = reactive( current_list ? Object.assign( {}, current_list ) : {} )
    const error = ref(null)

    const add_list = async () => {
        
        form.user_id = store.getters['auth/user_id']
        form.board_id = board_id

        if ( form.user_id && form.board_id ) store.dispatch('list/add', form).then( result => {
            q.notify( { color: 'primary', message: 'Added List' } )
        })
    }
    
    const find_by_id_and_update = async () => {
        console.log(form, current_list)
        if ( current_list ) store.dispatch('list/find_by_id_and_update', { list_id: current_list._id, data: form }).then( result => {
            emit('hide')
        })
    }

    const find_by_id_and_delete = async () => {
        if ( current_list ) store.dispatch('list/find_by_id_and_delete', { list_id: current_list._id, board_id: board_id } ).then( result => {
            emit('hide')
        })
    }

    return {
        form,
        error,
        add_list,
        find_by_id_and_update,
        find_by_id_and_delete
    }
}

export { use_list }