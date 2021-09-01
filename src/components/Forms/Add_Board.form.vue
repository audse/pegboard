
<template>

<q-form @submit.prevent="add_board" class="q-mb-lg">
<Expandable label="Add Board" icon="add">
    <template #before-content>
        <Warning :error="error" />
    </template>
    <template #content>

        <TextInput v-model="form.name" name="add_board_name" label="Board Name" />
        <TextInput v-model="form.description" name="add_board_description" label="Description" />

    </template>
    <template #actions>
        <q-btn type="submit" flat color="emphasis" label="Add" />
    </template>
</Expandable>
</q-form>

</template>
<script>

import { defineComponent, ref, reactive } from 'vue'

import { use_board } from './../../utils/use.board.utils'

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
