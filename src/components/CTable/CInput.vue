<template>
  <textarea
    ref="cellInput"
    :value="val"
    @input="$emit('valUpdate', $event.target.value)"
    :style="[cellInputRect]"
  />
</template>

<script>
export default {
  data() {
    return {};
  },
  model: {
    prop: 'val',
    event: 'valUpdate',
  },
  props: {
    val: [String, Number],
  },
  watch: {},
  computed: {
    // 输入框宽度,高度自适应
    cellInputRect() {
      if (!this.$refs.cellInput) {
        return {};
      }
      let strList = this.val
        ? this.val.split('\n').map((item) => item.length)
        : '';
      let width = Math.max(
        Math.max(...strList) * 8 + 20,
        parseFloat(this.$refs.cellInput.getBoundingClientRect().width),
      );

      let height = Math.max(
        strList.length * 17 + 10,
        parseFloat(this.$refs.cellInput.getBoundingClientRect().height),
      );
      return {
        width: `${width}px`,
        height: `${width}px`,
      };
      // } else {
      //   return {};
      // }
    },
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.cell-input {
  position: absolute;
  border: 1px solid activeColor;
  font-size: 15px;
  resize: none;
  overflow: hidden;
  z-index: 1;
  width: 100px;
  height: 40px;

  &:focus {
    outline-color: activeColor;
  }
}
</style>