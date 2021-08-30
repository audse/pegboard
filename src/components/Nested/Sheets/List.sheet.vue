
<template>

<div>

    <Sheet :label="list.name" dense light handle subtitle>
        <template #button>
            <q-btn @click="show_modal=true" icon="tune" color="primary" round text-color="scale-text-2" flat />
        </template>
        <template #subtitle>{{ list.description }}</template>
        <template #content>

            <Cards :list_id="list_id" :board_id="board_id" />

        </template>

    </Sheet>

    <EditListModal :list_id="list_id" :board_id="board_id" :show_modal="show_modal" @hide="show_modal=false" />

</div>

</template>
<script>

import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

import EditListModal from './../Modals/Edit_List.modal'
import Cards from './../../Cards'

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

    setup( props ) {

        const store = useStore()

        const list = computed( () => props.list_id ? store.getters['list/find_by_id'](props.list_id, props.board_id) : null )
        
        const show_modal = ref(false)

        return {
            list,
            show_modal
        }
    },

})

</script>
