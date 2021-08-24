<template>

<q-card flat :style="{backgroundColor: theme.primaryColor, color: theme.textColor}">

    <q-card-actions :style="{backgroundColor: theme.secondaryColor, color: theme.infoColor}">
        {{ order }}
        <q-space />
        <q-btn @click="theme.deletedAt='now';setTheme(theme.data, theme.id)" unelevated rounded size="sm" icon="close" />
    </q-card-actions>

    <q-card-section>

        <q-list>

            <!-- Theme Name -->
            <q-item>
                <q-input v-model="theme.name" :label-slot="true" class="full-width" :input-style="{color: theme.textColor}" :dark="getDarkMode(theme.textColor)" standout @change="theme.showSave = true">
                    <template v-slot:label>
                        <span :style="{color: theme.textColor}">Theme Name</span>
                    </template>
                </q-input>
            </q-item>

            <!-- Primary Color -->
            <q-item>
                <q-input dense v-model="theme.primaryColor" :label-slot="true" class="full-width" :input-style="{color: theme.textColor}" :dark="getDarkMode(theme.textColor)" standout @change="theme.showSave = true">
                    <template v-slot:label>
                        <span :style="{color: theme.textColor}">Primary Color</span>
                    </template>
                    <!-- Color Picker Popup -->
                    <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer" :style="{color: theme.infoColor}">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-card flat :style="{backgroundColor: theme.primaryColor, color: theme.textColor}">
                                    <q-card-section>
                                        <q-color v-model="theme.primaryColor" flat @change="theme.showSave = true" />
                                    </q-card-section>
                                </q-card>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-item>

            <!-- Text Color (Accent) -->
            <q-item>
                <q-input dense v-model="theme.textColor" :label-slot="true" class="full-width" :input-style="{color: theme.textColor}" :dark="getDarkMode(theme.textColor)" standout @change="theme.showSave = true">
                    <template v-slot:label>
                        <span :style="{color: theme.textColor}">Text Color</span>
                    </template>
                    <!-- Color Picker Popup -->
                    <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer" :style="{color: theme.infoColor}">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-card flat :style="{backgroundColor: theme.primaryColor, color: theme.textColor}">
                                    <q-card-section>
                                        <q-color v-model="theme.textColor" flat @change="theme.showSave = true" />
                                    </q-card-section>
                                </q-card>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-item>

            <!-- Secondary Color -->
            <q-item>
                <q-input dense v-model="theme.secondaryColor" :label-slot="true" class="full-width" :input-style="{color: theme.textColor}" :dark="getDarkMode(theme.textColor)" standout @change="theme.showSave = true">
                    <template v-slot:label>
                        <span :style="{color: theme.textColor}">Secondary Color</span>
                    </template>
                    <!-- Color Picker Popup -->
                    <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer" :style="{color: theme.infoColor}">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-card flat :style="{backgroundColor: theme.primaryColor, color: theme.textColor}">
                                    <q-card-section>
                                        <q-color v-model="theme.secondaryColor" flat @change="theme.showSave = true" />
                                    </q-card-section>
                                </q-card>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-item>

            <!-- Info Color -->
            <q-item>
                <q-input dense v-model="theme.infoColor" :label-slot="true" class="full-width" :input-style="{color: theme.textColor}" :dark="getDarkMode(theme.textColor)" standout @change="theme.showSave = true">
                    <template v-slot:label>
                        <span :style="{color: theme.textColor}">Info Color</span>
                    </template>
                    <!-- Color Picker Popup -->
                    <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer" :style="{color: theme.infoColor}">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-card flat :style="{backgroundColor: theme.primaryColor, color: theme.textColor}">
                                    <q-card-section>
                                        <q-color v-model="theme.infoColor" flat @change="theme.showSave = true" />
                                    </q-card-section>
                                </q-card>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-item>

            <!-- Show Save and Reset Buttons Upon Change -->
            <q-slide-transition>
                <div v-show="theme.showSave">
                    <q-item>
                        <q-btn label="Reset" outline :style="{color: theme.infoColor}" @click="theme.name=theme.original.name;theme.primaryColor=theme.original.primaryColor;theme.textColor=theme.original.textColor;theme.infoColor=theme.original.infoColor;theme.secondaryColor=theme.original.secondaryColor;theme.showSave=false" />
                        <q-space />
                        <q-btn label="Save" @click="setTheme(theme.data, theme.id)" :style="{color: theme.textColor}" outline />
                    </q-item>
                </div>
            </q-slide-transition>

        </q-list>
    </q-card-section>
</q-card>
    
</template>

<script>

import {defineComponent} from 'vue'
import { colors, getCssVar } from 'quasar'

import db from './../mixins/db'

export default defineComponent ({
    name: 'Theme',
    props: {
        original: Object,
        order: Number,
    },

    data: function () {
        return {
            theme: this.original,
            showSave: false,
        }
    },

    methods: {

        getDarkMode: function (primaryColor) {
            let brightness = colors.brightness(primaryColor)
            if ( brightness < 128 ) { 
                return true
            } else {
                return false
            }
        },

        setTheme: function (data, id=null) {

            if ( data.name === '' ) {
                this.error = 'Please set a name for your theme.'
            }

            if ( this.error === null ) {

                if ( data.deletedAt && data.deletedAt === 'now' ) {
                    data.deletedAt = db.getNow()
                }

                // Upon completion of Db create/update (promise), returns a key to update LocalStorage view
                db.saveToDb(this.path, data, id).then( (key) => {

                    // Reset Forms
                    this.resetForms()

                    this.key = key

                    // Let the user know everything worked
                    this.$q.notify({ color: data.deletedAt ? 'negative' : 'secondary', message: data.deletedAt ? 'Theme Deleted!' : id ? 'Theme Saved!' : 'Theme Added!'})
                })

            }

        },
    }
    
})

</script>