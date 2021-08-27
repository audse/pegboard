
<template>

<Expandable label="Add Board">
    <template #before-content>
        <Warning :error="error" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="Board Name" />
        <TextInput v-model="form.description" label="Description" />

    </template>
    <template #actions>
        <q-btn flat color="accent" label="Add" @click="add_board" />
    </template>
</Expandable>

</template>
<script>

import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default defineComponent({

    name: 'BoardForm',

    props: {
        show_form: Boolean,
    },

    setup () {

        const store = useStore()
        const q = useQuasar()

        const error = ref(null)

        const form = reactive( {
            name: null,
            description: null,
        })

        const add_board = async () => {
            
            form.user_id = store.getters['auth/user_id']

            if ( form.user_id ) store.dispatch('board/add', form).then( result => {
                q.notify( { color: 'primary', message: 'Added Board' } )
            })
        }

        return {
            error,
            form,
            add_board
        }
        
    },

})
</script>
