<template>

<q-page class="flex flex-center">
        <q-btn to="/boards" label="boards" />
        <q-btn to="/themes" label="Themes" />
</q-page>

</template>

<script>

import { defineComponent } from 'vue';
import firebase from 'firebase'

export default defineComponent({
    name: 'HomePage',

    methods: {
        signOut: function () {
            firebase.auth().signOut()
            this.$router.push('/').then( () => {
                this.$q.notify({ color: 'primary', message: 'Signed Out' })
            }).catch( error => {
                console.log(error)
            })
        }
    }
})

</script>
