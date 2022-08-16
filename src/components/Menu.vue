<template>
  <div>
    <div class="menu-button">
      <router-link to="/TicTacToe/giocatore">UN GIOCATORE</router-link>
    </div>
    <div class="menu-button">
      <router-link to="/TicTacToe/giocatori">DUE GIOCATORI</router-link>
    </div>
  </div>
</template>

<script>

</script>

<style>
  .menu-button {
    display: flex;
    justify-content: center;
    margin: auto;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
    border: 1px solid white;
    background-color: darkgreen;
  }
</style>
