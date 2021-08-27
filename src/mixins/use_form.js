
import { ref } from 'vue'

export default {

    setup (props) {

        const form = ref( Object.assign({}, props.data) )
        const form_id = ref( props.id )
        const show_form = ref( false )
        const error = ref( null )

        return {
            form,
            form_id,
            show_form,
            error
        }

    }
}