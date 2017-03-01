const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const web = r => require.ensure([], () => r(require('../page/web/web')), 'web')

const product = r => require.ensure([], () => r(require('../page/product/product')), 'product')



export default [
    {
        path: '/',
        component: home, //顶层路由，对应index.html
        name:'home'
    },

    {
        path: '/web',
        component: web,
        name:'web'
    },


    {
        path: '/product/:id',
        component: product,
        name:'product'
    },
]