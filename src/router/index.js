import Vue from 'vue'
import Router from 'vue-router'
import Menu from '../components/Menu'
import TicTacToe from '../components/TicTacToe'
import Cell from '../components/Cell'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/TicTacToe/:type',
      name: 'TicTacToe',
      component: TicTacToe
    }
  ]
})
