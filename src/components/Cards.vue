<template>

<TextInput v-model="form.name" label="Add Card">
    <template #button>
        <q-btn @click="add_card" label="Add" flat />
    </template>
</TextInput>

{{ cards }}

</template>
<script>

import { useQuasar } from 'quasar'
import { defineComponent, onBeforeMount, computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({

    name: 'Cards',
    props: {
        list_id: String,
        board_id: String,
    },

    setup( props ) {
        
        const store = useStore()
        const q = useQuasar()

        const user_id = store.getters['auth/user_id']
        const cards = computed( () => store.getters['card/find_by_list'](props.board_id, props.list_id) )

        const load_cards = async () => {

            let data = {
                board_id: props.board_id,
                list_id: props.list_id,
                user_id: user_id,
            }

            if ( props.board_id && props.list_id && user_id ) {
                store.dispatch('card/find_by_list_and_reload', data)
            }
        }

        onBeforeMount( load_cards )
        
        const form = reactive({})
        const add_card = async () => {

            form.user_id = store.getters['auth/user_id']
            form.board_id = props.board_id
            form.list_id = props.list_id
            console.log(form)
            store.dispatch('card/add', form).then( result => {
                console.log(result)
                q.notify({ color: 'primary', message: 'Board Added!' })
            })
        }

        return {
            cards,
            form,
            add_card,
        }

    },

})
</script>
