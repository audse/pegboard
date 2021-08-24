import { boot } from 'quasar/wrappers'

import Expandable from '../components/Elements/Expandable.vue'
import Heading from '../components/Elements/Heading.vue'
import Modal from '../components/Elements/Modal.vue'
import Sheet from '../components/Elements/Sheet.vue'
import TextInput from '../components/Elements/TextInput.vue'
import Warning from '../components/Elements/Warning.vue'

import CardSkeleton from '../components/Elements/CardSkeleton.vue'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default ( ({ app }) => {

    app.component('Expandable', Expandable)
    app.component('Heading', Heading)
    app.component('Modal', Modal)
    app.component('Sheet', Sheet)
    app.component('TextInput', TextInput)
    app.component('Warning', Warning)
    
    app.component('CardSkeleton', CardSkeleton)

})
