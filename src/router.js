
import index from './views/index.vue'
import product from './views/product/product.vue'
import collegeEvent from './views/event/collegeEvent.vue'
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
{
   path:'/event/:id',
   component:collegeEvent,
   name:'event'
},
]
