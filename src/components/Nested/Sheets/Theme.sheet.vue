

<template>
    
<WarningModal :show="show_delete_modal" 
label="Are you sure?" 
message="Are you sure you want to delete this theme? This action cannot be undone." @hide="show_delete_modal=false">
    <template #actions>
        <q-btn @click="show_delete_modal=false" label="Nevermind" flat color="scale-accent-4" class="weight-bold" />
        <q-space />
        <q-btn @click="find_by_id_and_delete(form)" label="Yes, I'm Sure" flat color="accent" class="weight-bold" />
    </template>
</WarningModal>

<q-card :style="{ backgroundColor: form.primary, color: form.text }" flat>


    <q-card-section :style="{ backgroundColor: scale_secondary[4] }" class="q-px-lg">
        <q-item class="text-h6 q-px-none q-pt-lg q-pb-sm" :style="{ fontWeight: 700, color: form.text}">
                
            <q-item-section v-if="handle" side class="q-pa-none q-ml-none q-mr-md">
                <q-icon name="drag_indicator" class="handle" :style="{ color: scale_text[2] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none" :style="{ color: form.text }">
                {{ label }}
            </q-item-section>

            <q-item-section v-if="show_form" side>
                <q-btn @click="show_delete_modal=true" flat :style="style" round size="sm" icon="close" />
            </q-item-section>
        </q-item>
        <div class="text-subtitle-1 q-mt-xs" :style="{color: scale_text[7]}">
            <slot name="subtitle"></slot>
        </div>
    </q-card-section>

    <div v-if="example">
        <q-item class="q-pa-none q-ma-none q-mb-md" :style="{borderTop: '5px solid', borderColor: form.emphasis, background: get_transparent_color(form.emphasis), color: form.text}">
            <q-item-section side class="q-pa-none">
                <q-btn icon="warning" flat round :style="{ color: form.emphasis }" />
            </q-item-section>
            <q-item-section class="q-pa-sm q-ma-none">
                <b>Alert!</b> 
                <span style="opacity: 0.75">You have one new message.</span>
            </q-item-section>
        </q-item>
    </div>

    <q-card-section v-if="example" class="q-mx-md">


        <q-item class="text-smallheading q-pa-none" style="font-weight:600">
            <q-item-section side class="q-pa-none q-ml-sm q-mr-sm">
                <q-icon name="drag_indicator" :style="{ color: scale_text[1] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none" :style="{ color: scale_text[5] }">
                Example List Name
            </q-item-section>
        </q-item>
        <q-item class="text-smallheading q-my-sm q-pa-none q-pl-sm" :style="{ backgroundColor: scale_secondary[3], borderRadius: '3px' }">
            <q-item-section side class="q-pa-none q-mr-sm">
                <q-icon name="drag_indicator" :style="{ color: scale_text[0] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none" :style="{ color: form.text}">
                Header Card
            </q-item-section>
        </q-item>
        <q-item class="q-pa-none q-ma-none">
            <q-item-section side class="q-pa-none q-mr-sm">
                <q-icon name="drag_indicator" :style="{ color: scale_text[1] }" />
            </q-item-section>
            <q-item-section class="q-pa-none q-ma-none">
                <q-item :style="{backgroundColor: scale_secondary[3], color: scale_text[7], fontWeight: 600}">
                    Card Name
                </q-item>
                <q-item :style="{backgroundColor: scale_secondary[2], color: scale_text[6]}">
                    This is the description of a card.
                </q-item>
            </q-item-section>
        </q-item>
        <q-item class="q-pa-none q-mt-md">
            <q-input disable :dark="is_dark(form.primary)" dense label="Form" :style="{ color: form.emphasis }" filled :class="'full-width'" >
                <template #append>
                    <q-btn flat label="Add" />
                </template>
            </q-input>
        </q-item>

    </q-card-section>

    <q-card-section v-if="!nocontent">

        <div v-if="show_form">

            <q-list>
                <q-item :style="style">
                    <ColorInput v-model="form.primary" :bg="form.primary" :text="form.text" label="Primary" @change="auto_all(form, advanced)" dense />
                </q-item>
                <q-item :style="style">
                    <q-item-section class="weight-bold">
                        Advanced Options
                    </q-item-section>
                    <q-item-section side>
                        <q-toggle v-model="advanced" :color="is_dark(form.primary)?'white':'black'" :style="style" left-label />
                    </q-item-section>
                </q-item>
                <q-item :style="style">
                    <ColorInput v-model="form.secondary" :disabled="!advanced" :bg="form.primary" :text="form.text" label="Secondary" dense />
                </q-item>
                <q-item :style="style">
                    <ColorInput v-model="form.text" :disabled="!advanced" :bg="form.primary" :text="form.text" label="Text" dense />
                </q-item>
                <q-item :style="style">
                    <ColorInput v-model="form.emphasis" :disabled="!advanced" :bg="form.primary" :text="form.text" label="Emphasis" dense />
                </q-item>
                <q-item :style="style">
                    <ColorInput v-model="form.warning" :disabled="!advanced" :bg="form.primary" :text="form.text" label="Warning" dense />
                </q-item>
                <q-item :style="style">
                    <ColorInput v-model="form.negative" :disabled="!advanced" :bg="form.primary" :text="form.text" label="Negative" dense />
                </q-item>
            </q-list>

        </div>

        <slot name="content"></slot>
    </q-card-section>

    <q-card-actions v-if="example">
            <q-btn flat class="q-ma-sm" :style="{ color: form.negative, fontWeight: 600 }" label="Negative" />
            <q-btn outline class="q-ma-sm" :style="{ color: form.warning, fontWeight: 600 }" label="Warning" />
            <q-btn outline class="q-ma-sm" :style="{ color: form.emphasis, fontWeight: 600 }" label="Emphasis" />
            <q-btn unelevated class="q-ma-sm" :style="{ backgroundColor: form.secondary, color: form.text, fontWeight: 600 }" label="Action" />
    </q-card-actions>

    <q-card-actions v-if="show_form" :style="show_form?{ backgroundColor: scale_secondary[3] }:{}">

        <q-slide-transition>
            <q-item v-show="show_actions" class="full-width">
                <q-btn label="Reset Changes" flat :style="{ color: form.negative }" class="weight-bold" />
                <q-space />
                <q-btn @click="find_by_id_and_update(form)" label="Save Changes" outline :style="{ color: form.emphasis }" class="weight-bold" />
            </q-item>
        </q-slide-transition>

    </q-card-actions>
</q-card>

</template>

<script>

import { defineComponent, computed, watch, reactive, ref } from 'vue'

import { use_color_form, use_auto_color } from './../Use/colors.use'
import { use_theme } from './../Use/theme.use'
import chroma from 'chroma-js'

export default defineComponent({
    props: {
        label: String,
        example: Boolean,
        show_form: Boolean,

        handle: Boolean,
        nocontent: Boolean,
        noactions: Boolean,

        colors: Object,
    },

    setup ( props, { emit } ) {

        const {
            form,
            advanced,
        } = use_color_form( !props.example ? Object.assign({}, props.colors) : props.colors )

        const {
            saved,
            find_by_id_and_update,
            find_by_id_and_delete
        } = use_theme(form, emit)
        
        advanced.value = true

        const show_actions = ref(false)
        const show_delete_modal = ref(false)

        const {
            auto_all,
            auto_scale,
            is_dark
        } = use_auto_color()

        const get_transparent_color = (color) => {
            return chroma(color).alpha(0.3)
        }

        const scale_secondary = computed( () => auto_scale(form.primary, form.secondary) )
        const scale_text = computed( () => auto_scale(form.primary, form.text) )

        const style = computed( () => {
            return {
                color: form.text,
                background: form.primary
            }
        })

        watch(form, () => {
            show_actions.value = true
        })

        watch(saved, () => {
            show_actions.value = false
        })

        return {
            form,
            advanced,
            find_by_id_and_update,
            find_by_id_and_delete,
            show_actions,
            show_delete_modal,
            auto_all,
            is_dark,
            get_transparent_color,
            scale_secondary,
            scale_text,
            style
        }
    }
})


</script>
