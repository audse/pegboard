<template>

<q-page class="q-px-md q-py-lg">

    <AllBoards addWidget cardWidget />

</q-page>

</template>

<script>

import { defineComponent } from 'vue'

import AllBoards from './../components/AllBoards'

export default defineComponent({
    name: 'BoardsPage',

    components: {
        AllBoards,
    },
})

</script>
