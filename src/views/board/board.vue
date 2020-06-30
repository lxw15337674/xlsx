<template>
    <div class="home">
        <el-header class="header">
            <div class="tool-container">
                <input class="filename-input" v-model="workbookName" />
                <el-button type="primary" @click="onPickFile" size="mini"
                    >导入数据</el-button
                >
                <history @switch="switchWorkbook"></history>
                <input
                    ref="fileInput"
                    type="file"
                    style="display: none"
                    accept=".xlsx,.csv,.xls"
                    @change="importFile"
                />
                <div class="right-tools">
                    <el-button type="success" size="mini" @click="exportFile"
                        >导出数据</el-button
                    >
                    <el-button @click="exportFile" size="mini"
                        >导出当前sheet</el-button
                    >
                </div>
            </div>
        </el-header>
        <c-table
            class="c-table"
            v-model="workbook.sheets[activeSheetName]"
        ></c-table>
        <sheetBar
            class="sheet-bar"
            :activeSheetName="activeSheetName"
            @select="sheetSelect"
            :sheets="workbook.sheetNames"
        >
        </sheetBar>
    </div>
</template>

<script src="./board.js"></script>

<style lang="stylus" src="./board.styl" scoped />
