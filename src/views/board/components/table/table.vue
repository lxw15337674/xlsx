<!--suppress ALL -->
<template>
    <div class="c-table">
        <div class="formula-container">
            <div class="formula-key">
                {{ currentPosition(cellInput.rowIndex, cellInput.colIndex) }}
            </div>
            <textarea class="formula-value" v-model="activeCellInput" />
        </div>
        <div class="table-container" ref="table">
            <!--        <canvas-->
            <!--          class="canvas"-->
            <!--          :width="canvasRect.width"-->
            <!--          :height="canvasRect.height"-->
            <!--        ></canvas>-->
            <div class="select-content" :style="selectStyle"></div>
            <div ref="horiAxis" class="horiAxis" id="horiAxis" style="display: none"></div>
            <div ref="vertAxis" class="vertAxis" id="vertAxis" style="display: none"></div>
            <c-input class="cell-input" v-model="activeCellInput" :style="cellInputStyle"></c-input>
            <table-header
                class="table-header"
                :colsHeader="colsHeader"
                :select="select"
                @selectStart="colSelect"
                @select="colsSelect"
                @colResizeStart="colResizeStart"
                @colHeaderClick="colSelect"
            ></table-header>
            <left-table
                class="left-table"
                :rowsHeader="rowsHeader"
                :select="select"
                @selectStart="rowSelect"
                @select="rowsSelect"
                @rowResizeStart="rowResizeStart"
                @rowHeaderClick="rowSelect"
            ></left-table>
            <contextMenu>
                <div class="table-main" @scroll="handleScroll">
                    <div class="phantom" :style="tableStyle"></div>
                    <div class="visible" ref="contentTable">
                        <table>
                            <colgroup>
                                <col v-for="col in colsHeader" :style="{ width: `${col.width}px` }" />
                            </colgroup>
                            <tbody>
                                <tr ref="rows" v-for="(rowStyle, rowIndex) in visibleTable">
                                    <td
                                        ref="cell"
                                        v-for="(cell, colIndex) in table[rowIndex]"
                                        v-tip="currentPosition(rowIndex, colIndex)"
                                        @click.capture="(evt) => handleCellClick(evt, rowIndex, colIndex)"
                                    >
                                        <div
                                            class="cell"
                                            @mousedown="(evt) => startSelect(evt, rowIndex, colIndex)"
                                            @mouseenter="(evt) => isSelect(evt, rowIndex, colIndex)"
                                            :style="{
                                                height: `${rowStyle.height}px`,
                                            }"
                                        >
                                            <textarea disabled class="cell-content" v-model="visibleTable[rowIndex][colIndex]"></textarea>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <template slot="contentMenu">
                    <context-item v-for="menuItem in contextMenu" :key="menuItem.label" @click.native="fnCall(menuItem.def)">{{ menuItem.label }} </context-item>
                </template>
            </contextMenu>
        </div>
    </div>
</template>
<style lang="stylus" src="./table.styl" scoped></style>

<script src="./table.js"></script>
