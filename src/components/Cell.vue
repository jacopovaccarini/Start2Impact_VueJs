<template>
  <div @click="$emit('click')" class="cell">
    <span v-if="value !== ''">{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  }
}
</script>

<style scoped>
  .cell {
    box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
    width: 120px;
    height: 120px;
    border: 2px solid darkgreen;
    font-size: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 16px;
    cursor: not-allowed;
    background-color: lightgreen;
    color: darkgreen;

    span {
      text-shadow: -1px -1px 0 #000b, -1px 1px 0 #000b, 1px -1px 0 #000b, 1px 1px 0 #000b;
    }
  }

  .cell:not([disabled]):empty:hover,
  .cell:not([disabled]):empty:focus {
    box-shadow: inset 0 2px 25px #0006;
    cursor: pointer;
  }

  .cell:not([disabled]):empty:active {
    box-shadow: inset 0 2px 50px #0008;
  }
</style>
