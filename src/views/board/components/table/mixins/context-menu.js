export default {
    data() {
        return {
            contextMenu: [
                {
                    label: '复制',
                    def: 'copy',
                },
                {
                    label: '粘贴',
                    def: `paste`,
                },
                {
                    label: '剪切',
                    def: `cut`,
                },
                {
                    label: '清空选中区域',
                    def: `clear`,
                },
                {
                    label: '上方插入一行',
                    def: `insertRowUp`,
                },
                {
                    label: '下方插入一行',
                    def: `insertRowDown`,
                },
                {
                    label: '删除所在行',
                    def: `removeRow`,
                },
                {
                    label: '左边插入一列',
                    def: `insertColLeft`,
                },
                // {
                //   label:'左边插入一列',
                //   def:`insertColLeft`
                // },
            ],
        };
    },
    methods: {
        fnCall(method) {
            this[method]();
        },
        copy() {
            //https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/blob/master/archives/023-clipboardapi.md
            //https://juejin.im/entry/5ad0684cf265da237b227fc0
            navigator.clipboard
                .writeText('要复制的文本')
                .then(() => {
                    console.log('文本已经成功复制到剪切板');
                })
                .catch((err) => {
                    // This can happen if the user denies clipboard permissions:
                    // 如果用户没有授权，则抛出异常
                    console.error('无法复制此文本：', err);
                });
        },
        paste() {},
        cut() {},
        clear() {},
        insertRowUp() {},
        insertRowDown() {},
        removeRow() {},
        insertColLeft() {},
    },
};
