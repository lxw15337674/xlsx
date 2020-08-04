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
            table: [],
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
                let { rowIndex, colIndex } = this.cellInput;
                return this.table[rowIndex][colIndex];
            },
            set(val) {
                let { rowIndex, colIndex } = this.cellInput;
                this.table[rowIndex].splice(colIndex, 1, val);
            },
        },
    },
    watch: {
        '$store.state.workbook.activeSheetName': {
            deep: true,
            handler(val, oldVal) {
                this.table = JSON.parse(
                    JSON.stringify(this.$store.getters['workbook/activeTable']),
                );
                this.tableHistory = [];
            },
        },
    },
    methods: {
        initHeader() {
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
            return `${indexToChar(colIndex)}${rowIndex + 1}`;
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
        if (!this.$store.getters['workbook/activeTable']) {
            this.$store.commit('workbook/initSheet');
        }
        this.table = JSON.parse(JSON.stringify(this.$store.getters['workbook/activeTable']));
    },
    mounted() {
        this.initHeader();
    },
};
