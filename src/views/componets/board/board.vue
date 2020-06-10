<template>
  <div ref="table" class="board">
    {{this.tableData}}
    <el-button @click="exportFile">输出当前页</el-button>
    <div
      ref="horiAxis"
      class="horiAxis"
      id="horiAxis"
      style="display: none"
    ></div>
    <div
      ref="vertAxis"
      class="vertAxis"
      id="vertAxis"
      style="display: none"
    ></div>
    <div class="table-header">
      <table :style="{ width: `${tableWidth}px` }">
        <colgroup>
          <col v-for="col in colsHeader" :width="col.width" />
        </colgroup>
        <thead>
          <tr>
            <th
              class="col-header"
              ref="cols"
              v-for="(col, index) in colsHeader"
            >
<!--              <el-button @click="clearCol(index)">删除</el-button>-->
              {{ index | indexToChar }}
              <div
                class="hori-resizable-content"
                @mousedown="(evt) => colResizeStart(evt, index)"
              ></div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="table-body">
      <textarea
        @blur="handleCellInputBlur()"
        ref="cellInput"
        class="cell-input"
        v-model="cellInput.value"
        :style="[cellInput.style, cellInputRect]"
      />
      <table :style="{ width: `${tableWidth}px` }">
        <colgroup>
          <col v-for="col in colsHeader" :width="col.width" />
        </colgroup>
        <tbody>
          <tr v-for="(rowStyle, rowIndex) in rowsHeader">
            <td class="row-header" ref="rows" :style="rowStyle">
              {{ rowIndex+1 }}
<!--              <el-button @click="clearRow(rowIndex)">删除</el-button>-->
              <div
                class="vert-resizable-content"
                @mousedown="(evt) => rowResizeStart(evt, rowIndex)"
              ></div>
            </td>
            <td
              v-for="(cell, colIndex) in table[rowIndex]"
              v-tip="currentPosition(rowIndex, colIndex )"
              @click.capture="
                (evt) => handleCellClick(evt, colIndex,rowIndex)
              "
            >
              <div class="cell">
                <textarea disabled>{{ cell }}</textarea>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./board.js"></script>

<style lang="stylus" src="./board.styl" scoped></style>
