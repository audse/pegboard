
<template>
    
<Modal :show="showForm" :error="error" @hide="resetForms()">
    <template #header>
        Edit Board
        <q-space />
        <q-btn @click="resetForms()" color="info" round flat dense :icon="'close'" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="Board Name" />
        <TextInput v-model="form.description" label="Description" />

        <Heading small title="Theme" />

    </template>
    <template #actions>
        <q-btn flat color="info" label="Delete" />
        <q-space />
        <q-btn color="accent" flat  label="Save" />
    </template>
</Modal>

</template>
<script>

import { defineComponent, ref, reactive } from 'vue'

// Mixins

import use_form from './../../mixins/use_form'

export default defineComponent({
    
    name: 'BoardModal',

    props: {
        board: Object,
        showForm: Boolean,
    },

    setup ( props ) {

        const form = ref( { name: props.board.name, description: props.board.description } )
        const form_id = ref( props.board.id )

        return {
            form,
            form_id
        }

    },


})
</script>
