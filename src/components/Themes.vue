
<template>

<Expandable label="Add Theme">
    <template #content>

        <TextInput label="Theme Name" />

        <q-color v-model="primary" v-bind="pickerOptions" />

        <Expandable label="Advanced Options">
            <template #content>
                <q-color v-model="secondary" v-bind="pickerOptions" />
                <q-color v-model="accent" v-bind="pickerOptions" />
                <q-color v-model="info" v-bind="pickerOptions" />
                <q-color v-model="warning" v-bind="pickerOptions" />
                <q-color v-model="positive" v-bind="pickerOptions" />
                <q-color v-model="negative" v-bind="pickerOptions" />
            </template>
        </Expandable>

    </template>
</Expandable>

<ThemeCard v-if="colorForm.primary && colorForm.accent && colorForm.secondary" label="Example Theme" 
    :colors="colorForm" 
    :scaleAccent="this.getScale(colorForm.primary, colorForm.accent)" 
    :scaleSecondary="this.getScale(colorForm.primary, colorForm.secondary)" 
    example nocontent>
    <template #subtitle>
        This is an example of how your board will look.
    </template>
</ThemeCard>

<div v-for="theme in data" :key="theme.id">
    <!-- {{ theme.data.primaryColor }}
    {{ theme.data.secondaryColor }}
    {{ theme.data.textColor }} -->
    <!-- <ThemeCard :label="theme.data.name"
        :colors="{
            primary: theme.data.primaryColor,
            secondary: theme.data.secondaryColor,
            accent: theme.data.textColor,
        }"
        :mixAccent="this.getMixAccent(theme.data.primaryColor, theme.data.textColor)"
        :mixSecondary="this.getMixSecondary(theme.data.primaryColor, theme.data.secondaryColor)" /> -->
</div>

<!-- <q-card :style="{ backgroundColor: form.primaryColor, color: form.textColor }" class="q-mt-lg shadow-3" >
    <q-card-section>
        <div class="text-h6">Example Board Heading</div>
        <div class="text-subtitle-1" :style="{color: form.infoColor}">Example Board Description</div>
    </q-card-section>
    <q-card-section>
        <q-list>
            <q-item :style="{backgroundColor: form.secondaryColor, color: form.textColor}">Item 1</q-item>
            <q-item :style="{backgroundColor: form.secondaryColor, color: form.textColor}">Item 2</q-item>
            <q-item :style="{backgroundColor: form.secondaryColor, color: form.textColor}">Item 3</q-item>
        </q-list>
    </q-card-section>
</q-card> -->

</template>

<script>

import { defineComponent } from 'vue'

import { cache } from  './../mixins/cache'
import { color } from './../mixins/color'

import ThemeCard from './ThemeCard'

export default defineComponent({

    name: 'Themes',

    props: {

    },

    components: {
        ThemeCard,
    },

    mixins: [cache, color],

    mounted () {
        if ( this.$auth ) this.path = { user: this.$auth.uid, theme: 'all' }
    }

})

</script>
