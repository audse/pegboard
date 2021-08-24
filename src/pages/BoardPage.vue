<template>

<q-page class="q-px-md q-py-lg">
     
    <Board :id="id" :name="name" />

</q-page>

</template>

<script>

import { defineComponent } from 'vue'

import Board from './../components/Board'

export default defineComponent({

    name: 'BoardsPage',

    components: {
        Board,
    },

    data: function () {

        return {

            id: this.$route.params.id,
            name: this.$route.params.name,

        }
    },

    watch: {

        '$route': function () {

            this.id = this.$route.params.id
            this.name = this.$route.params.name

        }

    },
})

</script>