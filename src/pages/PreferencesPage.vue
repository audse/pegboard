<template>
    
<q-page class="q-pa-md q-mr-xl">

<Heading h2 title="Preferences" padding="q-pt-lg q-pb-md" />
<Preferences />

</q-page>

</template>
<script>
import { defineComponent } from 'vue'

import Preferences from './../components/Preferences'

export default defineComponent({

    name: 'PreferencesPage',

    components: {
        Preferences,
    }

})
</script>
