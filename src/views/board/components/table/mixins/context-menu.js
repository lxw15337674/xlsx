import * as select from '@/utils/select';
import * as location from '@/utils/location';
// function paste(e) {
//     e.stopPropagation();
//     e.preventDefault();
//     let clipboardData = e.clipboardData || window.clipboardData;
//     let pastedData = clipboardData.getData('Text');
//     alert(pastedData);
// }
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
                    label: '清空选中区域',
                    def: 'clear',
                    divided: true,
                    hotkey: 'delete',
                },
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
        updateCellList(index, text) {
            for (let row = index.rowStartIndex; row <= index.rowEndIndex; row++) {
                for (let col = index.colStartIndex; col <= index.colEndIndex; col++) {
                    this.$store.commit('workbook/updateCell', {
                        rowIndex: row,
                        colIndex: col,
                        value: text,
                    });
                }
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
            this.updateCellList(this.selectedIndex, '');
        },
        insertRowUp() {
            this.$store.commit('workbook/addRow', {
                index: this.selectedIndex.rowStartIndex,
            });
        },
        insertRowDown() {
            this.$store.commit('workbook/addRow', {
                index: this.selectedIndex.rowEndIndex + 1,
            });
        },
        removeRows() {
            let { rowStartIndex, rowEndIndex } = this.selectedIndex;
            for (let i = rowStartIndex; i <= rowEndIndex; i++) {
                this.$store.commit('workbook/removeRow', i);
            }
        },
        insertColLeft() {
            this.$store.commit('workbook/addCol', { index: this.selectedIndex.colStartIndex });
        },
        insertColRight() {
            this.$store.commit('workbook/addCol', { index: this.selectedIndex.colEndIndex + 1 });
        },
        removeCols() {
            let { colStartIndex, colEndIndex } = this.selectedIndex;
            for (let i = colStartIndex; i <= colEndIndex; i++) {
                this.$store.commit('workbook/removeCol', i);
            }
        },
    },
    // mounted() {
    //     this.$refs.table.addEventListener('paste', paste(e));
    // },
    // destroy() {
    //     this.$refs.table.removeEventListener('paste', paste(e));
    // },
};
