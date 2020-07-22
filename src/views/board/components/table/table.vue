<template>
    <div class="c-table">
        <!--        <div class="formula-container">-->
        <!--            <div class="formula-key">-->
        <!--                {{ currentPosition(cellInput.rowIndex, cellInput.colIndex) }}-->
        <!--            </div>-->
        <!--            <textarea class="formula-value" v-model="activeCellInput" />-->
        <!--        </div>-->
        <div class="table-container" ref="table">
            <!--        <canvas-->
            <!--          class="canvas"-->
            <!--          :width="canvasRect.width"-->
            <!--          :height="canvasRect.height"-->
            <!--        ></canvas>-->
            <div ref="horiAxis" class="horiAxis" id="horiAxis" style="display: none"></div>
            <div ref="vertAxis" class="vertAxis" id="vertAxis" style="display: none"></div>
<!--            <c-input class="cell-input" v-model="activeCellInput" :style="cellInputStyle"></c-input>-->
<!--            <cols-header-->
<!--                class="table-header"-->
<!--                :colsHeader="visibleCols"-->
<!--                :selectedIndex="selectedIndex"-->
<!--                @selectStart="colSelect"-->
<!--                @select="colsSelect"-->
<!--                @colResizeStart="colResizeStart"-->
<!--                @colHeaderClick="colSelect"-->
<!--            ></cols-header>-->
<!--            <rows-header-->
<!--                class="left-table"-->
<!--                :rowsHeader="visibleRows"-->
<!--                :selectedIndex="selectedIndex"-->
<!--                @selectStart="rowSelect"-->
<!--                @select="rowsSelect"-->
<!--                @rowResizeStart="rowResizeStart"-->
<!--                @rowHeaderClick="rowSelect"-->
<!--            ></rows-header>-->
            <contextMenu>
                <div class="table-main">
                    <virtual-scroller-table :rows="rowsList" :cols="colsList">
                        <template slot="before">
                            <div class="select-content" :style="selectedContent"></div>
                        </template>
                        <template v-slot="{ rowIndex, colIndex, height, width }">
                            <div
                                class="cell"
                                @click="(evt) => handleCellClick(evt, rowIndex, colIndex)"
                                @mousedown="(evt) => startSelect(evt, rowIndex, colIndex)"
                                @mouseenter="(evt) => handleMouseEnter(evt, rowIndex, colIndex)"
                                @contextmenu="(evt) => handleContextMenu(evt, rowIndex, colIndex)"
                                :style="{ height: `${height}px`, width: `${width}px` }"
                            >
                                <textarea
                                    disabled
                                    class="cell-content"
                                    v-model="table[rowIndex] && table[rowIndex][colIndex]"
                                ></textarea>
                            </div>
                        </template>
                    </virtual-scroller-table>
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
