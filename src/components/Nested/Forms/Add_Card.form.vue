
<template>

<q-form @submit.prevent="add_card">
    <TextInput v-model="form.name" :name="`add_card_${list_id}`" label="Add Card" dense classes="q-ma-sm q-mt-lg">
        <template #button>
            <q-btn type="submit" label="Add" flat />
        </template>
    </TextInput>
</q-form>

</template>
<script>

import { defineComponent } from 'vue'

import { use_card } from '../../../utils/use.card.utils'

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
