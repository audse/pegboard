
<template>
    
<q-list>
    <q-item clickable to="/boards/" class="text-accent" active-class="bg-primary">
        <Heading h6 title="Your Boards" padding="q-pt-sm" />
    </q-item>
    <q-item v-for="board in boards" :key="`board-list-${board._id}`" clickable :to="{ name: 'board_page', params: { id: board._id, name: board.name } }" class="text-accent"  active-class="bg-primary">
        <q-item-label class="q-pt-sm">{{ board.name }}</q-item-label>
    </q-item>
    <q-item v-if="!boards_exist" class="col text-accent">
        <q-item-label>No Boards</q-item-label>
    </q-item>
</q-list>

</template>
<script>

// Setup
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({

    name: 'BoardsPage',

    setup () {

        const store = useStore()

        const boards = computed( () => store.state.board.boards )
        const boards_exist = computed( () => boards.value[0] )

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
