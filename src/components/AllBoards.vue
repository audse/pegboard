
<template>

<!-- Edit Board Dialog -->
<Modal :show="showForm" :error="error" @hide="resetForms()">
    <template #header>
        Edit Board
        <q-space />
        <q-btn @click="resetForms()" color="info" round flat dense :icon="'close'" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="Board Name" />
        <TextInput v-model="form.description" label="Description" />

        <Heading small title="Theme" />

    </template>
    <template #actions>
        <q-btn flat color="info" label="Delete" @click="form.deletedAt=Date.now();set(form, formId)" />
        <q-space />
        <q-btn color="accent" flat  label="Save" @click="set(form, formId)" />
    </template>
</Modal>

<!-- Add Board Widget -->

<Expandable v-if="addWidget" label="Add Board">
    <template #before-content>
        <Warning :error="error" />
    </template>
    <template #content>

        <TextInput v-model="form.name" label="Board Name" />
        <TextInput v-model="form.description" label="Description" />

    </template>
    <template #actions>
        <q-btn flat color="accent" label="Add" @click="set(form)" />
    </template>
</Expandable>

<!-- Cards Widget -->

<div v-if="cardWidget">

    <Heading h4 title="Your Boards" padding="q-py-lg" />
    
    <transition name="fade" mode="out-in">
        <div v-if="data && data.length > 0">
            <draggable v-model="data" class="row q-col-gutter-sm" item-key="id" v-bind="dragTransitionProps" @change="setOrder" @start="drag=true" @end="drag=false" >
                <template #item="{ element, index }">
                    <div class="col-xs-12 col-sm-6 col-lg-4">
                        <Sheet :label="index+' '+element.data.name" :classes="{label:'text-h6', content:'text-info'}" separator handle>
                            <template #button>
                                <q-btn color="primary-tint-25" round flat dense icon="tune" @click="setForms(element.data, element.id)" />
                            </template>
                            <template #content>
                                {{ element.data.description }}
                            </template>
                            <template #actions>
                                <q-btn flat :label="'Go to '+element.data.name" :to="'/board/'+urlify(element.data.name, element.id)" />
                            </template>
                        </Sheet>
                    </div>
                </template>
            </draggable>
        </div>

        <CardSkeleton v-else :elements="4" />

    </transition>

</div>

<!-- List Widget -->

<div v-if="listWidget">
    <q-list>
        <q-item clickable to="/boards/" class="text-accent" active-class="bg-primary">
            <Heading h6 title="Your Boards" padding="q-pt-sm" />
        </q-item>
        <q-item v-for="board in data" :key="'board-list-'+board.id" clickable :to="'/board/'+urlify(board.data.name, board.id)" class="text-accent"  active-class="bg-primary">
            <q-item-label class="q-pt-sm">{{ board.data.name }}</q-item-label>
        </q-item>
        <q-item v-if="data && data.length === 0" class="col text-accent">
            <q-item-label>No Boards</q-item-label>
        </q-item>
    </q-list>
</div>

</template>

<script>

import { defineComponent } from 'vue'

import draggable from 'vuedraggable'

import { cache } from './../mixins/cache'
import { dragTransition } from './../mixins/transition'

export default defineComponent({
    name: 'AllBoards',

    props: {

        addWidget: Boolean,
        listWidget: Boolean,
        cardWidget: Boolean,

    },

    components: {
        draggable,
    },

    mixins: [cache, dragTransition],
    
    emits: ['key'],

    created () {

        if ( this.$auth ) {

            this.path = { user: this.$auth.uid, board: 'all' }
        }

    },

    methods: {

        urlify: function (string, id=null) {
            let url = string.replace(/\W+/g, '-').toLowerCase()
            if ( id ) url += '/'+id
            return url
        },
    },
})

</script>