
<template>

<q-form @submit.prevent="add_list" class="full-width q-mb-lg">
<Expandable label="Add List" icon="add" classes="full-width">
    <template #before-content>
        <Warning :error="error" />
    </template>
    <template #content>

        <TextInput v-model="form.name" name="add_list_name" label="List Name" />
        <TextInput v-model="form.description" name="add_list_description" label="Description" />

    </template>
    <template #actions>
        <q-btn type="submit" flat color="emphasis" label="Add" />
    </template>
</Expandable>
</q-form>

</template>
<script>

import { defineComponent } from 'vue'

import { use_list } from './../../utils/use.list.utils'

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
