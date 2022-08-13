<template>
  <div id="app">
    <tic-tac-toe />
  </div>
</template>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Saira:wght@300&display=swap");

  * {
    box-sizing: border-box;
    font-family: "Saira", sans-serif;
  }

  html {
    height: 100%;
    display: flex;
    background-color: #0f871f;
    }

  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 1rem;
    width: 50%;
    height: 100%;
  }

  #app {
    text-align: center;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
</style>
