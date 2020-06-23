<template>
  <div class="leftBody">
    <table class="table-fixed" :style="{ width: `${width}px` }">
      <colgroup>
        <col :width="width" />
      </colgroup>
      <thead>
        <th class="col-header" />
      </thead>
      <tbody>
        <tr v-for="(rowStyle, rowIndex) in rowsHeader">
          <td :style="rowStyle">
            <div
              class="row-header"
              :class="{
                'is-active': isActive(rowIndex),
              }"
              :style="rowStyle"
              @click="handleClick(rowIndex)"
              @mouseenter="(evt) => handleMouseEnter(evt, rowIndex)"
              @mousedown="(evt) => handleMousedown(evt, rowIndex)"
              @mouseup="(evt) => handleMouseUp(evt, rowIndex)"
            >
              {{ rowIndex + 1 }}
              <div
                class="vert-resizable-content"
                @mousedown="(evt) => rowResizeStart(evt, rowIndex, rowStyle)"
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { pxToNum } from 'src/utils/transform.ts';
import select from './mixins/select.js';

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
    select: {
      type: Object,
      require: true,
    },
  },
  mixins: [select],
  data() {
    return {
      width: '100',
      selectStart: false,
    };
  },
  computed: {},
  methods: {
    // 行拉伸
    rowResizeStart(evt, index, row) {
      evt.stopPropagation();
      this.$emit('rowResizeStart', evt, index, pxToNum(row.height));
    },
    isActive(rowIndex) {
      return (
        Math.min(this.select.rowStartIndex, this.select.rowEndIndex) <=
          rowIndex &&
        rowIndex <= Math.max(this.select.rowStartIndex, this.select.rowEndIndex)
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.leftBody
  position: sticky;
  left: 0;
  z-index: 3;
  .vert-resizable-content
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 12px;
    resizable-content(ns-resize);

  th
    border-bottom: 0;

  .is-active
    background-color borderColor
  .row-header
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid borderColor;
    word-break: break-all;
</style>
