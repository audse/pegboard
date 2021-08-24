
<template>

<!-- Add List Form -->
<div v-if="addWidget && board">
    <Warning :error="error" />
    <TextInput v-model="form.name" label="Add List" dark>
        <template #button>
            <q-btn flat color="info" label="Add" @click="set(form)" />
        </template>
    </TextInput>
</div>

<!-- All Lists -->
<transition name="fade" mode="out-in">

    <div class="fit scroll-y hide-scrollbar q-pa-sm" v-if="data">
        <draggable v-model="data" item-key="id" @change="setOrder" class="row no-wrap q-col-gutter-sm" v-bind="dragTransitionProps" @start="drag=true" @end="drag=false">
            <template #item="{element}">

                <div class="col-xs-11 col-sm-5 col-md-4 col-lg-3">

                    <!-- List Template -->
                    <Sheet v-if="element.data" :label="element.data.name" :classes="{sheet: 'q-mt-lg', label:'text-h5'}" light handle nocontent>
                        <template #button>
                            <q-btn class="text-primary-light" round flat dense icon="edit" @click="setForms(element.data, element.id)" />
                        </template>
                        <template #before-content>
                            <Cards :board="board" :list="element" addWidget />
                        </template>
                    </Sheet>

                </div>

            </template>
        </draggable>
    </div>

    <!-- List Skeleton -->
    <CardSkeleton v-else :elements="3" />

</transition>

<!-- Edit List Form -->
<Modal :show="showForm" :error="error" @hide="resetForms()">
    <template #header>
        <Heading h6 title="Edit List" padding="q-pa-sm" />
        <q-space />
        <q-btn :icon="'close'" size="sm" color="info" @click="resetForms()" flat rounded />
    </template>
    <template #content>
        <TextInput v-model="form.name" label="List Name" />
        <TextInput v-model="form.description" label="Description" />
    </template>
    <template #actions>
        <q-btn flat color="info" label="Delete" @click="form.deletedAt=Date.now();set(form, formId)" />
        <q-space />
        <q-btn color="accent" flat  label="Save" @click="set(form, formId)" />
    </template>
</Modal>

</template>

<script>

import { defineComponent } from 'vue'

import draggable from 'vuedraggable'

import Cards from './Cards'

import { cache } from './../mixins/cache'
import { dragTransition } from './../mixins/transition'

export default defineComponent({
    name: 'Lists',

    props: {
        board: Object,

        addWidget: Boolean,
    },

    mixins: [cache, dragTransition],

    components: {
        draggable,
        Cards
    },

    mounted () {
        if ( this.$auth && this.board ) {
            this.path = { user: this.$auth.uid, board: this.board.id, list: 'all' }
        }
    },

})

</script>
