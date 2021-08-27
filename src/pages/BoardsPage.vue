<template>

<q-page class="q-px-md q-py-lg">

<Heading h2 title="Your Boards" />


<!-- All Boards -->
<div v-if="boards_exist">

    <draggable :list="boards.data" item-key="_id" v-bind="drag_animation_props" @start="drag=true" @end="drag=false" >
        <template #item="{ element }">
            <BoardSheet :board="element" columns handle />
        </template>
    </draggable>

</div>

</q-page>

</template>
<script>

// Setup
import { defineComponent, ref, reactive } from 'vue'

// Backend
import BoardService from './../../server/services/board.service'

// Libraries
import draggable from 'vuedraggable'

// Components
import BoardSheet from './../components/Nested/BoardSheet'

// Mixins
import { drag_animation } from './../mixins/drag_animation'

// Logic
export default defineComponent({

    name: 'BoardsPage',

    components: {
        
        // Libraries
        draggable,

        // Components
        BoardSheet,
    },

    mixins: [
        drag_animation
    ],

    data: function () {
        return {
            boards: {},
            user_id: null,

            error: null,

            form: {
                name: null,
                description: null,
            }
        }
    },

    created () {
        if ( this.$auth ) this.id = this.$auth.uid
        this.update_boards()
    },

    computed: {

        boards_exist: function () {
            if ( this.boards && this.boards.data && this.boards.data.length >= 1 ) return true
            else return false
        }
    },

    methods: {

        update_boards: function () {

            if ( this.id ) BoardService.find_by_user( this.id ).then( data => {
                if ( data ) this.boards = data
                else this.error = 'No boards.'
            })

        },

        add_board: function () {

            this.form.user_id = this.user_id
            BoardService.add( this.form ).then( data => {
                if ( data ) this.$q.notify({ color: 'secondary', message: 'Board Added!'})
                this.updateBoards()
            })
        }

    }


})

</script>
