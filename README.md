# xlsx
基于DOM的在线Excel，功能类似于腾讯文档。

## 依赖库

1. `xlsx`：用于excel文件的导入、导出
2. `vuex-persistedstate`：vuex的持久化
3. `simple-web-worker`：webworker库

## 衍生指令

1. [v-tip](https://github.com/lxw15337674/v-tip): 提示框指令
2. `v-debounce`：防抖指令

## 衍生组件

1. [v-virtualScroller](https://github.com/lxw15337674/v-virtualScroller)：虚拟滚动组件
3. [v-contextMenu](https://github.com/lxw15337674/v-contextMenu)：右键菜单

## 衍生脚手架

1. [lib-template](https://github.com/lxw15337674/lib-template)：基于rollup的npm包脚手架
2. [vue-template](https://github.com/lxw15337674/vue-template)：基于vue-cli的vue项目脚手架

## 特性

- excel功能
    - [ ] 导入
    - [ ] 导出
    
- 表格
  
  
    - [x]  虚拟滚动
    - [x] 行列拉伸
    - [x] 选取
        - [x] 行、列选取
        - [x] 单元格选取
    - [x] 表格右键菜单
        - [x] 复制
        - [x] 粘贴
        - [x] 剪切
        - [x] 清空
        - [x] 插入
        - [x] 删除
        - [x] 撤销
        - [ ] 重做（反撤回）
    - [ ] 宽高自适应输入框
    
- [ ] 打开最近编辑

