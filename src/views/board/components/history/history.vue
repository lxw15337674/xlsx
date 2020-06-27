<template>
    <el-dropdown @click="switchworkbook(workbook)">
        <el-button type="primary" size="mini">
            打开最近<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(workbook, index) in workbookList">
                {{ workbook.name }}
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    name: 'history',
    data() {
        return {
            workbookList: this.$store.state.workbookList,
        };
    },
    methods: {
        switchworkbook(workbook) {
            this.$emit('switch', workbook);
        },
    },
};
</script>

<style scoped></style>
