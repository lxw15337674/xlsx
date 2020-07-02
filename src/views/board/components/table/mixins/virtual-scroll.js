export default {
    provide() {
        return {
            visibleRowsIndex: this.visibleRowsIndex,
            visibleColsIndex: this.visibleColsIndex,
        };
    },
    data() {
        return {
            visibleRowsIndex: {
                start: -1,
                end: -1,
            },
            visibleColsIndex: {
                start: -1,
                end: -1,
            },
        };
    },
    mounted() {},
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
        rowsList() {
            return this.rowsHeader.reduce((total, item) => {
                total.push(item.height);
                return total;
            }, []);
        },
        colslist() {
            return this.colsHeader.reduce((total, item) => {
                total.push(item.width);
                return total;
            }, []);
        },
        visibleRows() {
            let { start, end } = this.visibleRowsIndex;
            return this.rowsHeader.slice(start, end).map((item, index) => {
                return {
                    height: item.height,
                    index: index + this.visibleRowsIndex.start,
                    id: item.id,
                };
            });
        },
        visibleCols() {
            let { start, end } = this.visibleColsIndex;
            return this.colsHeader.slice(start, end).map((item, index) => {
                return {
                    width: item.width,
                    index: index + start,
                    id: item.id,
                };
            });
        },
        visibleTableStyle() {
            let width = this.visibleCols.reduce((total, item) => {
                return (total += item.width);
            }, 0);
            return {
                width: `${width}px`,
            };
        },
    },
    methods: {
        // handleScroll(evt) {
        //     let el = evt.target;
        //     let direction = scroll.scrollDirection(el);
        //     this.updateVisibleData(el.scrollTop);
        // },
        // updateVisibleData(scrollTop = 0) {
        //     this.$refs.contentTable.style.transform = `translate(0, ${scrollTop}px)`;
        //     this.visibleRowsIndex = scroll.findVisibleIndex(scrollTop, this.$refs.contentTable.offsetHeight, this.rowsList);
        // },
    },
};
