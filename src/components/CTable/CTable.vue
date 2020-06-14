<template>
  <div class="c-table">
    <div class="formula-container">
      <div class="formula-key">{{currentPosition(cellInput.rowIndex, cellInput.colIndex)}}</div>
      <textarea class="formula-value" v-model="activeCellInput" />
    </div>
    <div class="table" ref="table">
      <div ref="horiAxis" class="horiAxis" id="horiAxis" style="display: none"></div>
      <div ref="vertAxis" class="vertAxis" id="vertAxis" style="display: none"></div>
      <!--      左侧固定列头-->
      <left-table :rowsHeader="rowsHeader" @rowResizeStart="rowResizeStart"></left-table>
      <div>
        <table class="table-header" :style="{ width: `${tableWidth}px` }">
          <colgroup>
            <col v-for="col in colsHeader" :width="col.width" />
          </colgroup>
          <thead>
            <tr>
              <th class="col-header" ref="cols" v-for="(col, index) in colsHeader">
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
        <c-input class="cell-input" v-model="activeCellInput" :style="cellInputStyle"></c-input>
        <!-- <textarea
          ref="cellInput"
          v-model="activeCellInput"
          :style="[cellInput.style, cellInputRect]"
        />-->
        <table class="table-main" :style="{ width: `${bodyWidth}px` }">
          <colgroup>
            <col v-for="col in colsHeader" :width="col.width" />
          </colgroup>
          <tbody>
            <tr ref="rows" v-for="(rowStyle, rowIndex) in rowsHeader">
              <td
                v-for="(cell, colIndex) in table[rowIndex]"
                v-tip="currentPosition(rowIndex, colIndex)"
                @click.capture="
                  (evt) => handleCellClick(evt, rowIndex, colIndex)
                "
              >
                <div ref="cell" class="cell" :style="rowStyle">
                  <textarea disabled class="cell-content" :data="cell"></textarea>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" src="./CTable.styl"></style>

<script src="./CTable.js"></script>
