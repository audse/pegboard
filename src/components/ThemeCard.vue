

<template>
    
<q-card :style="{ backgroundColor: colors.primary, color: colors.accent }" class="shadow-3" >

    <q-card-section :style="{ backgroundColor: scaleSecondary[4] }" class="q-px-lg">
        <q-item class="text-h6 q-px-none q-pt-lg q-pb-sm" :style="{ fontWeight: 700, color: colors.accent}">
                {{ label }}
        </q-item>
        <div class="text-subtitle-1 q-mt-xs" :style="{color: scaleAccent[7]}">
            <slot name="subtitle"></slot>
        </div>
    </q-card-section>

    <div v-if="example">
        <q-item class="q-pa-none q-ma-none q-mb-md" :style="{borderTop: '5px solid', borderColor: colors.info, background: getTransparentColor(colors.info), color: colors.accent}">
            <q-item-section side class="q-pa-none">
                <q-btn icon="warning" flat round :style="{ color: colors.info }" />
            </q-item-section>
            <q-item-section class="q-pa-sm q-ma-none">
                <b>Alert!</b> 
                <span style="opacity: 0.75">You have one new message.</span>
            </q-item-section>
        </q-item>
    </div>

    <slot name="before-content"></slot>

    <q-card-section v-if="example" class="q-mx-md">


        <q-item class="text-smallheading q-pa-none" style="font-weight:600">
            <q-item-section side class="q-pa-none q-ml-sm q-mr-sm">
                <q-icon name="drag_indicator" :style="{ color: scaleAccent[1] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none" :style="{ color: scaleAccent[5] }">
                Example List Name
            </q-item-section>
        </q-item>
        <q-item class="text-smallheading q-my-sm q-pa-none q-pl-sm" :style="{ backgroundColor: scaleSecondary[3], borderRadius: '3px' }">
            <q-item-section side class="q-pa-none q-mr-sm">
                <q-icon name="drag_indicator" :style="{ color: scaleAccent[0] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none" :style="{ color: colors.accent}">
                Header Card
            </q-item-section>
        </q-item>
        <q-item class="q-pa-none q-ma-none">
            <q-item-section side class="q-pa-none q-mr-sm">
                <q-icon name="drag_indicator" :style="{ color: scaleAccent[1] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none">
                <q-item :style="{backgroundColor: scaleSecondary[3], color: scaleAccent[7], fontWeight: 600}">
                    Card Name
                </q-item>
                <q-item :style="{backgroundColor: scaleSecondary[2], color: scaleAccent[6]}">
                    This is the description of a card.
                </q-item>
            </q-item-section>
        </q-item>
        <q-item class="q-pa-none q-mt-md">
            <q-input disable :dark="primaryIsDark" dense label="Form" :style="{ color: colors.info }" filled :class="'full-width'" >
                <template #append>
                    <q-btn flat label="Add" />
                </template>
            </q-input>
        </q-item>

    </q-card-section>

    <q-card-section v-if="!nocontent">
        <slot name="content"></slot>
    </q-card-section>

    <q-card-actions v-if="!noactions">

        <div v-if="example">
            <q-btn flat class="q-ma-sm" :style="{ color: colors.negative, fontWeight: 600 }" label="Negative" />
            <q-btn flat class="q-ma-sm" :style="{ color: colors.positive, fontWeight: 600 }" label="Positive" />
            <q-btn outline class="q-ma-sm" :style="{ color: colors.warning, fontWeight: 600 }" label="Warning" />
            <q-btn outline class="q-ma-sm" :style="{ color: colors.info, fontWeight: 600 }" label="Info" />
            <q-btn unelevated class="q-ma-sm" :style="{ backgroundColor: colors.secondary, color: colors.accent, fontWeight: 600 }" label="Action" />
        </div>

        <slot name="actions"></slot>
    </q-card-actions>
</q-card>

</template>

<script>

import { defineComponent } from 'vue'

import chroma from 'chroma-js'

export default defineComponent({
    props: {
        label: String,
        example: Boolean,

        handle: Boolean,
        nocontent: Boolean,
        noactions: Boolean,

        colors: Object,
        scaleAccent: Object,
        scaleSecondary: Object,

        primaryIsDark: Boolean,
    },

    methods: {
        getTransparentColor: function (color) {
            return chroma(color).alpha(0.3)
        }
    }
})


</script>
