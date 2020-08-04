<template>
    <div class="rows-header">
        <dynamic-scroller :items="rowsList" v-on="$listeners" v-bind="$attrs">
            <template v-slot="{ index, size }">
                <div
                    class="row-header"
                    :style="{ height: `${size}px`, width: `100px` }"
                    :class="{
                        'is-active': isActive(index),
                    }"
                    @click="handleClick(index)"
                    @mouseenter="(evt) => handleMouseEnter(evt, index)"
                    @mousedown="(evt) => handleMousedown(evt, index)"
                    @mouseup="(evt) => handleMouseUp(evt, index)"
                >
                    {{ index + 1 }}
                    <div
                        class="vert-resizable-content"
                        @mousedown="(evt) => rowResizeStart(evt, index, size)"
                    ></div>
                </div>
            </template>
        </dynamic-scroller>
    </div>
</template>

<script>
import select from './mixins/select.js';
import dynamicScroller from 'src/components/dynamicScroller';

export default {
    props: {
        rowsList: {
            type: Array,
            require: true,
        },
        selectedIndex: {
            type: Object,
            require: true,
        },
    },
    mixins: [select],
    components: { dynamicScroller },
    data() {
        return {};
    },
    computed: {},
    methods: {
        // 行拉伸
        rowResizeStart(evt, index, height) {
            evt.stopPropagation();
            this.$emit('rowResizeStart', evt, index, height);
        },
        isActive(rowIndex) {
            return (
                Math.min(this.selectedIndex.rowStartIndex, this.selectedIndex.rowEndIndex) <=
                    rowIndex &&
                rowIndex <=
                    Math.max(this.selectedIndex.rowStartIndex, this.selectedIndex.rowEndIndex)
            );
        },
    },
};
</script>

<style lang="stylus" scoped>
.rows-header
    width 100px
    height 100%
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
