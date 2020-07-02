<template>
    <table class="table-header">
        <thead>
            <tr>
                <th>
                    <div style="width:100px" class="col-container">全选</div>
                </th>
                <th v-for="col in colsHeader">
                    <div
                        :style="{ width: `${col.width}px` }"
                        class="col-container"
                        :class="[{ 'is-active': isActive(col.index) }]"
                        @click="handleClick(col.index)"
                        @mouseenter="(evt) => handleMouseEnter(evt, col.index)"
                        @mousedown="(evt) => handleMousedown(evt, col.index)"
                        @mouseup="(evt) => handleMouseUp(evt, col.index)"
                    >
                        <div>
                            {{ col.index | indexToChar }}
                        </div>
                        <div
                            class="hori-resizable-content"
                            @mousedown="(evt) => colResizeStart(evt, col.index, col.width)"
                        ></div>
                    </div>
                    <!--              <el-button @click="clearCol(index)">删除</el-button>-->
                </th>
            </tr>
        </thead>
    </table>
</template>

<script>
import { indexToChar } from 'src/utils/transform.ts';
import select from './mixins/select.js';
export default {
    name: 'cols-header',
    mixins: [select],
    props: {
        colsHeader: {
            type: Array,
            require: true,
        },
        tableRect: {
            type: Object,
            require: true,
        },
        select: {
            type: Object,
            require: true,
        },
        tableWidth: {},
    },
    data() {
        return {
            width: '100',
        };
    },
    filters: {
        indexToChar(index) {
            return indexToChar(index);
        },
    },
    computed: {},
    methods: {
        // 行拉伸
        colResizeStart(evt, index, colWidth) {
            evt.stopPropagation();
            this.$emit('colResizeStart', evt, index, colWidth);
        },
        isActive(colIndex) {
            return (
                Math.min(this.select.colStartIndex, this.select.colEndIndex) <= colIndex &&
                colIndex <= Math.max(this.select.colStartIndex, this.select.colEndIndex)
            );
        },
    },
};
</script>

<style lang="stylus" scoped>
.is-active
    background-color borderColor
.col-container
    width 100px
    border-top 1px solid borderColor
    border-right  1px solid borderColor
    border-bottom 1px solid borderColor
    height 40px
    vertical-align: middle
    text-align: center
    word-break: break-all
    box-sizing border-box
    display flex
    justify-content center
    align-items  center
    position relative
    .hori-resizable-content
        right: -6px;
        top: 0;
        width: 12px;
        height: 100%;
        resizable-content(col-resize)
</style>
