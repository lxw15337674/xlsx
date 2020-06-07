
export default {
    data() {
        return {
            store: {
                startX: undefined,
                startY: undefined,
                miniWidth: 30,
            },
            // 列头
            colsHeader: [{
                width: 100
            }],
            // 行头
            rowsHeader: [{
                height: null
            }
            ],
            horiAxis: {
                display: 'none',
                left: 0,
            },
            vertAxis: {
                display: 'none',
                top: 0,
            }
        }
    },
    props: {
        data: {
            default: function () {
                let array = []
                for (let row = 0; row < 10; row++) {
                    array[row] = [];
                    for (let col = 0; col < 10; col++) {
                        array[row].push({
                            value: ''
                        })
                    }
                }
                return array;
            },
        },
    },
    filters: {
        charcode: function (index) {
            if (!index) {
                return ' '
            }
            return String.fromCharCode(65 + index - 1)
        }
    },
    mounted() {
        // this.initReziable()
        this.tableInit()
    },
    methods: {
        currentPosition(rowIndex, colIndex) {
            return `${String.fromCharCode(65 + colIndex)}${rowIndex}`
        },
        tableInit() {
            this.data.forEach(element => {
                this.rowsHeader.push({ height: null, })
            })
            this.data[0].forEach(element => {
                this.colsHeader.push({ width: '100' })
            })
        },
        // 水平拉伸
        HoriResizeStart(evt, index) {
            evt.preventDefault()
            let vue = this
            vue.store.startX = evt.pageX
            vue.horiAxis.display = ''
            vue.horiAxis.left = `${evt.pageX - vue.$refs.table.getBoundingClientRect().left}px`
            let HandleOnMouseMove = function (evt) {
                vue.horiAxis.left = `${evt.pageX - vue.$refs.table.getBoundingClientRect().left}px`
                document.body.style.cursor = 'col-resize'
            }
            let HandleOnMouseUp = function (evt) {
                vue.horiAxis.display = 'none'
                document.body.style.cursor = ''
                let width = vue.$refs.cols[index].getBoundingClientRect().width + evt.pageX - vue.store.startX
                vue.colsHeader[index].width = width
                document.removeEventListener('mousemove', HandleOnMouseMove)
                document.removeEventListener('mouseup', HandleOnMouseUp)
            }
            document.addEventListener('mouseup', HandleOnMouseUp);
            document.addEventListener('mousemove', HandleOnMouseMove);
        },
        // 垂直拉伸
        VertResizeStart(evt, index) {
            evt.preventDefault()
            let vue = this
            vue.store.startY = evt.pageY
            vue.vertAxis.display = ''
            vue.vertAxis.top = `${evt.pageY - vue.$refs.table.getBoundingClientRect().top}px`
            let HandleOnMouseMove = function (evt) {
                vue.vertAxis.top = `${evt.pageY - vue.$refs.table.getBoundingClientRect().top}px`
                document.body.style.cursor = 'ns-resize'
            }
            let HandleOnMouseUp = function (evt) {
                vue.vertAxis.display = 'none'
                document.body.style.cursor = ''
                let height = vue.$refs.rows[index].getBoundingClientRect().height + evt.pageY - vue.store.startY
                vue.rowsHeader[index].height = `${height}px`
                document.removeEventListener('mousemove', HandleOnMouseMove)
                document.removeEventListener('mouseup', HandleOnMouseUp)
            }
            document.addEventListener('mouseup', HandleOnMouseUp);
            document.addEventListener('mousemove', HandleOnMouseMove);
        }

    },
}