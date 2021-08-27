
<template>

<!-- 
    A standalone sheet displaying a boards' information.
    Usually nested within a draggable element.
-->

<div :class="class_list.container">
    <Sheet :label="board.name" :classes="{label:'text-h6', content:'text-info'}" separator :handle="handle">
        <template #button>
            <q-btn color="primary-tint-25" round flat dense icon="tune" />
        </template>
        <template #content>
            {{ board.description }}
        </template>
        <template #actions>
            <q-btn flat :label="'Go to '+board.name" :to="'/board/'+urlify(board.name, board.id)" />
        </template>
    </Sheet>
</div>

</template>
<script>

import { defineComponent, ref } from 'vue'

export default defineComponent({

    name: 'BoardSheet',

    props: {
        board: Object,
        classes: Object,

        handle: Boolean,
        columns: Boolean,
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
