
import { boot } from 'quasar/wrappers'
import { Quasar } from 'quasar'

import { get_and_set_theme } from 'src/utils/theme.utils'

export default boot(async ( { store } ) => {
    
    console.log(Quasar)
    await store.dispatch('auth/check_auth')
    const user_id = store.getters['auth/user_id']

    const {
        set_theme_from_preferences,
    } = get_and_set_theme(store)

    await set_theme_from_preferences(user_id)

})

export { get_and_set_theme }
