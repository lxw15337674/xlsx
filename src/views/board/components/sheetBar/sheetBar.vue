<template>
    <div class="sheetsBar">
        <div
            v-for="(sheet, index) in workbook.sheetNames"
            :class="{ active: workbook.activeSheetName === sheet }"
            class="sheet"
            @click="handleClick(sheet, index)"
            :key="sheet"
        >
            {{ sheet }}
        </div>
        <div class="ml10 icon">
            <i class="el-icon-plus " @click="addSheet"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sheetBar',
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
    computed: {
        workbook() {
            return this.$store.state.workbook;
        },
    },
    mounted() {},
    methods: {
        handleClick(sheet) {
            this.$store.commit('workbook/switchSheet',sheet);
        },
        addSheet() {
            this.$store.commit('workbook/addSheet');
        },
    },
};
</script>

<style lang="stylus" scoped>
.sheetsBar
    height: 35px;
    width: 100%;
    background: bgColor;
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    padding-bottom 3px
    .sheet
        padding: 0 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #F0F0F0;
        height: 100%;
        border: 1px solid borderColor;
        border-left: 0;
        font-size: 14px;
        &:hover
            background-color: borderColor;
            cursor: pointer;
        &:first-of-type
            border-left: 1px solid borderColor;
    .active
        background-color: white !important;
        border-top: 0;
        border-bottom 2px solid themeColor
    .icon
        height 24px
        width 24px
        line-height: 24px
        text-align center
        &:hover
            background-color: borderColor;
            cursor: pointer;
</style>
