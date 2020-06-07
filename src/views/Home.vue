<template>
  <div>
    <el-header class="header">
      <div class="tool-container">
        <el-button type="primary" @click="onPickFile" size="mini">导入数据</el-button>
        <input ref="fileInput" type="file" style="display: none" @change="uploadFiles" />
        <div class="right-tools">
          <el-button type="success" size="mini">导出数据</el-button>
        </div>
      </div>
    </el-header>
    <board></board>
  </div>
</template>

<script>
import board from './componets/board/board.vue';
import xlsx from 'xlsx';
export default {
  components: { board },
  data: function() {
    return {};
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    uploadFiles() {
      let files = this.$refs.fileInput.files,
        file = files[0],
        fileReader = new FileReader();
      fileReader.onload = function(e) {
        try {
          let data = e.target.result;
          let workbook = xlsx.read(data, { type: 'binary' });
          console.log(workbook);
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
