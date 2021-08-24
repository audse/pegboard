<template>

<q-page class="q-pa-md">

    <Heading h3 title="Themes Editor" />

    <Themes />

    <!-- <q-card class="q-mt-md bg-secondary text-accent" flat>

        <q-card-actions @click="showAddForm = !showAddForm">
            <div class="text-smallheading">Add Theme</div>
            <q-space />
            <q-btn color="info" round flat dense :icon="showAddForm ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
        </q-card-actions>
        <q-slide-transition>
            <div v-show="showAddForm">

                <q-slide-transition v-if="showAddForm">
                    <div v-show="error!=null">
                        <q-banner dense class="text-black bg-warning">
                            {{ error }}
                        </q-banner>
                    </div>
                </q-slide-transition>
                <q-separator />

                <q-card-section class="q-mb-md">
                    <q-form>
                        <q-input v-model="form.name" type="text" label="Theme Name" color="accent" filled />

                        <q-toggle v-model="advancedColorPicker" label="Show Advanced Color Pickers" class="q-mt-md" color="info" />

                        <q-field label="Primary Color" stack-label filled class="q-mt-md" color="accent">
                            <template v-slot:control>
                                <q-color v-if="advancedColorPicker" v-model="form.primaryColor" class="q-mt-sm full-width" default-view="palette" :palette="palette" flat @change="updateAllColors()" />
                                <q-color v-if="advancedColorPicker===false" v-model="form.primaryColor" no-footer no-header class="q-mt-sm full-width" default-view="palette" :palette="palette" flat @change="updateAllColors()" />
                            </template>
                        </q-field>

                        <q-toggle v-model="refineColorPickers" label="Refine Colors" class="q-mt-md" color="info" />

                        <q-slide-transition>
                            <div v-show="refineColorPickers">

                                <q-field label="Secondary Color" stack-label filled class="q-mt-md" color="accent">
                                    <template v-slot:control>
                                        <q-color v-model="form.secondaryColor" class="q-mt-sm full-width" default-view="palette" :palette="palette" flat />
                                    </template>
                                </q-field>

                                <q-field label="Text Color" stack-label filled class="q-mt-md" color="accent">
                                    <template v-slot:control>
                                        <q-color v-model="form.textColor" class="q-mt-sm full-width" default-view="palette" :palette="palette" flat />
                                    </template>
                                </q-field>

                                <q-field label="Info Color" stack-label filled class="q-mt-md" color="accent">
                                    <template v-slot:control>
                                        <q-color v-model="form.infoColor" class="q-mt-sm full-width" default-view="palette" :palette="palette" flat />
                                    </template>
                                </q-field>

                            </div>
                        </q-slide-transition>

                    </q-form>

                    <q-card :style="{ backgroundColor: form.primaryColor, color: form.textColor }" class="q-mt-lg shadow-3" >
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
                    </q-card>

                </q-card-section>
                <q-separator />

                <q-card-actions>
                    <q-btn flat color="accent" label="Add" @click="setTheme(form)" />
                </q-card-actions>

            </div>
        </q-slide-transition>
    </q-card>

    <div class="fit q-pt-md">
        <draggable v-model="themes" item-key="id" ghost-class="shadow-6" :component-data="{'class':'row q-col-gutter-sm'}">
            <template #item="{ element, index }">
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <Theme :original="element" :order="index" />
                </div>
            </template>
        </draggable>
    </div> -->

</q-page>

</template>

<script>

import { defineComponent } from 'vue'

// import draggable from 'vuedraggable'

import Themes from './../components/Themes'

export default defineComponent({
    name: 'ThemesPage',

    components: {
        // draggable,
        Themes,
    },
    
    data: function () {
        return {
            palette: [
                '#fefefe', '#9db4c0', '#5c6b73', '#333333', '#f94144', '#f3722c', '#f8961e', '#f9c74f', '#a5be00', '#679436', '#43aa8b', '#0081a7', 
                '#184e77', '#9d4edd', '#ff70a6', 
            ],

        }
    },
    
})

</script>
