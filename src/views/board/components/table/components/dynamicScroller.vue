<template>
    <!--    v-debounce="{ event: 'scroll', handler: handleScroll, wait: 100 }"-->
    <div
        class="dynamicScroller"
        ref="scroller"
        @scroll="handleScroll"
        v-on="$listeners"
        v-bind="$attrs"
    >
        <div class="phantom" :style="tableSize"></div>
        <div class="wrapper" ref="wrapper">
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
        return {};
    },
    methods: {
        handleScroll(evt) {
            // if (!this._scrollDirty) {
            //     this._scrollDirty = true;
            //     requestAnimationFrame(() => {
            // this._scrollDirty = false;
            // console.log('scroll')
            // clearTimeout(this._refreshTimout);
            // this._refreshTimout = setTimeout(this.handleScroll, 100);
            // });
            // }
            // let direction = scroll.scrollDirection(el);
            // this.updateVisibleData(el.scrollTop);
            let el = evt.target;
            this.updateVisibleData(el.scrollTop, el.scrollLeft);
        },
        updateVisibleData(scrollTop = 0, scrollLeft = 0) {
            // if (scrollTop >= this.topItem) {
            this.$refs.wrapper.style.transform = `translate(${scrollLeft}px, ${scrollTop}px)`;
            let visibleRows = scroll.findVisibleIndex(
                scrollTop,
                this.$refs.scroller.offsetHeight,
                this.rows,
            );

            let visibleCols = scroll.findVisibleIndex(
                scrollLeft,
                this.$refs.scroller.offsetWidth,
                this.cols,
            );
            this.visibleRowsIndex.start = visibleRows.start;
            this.visibleRowsIndex.end = visibleRows.end;
            this.visibleColsIndex.start = visibleCols.start;
            this.visibleColsIndex.end = visibleCols.end;
            // }
        },
    },
    computed: {
        tableSize() {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`,
            };
        },
        topItem() {
            return scroll.getItemPosition(0, this.visibleRowsIndex.start, this.rows);
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
    .wrapper
        position absolute
        top: 0;
        left: 0;
</style>
