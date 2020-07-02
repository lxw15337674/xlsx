import { once } from 'src/utils/dom';

export default {
    props: {
        cellMinHeight: {
            type: Number,
            default: 30,
        },
        cellMinWidth: {
            type: Number,
            default: 50,
        },
    },
    data() {
        return {
            store: {
                startX: undefined,
                startY: undefined,
            },
        };
    },
    computed: {},
    methods: {
        //行拉伸
        rowResizeStart(evt, index, currentHeight) {
            evt.preventDefault();
            let vue = this,
                left = this.$refs.table.getBoundingClientRect().left,
                horiAxis = vue.$refs.horiAxis.style;
            vue.store.startY = evt.pageY;
            horiAxis.display = '';
            horiAxis.left = `${left}px`;
            horiAxis.top = `${evt.pageY}px`;
            let HandleOnMouseMove = function(evt) {
                evt.stopPropagation();
                horiAxis.top = `${evt.pageY}px`;
                document.body.style.cursor = 'ns-resize';
            };
            let HandleOnMouseUp = function(evt) {
                horiAxis.display = 'none';
                document.body.style.cursor = '';
                let height = evt.pageY - vue.store.startY + currentHeight;
                vue.rowsHeader[index].height =
                    height > vue.cellMinHeight ? height : vue.cellMinHeight;
                window.removeEventListener('mousemove', HandleOnMouseMove);
            };
            window.addEventListener('mousemove', HandleOnMouseMove);
            once(window, 'mouseup', HandleOnMouseUp);
        },
        // 列拉伸
        colResizeStart(evt, index, currentWidth) {
            evt.preventDefault();
            let vue = this,
                top = this.$refs.table.getBoundingClientRect().top,
                vertAxis = vue.$refs.vertAxis.style;
            vue.store.startX = evt.pageX;
            vertAxis.display = '';
            vertAxis.left = `${evt.pageX}px`;
            vertAxis.top = `${top}px`;
            document.body.style.cursor = 'col-resize';
            let HandleOnMouseMove = function HandleOnMouseMove(evt) {
                evt.stopPropagation();
                vertAxis.left = `${evt.pageX}px`;
            };
            let HandleOnMouseUp = function(evt) {
                vertAxis.display = 'none';
                document.body.style.cursor = '';
                let width = evt.pageX - vue.store.startX + currentWidth;
                vue.colsHeader[index].width = width > vue.cellMinWidth ? width : vue.cellMinWidth;
                window.removeEventListener('mousemove', HandleOnMouseMove);
            };
            once(window, 'mouseup', HandleOnMouseUp);
            window.addEventListener('mousemove', HandleOnMouseMove);
        },
    },
};
