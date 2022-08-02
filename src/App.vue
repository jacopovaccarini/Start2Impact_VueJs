<template>
  <div id="app">
    <div id="griglia">
      <div id="a1">
        <router-view/>
      </div>
      <div id="a2">
        <router-view/>
      </div>
      <div id="a3">
        <router-view/>
      </div>

      <div id="b1">
        <router-view/>
      </div>
      <div id="b2">
        <router-view/>
      </div>
      <div id="b3">
        <router-view/>
      </div>

      <div id="c1">
        <router-view/>
      </div>
      <div id="c2">
        <router-view/>
      </div>
      <div id="c3">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
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

#griglia {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 200px 200px 200px;
  margin: 0 auto;
}

#a1, #b1, #c1 {
  display: grid;
  border-bottom: 7px solid #ff0000;
  border-right: 7px solid #ff0000;
}
#a2, #b2, #c2 {
  display: grid;
  border-bottom: 7px solid #ff0000;
  border-right: 7px solid #ff0000;
}
#a3, #b3, #c3 {
  display: grid;
  border-bottom: 7px solid #ff0000;
}
#c1, #c2, #c3 {
  border-bottom: none;
}
</style>
