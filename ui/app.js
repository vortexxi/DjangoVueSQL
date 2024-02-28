// const Home = { template: '<div>Home</div>' }
// const Department = { template: '<div>Department section</div>' }
// const Employee  = { template: '<div>Employee section</div>' }

const routes = [
    { path: '/', component: Home },
    { path: '/department', component: Department },
    { path: '/employee', component: Employee }
  ]
  
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
  })
// const router = new VueRouter({
//     routes
// })
  
  //Create and mount the root instance.
  const app = Vue.createApp({})
  // Make sure to _use_ the router instance to make the
  // whole app router-aware.
  app.use(router)
  
  app.mount('#app')

// const app = new Vue({
//     router
// }).$mount('#app')
