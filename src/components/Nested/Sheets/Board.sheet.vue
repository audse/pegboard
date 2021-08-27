
<template>

<!-- 
    A standalone sheet displaying a boards' information.
    Usually nested within a draggable element.
-->
<div :class="class_list.container">
    <Sheet v-if="board" :label="board.name" :classes="{label:'text-h6', content:'text-info'}" separator :handle="handle">
        <template #button>
            <q-btn @click="show_modal=true" color="primary-tint-25" round flat dense icon="tune" />
        </template>
        <template #content>
            {{ board.description }}
            {{ board._id }}
        </template>
        <template #actions>
            <q-btn flat :label="'Go to '+board.name" :to="'/board/'+urlify(board.name, board.id)" />
        </template>
    </Sheet>

    <BoardModal :board_id="board_id" :show_modal="show_modal" @hide="show_modal=false" />

</div>



</template>
<script>

import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'

import BoardModal from './../Modals/Board.modal'

export default defineComponent({

    name: 'BoardSheet',

    props: {
        board_id: String,
        index: Number,

        classes: Object,

        handle: Boolean,
        columns: Boolean,
    },

    components: {
        BoardModal,
    },

    setup ( props ) {

        const store = useStore()

        const board = computed( () => props.board_id ? store.state.board.boards.find( board => board._id === props.board_id ) : null )

        const show_modal = ref(false)

        return {
            board,
            show_modal
        }

    },

    methods: {

        urlify: function (string, id=null) {
            let url = string.replace(/\W+/g, '-').toLowerCase()
            if ( id ) url += '/'+id
            return url
        },

    },

    computed: {

        class_list: function () {
            let new_list = Object.assign({}, this.classes)

            if ( this.columns ) new_list.container = 'col-xs-12 col-sm-6 col-lg-4'

            return new_list

        }

    }

})

</script>
