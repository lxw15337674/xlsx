<template>
  <div class="home">
    <el-header class="header">
      <div class="tool-container">
        <input class="filename-input" v-model="workbookName"></input>
        <el-button type="primary" @click="onPickFile" size="mini"
          >导入数据</el-button
        >
        <history @switch="switchWorkbook"></history>
        <input
          ref="fileInput"
          type="file"
          style="display: none"
          accept=".xlsx,.csv,.xls"
          @change="uploadFiles"
        />
        <div class="right-tools">
          <el-button type="success" size="mini" @click="exportFile">导出数据</el-button>
        </div>
      </div>
    </el-header>
    <board v-model="activeSheet" ></board>
    <sheetBar
      :activeSheetName="activeSheetName"
      @select="sheetSelect"
      :sheets="workbook.SheetNames"
    >
    </sheetBar>
  </div>
</template>

<script>
import board from './components/board/board.vue';
import sheetBar from './components/sheetBar/sheetBar';
import XLSX from 'xlsx';
import menuBar from 'src/components/menuBar/menuBar';
import History from './components/history/history';
import { indexToChar } from 'src/utils/transform';
export default {
  name: 'home',
  components: { History, board, sheetBar, menuBar },
  data: function() {
    const DefaultSheetName = 'sheet1'
    return {
      workbook: XLSX.utils.book_new(),
      activeSheetName: DefaultSheetName,
      workbookName :'新建表格',
    };
  },
  computed:{
    activeSheet:{
      get(){
        return this.workbook.Sheets[this.activeSheetName];
      },
      set(val){
        this.workbook.Sheets[this.activeSheetName]= XLSX.utils.aoa_to_sheet(val)
      }
    }
  },
  created() {
    this.workbookInit()
  },
  methods: {
    workbookInit(rowsLength=30,colsLength=30){
      let table = []
      for(let row = 0; row < rowsLength; row++){
        table[row]=[]
        for(let col = 0; col < colsLength; col++){
          table[row][col]=''
        }
      }
      let sheet = XLSX.utils.aoa_to_sheet(table);
      XLSX.utils.book_append_sheet(this.workbook,sheet,'sheet1')
      // this.$set(this.workbook.Sheets,'sheet1',obj)
    },
    switchWorkbook(workbook) {},
    sheetSelect(sheet) {
      this.activeSheetName = sheet;
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    exportFile(){
      //TODO 判断是导入的还是自己编辑的
      if(this.workbook) {
        XLSX.writeFile(this.workbook, `${this.workbookName}.xlsx`)
      }
    },
    uploadFiles() {
      if(!this.$refs.fileInput.files.length) return
      let file = this.$refs.fileInput.files[0],
        fileReader = new FileReader(),
        vue = this;

      fileReader.onload = function(e) {
        try {
          let data = e.target.result;
          let workbook = XLSX.read(data, { type: 'binary' });
          for (let [key, value] of Object.entries(workbook)) {
            vue.$set(vue.workbook, key, value);
          }
          vue.activeSheetName = workbook.SheetNames[0];
          vue.workbookName = file.name.split('.')[0]
          //数据处理
          vue.$store.commit('saveWorkbook', {
            ...workbook,
            name: file.name,
            lastModifiedDate: file.lastModifiedDate,
          });
        } catch (e) {
          console.error(e);
        }
      };
      // 以二进制方式打开文件
      fileReader.readAsBinaryString(file);
    },
  },
};
</script>

<style lang="stylus" scoped>
.home
  display flex
  flex-flow column
  height: 100vh;
  .header {
    padding: 10px 20px;
    background-color: #f8f8f8;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    .tool-container {
      display flex
      button {
        margin-right: 10px;
      }

      .filename-input {
        margin-right 10px
        visibility: visible;
        color: rgb(51, 51, 51);
        box-sizing border-box
        max-width: 400px;
        border: 1px solid transparent;
        &:focus {
          border: 1px solid #4d90fe;
          -webkit-appearance: none;
          color: #333333 !important;
        }
      }

      .right-tools {
        display: inline-block;
        position: absolute;
        right: 20px;
      }
    }
  }
</style>
