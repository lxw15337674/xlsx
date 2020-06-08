<template>
    <el-dropdown @click="switchWorkBook(workBook)">
      <el-button type="primary" size="mini">
        打开最近<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(workBook,index) in workBookList" >
            {{workBook.name}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
  export default {
    name: 'history',
    data(){
      return{
        workBookList: this.$store.state.workBookList
      }
    },
    methods:{
      switchWorkBook(workBook){
        this.$emit('switch',workBook)
      }
    }
  };
</script>

<style scoped>

</style>
