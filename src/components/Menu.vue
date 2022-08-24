<template>
  <div>
    <div class="title-text">
      Tic Tac Toe
    </div>
    <router-link to="/TicTacToe/Giocatore">
      <div class="gametype-button">
        <a>UN GIOCATORE</a>
      </div>
    </router-link>
    <router-link to="/TicTacToe/Giocatori">
      <div class="gametype-button">
        <a>DUE GIOCATORI</a>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  created () {
    if (this.$session.exists('playerX')) {
      this.$session.remove('gameDifficulty');
      this.$session.remove('playerX');
      this.$session.remove('playerO');
    }
  }
}
</script>

<style>
  .title-text {
    display: flex;
    justify-content: center;
    margin: auto;
    margin-bottom: 2rem;
    font-size: 90px;
    width: 100%;
  }

  .gametype-button {
    box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin: auto;
    padding: 1rem;
    margin-bottom: 1.5rem;
    width: 70%;
    border: 1px solid white;
    border-radius: 10px;
    background-color: darkgreen;
    color: white;
    font-size: 30px;
  }

  a {
    text-decoration-line: none;
  }

  .gametype-button:not([disabled]):hover,
  .gametype-button:not([disabled]):focus {
    box-shadow: inset 0 2px 25px #0006;
  }

  .gametype-button:not([disabled]):active {
    box-shadow: inset 0 2px 50px #0008;
  }
</style>
