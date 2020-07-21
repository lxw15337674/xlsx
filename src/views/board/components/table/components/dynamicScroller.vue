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
                    let { start, end } = await this.worker.postMessage('findVisibleIndex', [
                        scrollLeft,
                        this.$refs.scroller.clientWidth,
                        this.contentWidth,
                    ]);
                    // let { start, end } = scroll.findVisibleIndex(
                    //     scrollLeft,
                    //     this.$refs.scroller.clientWidth,
                    //     this.contentWidth,
                    // );
                    this.visibleColsIndex.start = start;
                    this.visibleColsIndex.end = end;
                    this.tableScrollLeft = this.contentWidth[start - 1] || 0;
                    this.scrollMaxWidth = this.tableScrollLeft + this.cols[start];
                }
            },
            async updateVertical() {
                let scrollTop = this.$refs.scroller.scrollTop;
                if (this.tableScrollTop >= scrollTop || this.scrollMaxHeight <= scrollTop) {
                    let { start, end } = await this.worker.postMessage('findVisibleIndex', [
                        scrollTop,
                        this.$refs.scroller.clientHeight,
                        this.contentHeight,
                    ]);
                    this.visibleRowsIndex.start = start;
                    this.visibleRowsIndex.end = end;
                    this.tableScrollTop = this.contentHeight[start - 1] || 0;
                    this.scrollMaxHeight = this.tableScrollTop + this.rows[start];
                }
            },
            initTableData() {
                this.updateHorizontal();
                this.updateVertical();
            },
        },
        watch: {
            tableSize: {
                deep: true,
                handler() {},
            },
        },
        computed: {
            worker(){
                return this.$store.state.webWorker.worker
            },
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
            //高度缓存
            contentHeight() {
                let total = 0;
                return this.rows.map((item) => {
                    total += item;
                    return total;
                });
            },
            //长度缓存
            contentWidth() {
                let total = 0;
                return this.cols.map((item) => {
                    total += item;
                    return total;
                });
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
