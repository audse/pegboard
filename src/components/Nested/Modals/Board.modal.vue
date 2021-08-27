
<template>
    
<Modal :show="show_modal" :error="error" @hide="this.$emit('hide')">
    <template #header>
        Edit Board
        <q-space />
        <q-btn @click="this.$emit('hide')" color="info" round flat dense icon="close" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="Board Name" />
        <TextInput v-model="form.description" label="Description" />

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

    setup ( props, { emit } ) {

        const store = useStore()

        const board = computed( () => props.board_id ? store.getters['board/find_by_id'](props.board_id) : null )

        const error = ref(null)

        const form = ref({
            name: board.value.name,
            description: board.value.description
        })
        
        const find_by_id_and_update = async () => {
            store.dispatch('board/find_by_id_and_update', { board_id: props.board_id, data: form }).then( result => {
                console.log(result)
                emit('hide')
            })
        }

        const find_by_id_and_delete = async () => {
            store.dispatch('board/find_by_id_and_delete', props.board_id ).then( result => {
                console.log(result)
                emit('hide')
            })
        }

        return {
            board,
            error,
            form,
            find_by_id_and_update,
            find_by_id_and_delete
        }


    },


})
</script>
