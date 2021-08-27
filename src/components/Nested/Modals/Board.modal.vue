
<template>
    
<Modal :show="show_modal" :error="error" @hide="this.$emit('hide')">
    <template #header>
        Edit Board
        <q-space />
        <q-btn @click="this.$emit('hide')" color="info" round flat dense icon="close" />
    </template>
    <template #content>

        <TextInput v-model="form_name" label="Board Name" />
        <TextInput v-model="form_description" label="Description" />

        <Heading small title="Theme" />

    </template>
    <template #actions>
        <q-btn label="Delete" @click="find_by_id_and_delete()" color="info" flat />
        <q-space />
        <q-btn label="Save" @click="find_by_id_and_update()" color="accent" flat />
    </template>
</Modal>

</template>
<script>

import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    
    name: 'BoardModal',

    props: {
        board_id: String,
        show_modal: Boolean,
    },

    emits: ['hide'],

    setup ( props ) {

        const store = useStore()

        const board = computed( () => props.board_id ? store.state.board.boards.find( board => board._id === props.board_id ) : null )

        const error = ref(null)

        // const form = 

        const find_by_id_and_update = async () => {
            // store.dispatch('board/find_by_id_and_update', props.board_id, form)
        }

        return {
            board,
            error,
            // form_name,
            // form_description,
            find_by_id_and_update
        }


    },


})
</script>
