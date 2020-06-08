<template>
  <div class="board">
    <table ref="table" class="resizable-table">
      <div ref="horiAxis" class="horiAxis" id="horiAxis"></div>
      <div ref="vertAxis" class="vertAxis" id="vertAxis"></div>
      <div style="display:flex">
        <textarea
          @blur="handleCellInputBlur()"
          ref="cellInput"
          class="cell-input"
          v-model="cellInput.value"
          :style="[cellInput.style,cellInputRect]"
        />
      </div>
      <colgroup>
        <col v-for="col in colsHeader" :width="col.width" />
      </colgroup>
      <thead align="left">
        <tr>
          <th class="col-header" ref="cols" v-for="(col,index) in colsHeader">
            {{index|charCode}}
            <div class="hori-resizable-content" @mousedown="(evt)=>colResizeStart(evt,index)"></div>
          </th>
        </tr>
      </thead>
      <tr v-for="(row,rowIndex) in data">
        <td class="row-header" ref="rows" :style="rowsHeader[rowIndex]">
          {{rowIndex}}
          <div class="vert-resizable-content" @mousedown="(evt)=>rowResizeStart(evt,rowIndex)"></div>
        </td>
        <td v-for="(cell,colIndex) in row">
          <div
            class="cell"
            v-tip="currentPosition(rowIndex,colIndex)"
            @click.capture="(evt)=>handleCellClick(evt,rowIndex,colIndex,cell)"
          >{{cell.value}}</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script src='./board.js'>
</script>

<style lang="stylus" src="./board.styl" scoped></style>
