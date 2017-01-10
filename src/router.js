
import index from './views/index.vue'
import product from './views/product/product.vue'

export default[{
   path:'/',
   component:index,
   name:'index'
},
{
   path:'/product/:id',
   component:product,
   name:'product'
},
]
