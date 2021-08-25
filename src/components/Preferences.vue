
<template>
    
<Heading h5 title="Site Theme" subtitle="Your site theme persists among the entirety of Pegboard. However, your board pages will still use their individual themes." />

<ThemeSelector v-model="form.theme" />

<div class="q-mt-lg">
    <q-btn @click="setColorTheme(form.theme), set(form, 'preferences')" unelevated text-color="accent" color="secondary" label="save" />
</div>

</template>

<script>

import { defineComponent } from 'vue'

import { cache } from './../mixins/cache'
import { colorTheme } from './../mixins/colorTheme'

import ThemeSelector from './ThemeSelector'

export default defineComponent({
    
    name: 'Preferences',

    mixins: [cache, colorTheme],

    components: {
        ThemeSelector,
    },

    mounted () {
        if ( this.$auth ) this.path = { user: this.$auth.uid, data: 'preferences' }
    },

    watch: {
        data: function () {
            this.setForms(this.data ? this.data.data : {}, 'preferences')
        }
    }

})
</script>
