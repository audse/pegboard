<template>
    
<q-page class="q-pa-md q-mr-xl">

<Heading h2 title="Preferences" padding="q-pt-lg q-pb-md" />

<Heading h5 title="Site Theme" subtitle="Your site theme persists among the entirety of Pegboard. However, your board pages will still use their individual themes." />

<ThemePreference v-model="form.theme_id" />

<div class="q-mt-lg">
    <q-btn @click="find_by_user_id_and_update" unelevated text-color="accent" color="secondary" label="save" />
</div>

</q-page>

</template>
<script>
import { defineComponent, onMounted } from 'vue'

import { use_preference } from '../utils/use.preference.utils'
import ThemePreference from './../components/Nested/Theme.preference'

export default defineComponent({

    name: 'PreferencesPage',

    components: {
        ThemePreference,
    },

    setup () {
        
        const {
            form,
            error,
            reload,
            find_by_user_id_and_update
        } = use_preference()

        onMounted(reload)

        return {
            form,
            error,
            reload,
            find_by_user_id_and_update
         }
    },

})
</script>
