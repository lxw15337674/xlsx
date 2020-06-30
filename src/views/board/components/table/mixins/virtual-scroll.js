import * as scroll from '@/utils/scroll.ts';

export default {
    data() {
        return {
            visibleRowsIndex: [0, 0],
            visibleColsIndex: [0, 0],
        };
    },
    mounted() {
        this.updateVisibleData();
    },
    computed: {
        tableWidth() {
            return this.colsHeader.reduce((total, item) => {
                return total + item.width;
            }, 0);
        },
        tableHeight() {
            return this.rowsHeader.reduce((total, item) => {
                return total + item.height;
            }, 0);
        },
        tableStyle() {
            return {
                width: `${this.tableWidth}px`,
                height: `${this.tableHeight}px`,
            };
        },
        rowsList() {
            return this.rowsHeader.reduce((total, item) => {
                total.push(item.height);
                return total;
            }, []);
        },
        visibleRows() {
            let start = this.visibleRowsIndex[0];
            return this.rowsHeader.slice(...this.visibleRowsIndex).map((item) => {
                return { ...item, index: start++ };
            });
        },
        startTop() {
            return scroll.findItemTop(this.visibleRowsIndex[0], this.rowsHeader);
        },
    },
    methods: {
        handleScroll(evt) {
            let el = evt.target;
            let direction = scroll.scrollDirection(el);
            this.updateVisibleData(el.scrollTop);
        },
        updateVisibleData(scrollTop = 0) {
            this.$refs.rowsHeader.$el.style.transform = `translate(0, -${scrollTop}px)`;
            this.$refs.visibleContent.style.transform = `translate(0, ${this.startTop}px)`;
            this.visibleRowsIndex = scroll.findVisibleIndex(scrollTop, this.$refs.tableContext.offsetHeight, this.rowsList);
        },
    },
};
