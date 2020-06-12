<template>
  <div class="sheetsBar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    mounted() {
    },
    methods:{
    }
  };
</script>

<style lang="stylus" scoped>
.sheetsBar
  height 50px
  background bgColor
  display flex
  position relative
  align-items center
  padding 0 20px
  box-sizing border-box
  overflow hidden
</style>
