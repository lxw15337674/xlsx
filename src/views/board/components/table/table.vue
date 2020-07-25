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
            <cols-header
                :colsList="colsList"
                :selectedIndex="selectedIndex"
                :offset="offset.left"
                @selectStart="colSelect"
                @select="colsSelect"
                @colResizeStart="colResizeStart"
                @colHeaderClick="colSelect"
            ></cols-header>
            <rows-header
                :rowsList="rowsList"
                :offset="offset.top"
                :selectedIndex="selectedIndex"
                @selectStart="rowSelect"
                @select="rowsSelect"
                @rowResizeStart="rowResizeStart"
                @rowHeaderClick="rowSelect"
            ></rows-header>
            <contextMenu v-hotkey="keymap">
                <div class="table-main">
                    <virtual-scroller-table :rows="rowsList" :cols="colsList" @scroll="scrollHandle">
                        <template slot="before">
                            <div class="select-content" ref="selectedRect" ></div>
                            <div class="copy-content" ref="copyRect"></div>
                            <c-input class="cell-edit-input" ref="editInput" v-show="cellInputShow" v-model="activeCellInput" ></c-input>
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
                                    :value="table[rowIndex] && table[rowIndex][colIndex]"
                                ></textarea>
                            </div>
                        </template>
                    </virtual-scroller-table>
                </div>
                <template slot="contentMenu">
                    <context-item
                        v-for="menuItem in contextMenu"
                        :key="menuItem.label"
                        :divided="menuItem.divided"
                        @click.native="fnCall(menuItem.def)"
                        >
                        <span class="">{{ menuItem.label }}</span>
                        <span class="fr">{{menuItem.hotkey}}</span>
                    </context-item>
                </template>
            </contextMenu>
        </div>
    </div>
</template>
<style lang="stylus" src="./table.styl" scoped></style>

<script src="./table.js"></script>
