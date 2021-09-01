<template>

<q-page class="q-px-md q-py-lg">

<Heading h2 title="Your Themes" padding="q-my-lg" />

<AddThemeForm />

<div v-if="themes_exist" class="q-pt-lg">
    
    <Drag v-model="themes" v-slot="element_props" gutter_sm col_4>
        <div>
        <ThemeSheet show_form :label="element_props.element.name" 
        :colors="element_props.element" />
        </div>
    </Drag>

</div>

</q-page>

</template>
<script>

// Setup
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

import AddThemeForm from './../components/Forms/Add_Theme.form'
import ThemeSheet from './../components/Sheets/Theme.sheet'

export default defineComponent({

    name: 'ThemesPage',

    components: {
        AddThemeForm,
        ThemeSheet
    },

    setup () {

        const store = useStore()
        
        const user_id = store.getters['auth/user_id']

        const themes = computed( () => store.state.theme.themes )

        const themes_exist = computed( () => {
            if ( themes.value.length > 0 ) return true
            else return false
        })

        const load_themes = async () => {
            store.dispatch('theme/reload', user_id)
        }

        onMounted (load_themes)

        return {
            user_id,
            themes,
            themes_exist
        }

    },


})

</script>
