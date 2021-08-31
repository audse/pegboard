
<template>

<q-card flat :class="[
    !small ? 'full-width' : '',
    shadow ? 'soft-shadow' : '',
    light ? 'bg-primary' : 'bg-scale-secondary-6',
    'text-accent',
    classList.sheet ? classList.sheet : ''
    ]">

    <!--Header-->
    <q-card-actions :class="[
        dense ? 'q-py-none q-pr-none' : '', 
        classList.header ? classList.header : ''
        ]">

        <q-item class="q-pa-none full-width">
            <q-item-section class="q-pa-none" v-if="handle" side>
                <q-icon name="drag_indicator" size="sm" :class="[
                'handle', 
                'q-mr-sm', 
                classList.handle ? classList.handle : 'text-scale-text-1', 
                ]" />
            </q-item-section>
            <q-item-section  class="q-pa-none">
                <div :class="[
                classList.label ? classList.label : 'text-smallheading',
                dense ? 'q-pa-none' : ''
                ]">

                    {{ label }}
                    <slot name="label"></slot>
                </div>
                <div v-if="subtitle" class="text-scale-text-4">
                    <slot name="subtitle"></slot>
                </div>
            </q-item-section>
            <q-space />
            <q-item-section class="q-pa-none" side>
                <slot name="button"></slot>
            </q-item-section>
        </q-item>
    </q-card-actions>

    <!-- Content -->
    <div :class="classList.beforeContent ? classList.beforeContent : ''">
        <slot name="before-content"></slot>
    </div>

    <q-card-section v-if="!nocontent" :class="[
        !light ? 'bg-scale-secondary-4' : '',
        classList.content ? classList.content : 'text-scale-accent-3 q-pa-sm'
        ]">

        <slot name="content"></slot>
    </q-card-section>

    <!-- Actions -->
    <q-card-actions v-if="!noactions" :class="[
        !light ? 'bg-scale-secondary-5' : '',
        'actions',
        classList.actions ? classList.actions : ''
        ]">

        <slot name="actions"></slot>
    </q-card-actions>

</q-card>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Sheet',

    props: {
        label: String,
        classes: Object,

        subtitle: Boolean,
        light: Boolean,
        small: Boolean,
        dense: Boolean,
        shadow: Boolean,
        handle: Boolean,
        nocontent: Boolean,
        noactions: Boolean
    },

    computed: {
        classList: function () {
            if ( !this.classes ) {
                return { }
            } else {
                return this.classes
            }
        }
    }
})
</script>

<style lang="scss">

.soft-shadow {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1) !important;
    -webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1) !important;
    -moz-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1) !important;
}

.lightsheet {
    background: scale-color($primary, $alpha: -70%) !important;
    border-radius: 40px;
    padding: 20px 10px;
    margin-bottom: 20px;
}

</style>