
<template>

<Drag v-model="cards" v-slot="element_props" group="cards" :delay="25">
    <CardSheet :order="element_props.index" :card_id="element_props.element._id" :list_id="element_props.element.list_id" :board_id="element_props.element.board_id" nosubtitle />
</Drag>

<AddCardForm :board_id="board_id" :list_id="list_id" />

</template>
<script>

import { defineComponent, onBeforeMount, computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import CardSheet from './Sheets/Card.sheet'
import AddCardForm from './Forms/Add_Card.form'
import { use_card } from 'src/utils/use.card.utils'

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

    setup ( props, { emit } ) {

        const store = useStore()
        const user_id = store.getters['auth/user_id']

        const {
            update_order
        } = use_card(emit, props.board_id, props.list_id)

        const use_local_value = ref(false)
        const local_value = ref([])

        const cards = computed( {
            get () { 
                if ( !use_local_value.value ) return store.getters['card/find_by_list_and_sort'](props.board_id, props.list_id)
                else return local_value.value
            }, set (value) {
                local_value.value = [...value]
                use_local_value.value = true

                update_order(value).then( result => {
                    use_local_value.value = false
                })
            }
        })

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

        return {
            cards,
        }

    },

})
</script>
