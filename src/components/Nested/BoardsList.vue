
<template>
    
<q-list>
    <q-item clickable to="/boards/" class="text-text" active-class="bg-primary text-emphasis">
        <Heading h6 title="Your Boards" padding="q-pt-sm" />
    </q-item>
    <q-item v-for="board in boards" :key="`board-list-${board._id}`" clickable :to="{ name: 'board_page', params: { id: board._id, name: board.name } }" class="text-scale-text-6"  active-class="bg-primary text-emphasis">
        <q-item-label class="q-pt-sm">{{ board.name }}</q-item-label>
    </q-item>
    <q-item v-if="!boards_exist" class="col text-text">
        <q-item-label>No Boards</q-item-label>
    </q-item>
</q-list>

</template>
<script>

// Setup
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({

    name: 'BoardsPage',

    setup () {

        const store = useStore()

        const boards = computed( () => store.state.board.boards )
        const boards_exist = computed( () => boards.value[0] )
        const user_id = computed( () => store.getters['auth/user_id'] )

        const get_boards = async () => {
            if ( !boards_exist.value && user_id.value ) store.dispatch('board/reload', user_id.value)
        }

        onMounted(get_boards)

        return {
            boards,
            boards_exist
        }

    },

    watch: {

        store: function () {
            console.log('update')
        }
    },

    methods: {

        urlify: function (string) {
            return string.replace(/\W+/g, '-').toLowerCase()
        },

    },


})

</script>
