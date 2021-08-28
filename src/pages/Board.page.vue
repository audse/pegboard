<template>

<q-page class="q-px-md q-py-lg">

    <div v-if="board_exists">

        <ListForm :board_id="board._id" />

        <Heading h2 :title="board.name" :subtitle="board.description" padding="q-py-lg" />

    </div>
    <div v-if="lists_exist">

        <Drag v-model="lists" v-slot="element_props" col_list gutter_sm horizontal>
            <Sheet :label="element_props.element.name" dense light handle subtitle>
                <template #subtitle>{{ element_props.element.description }}</template>
            </Sheet>
        </Drag>

    </div>

</q-page>

</template>
<script>

import { defineComponent } from 'vue'

import ListForm from './../components/Nested/Forms/List.form'

export default defineComponent({

    name: 'BoardPage',

    components: {
        ListForm,
    },

    data () {
        return {

            route_id: this.$route.id,
            route_name: this.$route.name,

            board: {
                _id: null,
                name: null,
                description: null,
            },

            lists: []
        }
    },

    mounted () {

        console.log('mounted', this.$router.currentRoute.value.params)

        this.route_id = this.$router.currentRoute.value.params.id
        this.route_name = this.$router.currentRoute.value.params.name

        this.get_data ( this.route_id )

    },

    computed: {

        board_exists () {
            return ( this.board && this.board._id )
            
        },

        lists_exist () {
            return ( this.lists && this.lists.length >= 1 )
        }
    },

    methods: {

        get_data ( route_id ) {
            
            this.get_board( route_id ).then( board => {
                this.board = Object.assign( {}, board.data )

                this.get_lists( route_id ).then( lists => {
                    this.lists = [...lists]
                })
            })
        },

        get_board: function ( board_id ) {
            
            return new Promise( (resolve, reject) => {

                this.$store.dispatch('board/find_by_id_and_reload', board_id).then( board => {
                    resolve(board)

                }).catch( e => {
                    console.log(e)
                    reject()
                })
            })
        },

        get_lists: function ( board_id ) {

            return new Promise( (resolve, reject) => {

                let data = {
                    board_id: board_id,
                    user_id: this.$store.getters['auth/user_id']
                }

                if ( board_id && data.user_id ) {
                    
                    this.$store.dispatch('list/find_by_board_and_reload', data).then( lists => {

                        resolve(lists)

                    }).catch( e => {
                        console.log(e) 
                        reject()
                    })

                } else reject()
            })
        }
    }

})

</script>