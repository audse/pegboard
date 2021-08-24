
<template>

<Expandable label="Add Theme" classes="bg-secondary" open >
    <template #content>

        <div class="row q-col-gutter-md">

            <div class="col-md-6 col-sm-12 col-xs-12">

                <TextInput v-model="name" label="Theme Name" />

                <Expandable icon="colorize" classes="bg-primary">
                    <template #label>
                        <div class="q-mt-sm q-pl-xs q-pb-sm">
                            <span class="weight-bold">Primary Color</span>
                            <span class="text-primary-tint-50 q-ml-md">{{ primary }}</span>
                        </div>
                    </template>
                    <template #content>
                        <div class="row justify-center q-mx-xl">
                            <q-color v-model="primary" v-bind="pickerOptions" class="col" />
                        </div>
                    </template>
                </Expandable>

                
                <q-toggle color="info" v-model="advanced">
                    <Heading h6 title="Advanced Options" padding="q-py-lg" />
                </q-toggle>
                
                    <div :style="{ opacity: advanced ? 1 : 0.5, transition: 'opacity 0.3s' }">
                        <Expandable icon="colorize" classes="bg-primary" :disabled="advanced?false:true">
                            <template #label>
                                <div class="q-mt-sm q-pl-xs q-pb-sm">
                                    <span class="weight-bold">Secondary Color</span>
                                    <span class="text-primary-tint-50 q-ml-md">{{ secondary }}</span>
                                    <div class="q-pt-xs text-primary-tint-75">This color is used for interface and background elements.</div>
                                </div>
                            </template>
                            <template #content>
                                <div class="row justify-center q-mx-xl">
                                    <q-color v-model="secondary" v-bind="pickerOptions" class="col" />
                                </div>
                            </template>
                        </Expandable>

                        <Expandable icon="colorize" classes="bg-primary" :disabled="advanced?false:true">
                            <template #label>
                                <div class="q-mt-sm q-pl-xs q-pb-sm">
                                    <span class="weight-bold">Accent Color</span>
                                    <span class="text-primary-tint-50 q-ml-md">{{ accent }}</span>
                                    <div class="q-pt-xs text-primary-tint-75">This color is used for all text and some interface elements.</div>
                                </div>
                            </template>
                            <template #content>
                                <div class="row justify-center q-mx-xl">
                                    <q-color v-model="accent" v-bind="pickerOptions" class="col" />
                                </div>
                            </template>
                        </Expandable>

                        <Expandable icon="colorize" classes="bg-primary" :disabled="advanced?false:true">
                            <template #label>
                                <div class="q-mt-sm q-pl-xs q-pb-sm">
                                    <span class="weight-bold">Other Colors</span>
                                    <div class="q-pt-xs text-primary-tint-75">These colors are used when performing various actions.</div>
                                </div>
                            </template>
                            <template #content>
                                <div class="row justify-center q-col-gutter-md">
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div class="weight-semibold">Info Color</div>
                                        <q-color v-model="info" v-bind="pickerOptions" />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div class="weight-semibold">Warning Color</div>
                                        <q-color v-model="warning" v-bind="pickerOptions" />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div class="weight-semibold">Positive Color</div>
                                        <q-color v-model="positive" v-bind="pickerOptions" />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div class="weight-semibold">Negative Color</div>
                                        <q-color v-model="negative" v-bind="pickerOptions" />
                                    </div>
                                </div>
                            </template>
                        </Expandable>
                    </div>

            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">

                <ThemeCard v-if="primary && accent && secondary" label="Example Theme" 
                    :colors="{'primary': primary, 'accent': accent, 'secondary': secondary, 'info': info, 'warning': warning, 'positive': positive, 'negative': negative}" 
                    :scaleAccent="this.getScale(primary, accent)" 
                    :scaleSecondary="this.getScale(primary, secondary)" 
                    :primaryIsDark="isDark(primary)"
                    example nocontent handle>
                    <template #subtitle>
                        This is an example of how your board will look.
                    </template>
                </ThemeCard>

            </div>

        </div>

    

    </template>
    <template #actions>
        <q-btn label="Add Theme" flat color="accent" />
    </template>

</Expandable>
<div v-for="theme in data" :key="theme.id">

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
        this.autoEverything()
    }

})

</script>
