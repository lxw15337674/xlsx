<template>
    <div class="menuBar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    mounted() {},
    methods: {},
};
</script>

<style lang="stylus" scoped>
.menuBar {
  height: 50px;
  background: bgColor;
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 20px;
}
</style>
