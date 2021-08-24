<template>

<q-page class="flex flex-center">

<q-card flat style="width: 70%;" class="bg-secondary">

    <q-tabs v-model="tab">
        <q-tab name="signin" label="Sign In" />
        <q-tab name="signup" label="Sign Up" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated swipeable class="bg-secondary">
        <q-tab-panel class="q-px-none" name="signin">
            <Auth :tab="tab" />
        </q-tab-panel>
        <q-tab-panel class="q-px-none" name="signup">
            <Auth :tab="tab" />
        </q-tab-panel>
    </q-tab-panels>

</q-card>

</q-page>

</template>

<script>

import { defineComponent } from 'vue';
import Auth from './../components/Auth'

export default defineComponent({
    name: 'AuthPage',
    components: {
        Auth,
    },
    data: function () {
        return {
            tab: 'signin'
        }
    }
})

</script>
