<template>

<q-page class="flex flex-center">
    Test adding
</q-page>

</template>

<script>

import { defineComponent } from 'vue';

import TestService from './../services/test.service'

export default defineComponent({
    name: 'TestPage',

    mounted () {
        // TestService.create(
        //     { title: 'test-item', subtitle: 'test-subtitle' }
        // ).then( result => {
        //     console.log(result)
        // }).catch( e => {
        //     console.log(e)
        // })
    },
})

</script>
