<template>
  <div>
    <div class="operationBox">
      <el-input></el-input>
      <el-button type="success">导出数据</el-button>
    </div>
    <el-table></el-table>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.operationBox{
  display flex
  .el-input{
    width 200px
  }
}
</style>
