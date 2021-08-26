<template>

<q-page class="flex flex-center">
    <div>
    <Heading h2 title="Get Board Page" :subtitle="id" />
    <q-input v-model="form.name" label="Name" />
    <q-input v-model="form.description" label="Description" />
    <q-btn label="Submit" @click="updateBoard" />    
    {{ form }}
    </div>
</q-page>

</template>

<script>

import { defineComponent } from 'vue';

import BoardService from './../../server/services/board.service'

export default defineComponent({
    name: 'GetBoardPage',

    data: function () {
        return {
            id: this.$route.params.id,
            board: null,

            form: {
                name: null,
                description: null,
            }
        }
    },

    created () {

        BoardService.find_by_id( this.id ).then( result => {
            this.board = result
            this.form.name = result.data.name
            this.form.description = result.data.description
        })

    },

    methods: {

        updateBoard: function () {

            BoardService.find_by_id_and_update( this.id, this.form ).then( result => {
                console.log(result)
            })

        }
    },
})

</script>
