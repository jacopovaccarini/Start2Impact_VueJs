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

<style>
  .title-text {
    display: flex;
    justify-content: center;
    margin: auto;
    margin-bottom: 2rem;
    font-size: 60px;
    width: 100%;
  }

  .menu-button {
    box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin: auto;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    width: 60%;
    border: 1px solid white;
    background-color: darkgreen;
    color: white;
    text-decoration-line: none;
  }

  .menu-button:not([disabled]):hover,
  .menu-button:not([disabled]):focus {
    box-shadow: inset 0 2px 25px #0006;
  }

  .menu-button:not([disabled]):active {
    box-shadow: inset 0 2px 50px #0008;
  }
</style>
