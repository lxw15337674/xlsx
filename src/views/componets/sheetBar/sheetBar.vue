<template>
  <div class="sheetsBar">
    <div
      :class="{ active: activeSheetName === sheet }"
      class="sheet"
      v-for="(sheet, index) in sheets"
      @click="handleClick(sheet, index)"
      :key="sheet"
    >
      {{ sheet }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'sheet',
  props: {
    sheets: {
      require: true,
      type: Array,
    },
    activeSheetName: {
      type: String,
      default: '',
    },
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    handleClick(sheet) {
      this.$emit('select', sheet);
    },
  },
};
</script>

<style lang="stylus" scoped>
.sheetsBar
  height 35px
  background bgColor
  display flex
  position relative
  align-items center
  padding 0 20px
  box-sizing border-box
  overflow hidden
  .sheet
    padding 0 15px
    display flex
    justify-content: center;
    align-items: center;
    background-color: #F0F0F0;
    height: 100%;
    border:1px solid borderColor;
    border-left:0
    font-size 14px
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
