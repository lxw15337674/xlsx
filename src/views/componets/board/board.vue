<template>
  <div ref="table" class="board">
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
    <textarea
      @blur="handleCellInputBlur()"
      ref="cellInput"
      class="cell-input"
      v-model="cellInput.value"
      :style="[cellInput.style, cellInputRect]"
    />
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
              {{ index | charCode }}
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
      <table :style="{ width: `${tableWidth}px` }">
        <colgroup>
          <col v-for="col in colsHeader" :width="col.width" />
        </colgroup>
        <tbody>
          <tr v-for="(row, rowIndex) in data">
            <td class="row-header" ref="rows" :style="rowsHeader[rowIndex]">
              {{ rowIndex }}
              <div
                class="vert-resizable-content"
                @mousedown="(evt) => rowResizeStart(evt, rowIndex)"
              ></div>
            </td>
            <td v-for="(cell, colIndex) in row">
              <div
                class="cell"
                v-tip="currentPosition(rowIndex, colIndex)"
                @click.capture="
                  (evt) => handleCellClick(evt, rowIndex, colIndex, cell)
                "
              >
                {{ cell.value }}
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
