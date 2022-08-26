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
    // Rimozione dati vecchi dallo storage
    if (this.$session.exists('playerX')) {
      this.$session.remove('gameDifficulty')
      this.$session.remove('playerX')
      this.$session.remove('playerO')
      this.$session.remove('gameScoreX')
      this.$session.remove('gameScoreO')
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

  .gametype-button:not([disabled]):hover,
  .gametype-button:not([disabled]):focus {
    box-shadow: inset 0 2px 25px #0006;
  }

  .gametype-button:not([disabled]):active {
    box-shadow: inset 0 2px 50px #0008;
  }

  a {
    text-decoration-line: none;
  }

  @media (max-width: 500px) {
    .title-text {
      margin-bottom: 1.5rem;
      font-size: 80px;
    }
  }

  @media (max-width: 430px) or (max-height: 800px) {
    .title-text {
      font-size: 70px;
    }

    .gametype-button {
      font-size: 20px;
    }
  }

  @media (max-width: 380px) {
    .title-text {
      font-size: 60px;
    }

  }

  @media (max-width: 330px) {
    .title-text {
      font-size: 50px;
    }

    .gametype-button {
      font-size: 15px;
    }
  }
</style>
