
<template>

<TextInput v-model="form.name" label="Add Card" dense classes="q-ma-sm q-mt-lg">
    <template #button>
        <q-btn @click="add_card" label="Add" flat />
    </template>
</TextInput>

</template>
<script>

import { defineComponent } from 'vue'

import { use_card } from './..//Use/card.use'

export default defineComponent({

    name: 'AddCardForm',

    props: {
        board_id: String,
        list_id: String,
    },

    setup ( props, { emit } ) {

        const {
            form,
            error,
            add_card,
        } = use_card(emit, props.board_id, props.list_id)
        
        return {
            form,
            error,
            add_card,
        }
        
    },

})
</script>
