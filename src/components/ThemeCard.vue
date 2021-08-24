

<template>
    
<q-card :style="{ backgroundColor: colors.primary, color: colors.accent }" class="q-mt-lg shadow-3" >
    <q-card-section :style="{ backgroundColor: scaleSecondary[2] }" class="q-px-lg">
        <q-item class="text-h6 q-px-none q-pt-lg q-pb-sm" style="font-weight:700">
                {{ label }}
        </q-item>
        <div class="text-subtitle-1 q-mt-xs" :style="{color: scaleAccent[3]}">
            <slot name="subtitle"></slot>
        </div>
    </q-card-section>
    <q-card-section v-if="example">
        <div class="row q-col-gutter-lg q-ml-sm q-mr-lg">
            <div class="col-lg-4 col-md-6 col-xs-12" v-for="i in 3" :key="i">
                <q-item class="text-smallheading q-pa-none" style="font-weight:600">
                    <q-item-section side class="q-pa-none q-ml-sm q-mr-sm">
                        <q-icon name="drag_indicator" :style="{ color: scaleAccent[1] }" />
                    </q-item-section>
                    <q-item-section class="q-pa-none q-ma-none" :style="{ color: scaleAccent[6] }">
                        Example List Name {{ i }}
                    </q-item-section>
                </q-item>
                <q-item class="text-smallheading q-my-sm q-pa-none q-pl-sm" :style="{ backgroundColor: scaleSecondary[2], borderRadius: '3px' }">
                    <q-item-section side class="q-pa-none q-mr-sm">
                        <q-icon name="drag_indicator" :style="{ color: scaleAccent[0] }" />
                    </q-item-section>
                    <q-item-section class="q-pa-none q-ma-none">
                        Header Card {{ i }}
                    </q-item-section>
                </q-item>
                <q-item class="q-pa-none q-ma-none">
                    <q-item-section side class="q-pa-none q-mr-sm">
                        <q-icon name="drag_indicator" :style="{ color: scaleAccent[0] }" />
                    </q-item-section>
                    <q-item-section class="q-pa-none q-ma-none">
                        <q-item :style="{backgroundColor: scaleSecondary[2], color: scaleAccent[7], fontWeight: 600}">
                            Card Name {{ i }}
                        </q-item>
                        <q-item :style="{backgroundColor: scaleSecondary[1], color: scaleAccent[5]}">
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
            </div>
        </div>
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

import { colors } from './../mixins/color'

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
})


</script>

<style scoped>

/* body {
    background-color: #ffee004f;
} */

</style>