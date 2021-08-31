
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

const use_board = ( current_board, emit ) => {

    const store = useStore()
    const q = useQuasar()

    // Props
    const board = reactive( current_board || {} )

    // Form Data
    const form = reactive( {
        name: board.name || null,
        description: board.description || null,
        theme_id: board.theme_id || null,
    })
    const error = ref(null)

    // Methods
    const add_board = async () => {
        form.user_id = store.getters['auth/user_id']

        if ( form.user_id ) store.dispatch('board/add', form).then( result => {
            q.notify({ color: 'primary', message: 'Board Added!' })
        })
    }

    const find_by_id_and_update = async () => {
        store.dispatch('board/find_by_id_and_update', { board_id: board._id, data: form }).then( result => {
            q.notify( { color: 'primary', message: 'Board Updated.' })
            emit('hide')
        })
    }

    const find_by_id_and_delete = async () => {
        store.dispatch('board/find_by_id_and_delete', board._id ).then( result => {
            q.notify( { color: 'primary', message: 'Board Deleted.' })
            emit('hide')
        })
    }

    return {
        board,
        
        form,
        error,

        add_board,
        find_by_id_and_update,
        find_by_id_and_delete
    }
}

export { use_board }