<template>

<q-page class="q-px-lg q-py-lg dark-bg">

<AddBoardForm />
<!-- <Heading h2 title="Your Boards" padding="q-my-lg q-pt-lg" /> -->

<!-- All Boards -->
<div v-if="boards_exist">

    <Drag v-model="boards" v-slot="element_props" col_4 gutter_md>
        <BoardSheet :board_id="element_props.element._id" :index="element_props.index" handle />
    </Drag>

</div>

</q-page>

</template>
<script>

// Setup
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

// Components
import AddBoardForm from './../components/Forms/Add_Board.form'
import BoardSheet from './../components/Sheets/Board.sheet'

export default defineComponent({

    name: 'BoardsPage',

    components: {

        // Components
        AddBoardForm,
        BoardSheet,
    },

    setup () {

        const store = useStore()
        
        const user_id = store.getters['auth/user_id']

        const boards = ref( store.state.board.boards )

        const boards_exist = computed( () => {
            if ( boards.value.length > 0 ) return true
            else return false
        })

        const get_boards = async () => {
            if ( user_id ) store.dispatch('board/reload', user_id).then( results => {
                if ( results && results.length > 0 ) boards.value = results
                else boards.value = []
            })
            else boards.value = []
        }

        onMounted (get_boards)

        return {
            store,
            user_id,
            boards,
            boards_exist
        }

    },


})

</script>
<style lang="scss">

</style>
