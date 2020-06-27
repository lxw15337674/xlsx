export default {
    data() {
        return {
            visibleData:[]
        };
    },
    mounted() {
        updateVisibleData()
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
    },
    methods: {
        handleScroll(evt){
            this.updateVisibleData( this.$el.scrollTop)
        },
        updateVisibleData(scrollTop){
            // scrollTop = scrollTop || 0;
            // const visibleCount = Math.ceil(this.$el.clientHeight / 40);
            // const start = Math.floor(scrollTop / 40);
            // const end = start + visibleCount;
            // this.visibleData = this.table.slice(start, end);
            // this.$refs.content.style.webkitTransform = `translate3d(0, ${ start * this.itemHeight }px, 0)`;
        }
    },
};
