
<template>
    
<Modal :show="show_modal" :error="error" @hide="this.$emit('hide')">
    <template #header>
        Edit List
        <q-space />
        <q-btn @click="this.$emit('hide')" color="info" round flat dense icon="close" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="List Name" />
        <TextInput v-model="form.description" label="Description" />

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
    
    name: 'ListModal',

    props: {
        list_id: String,
        board_id: String,

        show_modal: Boolean,
    },

    emits: ['hide'],

    setup ( props, { emit } ) {

        const store = useStore()

        const list = computed( () => props.list_id ? store.getters['list/find_by_id'](props.list_id, props.board_id) : null )

        const error = ref(null)

        const form = ref({
            name: list.value.name,
            description: list.value.description
        })
        
        const find_by_id_and_update = async () => {
            
            store.dispatch('list/find_by_id_and_update', { list_id: props.list_id, data: form }).then( result => {
                emit('hide')
            })
        }

        const find_by_id_and_delete = async () => {
            store.dispatch('list/find_by_id_and_delete', props.list_id ).then( result => {
                emit('hide')
            })
        }

        return {
            list,
            error,
            form,
            find_by_id_and_update,
            find_by_id_and_delete
        }


    },


})
</script>
