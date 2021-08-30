
<template>

<div>

    <q-input v-if="!dark" v-model="newValue"
        :type="type ? type : 'text'" :label="label" label-color="text" color="text" :class="['q-pb-sm', classes]" input-class="text-text" filled :dense="dense">
        <slot name="button"></slot>
        <template #append>
            <slot name="append"></slot>
        </template>
    </q-input>

    <q-input v-if="dark" v-model="newValue"
        :type="type ? type : 'text'" :label="darkLabel" label-color="text" color="text" :class="[classes]" borderless rounded bg-color="secondary" input-class="q-pl-md" :dense="dense">
        <slot name="button"></slot>
        <template #append>
            <slot name="append"></slot>
        </template>
    </q-input>
</div>

</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TextInput',

    props: [
        'modelValue',
        
        'label',
        'classes',
        'type',
        'dark',
        'dense'
    ],
    
    emits: ['update:modelValue'],

    data: function () {
        return {
            newValue: this.modelValue
        }
    },

    computed: {
        darkLabel: function () {
            return '\xa0 \xa0'+this.label
        }
    },

    watch: {
        newValue: function () {
            this.$emit('update:modelValue', this.newValue)
        }
    }

})

</script>
