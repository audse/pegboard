
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

const use_card = ( emit, board_id, list_id, current_card ) => {

    const store = useStore()

    const form = reactive( current_card ? Object.assign( {}, current_card ) : {} )
    const options_display = [
        { label: 'Card', value: 'card' },
        { label: 'Header', value: 'header' },
    ]
    const error = ref(null)

    const add_card = async () => {

        form.user_id = store.getters['auth/user_id']
        form.board_id = board_id
        form.list_id = list_id
        store.dispatch('card/add', form).then( result => {
            form.name = ''
        })
    }

    const find_by_id_and_update = async () => {
        if ( current_card ) store.dispatch('card/find_by_id_and_update', { card_id: current_card._id, data: form }).then( result => {
            emit('hide')
        })
    }

    const find_by_id_and_delete = async () => {
        if ( current_card ) store.dispatch('card/find_by_id_and_delete', current_card ).then( result => {
            emit('hide')
        })
    }

    const update_order = async (value) => {
        return new Promise ( resolve => {
            for ( const index in value ) {

                const card_data = Object.assign( {}, value[index] )
                if ( value[index].order !== parseInt(index) ) {
                    card_data.order = parseInt(index)
                    
                    store.dispatch('card/find_by_id_and_update', { card_id: card_data._id, data: card_data }).then( result => {
                        console.log(result.data)
                    })
                }
                if ( index === value.length-1) resolve(value)
            }
        })
    }

    return {
        form,
        options_display,
        error,
        add_card,
        find_by_id_and_update,
        find_by_id_and_delete,
        update_order,
    }

}

export { use_card }