<template>

<q-page class="q-px-md q-py-lg">

    <div v-if="board_exists">

        <q-item>
            <q-item-section>
            <Heading h2 :title="board.name" :subtitle="board.description" padding="q-py-lg" />
            </q-item-section>
            <q-item-section side>
                <q-btn @click="show_modal=true" color="accent" flat label="Edit" />
            </q-item-section>
        </q-item>
        <q-item>
            <AddListForm :board_id="board._id" classes="q-mb-md full-width" />
        </q-item>

        <EditBoardModal :board_id="board._id" :show_modal="show_modal" @hide="show_modal=false"  />

    </div>
    <div v-if="lists_exist">

        <Drag v-model="lists" v-slot="element_props" group="lists" col_list gutter_sm horizontal>
            <ListSheet :list_id="element_props.element._id" :board_id="element_props.element.board_id" />
        </Drag>

    </div>

</q-page>

</template>
<script>

import { defineComponent, computed, watch, onMounted, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { use_theme } from './../components/Nested/Use/theme.use'

import EditBoardModal from './../components/Nested/Modals/Edit_Board.modal'
import ListSheet from './../components/Nested/Sheets/List.sheet'
import AddListForm from './../components/Nested/Forms/Add_List.form'

export default defineComponent({

    name: 'BoardPage',

    components: {
        EditBoardModal,
        ListSheet,
        AddListForm,
    },

    setup () {

        const store = useStore()
        const router = useRoute()

        const route_id = ref(router.params.id)
        const route_name = ref(router.params.name)

        const get_routes = () => {
            route_id.value = router.params.id
            route_name.value = router.params.name
        }

        const board = computed( () => store.getters['board/find_by_id'](route_id.value) )

        const lists = computed( () => store.getters['list/find_by_board'](route_id.value) )

        const board_exists = computed( () => board.value )
        const lists_exist = computed( () => lists.value && lists.value.length >= 1 )

        const load_data = async () => {
            await load_board()
            await load_lists()
        }

        const load_board = async () => {
            store.dispatch('board/find_by_id_and_reload', route_id.value)
        }

        const load_lists = async () => {

            let data = {
                board_id: route_id.value,
                user_id: store.getters['auth/user_id']
            }

            if ( route_id.value && data.user_id ) {
                store.dispatch('list/find_by_board_and_reload', data)
            }
        }

        const show_modal = ref(false)

        onBeforeMount( load_data )
        watch( router, get_routes )

        const {
            get_theme,
            change_theme
        } = use_theme()


        watch( board, () => {
            if (board_exists.value && board.value.theme_id) change_theme(get_theme(board.value.theme_id)) 
        })

        return {
            route_id,
            route_name,
            board,
            lists,
            board_exists,
            lists_exist,
            show_modal
        }

    },

})

</script>