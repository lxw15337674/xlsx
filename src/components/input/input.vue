<template>
    <textarea
        ref="cellInput"
        v-model="val"
        :style="[cellInputRect]"
    />
</template>

<script>
export default {
    data() {
        return {
            val:null,
            cellInputRect: {
                width: 0,
                height: 0,
            },
        };
    },
    // model: {
    //     prop: 'value',
    //     event: 'input',
    // },
    props: {
        value: [String, Number],
    },
    watch: {
        value:{
            immediate:true,
            handler(){
                this.val = this.value
            }
        },
        val: {
            immediate: true,
            handler(val) {
                //todo 宽高不超过页面
                // let cellRect=this.$refs.cellInput.getBoundingClientRect()
                let width = null,
                    height = null;
                let strList = this.val ? this.val.split('\n').map((item) => item.length) : '';
                if (strList) {
                    width = Math.max(...strList) * 8 + 20;
                    height = strList.length * 17 + 10;
                    this.cellInputRect = {
                        width: `${width}px`,
                        height: `${height}px`,
                    };
                }
                this.$emit('input', val)
                // let width = Math.min(
                //   Math.max(...strList) * 8 + 20,
                //   window.innerWidth- cellRect.left
                // );
                // let height = Math.min(
                //   strList.length * 17 + 10,
                //   window.innerHeight- cellRect.top
                // );
            },
        },
    },
    methods: {},
};
</script>

<style lang="stylus" scoped>
.cell-edit-input {
  position: absolute;
  border: 1px solid activeColor;
  font-size: 15px;
  resize: none;
  will-change: transform;
  overflow: hidden;
  z-index: 1;
  width: 100px;
  height: 40px;
  box-sizing:border-box;

  &:focus {
    outline-color: activeColor;
  }
}
</style>
