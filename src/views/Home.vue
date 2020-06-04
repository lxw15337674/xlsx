<template>
  <div>
    <div class="operationBox">
      <el-input></el-input>

      <el-button type="file" @click="onPickFile">导入数据</el-button>
      <input
        ref="fileInput"
        type="file"
        style="display: none"
        @change="uploadFiles"
      />
      <el-button type="success">导出数据</el-button>
      <!--      <router-link to="/upload">-->
      <!--        <el-button>上传页</el-button>-->
      <!--      </router-link>-->
    </div>
    <el-table></el-table>
  </div>
</template>

<script>
import xlsx from 'xlsx';
export default {
  data: function() {
    return {};
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    uploadFiles() {
      debugger;
      let files = this.$refs.fileInput.files;
      let fileReader = new FileReader();
      fileReader.onload = function(evt) {
        try {
          let data = evt.target.result,
            workbook = xlsx.read(data, { type: 'array' });
          debugger;
        } catch (e) {
          console.log(e);
        }
      };
      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files[0]);
    },
  },
};
</script>

<style lang="stylus" scoped>
.operationBox{
  div{
    margin 20px
  }
  .el-input{
    width 200px
  }
}
</style>
