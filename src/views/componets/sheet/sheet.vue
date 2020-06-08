<template>
  <div  :class="{active:isActive}" class="sheet" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'sheet',
    props:{
      activeSheet:{
        type:Number,
        default:null
      },
      index:{
        type:Number,
        default: null
      }
    },
    mounted() {
    },
    computed:{
      isActive(){
        return this.activeSheet===this.index
      }
    },
    data(){
      return {
        classList:[],
      }
    },
    methods:{
      handleClick(){
        this.$emit('select',this.index)
      }
    }
  };
</script>

<style lang="stylus" scoped>
.sheet
  display flex
  padding 0 30px
  justify-content: center;
  align-items: center;
  background-color: #F0F0F0;
  height: 100%;
  border-bottom: 1px solid borderColor;
  border-top: 1px solid borderColor;
  border-right: 1px solid borderColor;
  &:hover
    background-color hoverGrayColor
    cursor pointer
  &:first-of-type
    border-left:1px solid borderColor
.active{
  background-color white !important
  border-top 0
}
</style>
