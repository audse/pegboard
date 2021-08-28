
<template>
    

<q-card :class="[classes ? classes : '', light ? 'expandable-light' : 'expandable-dark']" flat>

    <!-- Header -->
    <q-card-actions @click="expand = !expand" class="cursor-pointer">
        <div v-if="label" class="text-smallheading">{{ label }}</div>
        <slot name="label"></slot> <!-- Optional label slot if not using the shorthand label prop -->
        <q-space />
        <slot name="addon"></slot>
        <q-btn v-if="!icon" color="info" round flat dense :icon="expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
        <q-btn v-if="icon" color="info" round flat dense :icon="icon" />
    </q-card-actions>

    <!-- Content -->
    <q-slide-transition>
        <div v-show="expand && !disabled">
            <slot name="before-content"></slot>

            <q-card-section class="q-mb-md">
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
        classes: String,

        open: Boolean, // defaults to closed

        icon: String,

        disabled: Boolean,
        light: Boolean,
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

<style lang="scss" scoped>

.expandable-dark {
    background: $secondary;
    color: $accent;
}

.expandable-light {
    background: $scale-accent-0;
    color: $accent;
}

</style>