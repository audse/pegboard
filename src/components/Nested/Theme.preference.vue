<template>

<div v-if="themes_exist">
    
    
<q-list>

        <q-item
        v-for="theme in themes" :key="theme._id"
        class="q-pa-none">
        
            <!-- Radio Button -->
            <q-radio 
            v-model="local_value" :val="theme._id"
            color="accent" class="q-pa-sm" />
            
            <!-- Label -->
            <div class="q-pa-md full-width" :style="{
            backgroundColor: theme.primary, 
            color: theme.text }">
                {{ theme.name }}
            </div>

    </q-item>

</q-list>

</div>


</template>
<script>

import { defineComponent, watch, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({

    name: 'ThemePreference',

    props: {
        modelValue: String,
    },
    
    emits: ['update:modelValue'],

    setup ( props, { emit } ) {

        const local_value = ref(props.modelValue)

        const store = useStore()
        
        const user_id = store.getters['auth/user_id']

        const themes = computed( () => store.state.theme.themes )
        const themes_exist = computed( () => themes.value.length > 0 )

        const load_themes = async () => {
            if ( !themes_exist.value ) store.dispatch('theme/reload', user_id)
        }

        onMounted(load_themes)

        watch( local_value, () => {
            emit('update:modelValue', local_value.value)
        })

        return {
            local_value,
            user_id,
            themes,
            themes_exist,
        }

    },


})

</script>
