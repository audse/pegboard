
<template>

<div :class="horizontal? 'fit scroll-y hide-scrollbar q-pa-sm' : ''">
<draggable v-model="local_value" item-key="_id" v-bind="drag_options" @start="dragging=true" @end="dragging=false" :class="drag_class">
    <template #item="{ element, index }">
        <div class="col-xs-12 col-sm-6 col-lg-4">
            <transition appear @before-appear="stagger_start" @appear="stagger_start" @after-appear="stagger_end"
            :style="{ transitionDelay: ( index * transition_delay ).toString() + 'ms !important',}">
                <slot :element="element" :index="index"></slot>
            </transition>
        </div>
    </template>
</draggable>
</div>

</template>
<script>

import { defineComponent, computed, ref } from 'vue'
import draggable from 'vuedraggable'

export default defineComponent({

    name: 'Drag',

    props: {

        modelValue: Array,

        group: String,

        col_4: Boolean,
        col_list: Boolean,
        gutter_sm: Boolean,
        gutter_md: Boolean,
        horizontal: Boolean,

        delay: Number,

    },
    
    emits: ['update:modelValue'],

    components: {
        draggable,
    },

    setup ( props, { emit } ) {

        const transition_delay = computed( () => props.delay_amount || 50 )

        const local_value = computed( {
            get () { return props.modelValue },
            set (value) {  emit('update:modelValue', value ) }
        })

        const dragging = ref(false)

        const drag_class = computed( () => {
            let class_string = ''
            if ( props.col_4 || props.col_list ) class_string += ' row'
            if ( props.gutter_sm ) class_string += ' q-col-gutter-sm'
            if ( props.gutter_md ) class_string += ' q-col-gutter-md'
            if ( props.horizontal ) class_string += ' no-wrap'
            return class_string
        })

        const element_class = computed( () => {
            if ( props.col_4 ) return 'col-xs-12 col-sm-6 col-md-4'
            if ( props.col_list ) return 'col-xs-11 col-sm-5 col-md-4 col-lg-3'
            else return ''
        })

        const drag_options = computed( () => {

            return {

                componentData: {
                    tag: 'div',
                    name: dragging.value === true ? 'flip-list' : null,
                },

                tag: 'transition-group',
                animation: 250,
                easing: "cubic-bezier(0.5, 0, 0, 0.5)",
                appear: true,

                group: props.group ? props.group : 'drag_group',

                disabled: false,

                ghostClass: 'ghost',
                dragClass: 'dragging',
                chosenClass: 'chosen',

                handle: '.handle'
            }
        })

        return {
            local_value,
            transition_delay,
            dragging,
            drag_class,
            element_class,
            drag_options
        }
        
    },

    methods: {

        stagger_start ( event ) {
            event.style.opacity = '0'
        },

        stagger_end ( event ) {
            event.style.opacity = '1',
            event.style.transition = '150ms'
            
        },

    }
})

</script>

<style scoped>

.horizontal {

}

</style>