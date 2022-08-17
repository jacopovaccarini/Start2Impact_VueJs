//per nascondere la barra di scorrimento laterale
document.body.style.overflow = "hidden";

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Menu from './components/Menu'
import TicTacToe from './components/TicTacToe';
import Cell from './components/Cell';

Vue.config.productionTip = false;

Vue.component('menu', Menu);
Vue.component('tic-tac-toe', TicTacToe);
Vue.component('cell', Cell);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
});
