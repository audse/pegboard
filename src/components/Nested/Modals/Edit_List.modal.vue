
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

import { use_list } from '../../../utils/use.list.utils'

export default defineComponent({
    
    name: 'EditListModal',

    props: {
        list_id: String,
        board_id: String,

        show_modal: Boolean,
    },

    emits: ['hide'],

    setup ( props, { emit } ) {

        const store = useStore()

        const list = computed( () => props.list_id ? store.getters['list/find_by_id'](props.list_id, props.board_id) : null )

        const {
            form,
            error,
            find_by_id_and_update,
            find_by_id_and_delete,
        } = use_list ( emit, props.board_id, list.value )

        return {
            form,
            error,
            find_by_id_and_update,
            find_by_id_and_delete
        }

    },


})
</script>
