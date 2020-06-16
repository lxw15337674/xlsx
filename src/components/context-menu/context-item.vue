<template>
  <div>
    <div class="divided" v-if="divided"></div>
    <div class="context-item">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'context-item',
  props: {
    divided: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.context-item
  padding: 10px 16px;
  cursor: pointer;
  font-size 15px
  &:hover
    background-color: #f5f5f5;
.divided
  height: 1px;
  width: 100%;
  margin: 6px 1px;
  background: borderColor
</style>
