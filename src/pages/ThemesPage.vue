<template>

<q-page class="q-pa-md">

    <Heading h3 title="Themes Editor" padding="q-py-lg" />

    <Themes />

</q-page>

</template>

<script>

import { defineComponent } from 'vue'

import Themes from './../components/Themes'

export default defineComponent({
    name: 'ThemesPage',

    components: {
        Themes,
    },
    
})

</script>
