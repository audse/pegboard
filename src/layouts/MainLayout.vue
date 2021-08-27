<template>

<q-layout view="lHh Lpr lFf" class="bg-primary text-accent">

    <q-header class="bg-secondary text-accent">
        <q-toolbar class="border-top-info">
            <q-btn flat dense round icon="menu" color="info" aria-label="Menu" @click="toggleLeftDrawer" />

            <q-toolbar-title>
                Pegboard
            </q-toolbar-title>

            <div class="text-info">{{ user }}</div>
        </q-toolbar>
        <q-toolbar>
            <q-breadcrumbs active-color="info">
                 <q-breadcrumbs-el v-for="(crumb, index) in breadcrumbs" :key="'breadcrumb'+index" :label="crumb.name" :to="crumb.path" />
            </q-breadcrumbs>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="bg-secondary text-accent border-top-info">
        <Sidebar :open="leftDrawerOpen" />
    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>

</q-layout>

</template>

<script>


import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import firebase from 'firebase'

import { useQuasar } from 'quasar'
import { colors, getCssVar } from 'quasar'

import Sidebar from 'src/components/Sidebar.vue'

export default defineComponent({
    name: 'MainLayout',
    components: {
        Sidebar
    },

    data: function () {
        return {
            user: '',
            email: ''
        }
    },

    setup () {
        const leftDrawerOpen = ref(false)

        return {
            leftDrawerOpen,
            toggleLeftDrawer () {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }
        }

    },

    mounted () {

        if ( colors.brightness(getCssVar('primary')) < 128 ) {
            this.$q.dark.set(true)
        } else {
            this.$q.dark.set(false)
        }
    },

    computed: {
      breadcrumbs: function () {
          return this.$route.meta.breadcrumb ? this.$route.meta.breadcrumb(this.$route) : undefined
        }  
    },

    watch: {
        '$route': function () {
            // setCssVar('primary', '#1976D2')
            // setCssVar('secondary', colors.lighten('#1976D2', -10))
            // setCssVar('accent', colors.lighten('#1976D2', 80))
            // setCssVar('info', colors.lighten('#1976D2', 50))
        }
    },

    // created () {
    //     firebase.auth().onAuthStateChanged( (auth) => {
    //         if ( auth ) {

    //             this.$auth = auth
    //             this.user = auth.displayName
    //             this.email = auth.email
    //         }
    //     })
    // },
})
</script>