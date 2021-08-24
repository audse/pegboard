
<template>

<div class="q-py-lg q-px-md q-my-md">
    <div class="text-h4">{{ user }}</div>
    <div class="text-subtitle-1 text-info">{{ email }}</div>
</div>

<q-list class="q-mt-md">
    <q-item clickable to="/themes/" class="text-accent" active-class="bg-primary"><span class="q-pt-sm">Themes Editor</span></q-item>
</q-list>

<AllBoards v-if="open" listWidget />

<q-btn class="fixed-bottom-left q-mb-lg q-ml-md bg-primary" flat color="accent" label="sign out" @click="signOut()" />

</template>

<script>

import { defineComponent } from 'vue'
import firebase from 'firebase'
import AllBoards from './AllBoards'

export default defineComponent({
    name: 'Sidebar',
    components: {
        AllBoards,
    },
    
    props: {
        user: String,
        email: String,
        open: Boolean,
    },

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

<style scoped>

</style>