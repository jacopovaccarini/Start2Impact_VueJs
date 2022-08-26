<template>
  <div @click="$emit('click')" class="cell">
    <span v-if="value !== ''">{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  }
}
</script>

<style scoped>
  .cell {
    box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
    width: 140px;
    height: 140px;
    border: 2px solid darkgreen;
    font-size: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 22px;
    cursor: not-allowed;
    background-color: lightgreen;
    color: yellow;
  }

  .cell:not([disabled]):empty:hover,
  .cell:not([disabled]):empty:focus {
    box-shadow: inset 0 2px 25px #0006;
    cursor: pointer;
  }

  .cell:not([disabled]):empty:active {
    box-shadow: inset 0 2px 50px #0008;
  }

  span {
    text-shadow: -1px -1px 0 #000b, -1px 1px 0 #000b, 1px -1px 0 #000b, 1px 1px 0 #000b;
  }

  @media (max-width: 500px) {
    .cell {
      width: 120px;
      height: 120px;
      font-size: 120px;
      padding-bottom: 20px;
    }
  }

  @media (max-width: 430px) {
    .cell {
      width: 100px;
      height: 100px;
      font-size: 100px;
      padding-bottom: 18px;
    }
  }

  @media (max-width: 380px) or (max-height: 700px) {
    .cell {
      width: 100px;
      height: 100px;
      font-size: 100px;
      padding-bottom: 18px;
    }
  }

  @media (max-width: 330px) {
    .cell {
      width: 80px;
      height: 80px;
      font-size: 80px;
      padding-bottom: 14px;
    }
  }
</style>
