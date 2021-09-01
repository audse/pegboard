
<template>
    
<q-list>
        <q-item
        v-for="theme in data" :key="theme.id"
        class="q-pa-none">
        
            <!-- Radio Button -->
            <q-radio 
            v-model="newValue" :val="theme.data"
            color="accent" class="q-pa-sm" />
            
            <!-- Label -->
            <div class="q-pa-md full-width" :style="{
            backgroundColor: theme.data.primary, 
            color: theme.data.accent }">
                {{ theme.data.name }}
            </div>

    </q-item>

</q-list>

</template>

<script>

import { defineComponent } from 'vue'

import { cache } from './../mixins/cache'

export default defineComponent({
    
    name: 'ThemeSelector',

    props: ['modelValue'],

    mixins: [cache],

    emits: ['update:modelValue'],

    data: function () {
        return {

            newValue: this.modelValue
        }
    },

    mounted () {

        if ( this.$auth ) {
            this.path = { user: this.$auth.uid, theme: 'all' }
        }
    },

    watch: {

        modelValue: function () {
            this.newValue = this.modelValue
        },

        newValue: function () {
            this.$emit('update:modelValue', this.newValue)
        }
    }

})
</script>
