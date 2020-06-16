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
            <div class="row-header" :style="rowStyle">
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
.leftBody {
  position: sticky;
  left: 0;
  z-index: 3;

  .vert-resizable-content {
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 12px;
    resizable-content(ns-resize);
  }

  th {
    border-bottom: 0;
    height 39px
  }

  .row-header {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid borderColor;
    word-break: break-all;
  }
}
</style>
