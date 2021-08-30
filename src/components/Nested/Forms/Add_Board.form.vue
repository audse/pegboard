
<template>

<Expandable label="Add Board" icon="add">
    <template #before-content>
        <Warning :error="error" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="Board Name" />
        <TextInput v-model="form.description" label="Description" />

    </template>
    <template #actions>
        <q-btn flat color="emphasis" label="Add" @click="add_board" />
    </template>
</Expandable>

</template>
<script>

import { defineComponent, ref, reactive } from 'vue'

import { use_board } from './../Use/board.use'

export default defineComponent({

    name: 'BoardForm',

    props: {
        show_form: Boolean,
    },

    setup ( props, { emit } ) {

        const {
            form,
            error,
            add_board,
        } = use_board(null, emit)
        
        return {
            form,
            error,
            add_board,
        }
        
    },

})
</script>
