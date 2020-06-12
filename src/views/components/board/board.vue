<template>
  <div class="board">
      <menu-bar>
        <el-button @click="exportFile" size="mini">输出当前页</el-button>
      </menu-bar>
    <div class="formula-container">
      <div class="formula-key">
<!--        {{currentPosition(cellInput.rowIndex, cellInput.colIndex)}}-->
      </div>
<!--      <input class="formula-value" v-model="activeCellInput"></input>-->
    </div>
    <c-table v-model="table" ></c-table>
  </div>
</template>

<script src="./board.js"></script>

<style lang="stylus" src="./board.styl" scoped></style>
