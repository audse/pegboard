<template>

<q-slide-transition>
    <div v-show="error!=null">
        <q-banner dense class="text-black bg-warning">
            {{ error }}
        </q-banner>
    </div>
</q-slide-transition>

</template>
<script>

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Warning',
    props: {
        error: String,
        color: String,
    }
})

</script>
