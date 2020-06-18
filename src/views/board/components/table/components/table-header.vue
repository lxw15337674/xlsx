<template>
  <table class="table-header" >
    <colgroup>
      <col v-for="col in colsHeader" :width="col.width" />
    </colgroup>
    <thead>
      <tr>
        <th
          ref="cols"
          v-for="(col, index) in colsHeader"
          :class="[
            {
              'is-active': isActive(index),
            },
            'col-header',
          ]"
        >
          <!--              <el-button @click="clearCol(index)">删除</el-button>-->
          {{ index | indexToChar }}
          <div
            class="hori-resizable-content"
            @mousedown="(evt) => colResizeStart(evt, index,col.width)"
          ></div>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
import { indexToChar } from 'src/utils/transform';

export default {
  name: 'table-header',
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
    colResizeStart(evt, index,colWidth) {
      this.$emit('colResizeStart', evt, index,colWidth);
    },
    //行头点击
    colHeaderClick(index) {
      this.$emit('colHeaderClick', index);
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

<style scoped></style>
