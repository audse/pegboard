<template>
    
<q-popup-edit v-model="local_value"  class="q-pa-none q-ma-none bg-scale-text-1">
    <q-form @submit.prevent="this.$emit('save_update')" v-close-popup>
    <TextInput v-model="local_value" :name="name" autofocus :dense="dense">
        <template #button>
            <q-btn type="submit" label="Save" flat />
        </template>
    </TextInput>
    </q-form>
</q-popup-edit>

</template>
<script>

import { defineComponent, computed } from 'vue'

export default defineComponent({

    name: 'PopInput',
    
    props: {
        modelValue: String,
        name: String,

        dense: Boolean,
    },
    
    emits: ['update:modelValue', 'save_update'],

    setup( props, { emit } ) {

        const local_value = computed( {
            get () {
                return props.modelValue
            }, set (value) {
                emit('update:modelValue', value)
            }
        })

        return {
            local_value
        }
        
    },

})

</script>
