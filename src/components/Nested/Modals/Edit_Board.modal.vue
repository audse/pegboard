
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

        <Expandable label="Themes" classes="q-pa-sm q-my-sm" dense>
            <template #content>
                <ThemeSelector v-model="form.theme_id" />
            </template>
        </Expandable>

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

import { use_board } from './../Use/board.use'

import ThemeSelector from './../ThemeSelector'

export default defineComponent({
    
    name: 'EditBoardModal',

    props: {
        board_id: String,
        show_modal: Boolean,
    },

    components: {
        ThemeSelector,
    },

    emits: ['hide'],

    setup ( props, { emit } ) {

        const store = useStore()
        
        const current_board = computed( () => props.board_id ? store.getters['board/find_by_id'](props.board_id) : null )

        const {
            board,
            form,
            error,

            find_by_id_and_update,
            find_by_id_and_delete,

        } = use_board(current_board.value, emit)
        
        return {
            board,
            form,
            error,

            find_by_id_and_update,
            find_by_id_and_delete,
        }

    },


})
</script>
