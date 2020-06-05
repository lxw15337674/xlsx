<template>
  <div class="board">
    <table>
<!--      <colgroup>-->
<!--      </colgroup>-->
      <tr>
        <th>
        </th>
        <th v-for="(col,key) in data[0]" v-resizable>
          {{key}}
        </th>
      </tr>
      <tr v-for="(row,key,index) in data">
        <td>
          {{index}}
        </td>
        <td v-for="(cell,col) in row" v-tip="`${col}${index}`">
          <div class="cell">
            123
          </div>
        </td>
<!--        <th >-->
<!--        </th>-->
<!--        <th  v-for="(row,key) in data" :key="`${key}${row}`">-->
<!--            {{col}} {{key}}-->
<!--        </th>-->
      </tr>

    </table>

  </div>
</template>

<script>
  export default {
    name: 'bread',
    props:{
      data:{
        default:function() {
          let obj = {}
           for(let row=0;row<10;row++){
            obj[row]={}
            for(let col=0;col<10;col++){
              obj[row][String.fromCharCode((65+col))]= ''
            }
          }
          return obj
        }
      }
    },
    directives:{
      resizable:{
        inserted:function(el) {
          let store={
            dragging: false,                 //是否拖动
            draggingColumn: null,            //拖动的对象
            startX: undefined,       //鼠标点击时的clientX
          }
          document.onmousedown=(e)=> {
            store.startX= e.clientX
            console.log(e)
          }
          // el.onmousemove=e=> {
          //   console.log(e)
          // }
          document.onmouseup=e=>{
            console.log(e)
            console.log(e.clientX-store.startX)
          }
        }
      }
    },
    data(){
      return {
      }
    }
  };
</script>

<style lang="stylus" scoped>
.board
  .row
    display inline-block
    border 1px solid  rgba(0,0,0,.04)
    padding 10px 20px
    resize:both
  .row-head
    display inline-block
    background #f6f8fa
    padding 10px 20px
  th,td
    border 1px solid rgba(0,0,0,.1)
    min-width 60px
    height 30px
    vertical-align: middle;
    text-align center
  /*td:first-child*/
    /*overflow auto*/
    /*resize vertical*/
  /*tr th:not(:first-child)*/
      /*overflow: auto*/
      /*resize:horizontal*/
</style>
