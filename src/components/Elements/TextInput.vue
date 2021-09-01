
<template>

<div>

    <q-input 
         v-if="!dark" 
         v-model="newValue"
        :type="type ? type : 'text'" 
        :name="name ? name : ''"

        :label="label"
         label-color="text"
         color="text" 
        :class="['q-pb-sm', classes]"
         input-class="text-text" 
         filled
        :dense="dense" 
        :autofocus="autofocus">
        
        <slot name="button"></slot>
        <template #append>
            <slot name="append"></slot>
        </template>
    </q-input>

    <q-input 
         v-if="dark" 
         v-model="newValue"
        :type="type ? type : 'text'" 
        :name="name ? name : ''"
        
        :label="darkLabel" 
         label-color="text"
         color="text" 
        :class="[classes]" 
         borderless 
         rounded 
         bg-color="secondary" 
         input-class="q-pl-md" 
        :dense="dense" 
        :autofocus="autofocus">

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

    props: {
        modelValue: String,
        name: String,
        type: String,
        
        label: String,
        classes: String,
        dark: Boolean,
        dense: Boolean,

        autofocus: Boolean,
    },
    
    emits: ['update:modelValue'],

    data: function () {
        return {
            newValue: this.modelValue
        }
    },

    computed: {
        darkLabel: function () {
            return this.label ? '\xa0 \xa0'+this.label : ''
        }
    },

    watch: {
        newValue: function () {
            this.$emit('update:modelValue', this.newValue)
        }
    }

})

</script>
