<template>

<q-page class="flex flex-center">
    Test {{ id }}
</q-page>

</template>

<script>

import { defineComponent } from 'vue';

import TestService from './../services/test.service'

export default defineComponent({
    name: 'TestPage',

    data: function () {
        return {
            id: this.$route.params.id
        }
    },

    mounted () {
        // TestService.findById(this.id).then( (result) => {
        //     console.log('got?', result)
        // })
    },
})

</script>
