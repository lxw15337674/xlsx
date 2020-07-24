# xlsx
做一个在线版excel，功能参照腾讯文档。

一个基于DOM的在线excel。

## 依赖库

1. `xlsx`：用于excel文件的导入、导出
2. `vuex-persistedstate`：vuex的持久化
3. `simple-web-worker`：webworker库
4. `v-hotkey`：菜单功能的快捷键映射

## 衍生库

1. `v-tip`: 提示框指令
2. `v-debounce`：防抖指令

## 衍生组件

1. `dynamicScroller`：虚拟滚动组件
2. `virtual-scroller-table`：虚拟滚动表格
3. `context-menu`：右键菜单
4. `input`：宽高自适应输入框

## todo

- excel功能
    - [ ] 导入
    - [ ] 导出
- 表格
    - [x] 编辑
    - [x] 行列拉伸
    - [x] 选取
        - [x] 行、列选取
        - [x] 单元格选取
    - [x] 虚拟滚动
    - [ ] 表格右键菜单
        - [x] 复制
        - [x] 粘贴
        - [x] 剪切
        - [x] 清空
        - [ ] 插入
        - [ ] 删除
- [ ]  记录当前编辑状态
- [ ]  打开最近编辑
