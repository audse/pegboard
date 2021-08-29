
<template>
    
<Modal :show="show_modal" :error="error" @hide="this.$emit('hide')">
    <template #header>
        Edit Card
        <q-space />
        <q-btn @click="this.$emit('hide')" color="info" round flat dense icon="close" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="Card Name" />
        <TextInput v-model="form.content" label="Content" />

    </template>
    <template #actions>
        <q-btn label="Delete" @click="find_by_id_and_delete()" color="info" flat />
        <q-space />
        <q-btn label="Save" @click="find_by_id_and_update()" color="accent" flat />
    </template>
</Modal>

</template>
<script>

import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import { use_card } from './../Use/card.use'

export default defineComponent({
    
    name: 'EditCardModal',

    props: {
        board_id: String,
        list_id: String,
        card_id: String,
        show_modal: Boolean,
    },

    emits: ['hide'],

    setup ( props, { emit } ) {

        const store = useStore()
        
        const current_card = computed( () => props.board_id ? store.getters['card/find_by_id'](props.card_id, props.board_id) : null )

        const {
            form,
            error,

            find_by_id_and_update,
            find_by_id_and_delete,

        } = use_card(emit, props.board_id, props.list_id, current_card.value)
        
        return {
            form,
            error,

            find_by_id_and_update,
            find_by_id_and_delete,
        }

    },


})
</script>
