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
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
</style>
