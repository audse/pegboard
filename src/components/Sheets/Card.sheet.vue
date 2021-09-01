
<template>

<div class="relative">
    <!-- Card Display -->
    <q-item v-if="card.display==='card'" class="q-pl-none q-pr-sm">
        <q-item-section class="q-px-none q-mx-none" side>
            <q-icon class="handle" name="drag_indicator" color="scale-text-1" />
        </q-item-section>
        <q-item-section>
            <Sheet shadow noactions dense :classes="{label:'q-pl-md text-smallheading text-scale-text-8 cursor-pointer', content:'q-pl-md text-scale-text-5'}" :nocontent="card.content?false:true">
                <template #label>
                    {{ form.name }}
                    <PopInput v-model="form.name" :name="`card_name_${card._id}`" @save_update="find_by_id_and_update" />
                </template>
                <template #button>
                    <q-btn @click="show_modal=true" icon="tune" color="primary" text-color="scale-text-1" flat />
                </template>
                <template #content>{{ card.content }}</template>
            </Sheet>
        </q-item-section>
    </q-item>

    <!-- Header Display -->
    <q-item v-if="card.display==='header'" class="q-py-md q-pl-xs q-pr-sm">
        <Sheet shadow :classes="{ header: 'q-px-xs', label: 'text-h6 cursor-pointer' }" handle nocontent noactions>
            <template #label>
                {{ form.name }}
                <PopInput v-model="form.name" :name="`card_name_${card._id}`" @save_update="find_by_id_and_update" />
            </template>
            <template #button>
                <q-btn @click="show_modal=true" icon="tune" unelevated round text-color="scale-text-3" />
            </template>
        </Sheet>
    </q-item>

    <EditCardModal :list_id="list_id" :board_id="board_id" :card_id="card_id" :show_modal="show_modal" @hide="show_modal=false" />

</div>

</template>
<script>

import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

import { use_card } from './../../utils/use.card.utils'

import EditCardModal from './../Modals/Edit_Card.modal'

export default defineComponent({

    name: 'ListSheet',

    props: {
        card_id: String,
        board_id: String,
        list_id: String,

        order: Number,
    },

    components: {
        EditCardModal,
    },

    setup( props, { emit } ) {

        const store = useStore()

        const card = computed( () => props.board_id ? store.getters['card/find_by_id'](props.card_id, props.board_id) : null )
        
        const show_modal = ref(false)

        const {
            form,
            find_by_id_and_update
        } = use_card(emit, props.board_id, props.list_id, card.value)

        return {
            card,
            show_modal,
            form,
            find_by_id_and_update
        }
    },

})

</script>
