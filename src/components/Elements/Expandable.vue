
<template>
    

<q-card :class="style ? '' : [classes ? classes : '', light ? 'bg-scale-text-0' : 'bg-scale-secondary-5']" :style="style ? style : {}" flat>

    <!-- Header -->
    <q-card-actions @click="expand = !expand" :class="['cursor-pointer', dense?'q-pa-none':'']">
        <div v-if="label" class="text-smallheading text-scale-text-8 q-pl-sm">{{ label }}</div>
        <slot name="label"></slot> <!-- Optional label slot if not using the shorthand label prop -->
        <q-space />
        <slot name="addon"></slot>
        <q-btn v-if="!icon" style="opacity: 0.5" round flat dense :icon="expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
        <q-btn v-if="icon" :style="{ color: icon_text_color ? icon_text_color : 'inherit', backgroundColor: icon_color ? icon_color : 'inherit'} " round flat :icon="icon" />
    </q-card-actions>

    <!-- Content -->
    <q-slide-transition>
        <div v-show="expand && !disabled">
            <slot name="before-content"></slot>

            <q-card-section :class="dense?'q-ma-none q-pa-none q-pt-md':'q-mb-md'">
                <slot name="content"></slot>
            </q-card-section>

            <q-card-actions>
                <slot name="actions"></slot>
            </q-card-actions>
        </div>
    </q-slide-transition>

</q-card>

</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Expandable',
    props: {
        label: String,

        style: Object,
        classes: String,

        open: Boolean, // defaults to closed

        icon: String,
        icon_text_color: String,
        icon_color: String,

        disabled: Boolean,
        light: Boolean,
        dense: Boolean,
    },

    data: function () {
        return {
            expand: false,
        }
    },

    created () {
        if ( this.open ) this.expand = true
    }
})

</script>

<style lang="scss">

.expandable-dark {
    background: $secondary;
    // color: $text;
}

.expandable-light {
    // background: $scale-text-0;
    // color: $text;
}

</style>