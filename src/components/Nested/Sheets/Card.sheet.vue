
<template>

<div>

    <Sheet :label="card.name" dense light handle subtitle>
        <template #button>
            <q-btn @click="show_modal=true" icon="tune" color="primary" text-color="scale-accent-3" flat />
        </template>
        <template #subtitle>{{ card.content }}</template>
        <template #content>

        </template>

    </Sheet>

    <!-- <EditListModal :list_id="list_id" :board_id="board_id" :show_modal="show_modal" @hide="show_modal=false" /> -->

</div>

</template>
<script>

import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

// import EditListModal from './../Modals/Edit_List.modal'

export default defineComponent({

    name: 'ListSheet',

    props: {
        card_id: String,
        board_id: String,
    },

    // components: {
    //     EditListModal,
    // },

    setup( props ) {

        const store = useStore()

        const card = computed( () => props.board_id ? store.getters['card/find_by_id'](props.card_id, props.board_id) : null )
        
        const show_modal = ref(false)

        return {
            card,
            show_modal
        }
    },

})

</script>
