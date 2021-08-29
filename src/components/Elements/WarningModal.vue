
<template>

<q-dialog :model-value="show">

    <q-card class="bg-primary text-accent q-pb-xl">
        <q-card-actions class="text-h6 bg-secondary q-pa-md">
            {{ label }}
            <slot name="header"></slot>

        </q-card-actions>

        <q-card-section class="q-pa-md q-pb-xl text-subtitle-1">
            <p class=" text-subtitle-1">{{ message }}</p>
        </q-card-section>


        <q-card-actions class="bg-scale-secondary-2 absolute-bottom" >
            <slot name="actions"></slot>
        </q-card-actions>
    </q-card>
    
</q-dialog>

</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({

    name: 'WarningModal',

    props: {
        show: Boolean,
        label: String,
        message: String,
    },
})

</script>
