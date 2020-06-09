<template>
  <div class="home">
    <el-header class="header">
      <div class="tool-container">
        <el-button type="primary" @click="onPickFile" size="mini"
          >导入数据</el-button
        >
        <history @switch="switchWorkBook"></history>
        <input
          ref="fileInput"
          type="file"
          style="display: none"
          accept=".xlsx,.csv,.xls"
          @change="uploadFiles"
        />
        <div class="right-tools">
          <el-button type="success" size="mini">导出数据</el-button>
        </div>
      </div>
    </el-header>
    <board :data="activeSheet"></board>
    <sheetBar
      :activeSheetName="activeSheetName"
      @select="sheetSelect"
      :sheets="workBook.SheetNames"
    >
    </sheetBar>
  </div>
</template>

<script>
import board from './componets/board/board.vue';
import sheetBar from './componets/sheetBar/sheetBar';
import xlsx from 'xlsx';
import menuBar from './componets/menuBar/menuBar';
import History from './componets/history/history';
export default {
  name: 'home',
  components: { History, board, sheetBar, menuBar },
  data: function() {
    return {
      workBook: {},
      activeSheetName: '',
    };
  },
  computed:{
    activeSheet(){
      return this.workBook.Sheets?.[this.activeSheetName] ?? {}
    }
  },
  methods: {
    switchWorkBook(workBook) {},
    sheetSelect(sheet) {
      this.activeSheetName = sheet;
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    uploadFiles() {
      let files = this.$refs.fileInput.files,
        file = files[0],
        fileReader = new FileReader(),
        vue = this;
      fileReader.onload = function(e) {
        try {
          let data = e.target.result;
          let workBook = xlsx.read(data, { type: 'binary' });
          for (let [key, value] of Object.entries(workBook)) {
            vue.$set(vue.workBook, key, value);
          }
          vue.activeSheetName = workBook.SheetNames[0];
          vue.$store.commit('saveWorkBook', {
            ...workBook,
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

    button {
      margin-right: 10px;
    }

    .right-tools {
      display: inline-block;
      position: absolute;
      right: 20px;
    }
  }
</style>
