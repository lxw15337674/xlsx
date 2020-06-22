<template>
  <div class="c-table">
    <div class="formula-container">
      <div class="formula-key">
        {{ currentPosition(cellInput.rowIndex, cellInput.colIndex) }}
      </div>
      <textarea class="formula-value" v-model="activeCellInput" />
    </div>
    <div class="table" ref="table">
      <!--        <canvas-->
      <!--          class="canvas"-->
      <!--          :width="canvasRect.width"-->
      <!--          :height="canvasRect.height"-->
      <!--        ></canvas>-->
      <div class="select-content" :style="selectStyle"></div>
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
      <c-input
        class="cell-input"
        v-model="activeCellInput"
        :style="cellInputStyle"
      ></c-input>
      <!--      左侧固定列头-->
      <left-table
        :rowsHeader="rowsHeader"
        :select="select"
        @selectStart="rowSelect"
        @select="rowsSelect"
        @rowResizeStart="rowResizeStart"
        @rowHeaderClick="rowSelect"
      ></left-table>
      <div>
        <table-header
          :colsHeader="colsHeader"
          :select="select"
          @selectStart="colSelect"
          @select="colsSelect"
          @colResizeStart="colResizeStart"
          @colHeaderClick="colSelect"
        ></table-header>
        <contextMenu>
          <table class="table-main" :style="{ width: `${bodyWidth}px` }">
            <colgroup>
              <col v-for="col in colsHeader" :width="col.width" />
            </colgroup>
            <tbody>
              <tr ref="rows" v-for="(rowStyle, rowIndex) in rowsHeader">
                <td
                  ref="cell"
                  v-for="(cell, colIndex) in table[rowIndex]"
                  v-tip="currentPosition(rowIndex, colIndex)"
                  @click.capture="
                    (evt) => handleCellClick(evt, rowIndex, colIndex)
                  "
                >
                  <div
                    class="cell"
                    @mousedown="(evt) => startSelect(evt, rowIndex, colIndex)"
                    @mouseenter="(evt) => isSelect(evt, rowIndex, colIndex)"
                    :style="rowStyle"
                  >
                    <textarea
                      disabled
                      class="cell-content"
                      v-model="table[rowIndex][colIndex]"
                    ></textarea>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <template slot="contentMenu">
            <context-item
              v-for="menuItem in contextMenu"
              :key="menuItem.label"
              @click.native="fnCall(menuItem.def)"
              >{{ menuItem.label }}
            </context-item>
          </template>
        </contextMenu>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" src="./table.styl"></style>

<script src="./table.js"></script>
