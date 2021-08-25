import { boot } from 'quasar/wrappers'
import firebase from 'firebase'



export default (async ({app}) => {

    let auth = await firebase.getCurrentUser()
    if ( auth && auth.user ) auth = auth.user

    app.config.globalProperties.$auth = auth
})

export { firebase }