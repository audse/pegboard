
<template>

<q-editor v-model="local_value" :toolbar="toolbar" @click="show_toolbar=true"
    flat content-class="bg-primary" toolbar-bg="scale-text-0" toolbar-text-color="text" toolbar-toggle-color="emphasis" />

</template>
<script>
import { defineComponent, computed, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({

    name: 'EditorInput',

    props: {
        modelValue: String,
    },

    emits: ['update:modelValue'],

    setup ( props, { emit } ) {

        const q = useQuasar()
    
        const local_value = computed( {
            get () {
                return props.modelValue
            }, set (value) {
                emit('update:modelValue', value)
            }
        })

        const show_toolbar = ref(false)

        const toolbar = computed( () => {
            if ( show_toolbar.value ) return [
                [{
                    icon: q.iconSet.editor.fontSize,
                    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
                }
                ],
                ['undo', 'redo']
            ] 
            else return []
        })

        return {
            local_value,
            show_toolbar,
            toolbar
        }

    },
})
</script>
