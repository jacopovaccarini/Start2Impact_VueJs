//per nascondere la barra di scorrimento laterale
document.body.style.overflow = "hidden";

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import TicTacToe from './components/TicTacToe';
import Cell from './components/Cell';

Vue.component('tic-tac-toe', TicTacToe);
Vue.component('cell', Cell);

new Vue({
  el: '#app',
  render: h => h(App)
});
