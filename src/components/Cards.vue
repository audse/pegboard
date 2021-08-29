<template>

<Drag v-model="cards" v-slot="element_props" group="cards" :delay="25">
    <CardSheet :card_id="element_props.element._id" :list_id="element_props.element.list_id" :board_id="element_props.element.board_id" nosubtitle />
</Drag>

<AddCardForm :board_id="board_id" :list_id="list_id" />
<!-- 
<TextInput v-model="form.name" label="Add Card" dense classes="q-ma-sm q-mt-lg">
    <template #button>
        <q-btn @click="add_card" label="Add" flat />
    </template>
</TextInput> -->


</template>
<script>

import { useQuasar } from 'quasar'
import { defineComponent, onBeforeMount, computed, reactive } from 'vue'
import { useStore } from 'vuex'

import CardSheet from './Nested/Sheets/Card.sheet'
import AddCardForm from './Nested/Forms/Add_Card.form'

export default defineComponent({

    name: 'Cards',
    props: {
        list_id: String,
        board_id: String,
    },

    components: {
        CardSheet,
        AddCardForm,
    },

    setup ( props ) {

        const store = useStore()
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
        
        // const q = useQuasar()

        // const user_id = store.getters['auth/user_id']
        // const cards = computed( () => store.getters['card/find_by_list'](props.board_id, props.list_id) )

        // const load_cards = async () => {

        //     let data = {
        //         board_id: props.board_id,
        //         list_id: props.list_id,
        //         user_id: user_id,
        //     }

        //     if ( props.board_id && props.list_id && user_id ) {
        //         store.dispatch('card/find_by_list_and_reload', data)
        //     }
        // }

        // onBeforeMount( load_cards )
        
        // const form = reactive({})
        // const add_card = async () => {

        //     form.user_id = store.getters['auth/user_id']
        //     form.board_id = props.board_id
        //     form.list_id = props.list_id
        //     store.dispatch('card/add', form)
        // }

        return {
            cards,
        }

    },

})
</script>
