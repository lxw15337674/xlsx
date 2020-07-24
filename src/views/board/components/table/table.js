//统一单元格位置：第几行第几列，现有row，再有col

import { indexToChar, getCellIndex } from 'src/utils/transform.ts';
import CInput from 'src/components/input/input.vue';
import contextMenu from 'src/components/context-menu/context-menu';
import contextItem from 'src/components/context-menu/context-item';
import { importMixins, importComponents } from 'src/utils/import.ts';
import * as math from '@/utils/math';
import * as location from '@/utils/location';
import { tsTsxRegex } from 'ts-loader/dist/constants';
const modulesFiles = importMixins(require.context('./mixins', false, /\.js$/));
const components = importComponents(require.context('./components', false, /\.vue$/));
let id = 1;
const DefaultRowsLength = 100,
    DefaultColsLength = 100;
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
            // set(value) {
            //     this.$store.commit('initSheet', { array: value });
            // },
        },
    },
    // watch: {
    //     table: {
    //         deep: true,
    //         immediate: true,
    //         handler() {
    //             this.headerInit();
    //         },
    //     },

    methods: {
        // updateCell(value, rowIndex, colIndex) {
        //     this.$store.commit('workbook/updateCell', { value, rowIndex, colIndex });
        // },
        updateCellInput() {},
        headerInit() {
            //行
            for (let rowIndex = 0; rowIndex < this.table.length; rowIndex++) {
                if (!this.rowsHeader[rowIndex]) {
                    this.rowsHeader.splice(rowIndex, 1, {
                        height: math.random(10, 100),
                        id: id++,
                    });
                }
            }
            //列
            for (let colIndex = 0; colIndex < this.table[0].length; colIndex++) {
                if (!this.colsHeader[colIndex]) {
                    this.colsHeader.splice(colIndex, 1, { width: math.random(10, 200), id: id++ });
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
            // let rect = evt.target.getBoundingClientRect();
            // this.$refs.editInput.$el.style.left = `${rect.left}px`;
            // this.$refs.editInput.$el.style.top = `${rect.top}px`;
            // this.$refs.editInput.$el.style.height = `${rect.height}px`;
            // this.$refs.editInput.$el.style.width = `${rect.width}px`;
        },
    },
    mounted() {
        this.$store
            .dispatch('workbook/sheetInit', {
                rowsLength: DefaultRowsLength,
                colsLength: DefaultColsLength,
            })
            .catch((res) => console.error('表格初始化失败', res));
        this.headerInit();
    },
};
