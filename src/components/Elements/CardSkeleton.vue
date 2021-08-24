
<template>

<div class="row q-col-gutter-sm">
    <div v-for="n in elements" :key="'skeleton-'+n" class="col-xs-12 col-sm-6 col-lg-4">
        <Sheet>
            <template #label>
                <q-skeleton class="q-mt-sm bg-primary" width="100px" />
            </template>
            <template #before-content>
                <q-skeleton class="bg-primary"  height="64px" />
            </template>
            <template #actions>
                <q-skeleton class="bg-primary" width="48px" height="24px" />
            </template>
        </Sheet>
    </div>
</div>

</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        elements: Number,
        show: Boolean,
    },
})

</script>
