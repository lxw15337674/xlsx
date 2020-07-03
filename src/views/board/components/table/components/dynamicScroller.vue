<template>
    <!--      v-debounce="{ event: 'scroll', handler: handleScroll, wait: 50 }"-->
    <div
        class="dynamicScroller"
        ref="scroller"
        @scroll.passive="handleScroll"
        v-on="$listeners"
        v-bind="$attrs"
    >
        <slot name="before"></slot>
        <div class="phantom" :style="tableSize"></div>
        <div class="wrapper" ref="wrapper" :style="wrapperStyle">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import * as scroll from 'src/utils/scroll.ts';
export default {
    name: 'dynamicScroller',
    inject: ['visibleRowsIndex', 'visibleColsIndex'],
    props: {
        height: {
            type: Number,
        },
        width: {
            type: Number,
        },
        rows: {
            type: Array,
        },
        cols: {
            type: Array,
        },
    },
    components: {},
    data() {
        return {
            tableScrollTop: 0,
            tableScrollLeft: 0,

            scrollMaxHeight: 0, //增加滚动缓存，减少计算
            scrollMaxWidth: 0,
        };
    },
    methods: {
        handleScroll(evt) {
            if (!this.$_scrollDirty) {
                this.$_scrollDirty = true;
                 requestAnimationFrame(() => {
                    this.$_scrollDirty = false;
                    let el = evt.target;
                    let continuous = this.updateVisibleData(el.scrollTop, el.scrollLeft);
                     //todo 滚动性能待优化
                    if (!continuous) {
                        clearTimeout(this.$_refreshTimout);
                        this.$_refreshTimout = setTimeout(this.handleScroll, 100);
                    }
                });
            }

            this.$emit('scroll');
        },
        updateVisibleData(scrollTop = 0, scrollLeft = 0) {
            if (this.tableScrollTop >= scrollTop || this.scrollMaxHeight <= scrollTop) {
                let { start, end } = scroll.findVisibleIndex(
                    scrollTop,
                    this.$refs.scroller.clientHeight,
                    this.rows,
                );
                this.visibleRowsIndex.start = start;
                this.visibleRowsIndex.end = end;
                this.tableScrollTop = scroll.getItemStartPosition(0, start, this.rows);
                this.scrollMaxHeight = this.tableScrollTop + this.rows[start];
            }

            if (this.tableScrollLeft >= scrollLeft || this.scrollMaxWidth <= scrollLeft) {
                let { start, end } = scroll.findVisibleIndex(
                    scrollLeft,
                    this.$refs.scroller.clientWidth,
                    this.cols,
                );
                this.visibleColsIndex.start = start;
                this.visibleColsIndex.end = end;
                this.tableScrollLeft = scroll.getItemStartPosition(0, start, this.cols);
                this.scrollMaxWidth = this.tableScrollLeft + this.cols[start];
            }
            return true
        },
    },
    computed: {
        wrapperStyle() {
            return {
                transform: `translate(${this.tableScrollLeft}px,${this.tableScrollTop}px)`,
            };
        },
        tableSize() {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`,
            };
        },
        bottomItem() {
            return scroll.getItemPosition(0, this.visibleRowsIndex.end, this.rows);
        },
    },
    mounted() {
        this.updateVisibleData();
    },
};
</script>

<style lang="stylus" scoped>
.dynamicScroller
    overflow auto
    position absolute
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .phantom
        position absolute
</style>
