<template>

<q-page class="q-px-md q-py-lg">

<Heading h2 title="Your Themes" padding="q-my-lg" />

<AddThemeForm />

</q-page>

</template>
<script>

// Setup
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

import AddThemeForm from './../components/Nested/Forms/Add_Theme.form'

export default defineComponent({

    name: 'ThemesPage',

    components: {
        AddThemeForm,
    },

    setup () {

        const store = useStore()
        
        const user_id = store.getters['auth/user_id']

        // const themes = ref( store.state.theme.themes )

        // const themes_exist = computed( () => {
        //     if ( themes.value.length > 0 ) return true
        //     else return false
        // })

        // const load_themes = async () => {
        //     store.dispatch('theme/reload', user_id)
        // }

        // onMounted (load_themes)

        return {
            user_id,
            // themes,
            // themes_exist
        }

    },


})

</script>
