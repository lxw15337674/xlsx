export default {
    // provide() {
    //     return {
    //         visibleRowsIndex: this.visibleRowsIndex,
    //         visibleColsIndex: this.visibleColsIndex,
    //     };
    // },
    data() {
        return {
            // visibleRowsIndex: {
            //     start: -1,
            //     end: -1,
            // },
            // visibleColsIndex: {
            //     start: -1,
            //     end: -1,
            // },
        };
    },
    mounted() {},
    computed: {
        rowsList() {
            if (!this.rowsHeader) {
                return [];
            }
            return this.rowsHeader.reduce((total, item) => {
                total.push(item.height);
                return total;
            }, []);
        },
        colsList() {
            if (!this.colsHeader) {
                return [];
            }
            return this.colsHeader.reduce((total, item) => {
                total.push(item.width);
                return total;
            }, []);
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
