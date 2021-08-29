
<template>
    
<Expandable label="Add Theme" classes="bg-secondary" >
    <template #content>

        <div class="row q-col-gutter-md">

            <div class="col-lg-6 col-sm-12 col-xs-12">

                <TextInput v-model="form.name" label="Theme Name" />

                <Expandable icon="colorize" classes="bg-primary">
                    <template #label>
                        <div class="q-mt-sm q-pl-xs q-pb-sm">
                            <span class="weight-bold">Primary Color</span>
                            <span class="text-primary-tint-50 q-ml-md">{{ form.primary }}</span>
                        </div>
                    </template>
                    <template #content>
                        <div class="row justify-center q-mx-xl">
                            <q-color v-model="form.primary" v-bind="options_picker" class="col" @change="auto_all(form, advanced)" />
                        </div>
                    </template>
                </Expandable>

                <!-- Toggle Enable Advanced Color Picker -->
                <q-toggle color="emphasis" v-model="advanced">
                    <Heading h6 title="Advanced Options" padding="q-py-lg" />
                </q-toggle>
                
                <!-- Advanced: Secondary Color -->
                <div :style="{ opacity: advanced ? 1 : 0.33, transition: 'opacity 0.3s' }">
                    <Expandable icon="colorize" classes="bg-primary" :disabled="advanced?false:true">
                        <template #label>
                            <div class="q-mt-sm q-pl-xs q-pb-sm">
                                <span class="weight-bold">Secondary Color</span>
                                <span class="text-primary-tint-50 q-ml-md">{{ form.secondary }}</span>
                                <div class="q-pt-xs text-primary-tint-75">This color is used for interface and background elements.</div>
                            </div>
                        </template>
                        <template #content>
                            <div class="row justify-center q-mx-xl">
                                <q-color v-model="form.secondary" v-bind="options_picker" class="col" />
                            </div>
                        </template>
                    </Expandable>

                    <!-- Advanced: Text Color -->
                    <Expandable icon="colorize" classes="bg-primary" :disabled="advanced?false:true">
                        <template #label>
                            <div class="q-mt-sm q-pl-xs q-pb-sm">
                                <span class="weight-bold">Text Color</span>
                                <span class="text-primary-tint-50 q-ml-md">{{ form.text }}</span>
                                <div class="q-pt-xs text-primary-tint-75">This color is used for all text and some interface elements.</div>
                            </div>
                        </template>
                        <template #content>
                            <div class="row justify-center q-mx-xl">
                                <q-color v-model="form.text" v-bind="options_picker" class="col" />
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

                                <!-- Advanced: Emphasis -->
                                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div class="weight-semibold">Emphasis Color</div>
                                    <q-color v-model="form.emphasis" v-bind="options_picker" />
                                </div>

                                <!-- Advanced: Warning -->
                                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div class="weight-semibold">Warning Color</div>
                                    <q-color v-model="form.warning" v-bind="options_picker" />
                                </div>

                                <!-- Advanced: Negative -->
                                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div class="weight-semibold">Negative Color</div>
                                    <q-color v-model="form.negative" v-bind="options_picker" />
                                </div>
                            </div>
                        </template>
                    </Expandable>
                </div>
                
                <div class="row q-pt-md q-pl-xs">
                    <q-btn label="Add Theme" @click="add_theme(form)" unelevated color="primary" text-color="text" />
                </div>

            </div>

            <!-- Example Theme Card -->
            <div class="col-lg-6 col-sm-12 col-xs-12">

                <ThemeSheet v-if="form.primary && form.text && form.secondary" label="Example Theme" 
                    :colors="form" 
                    :scale_text="auto_scale(form.primary, form.text)" 
                    :scale_secondary="auto_scale(form.primary, form.secondary)" 
                    :primary_is_dark="is_dark(form.primary)"
                    example nocontent handle>
                    <template #subtitle>
                        This is an example of how your board will look.
                    </template>
                </ThemeSheet>

            </div>

        </div>

    </template>

</Expandable>

</template>
<script>

import { defineComponent, onMounted } from 'vue'

import { use_theme } from './../Use/theme.use'
import { use_color_form, use_auto_color } from './../Use/colors.use'
import ThemeSheet from './../Sheets/Theme.sheet'

export default defineComponent({

    name: 'Themes',

    components: {
        ThemeSheet,
    },

    setup ( props, { emit } ) {

        const {
            form,
            advanced,
            options_picker,
        } = use_color_form()

        const {
            auto_all,
            auto_scale,
            is_dark
        } = use_auto_color()

        const {
            add_theme
        } = use_theme( null, emit )

        onMounted( auto_all )

        return {
            form,
            advanced,
            options_picker,
            auto_all,
            auto_scale,
            is_dark,
            add_theme
        }
    },

})
</script>