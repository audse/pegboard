import { boot } from 'quasar/wrappers'

import Expandable from '../components/Elements/Expandable.vue'
import Heading from '../components/Elements/Heading.vue'
import Modal from '../components/Elements/Modal.vue'
import WarningModal from '../components/Elements/WarningModal.vue'
import Sheet from '../components/Elements/Sheet.vue'
import Warning from '../components/Elements/Warning.vue'
import Drag from '../components/Elements/Drag.vue'

import TextInput from '../components/Elements/TextInput.vue'
import ColorInput from '../components/Elements/ColorInput.vue'
import PopInput from '../components/Elements/PopInput.vue'
import EditorInput from '../components/Elements/EditorInput.vue'

import CardSkeleton from '../components/Elements/CardSkeleton.vue'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default ( ({ app }) => {

    app.component('Expandable', Expandable)
    app.component('Heading', Heading)
    app.component('Modal', Modal)
    app.component('WarningModal', WarningModal)
    app.component('Sheet', Sheet)
    app.component('Warning', Warning)
    app.component('Drag', Drag)

    app.component('TextInput', TextInput)
    app.component('ColorInput', ColorInput)
    app.component('PopInput', PopInput)
    app.component('EditorInput', EditorInput)
    
    
    app.component('CardSkeleton', CardSkeleton)

})
