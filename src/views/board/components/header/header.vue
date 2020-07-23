<template>
    <header class="header">
        <img class="mr30 hi " src="~src/assets/images/hi.png" width="50" height="50" />
        <div class="left-tools dib">
            <input class="filename-input" v-model="workbookName" />
            <el-button type="primary" @click="onPickFile" size="mini">导入数据</el-button>
            <history @switch="switchWorkbook"></history>
            <input
                ref="fileInput"
                type="file"
                style="display: none"
                accept=".xlsx,.csv,.xls"
                @change="importFile"
            />
        </div>
        <div class="right-tools dib">
            <el-button type="success" size="mini" @click="exportFile">导出数据</el-button>
            <el-button @click="exportFile" size="mini">导出当前sheet</el-button>
        </div>
    </header>
</template>
<script src="./header.js"></script>

<style lang="stylus" src="./header.styl" scoped />
