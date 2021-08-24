
<template>

<q-dialog :model-value="show">

    <q-card class="bg-primary text-accent" :style=" {minWidth: '75vw', minHeight: menu ? '75vh' : '0px' }">
        <q-card-actions class="text-h6 bg-secondary">

            <q-tabs v-model="tab" v-if="menu" class="text-info" active-color="accent">
                <q-tab name="home" :label="tabLabel" />
                <q-tab name="menu" :label="menuLabel ? menuLabel : 'More Options'" />
            </q-tabs>

            <slot name="header"></slot>

            <Warning :error="error" />
        </q-card-actions>

        <q-card-section class="q-pb-lg">
            <q-tab-panels v-model="tab" animated class="bg-primary q-pb-lg" :swipeable="menu ? true : false">

                <q-tab-panel name="home">
                    <slot name="content"></slot>
                </q-tab-panel>

                <q-tab-panel name="menu">
                    <slot name="menu"></slot>
                </q-tab-panel>

            </q-tab-panels>
        </q-card-section>


        <q-card-actions class="bg-secondary absolute-bottom" >
            <slot name="actions"></slot>
        </q-card-actions>
    </q-card>
    
</q-dialog>

</template>

<script>

import { defineComponent } from 'vue'

import Warning from './Warning'

export default defineComponent({
    name: 'Modal',

    props: {
        show: Boolean,
        error: String,
        menu: Boolean,
        tabLabel: String,
        menuLabel: String
    },

    components: {
        Warning
    },

    data: function () {
        return {
            tab: 'home',
        }
    }
})
</script>
