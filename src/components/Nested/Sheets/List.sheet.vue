
<template>

<div>

    <Sheet :label="list.name" dense light handle subtitle>
        <template #button>
            <q-btn @click="show_modal=true" icon="tune" color="primary" text-color="scale-accent-3" flat />
        </template>
        <template #subtitle>{{ list.description }}</template>
        <template #content>

        </template>

    </Sheet>

    <ListModal :list_id="list_id" :board_id="board_id" :show_modal="show_modal" @hide="show_modal=false" />

</div>

</template>
<script>

import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

import ListModal from './../Modals/List.modal'

export default defineComponent({

    name: 'ListSheet',

    props: {
        list_id: String,
        board_id: String,
    },

    components: {
        ListModal,
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
