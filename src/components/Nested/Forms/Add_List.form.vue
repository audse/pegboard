
<template>

<Expandable label="Add List" icon="add">
    <template #before-content>
        <Warning :error="error" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="List Name" />
        <TextInput v-model="form.description" label="Description" />

    </template>
    <template #actions>
        <q-btn flat color="accent" label="Add" @click="add_list" />
    </template>
</Expandable>

</template>
<script>

import { defineComponent } from 'vue'

import { use_list } from './../Use/list.use'

export default defineComponent({

    name: 'ListForm',

    props: {
        show_form: Boolean,
        board_id: String,
    },

    setup ( props, { emit } ) {

        const {
            form,
            error,
            add_list
        } = use_list ( emit, props.board_id )

        return {
            form,
            error,
            add_list
        }
        
    },

})
</script>
