
<template>

<!-- All Cards in List -->
<q-list v-if="board && list && defaultData">
    <draggable v-model="defaultData" @change="setOrder" item-key="id" v-bind="dragTransitionProps" :emptyInsertThreshold="10" :group="{name:'cards', pull:true, put:true}" @start="drag=true" @end="drag=false">

        <template #item="{element}">

            <div class="cards q-pb-xs">
                 <!-- Default Card Display -->
                <q-item v-if="element.data && (!element.data.display || (element.data.display && element.data.display==='card'))" class="q-pl-none q-pr-sm">
                    <q-item-section class="q-px-none q-mx-none" side>
                        <q-icon class="handle" name="drag_indicator" color="info" style="opacity:0.5" />
                    </q-item-section>
                    <q-item-section>
                        <Sheet :label="element.data.name" noactions dense :nocontent="element.data.content?false:true">
                            <template #button>
                                <q-btn icon="tune" @click="setForms(element.data, element.id)" unelevated round text-color="primary-tint-25" />
                            </template>
                            <template #content>{{ element.data.content }}</template>
                        </Sheet>
                    </q-item-section>
                </q-item>

                <!-- Heading Display -->
                <q-item v-if="element.data && (element.data.display && element.data.display=='heading')" class="q-py-md q-pl-xs q-pr-sm">
                    <Sheet :label="element.data.name" :classes="{ header: 'q-px-xs', label: 'text-h6' }" handle nocontent noactions>
                        <template #button>
                            <q-btn icon="tune" @click="setForms(element.data, element.id)" unelevated round text-color="primary-tint-25" />
                        </template>
                    </Sheet>
                </q-item>

                <div v-if="!element.data" class="q-pb-sm"></div>
                
            </div>

        </template>
    </draggable>
</q-list>

<!-- Add Card Form -->

<div v-if="addWidget && board && list" class="q-pt-md">
    <Warning :error="error" />
    <TextInput v-model="form.name" label="Add Card" dense>
        <template #button>
            <q-btn flat color="info" label="Add" @click="set(form)" />
        </template>
    </TextInput>
</div>

<!-- Edit Card Form -->
<Modal :show="showForm" :menu="true" tabLabel="Edit Card" :error="error" @hide="resetForms()">
    <template #header>
        <q-space />
        <q-btn :icon="'close'" size="sm" color="info" @click="resetForms()" flat rounded />
    </template>
    <template #content>

        <TextInput v-model="form.name" classes="text-h6 q-mb-md" />
        <TextInput v-model="form.content" type="textarea" />

        <q-btn-toggle v-model="form.display" class="q-my-md" spread no-caps rounded unelevated toggle-color="info" toggle-text-color="primary" color="secondary" text-color="info" :options="displayOptions" />

        <Expandable label="Date Options">
            <template #addon>
                <span class="text-info">{{ form.dueDate ? form.dueDate : form.doDate ? form.doDate : ''}}</span>
            </template>
            <template #content>
                <div class="row q-col-gutter-sm">
                    <div class="col-md-12 col-lg-6">
                        <q-date v-model="form.dueDate" type="date" :subtitle="form.dueDate ? form.dueDate : 'Not Picked'" title="Due Date" class="bg-secondary full-width" color="secondary" flat />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <q-date v-model="form.doDate" type="date" :subtitle="form.doDate ? form.doDate : 'Not Picked'" title="Do Date" class="bg-secondary full-width" color="secondary" flat range multiple />
                    </div>
                </div>
            </template>
        </Expandable>

    </template>
    <template #menu>
    </template>
    <template #actions>
        <q-btn label="Delete" flat color="info" @click="form.deletedAt=Date.now();set(form, formId)" />
        <q-space />
        <q-btn flat color="accent" label="Save" @click="set(form, formId)" />
    </template>
</Modal>


</template>

<script>

import { defineComponent } from 'vue'

import draggable from 'vuedraggable'

import { cache } from './../mixins/cache'
import { dragTransition } from './../mixins/transition'

export default defineComponent({
    name: 'Cards',

    props: {
        board: Object,
        list: Object,

        addWidget: Boolean,
    },

    data: function () {
        return {
            displayOptions: [
                { label: 'Card', value: 'card' },
                { label: 'Heading', value: 'heading' },
                { label: 'Image', value: 'iamge' },
            ],
        }
    },

    mixins: [cache, dragTransition],

    components: {
        draggable,
    },

    mounted () {
        if ( this.$auth && this.board && this.list ) {
            this.path = { user: this.$auth.uid, board: this.board.id, list: this.list.id, card: 'all' }
        }
    },

})

</script>

