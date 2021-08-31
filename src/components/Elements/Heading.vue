<template>

<div :class="[padding?padding : 'q-pb-md']">

    <div v-if="h1" class="text-h1 text-text">
        {{ title }}
        <div v-if="subtitle" class="text-h3 text-emphasis">
            {{ subtitle }}
        </div>
    </div>
        
    <div v-if="h2" class="text-h2 text-text weight-bold">
        {{ title }}
        <div v-if="subtitle" class="text-h4 text-emphasis weight-semibold">
            {{ subtitle }}
        </div>
    </div>
        
    <div v-if="h3" class="text-h3 text-text">
        {{ title }}
        <div v-if="subtitle" class="text-h5 text-scale-text-5">
            {{ subtitle }}
        </div>
    </div>
        
    <div v-if="h4" class="text-h4 text-text">
        {{ title }}
        <div v-if="subtitle" class="text-smallheading text-scale-text-5">
            {{ subtitle }}
        </div>
    </div>
        
    <div v-if="h5" class="text-h5 text-text">
        {{ title }}
        <div v-if="subtitle" class="text-smallheading text-scale-text-5">
            {{ subtitle }}
        </div>
    </div>
        
    <div v-if="h6" class="text-h6 text-text">
        {{ title }}
        <div v-if="subtitle" class="text-subtitle-1 text-scale-text-5">
            {{ subtitle }}
        </div>
    </div>
        
    <div v-if="small" class="text-smallheading text-text">
        {{ title }}
        <div v-if="subtitle" class="text-subtitle-2 text-scale-text-5">
            {{ subtitle }}
        </div>
    </div>

</div>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Heading',

    props: {

        title: String,
        subtitle: String,

        padding: String,

        h1: Boolean,
        h2: Boolean,
        h3: Boolean,
        h4: Boolean,
        h5: Boolean,
        h6: Boolean,
        small: Boolean,

    }
})
</script>
