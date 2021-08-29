<template>

<q-layout view="lHh Lpr lFf" class="bg-primary text-accent">

    <q-header class="bg-secondary text-accent">
        <q-toolbar class="border-top-info">
            <q-btn flat dense round icon="menu" color="info" aria-label="Menu" @click="toggleLeftDrawer" />

            <q-toolbar-title>
                Pegboard
            </q-toolbar-title>

            <div class="text-info">{{ current_user.displayName }}</div>
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
import { colors, getCssVar } from 'quasar'
import { useStore } from 'vuex'

import Sidebar from './Sidebar.vue'

export default defineComponent({
    name: 'MainLayout',
    components: {
        Sidebar
    },

    setup () {

        const store = useStore()
        const current_user = store.state.auth.current_user

        const leftDrawerOpen = ref(false)

        return {
            current_user,
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
    }

})
</script>