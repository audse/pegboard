

<template>
    
<q-card :style="{ backgroundColor: colors.primary, color: colors.text }" flat>

    <q-card-section :style="{ backgroundColor: scale_secondary[4] }" class="q-px-lg">
        <q-item class="text-h6 q-px-none q-pt-lg q-pb-sm" :style="{ fontWeight: 700, color: colors.text}">
                
            <q-item-section v-if="handle" side class="q-pa-none q-ml-none q-mr-md">
                <q-icon name="drag_indicator" class="handle" :style="{ color: scale_text[2] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none" :style="{ color: colors.text }">
                {{ label }}
            </q-item-section>

        </q-item>
        <div class="text-subtitle-1 q-mt-xs" :style="{color: scale_text[7]}">
            <slot name="subtitle"></slot>
        </div>
    </q-card-section>

    <div v-if="example">
        <q-item class="q-pa-none q-ma-none q-mb-md" :style="{borderTop: '5px solid', borderColor: colors.emphasis, background: get_transparent_color(colors.emphasis), color: colors.text}">
            <q-item-section side class="q-pa-none">
                <q-btn icon="warning" flat round :style="{ color: colors.emphasis }" />
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
                <q-icon name="drag_indicator" :style="{ color: scale_text[1] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none" :style="{ color: scale_text[5] }">
                Example List Name
            </q-item-section>
        </q-item>
        <q-item class="text-smallheading q-my-sm q-pa-none q-pl-sm" :style="{ backgroundColor: scale_secondary[3], borderRadius: '3px' }">
            <q-item-section side class="q-pa-none q-mr-sm">
                <q-icon name="drag_indicator" :style="{ color: scale_text[0] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none" :style="{ color: colors.text}">
                Header Card
            </q-item-section>
        </q-item>
        <q-item class="q-pa-none q-ma-none">
            <q-item-section side class="q-pa-none q-mr-sm">
                <q-icon name="drag_indicator" :style="{ color: scale_text[1] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none">
                <q-item :style="{backgroundColor: scale_secondary[3], color: scale_text[7], fontWeight: 600}">
                    Card Name
                </q-item>
                <q-item :style="{backgroundColor: scale_secondary[2], color: scale_text[6]}">
                    This is the description of a card.
                </q-item>
            </q-item-section>
        </q-item>
        <q-item class="q-pa-none q-mt-md">
            <q-input disable :dark="primary_is_dark" dense label="Form" :style="{ color: colors.emphasis }" filled :class="'full-width'" >
                <template #append>
                    <q-btn flat label="Add" />
                </template>
            </q-input>
        </q-item>

    </q-card-section>

    <q-card-section v-if="!nocontent">

        <div v-if="form">

            <q-list>
                <q-item :style="{ color: colors.text }">
                    <q-item-section class="weight-extrabold" :style="{ color: scale_text[4] }" side>Primary</q-item-section>
                    <q-item-section>{{ colors.primary }}</q-item-section>
                    <q-item-section side><q-btn icon="colorize" round unelevated :style="{color: colors.text, backgroundColor: colors.primary }" /></q-item-section>
                </q-item>
                <q-item :style="{ color: colors.text }">
                    <q-item-section class="weight-extrabold" :style="{ color: scale_text[4] }" side>Secondary</q-item-section>
                    <q-item-section>{{ colors.secondary }}</q-item-section>
                    <q-item-section side><q-btn icon="colorize" round unelevated :style="{color: colors.text, backgroundColor: colors.secondary }" /></q-item-section>
                </q-item>
                <q-item :style="{ color: colors.text }">
                    <q-item-section class="weight-extrabold" :style="{ color: scale_text[4] }" side>Text</q-item-section>
                    <q-item-section>{{ colors.text }}</q-item-section>
                    <q-item-section side><q-btn icon="colorize" round unelevated :style="{color: colors.text, backgroundColor: scale_text[0] }" /></q-item-section>
                </q-item>
                <q-item :style="{ color: colors.text }">
                    <q-item-section class="weight-extrabold" :style="{ color: scale_text[4] }" side>Emphasis</q-item-section>
                    <q-item-section>{{ colors.emphasis }}</q-item-section>
                    <q-item-section side><q-btn icon="colorize" round unelevated :style="{color: colors.text, backgroundColor: colors.emphasis }" /></q-item-section>
                </q-item>
                <q-item :style="{ color: colors.text }">
                    <q-item-section class="weight-extrabold" :style="{ color: scale_text[4] }" side>Warning</q-item-section>
                    <q-item-section>{{ colors.warning }}</q-item-section>
                    <q-item-section side><q-btn icon="colorize" round unelevated :style="{color: colors.text, backgroundColor: colors.warning }" /></q-item-section>
                </q-item>
                <q-item :style="{ color: colors.text }">
                    <q-item-section class="weight-extrabold" :style="{ color: scale_text[4] }" side>Negative</q-item-section>
                    <q-item-section>{{ colors.negative }}</q-item-section>
                    <q-item-section side><q-btn icon="colorize" round unelevated :style="{color: colors.text, backgroundColor: colors.negative }" /></q-item-section>
                </q-item>
            </q-list>

        </div>

        <slot name="content"></slot>
    </q-card-section>

    <q-card-actions v-if="!noactions">

        <div v-if="example">
            <q-btn flat class="q-ma-sm" :style="{ color: colors.negative, fontWeight: 600 }" label="Negative" />
            <q-btn outline class="q-ma-sm" :style="{ color: colors.warning, fontWeight: 600 }" label="Warning" />
            <q-btn outline class="q-ma-sm" :style="{ color: colors.emphasis, fontWeight: 600 }" label="Emphasis" />
            <q-btn unelevated class="q-ma-sm" :style="{ backgroundColor: colors.secondary, color: colors.text, fontWeight: 600 }" label="Action" />
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
        form: Boolean,

        handle: Boolean,
        nocontent: Boolean,
        noactions: Boolean,

        colors: Object,
        scale_text: Object,
        scale_secondary: Object,

        primary_is_dark: Boolean,
    },

    methods: {
        get_transparent_color: function (color) {
            return chroma(color).alpha(0.3)
        }
    }
})


</script>
