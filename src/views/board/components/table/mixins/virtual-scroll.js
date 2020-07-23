import virtualScrollerTable from 'src/components/virtual-scroller-table';
export default {
    components: {
        virtualScrollerTable,
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
};
