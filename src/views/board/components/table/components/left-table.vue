<template>
  <div class="leftBody">
    <table class="table-fixed" :style="{ width: `${width}px` }">
      <colgroup>
        <col :width="width" />
      </colgroup>
      <thead>
        <th class="col-header"></th>
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
              @click="rowHeaderClick(rowIndex)"
            >
              {{ rowIndex + 1 }}
              <div
                class="vert-resizable-content"
                @mousedown="(evt) => rowResizeStart(evt, rowIndex)"
              ></div>
            </div>
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
    select: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      width: '100',
    };
  },
  computed:{
    startIndex(){
      return Math.min(this.select.rowStartIndex ,this.select.rowEndIndex)
    },
    endIndex(){
      return Math.max(this.select.rowStartIndex ,this.select.rowEndIndex)
    }
  },
  methods: {
    // 行拉伸
    rowResizeStart(evt, index) {
      this.$emit('rowResizeStart', evt, index);
    },
    //行头点击
    rowHeaderClick(index) {
      this.$emit('rowHeaderClick', index);
    },
    isActive(rowIndex){
      return this.startIndex <= rowIndex && rowIndex<=this.endIndex
    }
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
    height 39px

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
