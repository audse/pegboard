
<template>

<div>

    <Sheet :classes="{ label: 'text-h6 cursor-pointer', subtitle: 'cursor-pointer' }" dense light handle subtitle>
        <template #label>
            {{ form.name }}
            <PopInput v-model="form.name" :name="`list_name_${list._id}`" @save_update="find_by_id_and_update" />
        </template>
        <template #subtitle>
            {{ form.description }}
            <PopInput v-model="form.description" :name="`list_description_${list._id}`" @save_update="find_by_id_and_update" dense />    
        </template>
        <template #button>
            <q-btn @click="show_modal=true" icon="tune" color="primary" round text-color="scale-text-2" flat />
        </template>
        <template #content>

            <Cards :list_id="list_id" :board_id="board_id" />

        </template>

    </Sheet>

    <EditListModal :list_id="list_id" :board_id="board_id" :show_modal="show_modal" @hide="show_modal=false" />

</div>

</template>
<script>

import { defineComponent, ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'

import { use_list } from './../../utils/use.list.utils'

import EditListModal from './../Modals/Edit_List.modal'
import Cards from './../Cards'

export default defineComponent({

    name: 'ListSheet',

    props: {
        list_id: String,
        board_id: String,
    },

    components: {
        EditListModal,
        Cards
    },

    setup( props, { emit } ) {

        const store = useStore()

        const list = computed( () => props.list_id ? store.getters['list/find_by_id'](props.list_id, props.board_id) : null )
        
        const show_modal = ref(false)
        
        const {
            form,
            find_by_id_and_update
        } = use_list( emit, props.board_id, list.value )

        return {
            list,
            show_modal,
            form,
            find_by_id_and_update
        }
    },

})

</script>
