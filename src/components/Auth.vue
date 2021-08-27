<template>

<q-card-section v-if="tab==='signin'">

    <q-btn class="full-width q-mb-md" color="info" text-color="secondary" label="Sign In With Google" @click="google()" />

    <q-input v-model="form.email" type="text" name="email" label="Email Address" placeholder="example@email.com" />
    <q-input v-model="form.password" type="password" name="password" label="Password" />

    <q-dialog v-model="forgotPasswordDialogue">

        <q-card style="width: 70%">
            <q-btn size="lg" flat label="&times;" @click="forgotPasswordDialogue=false" />
            <q-separator />
            <ForgotPassword />
        </q-card>

    </q-dialog>

    <q-btn flat color="accent" align="left" padding="none" class="q-mt-lg" label="Forgot Password?" @click="forgotPasswordDialogue=true" />

    <q-btn outline color="white" text-color="accent" class="full-width q-mt-lg" label="Sign In" @click="emailSignIn(form.email, form.password)" />

</q-card-section>

<q-card-section v-if="tab==='signup'">

    <q-btn class="full-width q-mb-md" color="info" text-color="secondary" label="Sign Up With Google" />

    <q-input v-model="form.email" type="text" name="email" label="Email Address" placeholder="example@email.com" />
    <q-input v-model="form.password" type="password" name="password" label="Password" />


    <q-btn outline color="white" text-color="accent" class="full-width q-mt-lg" label="Sign Up" @click="emailSignUp(form.email, form.password)" />

</q-card-section>


</template>

<script>

import { defineComponent } from 'vue'
import firebase from 'firebase'

import ForgotPassword from './ForgotPassword'

export default defineComponent({
    name: 'Auth',

    components: {
        ForgotPassword,
    },

    props: {
        tab: String,
    },

    data: function () {
        return {
            form: {
                email: '',
                password: '',
            },

            forgotPasswordDialogue: false,
        }
    },

    methods: {

        google: function () {
            const provider = new firebase.auth().GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider).then( result => {
                this.$store.dispatch('check_auth')
                console.log('result', result)
                this.$q.notify({ color: 'primary', message: 'Signed in as '+result.user.email })
                this.$router.push('/home')
            }).catch( error => {
                console.log(error)
            })
        },

        emailSignUp: function (email, password) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then( auth => {
                this.$store.dispatch('check_auth')
                this.$q.notify({ color: 'primary', message: 'Signed up as '+auth.user.email })
                this.$router.push('/home')
            }).catch( error => {
                console.log(error)
            })
        },

        emailSignIn: function (email, password) {
            firebase.auth().signInWithEmailAndPassword(email, password).then( auth => {
                this.$store.dispatch('check_auth')
                this.$q.notify({ color: 'primary', message: 'Signed in as '+auth.user.email })
                this.$router.push('/home')
            }).catch( error => {
                console.log(error)
            })
        }
    }

})

</script>
