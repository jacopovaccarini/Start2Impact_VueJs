<template>
  <div>
    <div class="title-text">
      Tic Tac Toe
    </div>
    <router-link to="/TicTacToe/Giocatore">
      <div class="menu-button">
        <a>UN GIOCATORE</a>
      </div>
    </router-link>
    <router-link to="/TicTacToe/Giocatori">
      <div class="menu-button">
        <a>DUE GIOCATORI</a>
      </div>
    </router-link>
  </div>
</template>

<script>

</script>

<style>
  .title-text {
    display: flex;
    justify-content: center;
    margin: auto;
    font-size: 60px;
    width: 100%;
  }

  .menu-button {
    display: flex;
    justify-content: center;
    margin: auto;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
    border: 1px solid white;
    background-color: darkgreen;
    color: white;
    text-decoration-line: none;
  }
</style>
