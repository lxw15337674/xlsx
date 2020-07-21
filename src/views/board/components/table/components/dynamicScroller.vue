<template>
    <!--          v-debounce="{ event: 'scroll', handler: handleScroll, wait: 50 }"-->
    <!--        @scroll.passive="handleScroll"-->

    <div
        class="dynamicScroller"
        ref="scroller"
        @scroll.passive="handleScroll"
        v-on="$listeners"
        v-bind="$attrs"
    >
        <slot name="before"></slot>
        <div @resize="handleScroll" ref="phantom" class="phantom" :style="tableSize"></div>
        <div class="wrapper" ref="wrapper" :style="wrapperStyle">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import * as scroll from 'src/utils/scroll.ts';
let worker= new scroll.Worker()

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
            cacheCols: [],
            cacheRows: [],
        };
    },
    methods: {
        handleScroll() {
            switch (scroll.scrollToPosition(this.$refs.scroller)) {
                case 'horizontal':
                    this.updateHorizontal();
                    break;
                case 'vertical':
                    this.updateVertical();
            }
            this.$emit('scroll');
        },
        async updateHorizontal() {
            let scrollLeft = this.$refs.scroller.scrollLeft;
            if (this.tableScrollLeft >= scrollLeft || this.scrollMaxWidth <= scrollLeft) {
                let start = await worker.postMessage('findStartIndex', [
                    scrollLeft,
                    this.cols,
                ]);
                this.visibleColsIndex.start = start;
                this.visibleColsIndex.end = this.cacheCols[start];
                this.tableScrollLeft = await worker.postMessage('getItemStartPosition', [
                    0,
                    start,
                    this.cols,
                ]);
                this.scrollMaxWidth = this.tableScrollLeft + this.cols[start];
            }
        },
        async updateVertical() {
            let scrollTop = this.$refs.scroller.scrollTop;
            if (this.tableScrollTop >= scrollTop || this.scrollMaxHeight <= scrollTop) {
                let start = scroll.findStartIndex(scrollTop, this.rows);
                this.visibleRowsIndex.start = start;
                this.visibleRowsIndex.end = this.cacheRows[start];
                this.tableScrollTop = scroll.getItemStartPosition(0, start, this.rows);
                this.scrollMaxHeight = this.tableScrollTop + this.rows[start];
            }
        },
        initTableData() {
            this.updateHorizontal(0);
            this.updateVertical(0);
            this.cache();
        },
        async cache() {
            this.cacheCols = await worker.postMessage('visibleCache', [
                this.$refs.scroller.clientWidth,
                this.cols,
            ]);
            this.cacheRows = await worker.postMessage('visibleCache', [
                this.$refs.scroller.clientHeight,
                this.rows,
            ]);
        },
    },
    watch: {
        tableSize: {
            deep: true,
            handler() {},
        },
        cols: {
            deep: true,
            handler() {
                this.cache();
            },
        },
        rows: {
            deep: true,
            handler() {
                this.cache();
            },
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
    },
    mounted() {
        this.initTableData();
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
