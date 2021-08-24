
<template>
    

<q-card :class="[classes ? classes : 'bg-secondary', 'text-accent', 'q-mb-md']" flat>

    <!-- Header -->
    <q-card-actions @click="expand = !expand" class="cursor-pointer">
        <div v-if="label" class="text-h6">{{ label }}</div>
        <slot name="label"></slot> <!-- Optional label slot if not using the shorthand label prop -->
        <q-space />
        <slot name="addon"></slot>
        <q-btn color="info" round flat dense :icon="expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
    </q-card-actions>

    <!-- Content -->
    <q-slide-transition>
        <div v-show="expand">
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

    },

    data: function () {
        return {
            expand: false,
        }
    }
})

</script>
