
<template>
    
<Expandable label="Add Theme" classes="bg-secondary" >
    <template #content>

        <div class="row q-col-gutter-md">

            <div class="col-lg-6 col-sm-12 col-xs-12">

                <TextInput v-model="form.name" label="Theme Name" />

                <ColorInput v-model="form.primary" @change="auto_all(form, advanced)" label="Primary Color" />

                <!-- Toggle Enable Advanced Color Picker -->
                <q-toggle color="emphasis" v-model="advanced">
                    <Heading h6 title="Advanced Options" padding="q-py-lg" />
                </q-toggle>
                
                <!-- Advanced: Secondary Color -->
                <ColorInput v-model="form.secondary" :disabled="!advanced"
                label="Secondary Color"
                subtitle="This color is used for interface and background elements."
                :decolorize_icon="!advanced" />

                <ColorInput v-model="form.text" :disabled="!advanced" 
                label="Text Color"
                subtitle="This color is used for all text and some interface elements."
                :decolorize_icon="!advanced" />

                <!-- Advanced: Other Colors -->
                <Expandable classes="bg-primary" :disabled="!advanced">
                    <template #label>
                        <div class="q-mt-sm q-pl-xs q-pb-sm" :style="!advanced?'opacity:0.5':''">
                            <span class="weight-bold">Other Colors</span>
                            <div class="q-pt-xs text-scale-text-7">These colors are used when performing various actions.</div>
                        </div>
                    </template>
                    <template #before-content>
                        <q-separator color="scale-accent-2" />
                    </template>
                    <template #content>
                        <div class="q-mt-md row q-col-gutter-md">

                            <!-- Advanced: Emphasis -->
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Heading small title="Emphasis Color" />
                                <q-color v-model="form.emphasis" v-bind="options_picker" />
                            </div>

                            <!-- Advanced: Warning -->
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Heading small title="Warning Color" />
                                <q-color v-model="form.warning" v-bind="options_picker" />
                            </div>

                            <!-- Advanced: Negative -->
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Heading small title="Negative Color" />
                                <q-color v-model="form.negative" v-bind="options_picker" />
                            </div>
                        </div>
                    </template>
                </Expandable>
                
                <div class="row q-pt-md q-pl-xs">
                    <q-btn label="Add Theme" @click="add_theme(form)" unelevated color="primary" text-color="text" />
                </div>

            </div>

            <!-- Example Theme Card -->
            <div class="col-lg-6 col-sm-12 col-xs-12">

                <ThemeSheet v-if="form.primary && form.text && form.secondary" label="Example Theme" 
                    :colors="form"
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

import { use_theme } from '../../../utils/use.theme.utils'
import { use_color_form, use_auto_color } from '../../../utils/use.colors.utils'
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