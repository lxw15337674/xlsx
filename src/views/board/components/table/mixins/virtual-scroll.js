import { virtualScrollerTable } from 'v-virtual-scroller';
export default {
    components: {
        virtualScrollerTable,
    },
    data() {
        return {
            offset: {
                left: 0,
                top: 0,
            },
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
        scrollHandle(offset) {
            this.offset = offset;
        },
    },
};
