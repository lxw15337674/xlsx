<template>
    <div
        class="dynamicScroller"
        :class="{ [`direction-${direction}`]: true }"
        ref="scroller"
        @scroll.passive="handleScroll"
    >
        <div class="wrapper" ref="wrapper" :style="tableSize">
            <div
                class="item-view"
                :class="direction"
                v-for="view of pool"
                :key="view.id"
                :style="{
                    transform: `translate${direction === 'vertical' ? 'Y' : 'X'}(${
                        view.position
                    }px)`,
                }"
            >
                <slot :size="view.item" :index="view.index" :active="view.used"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import * as scroll from '../utils/scroll.ts';
import * as math from '../utils/math.ts';
let uid = 0;
export default {
    name: 'dynamicScroller',
    props: {
        items: {
            type: Array,
            require: true,
            default: [],
        },
        direction: {
            type: String,
            default: 'vertical',
            validator: (value) => ['vertical', 'horizontal'].includes(value),
        },
        offset: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            pool: [],
            visibleIndex: {
                start: -1,
                end: -1,
            },
        };
    },
    methods: {
        usedView(viewIndex, itemsIndex) {
            let view = {},
                { items, itemsPosition } = this;
            if (this.pool[viewIndex]) {
                view = this.pool[viewIndex];
                view.item = items[itemsIndex];
                view.index = itemsIndex;
                view.used = true;
                view.position = itemsPosition[itemsIndex - 1] || 0;
            } else {
                view = {
                    item: this.items[itemsIndex],
                    position: itemsPosition[itemsIndex - 1] || 0,
                    index: itemsIndex,
                    id: uid++,
                    used: true,
                };
                this.pool.push(view);
            }
            return view;
        },
        unusedView(view) {
            view.used = false;
            view.position = -9999;
        },
        updateVisibleItems() {
            let { start, end } = this.visibleIndex;
            let viewIndex = 0;
            //更新使用的view
            for (let i = start; i <= end; i++) {
                this.usedView(viewIndex, i);
                viewIndex++;
            }
            // 处理不使用的view
            for (let i = viewIndex; i < this.pool.length; i++) {
                this.unusedView(this.pool[i]);
            }
        },
        handleScroll() {
            if (this.direction === 'vertical') {
                this.handleVisibilityChange(this.offset, this.$refs.scroller.clientHeight);
            } else {
                this.handleVisibilityChange(this.offset, this.$refs.scroller.clientWidth);
            }
        },
        handleVisibilityChange(offset, clientSize) {
            let { start, end } = scroll.findVisibleIndex(offset, clientSize, this.itemsPosition);
            this.visibleIndex.start = start;
            this.visibleIndex.end = end;
            this.updateVisibleItems();
        },
    },
    watch: {
        items: {
            deep: true,
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.handleScroll();
                });
            },
        },
        offset: {
            handler() {
                let scroller = this.$refs.scroller;
                this.handleScroll();
                if (this.direction === 'vertical') {
                    scroller.scrollTop = this.offset;
                } else {
                    scroller.scrollLeft = this.offset;
                }
            },
        },
    },
    computed: {
        tableSize() {
            if (this.direction === 'vertical') {
                return {
                    minHeight: `${math.total(this.items, 0, -1)}px`,
                    width: '100%',
                };
            } else {
                return {
                    height: '100%',
                    minWidth: `${math.total(this.items, 0, -1)}px`,
                };
            }
        },
        //尺寸缓存
        itemsPosition() {
            let total = 0;
            return this.items.map((item) => {
                total += item;
                return total;
            });
        },
    },
    mounted() {
        window.addEventListener('resize', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleScroll);
    },
};
</script>

<style lang="stylus" scoped>
.dynamicScroller
    position relative;
    height 100%
    width 100%
    overflow hidden
    .item-view
        will-change transform;
        position absolute;
        top 0;
        left 0;
.direction-horizontal
    display: flex;
</style>
