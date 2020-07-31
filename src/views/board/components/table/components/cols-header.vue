<template>
    <div class="cols-header">
        <div class="col-container" style="min-width: 100px"></div>
        <dynamic-scroller
            :items="colsList"
            direction="horizontal"
            v-on="$listeners"
            v-bind="$attrs"
        >
            <template v-slot="{ index, size }">
                <div
                    :style="{ width: `${size}px` }"
                    class="col-container"
                    :class="[{ 'is-active': isActive(index) }]"
                    @click="handleClick(index)"
                    @mouseenter="(evt) => handleMouseEnter(evt, index)"
                    @mousedown="(evt) => handleMousedown(evt, index)"
                    @mouseup="(evt) => handleMouseUp(evt, index)"
                >
                    <div>
                        {{ index | indexToChar }}
                    </div>
                    <div
                        class="hori-resizable-content"
                        @mousedown="(evt) => colResizeStart(evt, index, size)"
                    ></div>
                </div>
            </template>
        </dynamic-scroller>
    </div>
</template>

<script>
import { indexToChar } from 'src/utils/transform.ts';
import dynamicScroller from 'src/components/dynamicScroller';
import select from './mixins/select.js';
export default {
    name: 'cols-header',
    mixins: [select],
    components: { dynamicScroller },
    props: {
        colsList: {
            type: Array,
            require: true,
        },
        selectedIndex: {
            type: Object,
            require: true,
        },
    },
    data() {
        return {};
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
                Math.min(this.selectedIndex.colStartIndex, this.selectedIndex.colEndIndex) <=
                    colIndex &&
                colIndex <=
                    Math.max(this.selectedIndex.colStartIndex, this.selectedIndex.colEndIndex)
            );
        },
    },
};
</script>

<style lang="stylus" scoped>
.cols-header
    height 40px
    display flex
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
