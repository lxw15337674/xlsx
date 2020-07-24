import CTable from './components/table/table.vue';
import sheetBar from './components/sheetBar/sheetBar.vue';
import menuBar from './components/menuBar/menuBar.vue';
import cHeader from './components/header/header.vue';
import { mapState } from 'vuex';

export default {
    name: 'board',
    components: { History, sheetBar, menuBar, CTable, cHeader },
    data: function() {
        return {
            loading: true,
        };
    },
    methods: {},
    computed: {
        workbook() {},
        ...mapState({
            activeSheetName: (state) => state.workbook.activeSheetName,
        }),
    },
};
