<template>
    <div class="left-body">
        <table :style="{ width: `${width}px` }">
            <!--      <colgroup>-->
            <!--        <col :style="{ width: `${width}px` }" />-->
            <!--      </colgroup>-->
            <!--            <thead>-->
            <!--                <th class="col-header" />-->
            <!--            </thead>-->
            <tbody>
                <tr v-for="row in rowsHeader">
                    <td :style="{ height: `${row.height}px` }">
                        <div
                            class="row-header"
                            :class="{
                                'is-active': isActive(row.index),
                            }"
                            @click="handleClick(row.index)"
                            @mouseenter="(evt) => handleMouseEnter(evt, row.index)"
                            @mousedown="(evt) => handleMousedown(evt, row.index)"
                            @mouseup="(evt) => handleMouseUp(evt, row.index)"
                        >
                            {{ row.index + 1 }}
                            <div class="vert-resizable-content" @mousedown="(evt) => rowResizeStart(evt, row.index, row.height)"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import select from './mixins/select.js';

export default {
    props: {
        rowsHeader: {
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
    },
    mixins: [select],
    data() {
        return {
            width: '100',
            selectStart: false,
        };
    },
    computed: {},
    methods: {
        // 行拉伸
        rowResizeStart(evt, index, height) {
            evt.stopPropagation();
            this.$emit('rowResizeStart', evt, index, height);
        },
        isActive(rowIndex) {
            return Math.min(this.select.rowStartIndex, this.select.rowEndIndex) <= rowIndex && rowIndex <= Math.max(this.select.rowStartIndex, this.select.rowEndIndex);
        },
    },
};
</script>

<style lang="stylus" scoped>
.left-body
    width 100px


    .is-active
        background-color borderColor
    .row-header
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid borderColor;
        border-bottom: 1px solid borderColor;
        word-break: break-all
        position relative
        .vert-resizable-content
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 100%;
            height: 12px;
            resizable-content(ns-resize);
</style>
