
<template>
    
<Modal :show="show_modal" :error="error" @hide="this.$emit('hide')">
    <template #header>
        Edit Card
        <q-space />
        <q-btn @click="this.$emit('hide')" color="info" round flat dense icon="close" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="Card Name" />
        <TextInput v-model="form.content" label="Content" type="textarea" />

        <q-btn-toggle v-model="form.display" class="q-my-md" spread no-caps rounded unelevated toggle-color="info" toggle-text-color="primary" color="secondary" text-color="info" :options="options_display" />

        <Expandable label="Date Options">
            <template #addon>
                <span class="text-info">{{ form.date_due ? form.date_due : form.date_todo ? form.date_todo : ''}}</span>
            </template>
            <template #content>
                <div class="row q-col-gutter-sm">
                    <div class="col-md-12 col-lg-6">
                        <q-date v-model="form.date_due" type="date" :subtitle="form.date_due ? form.date_due : 'Not Picked'" title="Due Date" class="bg-primary full-width" color="secondary" flat />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <q-date v-model="form.date_todo" type="date" :subtitle="form.date_todo ? form.date_todo : 'Not Picked'" title="To-Do Date" class="bg-primary full-width" color="secondary" flat range multiple />
                    </div>
                </div>
            </template>
        </Expandable>

    </template>
    <template #actions>
        <q-btn label="Delete" @click="find_by_id_and_delete()" color="info" flat />
        <q-space />
        <q-btn label="Save" @click="find_by_id_and_update()" color="accent" flat />
    </template>
</Modal>

</template>
<script>

import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import { use_card } from './../Use/card.use'

export default defineComponent({
    
    name: 'EditCardModal',

    props: {
        board_id: String,
        list_id: String,
        card_id: String,
        show_modal: Boolean,
    },

    emits: ['hide'],

    setup ( props, { emit } ) {

        const store = useStore()
        
        const current_card = computed( () => props.board_id ? store.getters['card/find_by_id'](props.card_id, props.board_id) : null )

        const {
            form,
            options_display,
            error,

            find_by_id_and_update,
            find_by_id_and_delete,

        } = use_card(emit, props.board_id, props.list_id, current_card.value)
        
        return {
            form,
            options_display,
            error,

            find_by_id_and_update,
            find_by_id_and_delete,
        }

    },


})
</script>
