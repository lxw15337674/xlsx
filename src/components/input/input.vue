<template>
  <textarea
    ref="cellInput"
    :value="val"
    @input="$emit('valUpdate', $event.target.value)"
    :style="[cellInputRect]"
  />
</template>

<script>
export default {
  data() {
    return {
      cellInputRect:{
        width:0,
        height:0
      }
    };
  },
  model: {
    prop: 'val',
    event: 'valUpdate',
  },
  props: {
    val: [String, Number],
  },
  watch: {
    val:{
      immediate:true,
      handler(){
        //todo 宽高不超过页面
        // let cellRect=this.$refs.cellInput.getBoundingClientRect()
        let width=null,height=null
        let strList = this.val
          ? this.val.split('\n').map((item) => item.length)
          : '';
        if(strList){
          width= Math.max(...strList)*8+20
          height=strList.length * 17 + 10
          this.cellInputRect= {
            width: `${width}px`,
            height: `${height}px`,
          };
        }
        // let width = Math.min(
        //   Math.max(...strList) * 8 + 20,
        //   window.innerWidth- cellRect.left
        // );
        // let height = Math.min(
        //   strList.length * 17 + 10,
        //   window.innerHeight- cellRect.top
        // );

      }
    }
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.cell-input {
  position: absolute;
  border: 1px solid activeColor;
  font-size: 15px;
  resize: none;
  overflow: hidden;
  z-index: 1;
  width: 100px;
  height: 40px;

  &:focus {
    outline-color: activeColor;
  }
}
</style>
