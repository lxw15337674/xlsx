<template>
  <table class="table-header">
    <colgroup>
      <col v-for="col in colsHeader" :width="col.width" />
    </colgroup>
    <thead>
      <tr>
        <th ref="cols" v-for="(col, index) in colsHeader">
          <div
            :class="[{ 'is-active': isActive(index) }, 'col-header']"
            @click="handleClick(index)"
            @mouseenter="(evt) => handleMouseEnter(evt, index)"
            @mousedown="(evt) => handleMousedown(evt, index)"
            @mouseup="(evt) => handleMouseUp(evt, index)"
          >
            {{ index | indexToChar }}
            <div
              class="hori-resizable-content"
              @mousedown="(evt) => colResizeStart(evt, index, col.width)"
            ></div>
          </div>
          <!--              <el-button @click="clearCol(index)">删除</el-button>-->
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
import { indexToChar } from 'src/utils/transform';
import select from './mixins/select.js';
export default {
  name: 'table-header',
  inject: ['rootTable'],
  mixins: [select],
  props: {
    colsHeader: {
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
    tableWidth: {},
  },
  data() {
    return {
      width: '100',
    };
  },
  filters: {
    indexToChar(index) {
      return indexToChar(index);
    },
  },
  computed: {},
  methods: {
    // 行拉伸
    colResizeStart(evt, index, colWidth) {
      evt.stopPropagation();
      this.$emit('colResizeStart', evt, index, colWidth);
    },
    isActive(colIndex) {
      return (
        Math.min(this.select.colStartIndex, this.select.colEndIndex) <=
          colIndex &&
        colIndex <= Math.max(this.select.colStartIndex, this.select.colEndIndex)
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.col-header
  height 40px
  display flex
  align-items center
  justify-content center
</style>
