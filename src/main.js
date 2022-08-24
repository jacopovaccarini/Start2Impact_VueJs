//per nascondere la barra di scorrimento laterale
document.body.style.overflow = "hidden";

import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSessionStorage from 'vue-sessionstorage';
import App from './App'
import router from './router'
import Menu from './components/Menu'
import TicTacToe from './components/TicTacToe';
import Cell from './components/Cell';

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
Vue.use(VueSessionStorage);

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
