import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Todo from './components/Todo'
import Newtodo from './components/NewTodo'

Vue.use(Router)
const routes = [
  {
    name: 'todo', path: '/', component: Todo,
    children: [
      {
        name: 'new-todo', path: 'new', component: Newtodo
      }
    ]
  }
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
