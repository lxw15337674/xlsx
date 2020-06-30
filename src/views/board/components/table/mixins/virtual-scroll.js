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
            return this.rowsList.slice(...this.visibleRowsIndex);
        },
        visibleTable() {
            return this.table.slice().slice(...this.visibleRowsIndex);
        },
    },
    methods: {
        handleScroll(evt) {
            let el = evt.target;
            let direction = scroll.scrollDirection(el);
            this.updateVisibleData(el.scrollTop);
        },
        updateVisibleData(scrollTop = 0) {
            this.$refs.contentTable.style.transform = `translate(0, ${scrollTop}px)`;
            this.visibleRowsIndex = scroll.findVisibleIndex(scrollTop, this.$refs.contentTable.offsetHeight, this.rowsList);
        },
    },
};
