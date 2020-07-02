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
            <div ref="horiAxis" class="horiAxis" id="horiAxis" style="display: none"></div>
            <div ref="vertAxis" class="vertAxis" id="vertAxis" style="display: none"></div>
            <!--            <c-input class="cell-input" v-model="activeCellInput" :style="cellInputStyle"></c-input>-->
            <cols-header
                class="table-header"
                :colsHeader="visibleCols"
                :select="select"
                @selectStart="colSelect"
                @select="colsSelect"
                @colResizeStart="colResizeStart"
                @colHeaderClick="colSelect"
            ></cols-header>
            <rows-header
                class="left-table"
                :rowsHeader="visibleRows"
                :select="select"
                @selectStart="rowSelect"
                @select="rowsSelect"
                @rowResizeStart="rowResizeStart"
                @rowHeaderClick="rowSelect"
            ></rows-header>
            <contextMenu>
                <div class="table-main">
                    <dynamic-scroller
                        ref="scroller"
                        :height="tableHeight"
                        :width="tableWidth"
                        :rows="rowsList"
                        :cols="colslist"
                    >
                        <template slot="before">
                            <div class="select-content" :style="selectContent"></div>
                        </template>
                        <slot>
                            <table :style="visibleTableStyle">
                                <colgroup>
                                    <col
                                        v-for="col in visibleCols"
                                        :key="col.id"
                                        :style="{ width: `${col.width}px` }"
                                    />
                                </colgroup>
                                <tbody>
                                    <tr ref="rows" v-for="row in visibleRows" :key="row.id">
                                        <td
                                            ref="cell"
                                            v-for="col in visibleCols"
                                            :key="col.id"
                                            @click.capture="
                                                (evt) => handleCellClick(evt, row.index, col.index)
                                            "
                                        >
                                            <div
                                                class="cell"
                                                @mousedown="
                                                    (evt) => startSelect(evt, row.index, col.index)
                                                "
                                                @mouseenter="
                                                    (evt) => isSelect(evt, row.index, col.index)
                                                "
                                                :style="{
                                                    height: `${row.height}px`,
                                                }"
                                            >
                                                <textarea
                                                    disabled
                                                    class="cell-content"
                                                    v-model="table[row.index][col.index]"
                                                ></textarea>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </slot>
                    </dynamic-scroller>
                </div>
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
</template>
<style lang="stylus" src="./table.styl" scoped></style>

<script src="./table.js"></script>
