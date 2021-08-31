<template>

<q-layout view="lHh Lpr lFf" class="bg-primary text-text">

    <q-header class="bg-scale-secondary-3 text-text">
        <q-toolbar class="border-top-info">
            <q-btn flat dense round icon="menu" color="emphasis" aria-label="Menu" @click="toggleLeftDrawer" />

            <q-toolbar-title>
                Pegboard
            </q-toolbar-title>

            <div class="text-text">{{ current_user.displayName }}</div>
        </q-toolbar>
        <q-toolbar class="q-pl-">
            <q-breadcrumbs color="scale-text-6" active-color="scale-text-4">
                 <q-breadcrumbs-el v-for="(crumb, index) in breadcrumbs" :key="'breadcrumb'+index" :label="crumb.name" :to="crumb.path" />
            </q-breadcrumbs>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="bg-scale-secondary-3 text-text border-top-info">
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

import Sidebar from './Sidebar.vue'

export default defineComponent({
    name: 'MainLayout',
    components: {
        Sidebar
    },

    setup () {

        const leftDrawerOpen = ref(false)

        const store = useStore()
        const current_user = store.state.auth.current_user

        return {
            current_user,
            leftDrawerOpen,
            toggleLeftDrawer () {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }
        }

    },

    computed: {
      breadcrumbs: function () {
          return this.$route.meta.breadcrumb ? this.$route.meta.breadcrumb(this.$route) : undefined
        }  
    }

})
</script>