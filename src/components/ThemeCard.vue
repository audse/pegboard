

<template>
    
<q-card :style="{ backgroundColor: colors.primary, color: colors.accent }" class="q-mt-lg shadow-3" >
    <q-card-section :style="{ backgroundColor: scaleSecondary[2] }">
        <div class="text-h6">{{ label }}</div>
        <div class="text-subtitle-1 q-mt-xs" :style="{color: scaleAccent[3]}">
            <slot name="subtitle"></slot>
        </div>
    </q-card-section>
    <q-card-section v-if="example">
        <q-list>
            <q-item :style="{backgroundColor: scaleSecondary[2], color: scaleAccent[7], fontWeight: 600}">
                Card Name
            </q-item>
            <q-item :style="{backgroundColor: scaleSecondary[1], color: scaleAccent[5]}">
                This is the description of a card.
            </q-item>
        </q-list>
    </q-card-section>
    <q-card-section v-if="!nocontent">
        <slot name="content"></slot>
    </q-card-section>
    <q-card-actions v-if="!noactions">
        <slot name="actions"></slot>
    </q-card-actions>
</q-card>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        label: String,
        example: Boolean,

        nocontent: Boolean,
        noactions: Boolean,

        colors: Object,
        scaleAccent: Object,
        scaleSecondary: Object,
    }
})
</script>

<style scoped>

/* body {
    background-color: #ffee004f;
} */

</style>