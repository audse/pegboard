
<template>

<Expandable label="Add Theme" classes="bg-secondary" >
    <template #content>

        <div class="row q-col-gutter-md">

            <div class="col-lg-6 col-sm-12 col-xs-12">

                <TextInput v-model="colorForm.name" label="Theme Name" />

                <Expandable icon="colorize" classes="bg-primary">
                    <template #label>
                        <div class="q-mt-sm q-pl-xs q-pb-sm">
                            <span class="weight-bold">Primary Color</span>
                            <span class="text-primary-tint-50 q-ml-md">{{ colorForm.primary }}</span>
                        </div>
                    </template>
                    <template #content>
                        <div class="row justify-center q-mx-xl">
                            <q-color v-model="colorForm.primary" v-bind="pickerOptions" class="col" @change="autoEverything()" />
                        </div>
                    </template>
                </Expandable>

                <!-- Toggle Enable Advanced Color Picker -->
                <q-toggle color="info" v-model="advanced">
                    <Heading h6 title="Advanced Options" padding="q-py-lg" />
                </q-toggle>
                
                <!-- Advanced: Secondary Color -->
                <div :style="{ opacity: advanced ? 1 : 0.33, transition: 'opacity 0.3s' }">
                    <Expandable icon="colorize" classes="bg-primary" :disabled="advanced?false:true">
                        <template #label>
                            <div class="q-mt-sm q-pl-xs q-pb-sm">
                                <span class="weight-bold">Secondary Color</span>
                                <span class="text-primary-tint-50 q-ml-md">{{ colorForm.secondary }}</span>
                                <div class="q-pt-xs text-primary-tint-75">This color is used for interface and background elements.</div>
                            </div>
                        </template>
                        <template #content>
                            <div class="row justify-center q-mx-xl">
                                <q-color v-model="colorForm.secondary" v-bind="pickerOptions" class="col" />
                            </div>
                        </template>
                    </Expandable>

                    <!-- Advanced: Accent Color -->
                    <Expandable icon="colorize" classes="bg-primary" :disabled="advanced?false:true">
                        <template #label>
                            <div class="q-mt-sm q-pl-xs q-pb-sm">
                                <span class="weight-bold">Accent Color</span>
                                <span class="text-primary-tint-50 q-ml-md">{{ colorForm.accent }}</span>
                                <div class="q-pt-xs text-primary-tint-75">This color is used for all text and some interface elements.</div>
                            </div>
                        </template>
                        <template #content>
                            <div class="row justify-center q-mx-xl">
                                <q-color v-model="colorForm.accent" v-bind="pickerOptions" class="col" />
                            </div>
                        </template>
                    </Expandable>

                    <!-- Advanced: Other Colors -->
                    <Expandable icon="colorize" classes="bg-primary" :disabled="advanced?false:true">
                        <template #label>
                            <div class="q-mt-sm q-pl-xs q-pb-sm">
                                <span class="weight-bold">Other Colors</span>
                                <div class="q-pt-xs text-primary-tint-75">These colors are used when performing various actions.</div>
                            </div>
                        </template>
                        <template #content>
                            <div class="row justify-center q-col-gutter-md">

                                <!-- Advanced: Info -->
                                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div class="weight-semibold">Info Color</div>
                                    <q-color v-model="colorForm.info" v-bind="pickerOptions" />
                                </div>

                                <!-- Advanced: Warning -->
                                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div class="weight-semibold">Warning Color</div>
                                    <q-color v-model="colorForm.warning" v-bind="pickerOptions" />
                                </div>

                                <!-- Advanced: Positive -->
                                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div class="weight-semibold">Positive Color</div>
                                    <q-color v-model="colorForm.positive" v-bind="pickerOptions" />
                                </div>

                                <!-- Advanced: Negative -->
                                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div class="weight-semibold">Negative Color</div>
                                    <q-color v-model="colorForm.negative" v-bind="pickerOptions" />
                                </div>
                            </div>
                        </template>
                    </Expandable>
                </div>
                
                <div class="row q-pt-md q-pl-xs">
                    <q-btn label="Add Theme" unelevated color="primary" text-color="accent" @click="setColorForm(colorForm)" />
                </div>

            </div>

            <!-- Example Theme Card -->
            <div class="col-lg-6 col-sm-12 col-xs-12">

                <ThemeCard v-if="colorForm.primary && colorForm.accent && colorForm.secondary" label="Example Theme" 
                    :colors="colorForm" 
                    :scaleAccent="this.getScale(colorForm.primary, colorForm.accent)" 
                    :scaleSecondary="this.getScale(colorForm.primary, colorForm.secondary)" 
                    :primaryIsDark="isDark(colorForm.primary)"
                    example nocontent handle>
                    <template #subtitle>
                        This is an example of how your board will look.
                    </template>
                </ThemeCard>

            </div>

        </div>

    </template>

</Expandable>

<draggable v-model="data" class="row q-col-gutter-sm" item-key="id" v-bind="dragTransitionProps" @start="drag=true" @end="drag=false" >
    <template #item="{ element }">
        <div v-if="element && element.data && element.data.primary" class="col-xs-12 col-sm-6 col-lg-4">
            <ThemeCard :label="element.data.name" :colors="element.data" 
            :scaleAccent="element.data.scaleAccent"
            :scaleSecondary="element.data.scaleSecondary"
            :primaryIsDark="element.data.isDark"
            handle form>
            </ThemeCard>
        </div>
    </template>
</draggable>

</template>

<script>

import { defineComponent } from 'vue'

import draggable from 'vuedraggable'

import { cache } from  './../mixins/cache'
import { color } from './../mixins/color'
import { dragTransition } from  './../mixins/transition'

import ThemeCard from './ThemeCard'

export default defineComponent({

    name: 'Themes',

    props: {

    },

    components: {
        draggable,
        ThemeCard,
    },

    mixins: [cache, color, dragTransition],

    mounted () {
        if ( this.$auth ) this.path = { user: this.$auth.uid, theme: 'all' }
        this.autoEverything()
    },

    methods: {
        
        setColorForm: function (colorForm) {
            
            colorForm.scaleAccent = this.getScale(colorForm.primary, colorForm.accent)
            colorForm.scaleSecondary = this.getScale(colorForm.primary, colorForm.secondary)
            colorForm.isDark = this.isDark(colorForm.primary)
            this.set(colorForm)
        }
    }

})

</script>
