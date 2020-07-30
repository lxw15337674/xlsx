//统一单元格位置：第几行第几列，现有row，再有col

import { indexToChar, getCellIndex } from 'src/utils/transform.ts';
import CInput from 'src/components/input/input.vue';
import contextMenu from 'src/components/context-menu/context-menu';
import contextItem from 'src/components/context-menu/context-item';
import { importMixins, importComponents } from 'src/utils/import.ts';
import * as math from '@/utils/math';
import * as location from '@/utils/location';
const modulesFiles = importMixins(require.context('./mixins', false, /\.js$/));
const components = importComponents(require.context('./components', false, /\.vue$/));
let id = 1;

export default {
    components: { ...components, CInput, contextMenu, contextItem },
    mixins: modulesFiles,
    data() {
        return {
            cellInput: {
                rowIndex: 0,
                colIndex: 0,
            },
            cellInputShow: false,
            // 列头
            colsHeader: [],
            // 行头
            rowsHeader: [],
        };
    },
    filters: {
        indexToChar(index) {
            return indexToChar(index);
        },
    },
    computed: {
        activeCellInput: {
            get() {
                return this.table[this.cellInput.rowIndex][this.cellInput.colIndex];
            },
            set(val) {
                this.$store.commit('workbook/updateCell', {
                    rowIndex: this.cellInput.rowIndex,
                    colIndex: this.cellInput.colIndex,
                    value: val,
                });
            },
        },
        table: {
            get() {
                return this.$store.getters['workbook/activeTable'];
            },
        },
    },
    watch: {
        table: {
            deep: true,
            handler() {
                this.headerInit();
            },
        },
    },
    methods: {
        headerInit() {
            //行
            for (let rowIndex = 0; rowIndex < this.table.length; rowIndex++) {
                if (!this.rowsHeader[rowIndex]) {
                    this.rowsHeader.splice(rowIndex, 1, {
                        height: 40,
                        id: id++,
                    });
                }
            }
            //列
            for (let colIndex = 0; colIndex < this.table[0].length; colIndex++) {
                if (!this.colsHeader[colIndex]) {
                    this.colsHeader.splice(colIndex, 1, { width: 100, id: id++ });
                }
            }
        },
        currentPosition(rowIndex, colIndex) {
            return `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
        },
        handleCellClick(evt, rowIndex, colIndex) {
            this.cellInput.rowIndex = rowIndex;
            this.cellInput.colIndex = colIndex;
            Object.assign(
                this.$refs.editInput.$el.style,
                location.getCellPosition(this.cellInput, this.rowsList, this.colsList),
            );
            this.cellInputShow = true;
        },
    },
    created() {
        if (!this.table) {
            this.$store.commit('workbook/initSheet');
        }
    },
    mounted() {
        if (this.table) {
            this.headerInit();
        }
    },
};
