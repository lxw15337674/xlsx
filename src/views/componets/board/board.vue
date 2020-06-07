<template>
  <div class="board">
    <table ref="table" class="resizable-table">
      <div class="horiAxis" id="horiAxis" :style="horiAxis"></div>
      <div class="vertAxis" id="vertAxis" :style="vertAxis"></div>
      <colgroup>
        <col v-for="col in colsHeader" :width="col.width" />
      </colgroup>
      <thead align="left">
        <tr>
          <th class="col-header" ref="cols" v-for="(col,index) in colsHeader">
            {{index|charcode}}
            <div class="hori-resizable-content" @mousedown="(evt)=>HoriResizeStart(evt,index)"></div>
          </th>
        </tr>
      </thead>
      <tr v-for="(row,rowIndex) in data">
        <td class="row-header" ref="rows" :style="rowsHeader[rowIndex]">
          {{rowIndex}}
          <div class="vert-resizable-content" @mousedown="(evt)=>VertResizeStart(evt,rowIndex)"></div>
        </td>
        <td v-for="(cell,colIndex) in row" v-tip="currentPosition(rowIndex,colIndex)">
          <div class="cell">123</div>
        </td>
        <!--        <th >-->
        <!--        </th>-->
        <!--        <th  v-for="(row,key) in data" :key="`${key}${row}`">-->
        <!--            {{col}} {{key}}-->
        <!--        </th>-->
      </tr>
    </table>
  </div>
</template>

<script src='./board.js'>
</script>

<style lang="stylus" src="./board.styl" scoped></style>