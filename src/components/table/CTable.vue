<template>
  <div class="table" ref="table">
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
    <div class="table-container">
      <div class="table-header">
        <table :style="{ width: `${tableWidth}px` }">
          <colgroup>
            <col v-for="col in colsHeader" :width="col.width" />
          </colgroup>
          <thead>
            <tr>
              <th  class="col-header">

              </th>
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
        <!--      左侧固定列头-->
        <left-table
          :rowsHeader="rowsHeader"
          @rowResizeStart="rowResizeStart"
        ></left-table>
        <textarea
          ref="cellInput"
          class="cell-input"
          v-model="activeCellInput"
          :style="[cellInput.style, cellInputRect]"
        />
        <table :style="{ width: `${tableWidth}px` }">
          <colgroup>
            <col v-for="col in colsHeader" :width="col.width" />
          </colgroup>
          <tbody>
            <tr v-for="(rowStyle, rowIndex) in rowsHeader">
              <td
                v-for="(cell, colIndex) in table[rowIndex]"
                v-tip="currentPosition(rowIndex, colIndex)"
                @click.capture="
                  (evt) => handleCellClick(evt, rowIndex, colIndex)
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
  </div>
</template>
<style lang="stylus" src="./CTable.styl"></style>

<script src="./CTable.js"></script>
