
<template>

<div class="q-py-lg q-px-md q-mt-ms q-mb-lg">
    <div class="text-h4">
        {{ current_user.displayName || 'Pegboard' }}
    </div>
    <div class="text-subtitle-1 text-emphasis">{{ current_user.email }}</div>
</div>

<q-list class="q-mt-md">
    <q-item clickable to="/themes/" class="text-scale-text-6" active-class="bg-primary text-emphasis"><span class="q-pt-sm">Themes Editor</span></q-item>
</q-list>

<BoardsList />

<div class="fixed-bottom-left q-px-md q-py-lg">
    <q-btn flat color="negative" label="sign out" @click="signOut()" />
    <q-btn flat color="emphasis" label="Preferences" to="/preferences" />
</div>

</template>

<script>

import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import firebase from 'firebase'

import BoardsList from './../components/BoardsList'

export default defineComponent({

    name: 'Sidebar',

    components: {
        BoardsList,
    },
    
    props: {
        open: Boolean,
    },

    setup () {

        const store = useStore()
        const current_user = store.state.auth.current_user

        return {
            current_user
        }

    },

    methods: {

        sign_out: function () {

            firebase.auth().signOut()

            this.$router.push('/').then( () => {

                this.$q.notify({ color: 'primary', message: 'Signed Out.' })

            }).catch( e => console.log(e) )
        }
    }

})

</script>

<style scoped>

</style>