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
    <board v-model="activeSheet"></board>
    <sheetBar
      :activeSheetName="activeSheetName"
      @select="sheetSelect"
      :sheets="workbook.SheetNames"
    >
    </sheetBar>
  </div>
</template>

<script>
import board from './componets/board/board.vue';
import sheetBar from './componets/sheetBar/sheetBar';
import XLSX from 'xlsx';
import menuBar from './componets/menuBar/menuBar';
import History from './componets/history/history';
export default {
  name: 'home',
  components: { History, board, sheetBar, menuBar },
  data: function() {
    return {
      workbook:{
        Sheets:{},
        SheetsNames:['sheet1']
      },
      activeSheetName: 'sheet1',
      workbookName :'新建表格',
    };
  },
  computed:{
    activeSheet(){
        let obj = {}
        for (let [key, value] of Object.entries(this.workbook.Sheets[this.activeSheetName])) {
          //处理元数据
          if (/^[A-Z]+[0-9]+$/.test(key)) {
            obj[key] = value.w
          }
        }
        return obj
    }
  },
  methods: {
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
          vue.$store.commit('saveworkbook', {
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
