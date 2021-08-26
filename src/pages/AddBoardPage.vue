<template>

<q-page class="flex flex-center">

    <div class="block">
    <Heading h2 title="Add Board Page" />
    <q-input v-model="form.name" label="Name" />
    <q-input v-model="form.description" label="Name" />
    <q-btn label="Submit" @click="add" />    
    </div>

</q-page>

</template>

<script>

import { defineComponent } from 'vue';

import { uid } from 'quasar'

import BoardService from './../../server/services/board.service'

export default defineComponent({
    name: 'AddBoardPage',

    data: function () {
        return {
            id: this.$route.params.id,
            board: null,

            form: {
                name: null,
                description: null,
                theme: uid(),
                user_id: uid()
            }
        }
    },

    methods: {

        add: function () {
            BoardService.add(this.form).then( (result) => {
                console.log('Add Results:', result)
                this.board = result
            })
        }

    },
})

</script>
