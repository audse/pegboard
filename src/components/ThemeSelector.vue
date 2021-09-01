<template>

<div v-if="themes_exist">
    
    <span v-for="option in options" :key="option.value" @click="local_value=option.value">
        <q-chip :style="option.style">
            <span v-if="option.value===local_value">
                <q-icon name="check" :style="option.style" class="q-pr-sm" />
            </span>
            {{ option.label }}
        </q-chip>
    </span>
</div>


</template>
<script>

import { defineComponent, watch, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({

    name: 'ThemeSelector',

    props: {
        modelValue: String,
    },
    
    emits: ['update:modelValue'],

    setup ( props, { emit } ) {

        const local_value = ref(props.modelValue)

        const store = useStore()
        
        const user_id = store.getters['auth/user_id']

        const themes = computed( () => store.state.theme.themes )

        const themes_exist = computed( () => {
            if ( themes.value.length > 0 ) return true
            else return false
        })

        const load_themes = async () => {
            if ( !themes_exist.value ) store.dispatch('theme/reload')
        }

        onMounted(load_themes)

        const options = computed( () => {
            return themes.value.map( theme => {
                return {
                    label: theme.name,
                    value: theme._id,
                    style: {
                        color: theme.text,
                        background: theme.primary,
                    }
                }
            })
        })

        watch( local_value, () => {
            emit('update:modelValue', local_value.value)
        })

        return {
            local_value,
            user_id,
            themes,
            themes_exist,
            options,
        }

    },


})

</script>
