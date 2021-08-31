
<template>
    
<Expandable icon="colorize" :style="style"
    :icon_color="decolorize_icon?'inherit':local_value" :icon_text_color="get_icon_text_color()" :disabled="disabled">
    <template #label>
        <div class="'q-mt-sm q-pl-xs q-pb-sm'" :style="disabled ? 'opacity: 0.5' : ''">
            <span class="weight-bold" style="opacity: 0.6">{{ label }}</span>
            <span class="q-ml-md" style="opacity: 1">{{ local_value }}</span>
            <div class="q-pt-xs" style="opacity: 0.4">{{ subtitle }}</div>
        </div>
    </template>
    <template #before-content>
        <slot name="before-content"></slot>
    </template>
    <template #content>
        <div class="row justify-center q-mx-xl">
            <q-color v-model="local_value" v-bind="options_picker" class="col" />
        </div>
    </template>
</Expandable>

</template>
<script>

import { defineComponent, computed } from 'vue'
import { getCssVar } from 'quasar'

import { use_color_form, use_auto_color } from '../../utils/use.colors.utils'

export default defineComponent({

    props: {
        modelValue: String,

        label: String,
        subtitle: String,

        bg: String,
        text: String,

        decolorize_icon: Boolean,
        disabled: Boolean,
    },

    setup( props, { emit } ) {

        const local_value = computed( {
            get () { return props.modelValue },
            set (value) {  
                emit('update:modelValue', value ) 
                emit('change')
            }
        })

        const {
            options_picker,
        } = use_color_form()

        const {
            is_dark
        } = use_auto_color()

        const style = computed( () => {
            return {
                backgroundColor: props.bg || getCssVar('primary'),
                color: props.text || getCssVar('text'),
                width: '100%'
            }
        })

        const get_icon_text_color = () => {
            if ( props.decolorize_icon ) return 'inherit'
            else if ( !local_value.value ) return 'inherit'
            else if ( is_dark(local_value.value) ) return 'white'
            else return 'black'
        }

        return {
            local_value,
            options_picker,
            is_dark,
            style,
            get_icon_text_color
        }
        
    },
})
</script>
