
<template>

<Expandable label="Add List">
    <template #before-content>
        <Warning :error="error" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="List Name" />
        <TextInput v-model="form.description" label="Description" />

    </template>
    <template #actions>
        <q-btn flat color="accent" label="Add" @click="add_list" />
    </template>
</Expandable>

</template>
<script>

import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default defineComponent({

    name: 'ListForm',

    props: {
        show_form: Boolean,
        board_id: String,
    },

    setup ( props ) {

        const store = useStore()
        const q = useQuasar()

        const error = ref(null)

        const form = reactive( {
            name: null,
            description: null,
        })

        const add_list = async () => {
            
            form.user_id = store.getters['auth/user_id']
            form.board_id = props.board_id

            if ( form.user_id && form.board_id ) store.dispatch('list/add', form).then( result => {
                q.notify( { color: 'primary', message: 'Added List' } )
            })
        }

        return {
            error,
            form,
            add_list
        }
        
    },

})
</script>
