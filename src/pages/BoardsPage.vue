<template>

<q-page class="q-px-md q-py-lg">

<Heading h2 title="Your Boards" :subtitle="'User: '+id" />

<div>
<Heading h4 title="Add Board" />
<TextInput v-model="form.name" label="Board Name" />
<TextInput v-model="form.description" label="Board Description" />
<q-btn flat label="Add" @click="addBoard" />
</div>

{{ boards }}

</q-page>

</template>

<script>

import { defineComponent } from 'vue'


import BoardService from './../../server/services/board.service'

export default defineComponent({
    name: 'BoardsPage',

    data: function () {
        return {
            boards: [],
            id: null,

            error: null,

            form: {
                name: null,
                description: null,
            }
        }
    },

    created () {
        if ( this.$auth ) this.id = this.$auth.uid
        this.updateBoards()
    },

    methods: {

        updateBoards: function () {

            BoardService.find_by_user( this.id ).then( data => {
                if ( data ) this.boards = data
                else this.error = 'No boards.'
            })

        },

        addBoard: function () {
            this.form.user_id = this.id
            BoardService.add( this.form ).then( data => {
                this.$q.notify({ color: 'secondary', message: 'Board Added!'})
                this.updateBoards()
            })
        }

    }


})

</script>
