import {LocalStorage} from 'quasar'

export default({router}) => {
    router.beforeEach((to, from, next) => {
        let isLoggedIn = LocalStorage.getItem('isLoggedIn')

        if(!isLoggedIn && to.path !== '/' && to.path !== '/register'){
            next('/')
        }else if(isLoggedIn && to.path === '/'){
            next('/dashboard')
        }else if(isLoggedIn && to.path === '/register'){
            next('/dashboard')
        }
        else{

            next()
        }
    })
}
