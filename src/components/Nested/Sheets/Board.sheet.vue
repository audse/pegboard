
<template>

<!-- 
    A standalone sheet displaying a boards' information.
    Usually nested within a draggable element.
-->
<div :class="class_list.container">
    <Sheet v-if="board" :label="board.name" :classes="{label:'text-h6 weight-semibold', content:'text-scale-text-5 q-pl-md'}" shadow separator :handle="handle">
        <template #button>
            <q-btn @click="show_modal=true" color="emphasis" round flat icon="tune" />
        </template>
        <template #content>
            {{ board.description }}
        </template>
        <template #actions>
            <q-btn flat color="emphasis" class="weight-bold" :label="'Go to '+board.name" :to="{name: 'board_page', params: { id: board._id, name: urlify(board.name) } }" />
        </template>
    </Sheet>

    <EditBoardModal :board_id="board_id" :show_modal="show_modal" @hide="show_modal=false" />

</div>



</template>
<script>

import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'

import EditBoardModal from './../Modals/Edit_Board.modal'

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
        EditBoardModal,
    },

    setup ( props ) {

        const store = useStore()

        const board = computed( () => props.board_id ? store.getters['board/find_by_id'](props.board_id) : null )

        const show_modal = ref(false)

        return {
            board,
            show_modal
        }

    },

    methods: {

        urlify: function (string) {
            return string.replace(/\W+/g, '-').toLowerCase()
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
