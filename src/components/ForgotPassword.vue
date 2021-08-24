
<template>

<q-card-section>
    <q-input v-model="form.email" type="text" name="email" label="Email Address" placeholder="example@email.com" />
</q-card-section>
<q-card-actions>
    <q-btn flat color="primary" label="Reset Password" @click="resetPassword(form.email)" />
</q-card-actions>

</template>

<script>

import firebase from 'firebase'

export default {
    name: 'ForgotPassword',
    data () {
        return {
            form: {
                email: ''
            }
        }
    },
    methods: {
        resetPassword: function (email) {
            firebase.auth().sendPasswordResetEmail(email).then( () => {
                this.form = {}
                this.$q.notify({ color: 'primary', message: 'Check you email and reset your password.' })
            }).catch( error => {
                console.log(error)
            })
        }
    }
}

</script>