
<template>
<div v-if="data && data.data">

    <q-item class="q-pl-none q-ml-none">
        <q-item-section avatar top class="q-pr-sm">
            <q-btn icon="tune" color="info" round flat @click="setForms(data.data, data.id)" />
        </q-item-section>
        <q-item-section>
            <Heading h4 :title="data.data.name" :subtitle="data.data.description" padding="q-mb-lg" />
        </q-item-section>
    </q-item>

    <Lists :board="data" addWidget />

    <Modal :show="showForm" :error="error" @hide="resetForms()">
        <template #header>
            Edit Board
            <q-space />
            <q-btn @click="resetForms()" color="info" round flat dense :icon="'close'" />
        </template>
        <template #content>

            <TextInput v-model="form.name" label="Board Name" />
            <TextInput v-model="form.description" label="Description" />

            <Heading small title="Theme" />

        </template>
        <template #actions>
            <q-btn flat color="info" label="Delete" @click="form.deletedAt=Date.now();set(form, formId)" />
            <q-space />
            <q-btn color="accent" flat  label="Save" @click="set(form, formId)" />
        </template>
    </Modal>

</div>

</template>

<script>

import { defineComponent } from 'vue'
import { colors, setCssVar } from 'quasar'

import { cache } from './../mixins/cache'

import Lists from './Lists'

export default defineComponent({
    name: 'Board',

    props: {
        id: String,
        name: String,
    },

    mixins: [cache],

    components: {
        Lists,
    },

    mounted () {
        if ( this.$auth && this.id && this.name ) {
            this.path = { user: this.$auth.uid, board: this.id }
        }
    },

    watch: {

        theme: function () {
            setCssVar('primary', this.theme.data.primaryColor)
            setCssVar('secondary', this.theme.data.secondaryColor)
            setCssVar('accent', this.theme.data.textColor)
            setCssVar('info', this.theme.data.infoColor)
            if ( colors.brightness(this.theme.data.primaryColor) < 128 ) {
                this.$q.dark.set(true)
            } else {
                this.$q.dark.set(false)
            }
        }
    },

})

</script>
