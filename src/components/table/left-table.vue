<template>
  <div class="leftBody">
    <table :style="{ width: `${width}px` }">
      <colgroup>
        <col :width="width" />
      </colgroup>
      <tbody>
        <tr v-for="(rowStyle, rowIndex) in rowsHeader">
          <td class="row-header"  :style="rowStyle">
            {{ rowIndex + 1 }}
            <div
              class="vert-resizable-content"
              @mousedown="(evt) => rowResizeStart(evt, rowIndex)"
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    rowsHeader: {
      type: Array,
      require: true,
    },
    tableRect: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      width: '100',
    };
  },
  methods: {
    // 行拉伸
    rowResizeStart(evt, index) {
      this.$emit('rowResizeStart', evt, index);
    },
  },
};
</script>

<style lang="stylus" scoped>

.leftBody
  .row-header
    border-right 0
  .vert-resizable-content
    position: absolute;
    bottom:-6px
    left:0
    width: 100%;
    height: 12px
    resizable-content(ns-resize)
</style>
