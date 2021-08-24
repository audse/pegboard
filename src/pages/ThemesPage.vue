<template>

<q-page class="q-pa-md">

    <Heading h3 title="Themes Editor" padding="q-py-lg" />

    <Themes />

</q-page>

</template>

<script>

import { defineComponent } from 'vue'

// import draggable from 'vuedraggable'

import Themes from './../components/Themes'

export default defineComponent({
    name: 'ThemesPage',

    components: {
        // draggable,
        Themes,
    },
    
    data: function () {
        return {
            palette: [
                '#fefefe', '#9db4c0', '#5c6b73', '#333333', '#f94144', '#f3722c', '#f8961e', '#f9c74f', '#a5be00', '#679436', '#43aa8b', '#0081a7', 
                '#184e77', '#9d4edd', '#ff70a6', 
            ],

        }
    },
    
})

</script>
