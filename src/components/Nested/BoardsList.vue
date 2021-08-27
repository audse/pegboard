
<template>
    
<q-list>
    <q-item clickable to="/boards/" class="text-accent" active-class="bg-primary">
        <Heading h6 title="Your Boards" padding="q-pt-sm" />
    </q-item>
    <q-item v-for="board in boards" :key="`board-list-${board._id}`" clickable :to="`/board/${urlify(board.name, board._id)}`" class="text-accent"  active-class="bg-primary">
        <q-item-label class="q-pt-sm">{{ board.name }}</q-item-label>
    </q-item>
    <q-item v-if="!boards_exist" class="col text-accent">
        <q-item-label>No Boards</q-item-label>
    </q-item>
</q-list>

</template>
<script>

// Setup
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({

    name: 'BoardsPage',

    setup () {

        const store = useStore()

        const boards = ref( store.state.board.boards )

        const boards_exist = computed( () => {
            if ( boards.value.length > 0 ) return true
            else return false
        })

        return {
            store,
            boards,
            boards_exist
        }

    },

    methods: {

        urlify: function (string, id=null) {
            let url = string.replace(/\W+/g, '-').toLowerCase()
            if ( id ) url += '/'+id
            return url
        },

    },


})

</script>
