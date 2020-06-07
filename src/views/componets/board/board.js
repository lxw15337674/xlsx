
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
            },
            cellInput: {
                rowIndex: 0,
                colIndex: 0,
                value: '',
                style: {
                    left: '',
                    top: '',
                    width: '',
                    height: '',
                    display: 'none',
                }
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
                            value: '123',
                            class: [],
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
        this.tableInit()
    },
    computed: {
        // 输入框宽度,高度自适应
        cellInputRect() {
            if (this.cellInput.value) {
                let strList = this.cellInput.value.split('\n').map(item => item.length)
                let width = Math.max(Math.max(...strList,) * 8 + 20, this.cellInput.style.width.slice(0, -2))
                let height = Math.max(this.cellInput.style.height.slice(0, -2), strList.length * 17 + 10)
                return {
                    width: `${width}px`,
                    height: `${height}px`
                }
            }
            return {

            }
        }
    },
    methods: {
        handleCellClick(evt, rowIndex, colIndex, cell) {
            let cellRect = evt.currentTarget.getBoundingClientRect()
            this.cellInput.style.left = `${cellRect.left}px`
            this.cellInput.style.top = `${cellRect.top}px`
            this.cellInput.style.width = `${cellRect.width}px`
            this.cellInput.style.height = `${cellRect.height}px`
            this.cellInput.style.display = ''
            this.cellInput.value = cell.value
            this.cellInput.rowIndex = rowIndex
            this.cellInput.colIndex = colIndex
            this.$nextTick(() => {
                this.$refs.cellInput.focus()
            })
        },
        handleCellInputBlur() {
            this.data[this.cellInput.rowIndex][this.cellInput.colIndex].value = this.cellInput.value
            this.cellInput = this.$options.data.call(this).cellInput
        },
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