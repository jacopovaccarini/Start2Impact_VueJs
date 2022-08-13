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

<style>
  .cell {
    width: 100px;
    height: 100px;
    border: 2px solid darkgreen;
    font-size: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 12px;
  }
</style>
