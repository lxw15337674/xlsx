import * as select from '@/utils/select';
import * as location from '@/utils/location';
import debounce from '@/utils/debounce';
export default {
    data() {
        return {
            copyContent: '',
            isCut: false,
            cutIndex: {
                rowStartIndex: null,
                colStartIndex: null,
                rowEndIndex: null,
                colEndIndex: null,
            },
            tableHistory: [],
            copyRectShow: false,
            contextMenu: [
                {
                    label: '复制',
                    def: 'copy',
                    hotkey: 'ctrl+c',
                },
                {
                    label: '粘贴',
                    def: 'paste',
                    hotkey: 'ctrl+v',
                },
                {
                    label: '剪切',
                    def: 'cut',
                    hotkey: 'ctrl+x',
                },
                {
                    label: '撤销',
                    def: 'reverse',
                    hotkey: 'ctrl+z',
                },
                {
                    label: '清空选中区域',
                    def: 'clear',
                    divided: true,
                    hotkey: 'delete',
                },

                // {
                //     label: '撤回',
                //     def: 'removeCols',
                // },
                {
                    label: '上方插入一行',
                    def: 'insertRowUp',
                },
                {
                    label: '下方插入一行',
                    def: 'insertRowDown',
                },
                {
                    label: '删除所在行',
                    def: 'removeRows',
                    divided: true,
                },
                {
                    label: '左边插入一列',
                    def: 'insertColLeft',
                },
                {
                    label: '右边插入一列',
                    def: 'insertColRight',
                },
                {
                    label: '删除所在列',
                    def: 'removeCols',
                },
            ],
        };
    },
    computed: {
        selectedList() {
            return select.getSelectedList(this.table, this.selectedIndex);
        },
        keymap() {
            let keymap = {};
            for (let item of this.contextMenu) {
                if (item.hotkey) {
                    keymap[item.hotkey] = this[item.def];
                }
            }
            return keymap;
        },
    },
    methods: {
        fnCall(method) {
            this[method]();
        },
        saveHistory() {
            this.tableHistory.push(JSON.parse(JSON.stringify(this.table)));
        },
        updateCellList(index, text) {
            for (let row = index.rowStartIndex; row <= index.rowEndIndex; row++) {
                for (let col = index.colStartIndex; col <= index.colEndIndex; col++) {
                    this.table[row].splice(col, 1, text);
                }
            }
        },
        reverse() {
            if (this.tableHistory.length >= 1) {
                this.table = this.tableHistory.pop();
            } else {
                console.log('无撤回操作');
            }
        },
        addRow(index, value = '') {
            let row = Array(this.table[0].length).fill(value);
            this.table.splice(index, 0, row);
        },
        addCol(index, value = '') {
            for (let row of this.table) {
                row.splice(index, 0, value);
            }
        },
        removeRow(index) {
            this.table.splice(index, 1);
            this.rowsHeader.splice(index, 1);
        },
        removeCol(state, index) {
            for (let row of this.table) {
                row.splice(index, 1);
                this.colsHeader.splice(index, 1);
            }
        },
        copy() {
            this.copyContent = this.selectedList;
            this.copyRectShow = true;
            Object.assign(
                this.$refs.copyRect.style,
                location.getRectBetweenTwoCells(this.selectedIndex, this.rowsList, this.colsList),
            );
            //https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
            //https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
            if (typeof navigator.clipboard === 'undefined') {
                let input = document.createElement('textarea');
                input.innerHTML = this.copyContent;
                document.body.appendChild(input);
                input.select();
                let result = document.execCommand('copy');
                document.body.removeChild(input);
                return result;
            } else {
                navigator.clipboard.writeText(this.copyContent).catch((err) => {
                    // 如果用户没有授权，则抛出异常
                    console.error('无法复制此文本：', err);
                });
            }
        },
        paste() {
            this.saveHistory();
            const paste = (text) => {
                if (this.isCut) {
                    this.isCut = false;
                    this.updateCellList(this.cutIndex, '');
                }
                this.updateCellList(this.selectedIndex, text);
                this.copyRectShow = false;
            };
            if (typeof navigator.clipboard === 'undefined') {
                paste(this.copyContent);
            } else {
                navigator.clipboard
                    .readText()
                    .then((text) => {
                        paste(text);
                    })
                    .catch((error) => console.error(error));
            }
        },
        cut() {
            this.copy();
            this.isCut = true;
            this.cutIndex = this.selectedIndex;
        },
        clear() {
            this.saveHistory();
            this.updateCellList(this.selectedIndex, '');
        },
        insertRowUp() {
            this.saveHistory();
            this.addRow(this.selectedIndex.rowStartIndex);
        },
        insertRowDown() {
            this.saveHistory();
            this.addRow(this.selectedIndex.rowStartIndex + 1);
        },
        removeRows() {
            this.saveHistory();
            let { rowStartIndex, rowEndIndex } = this.selectedIndex;
            for (let i = rowStartIndex; i <= rowEndIndex; i++) {
                this.removeRow(i);
            }
        },
        insertColLeft() {
            this.saveHistory();
            this.addCol(this.selectedIndex.colStartIndex);
        },
        insertColRight() {
            this.saveHistory();
            this.addCol(this.selectedIndex.colStartIndex + 1);
        },
        removeCols() {
            this.saveHistory();
            let { colStartIndex, colEndIndex } = this.selectedIndex;
            for (let i = colStartIndex; i <= colEndIndex; i++) {
                this.removeCol(i);
            }
        },
    },
};
