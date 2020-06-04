module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  //vue推荐规则
  // extends: ['plugin:vue/recommended', '@vue/prettier'],

  extends: ['plugin:vue/essential', '@vue/prettier'],
  plugins: ['vue'],
  rules: {
    quotes: [2, 'single', 'avoid-escape'],
    'prettier/prettier': 1,
    // 'no-console': 'warn',
    // 'no-debugger': 'warn',
    ////////////////
    // 可能的错误  //
    ////////////////
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // 禁用 console
    // 'no-console': 0,
    // 禁止在条件中使用常量表达式
    // if (false) {
    //     doSomethingUnfinished();
    // } //cuowu
    'no-constant-condition': 2,
    // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
    'no-control-regex': 2,
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    // 'comma-dangle': [1, 'always-multiline'],
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止空语句块
    // 'no-empty': 2,
    // 禁止在正则表达式中使用空字符集 (/^abc[]/)
    'no-empty-character-class': 2,
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 2,
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 2,
    //  禁止不必要的括号 //(a * b) + c;//报错
    'no-extra-parens': 0,
    // 禁止不必要的分号
    'no-extra-semi': 2,
    // 禁止对 function 声明重新赋值
    'no-func-assign': 2,
    //  禁止在嵌套的块中出现 function 或 var 声明
    'no-inner-declarations': [2, 'functions'],
    // 禁止 RegExp 构造函数中无效的正则表达式字符串
    'no-invalid-regexp': 2,
    // 禁止在字符串和注释之外不规则的空白
    'no-irregular-whitespace': 2,
    // 禁止在 in 表达式中出现否定的左操作数
    'no-negated-in-lhs': 2,
    //   禁止把全局对象 (Math 和 JSON) 作为函数调用  错误：var math = Math();
    'no-obj-calls': 2,
    // 禁止直接使用 Object.prototypes 的内置属性
    'no-prototype-builtins': 0,
    // 禁止正则表达式字面量中出现多个空格
    'no-regex-spaces': 2,
    // 禁用稀疏数组
    'no-sparse-arrays': 2,
    // 禁止出现令人困惑的多行表达式
    'no-unexpected-multiline': 2,
    // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    /*
        function foo() {
        return true;
        console.log("done");
        }//错误
    */
    'no-unreachable': 2,

    //////////////
    // 最佳实践 //
    //////////////

    // 定义对象的set存取器属性时，强制定义get
    'accessor-pairs': 2,
    // 强制数组方法的回调函数中有 return 语句
    'array-callback-return': 0,
    // 强制把变量的使用限制在其定义的作用域范围内
    'block-scoped-var': 0,
    //  要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 0,
    // 强制所有控制语句使用一致的括号风格
    curly: [2, 'all'],
    // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
    // 'default-case': 2,
    // 强制object.key 中 . 的位置，参数:
    //      property，'.'号应与属性在同一行
    //      object, '.' 号应与对象名在同一行
    'dot-location': [2, 'property'],
    // 强制使用.号取属性
    //    参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性
    //                          false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {"allowKeywords": false}]
    //           allowPattern:  当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {"allowPattern": "^[a-z]+(_[a-z]+)+$"}]
    // 'dot-notation': [2, { allowKeywords: false }],
    // 使用 === 替代 == allow-null允许null和undefined==
    eqeqeq: [2, 'allow-null'],
    // 禁用 alert、confirm 和 prompt
    'no-alert': 0,
    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': 2,
    // 不允许在 case 子句中使用词法声明
    'no-case-declarations': 2,
    // 禁止除法操作符显式的出现在正则表达式开始的位置
    'no-div-regex': 2,
    // 禁止 if 语句中有 return 之后有 else
    'no-else-return': 0,
    // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
    // 'no-empty-function': 2,
    // 禁止使用空解构模式no-empty-pattern
    // 'no-empty-pattern': 2,
    // 禁止在没有类型检查操作符的情况下与 null 进行比较
    'no-eq-null': 1,
    // 禁用 eval()
    'no-eval': 2,
    // 禁止扩展原生类型
    'no-extend-native': 2,
    // 禁止不必要的 .bind() 调用
    'no-extra-bind': 2,
    // 禁用不必要的标签
    'no-extra-label:': 0,
    // 禁止 case 语句落空
    'no-fallthrough': 2,
    // 禁止数字字面量中使用前导和末尾小数点
    'no-floating-decimal': 2,
    // 禁止使用短符号进行类型转换(!!fOO)
    'no-implicit-coercion': 0,
    // 禁止在全局范围内使用 var 和命名的 function 声明
    'no-implicit-globals': 1,
    // 禁止使用类似 eval() 的方法
    'no-implied-eval': 2,
    // 禁止 this 关键字出现在类和类对象之外
    'no-invalid-this': 0,
    // 禁用 __iterator__ 属性
    'no-iterator': 2,
    //  禁用标签语句
    'no-labels': 2,
    // 禁用不必要的嵌套块
    'no-lone-blocks': 2,
    // 禁止在循环中出现 function 声明和表达式
    'no-loop-func': 1,
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 禁止使用多行字符串，在 JavaScript 中，可以在新行之前使用斜线创建多行字符串
    'no-multi-str': 2,
    // 禁止对原生对象赋值
    'no-native-reassign': 2,
    // 禁止在非赋值或条件语句中使用 new 操作符
    'no-new': 0,
    // 禁止对 Function 对象使用 new 操作符
    'no-new-func': 0,
    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers': 2,
    // 禁用八进制字面量
    'no-octal': 2,
    // 禁止在字符串中使用八进制转义序列
    'no-octal-escape': 2,
    // 不允许对 function 的参数进行重新赋值
    'no-param-reassign': 0,
    // 禁用 __proto__ 属性
    'no-proto': 2,
    // 禁止使用 var 多次声明同一变量
    'no-redeclare': 2,
    // 禁用指定的通过 require 加载的模块
    'no-return-assign': 0,
    // 禁止使用 javascript: url
    'no-script-url': 0,
    // 禁止自我赋值
    'no-self-assign': 2,
    // 禁止自身比较
    'no-self-compare': 2,
    // 禁用逗号操作符
    'no-sequences': 2,
    // 禁止抛出非异常字面量
    'no-throw-literal': 2,
    // 禁用一成不变的循环条件
    'no-unmodified-loop-condition': 2,
    // 禁止出现未使用过的表达式
    'no-unused-expressions': 0,
    // 禁用未使用过的标签
    'no-unused-labels': 2,
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 2,
    // 禁止不必要的字符串字面量或模板字面量的连接
    'no-useless-concat': 2,
    // 禁用不必要的转义字符
    'no-useless-escape': 0,
    // 禁用 void 操作符
    'no-void': 0,
    // 禁止在注释中使用特定的警告术语
    'no-warning-comments': 0,
    // 禁用 with 语句
    'no-with': 2,
    // 强制在parseInt()使用基数参数
    radix: 2,
    // 要求所有的 var 声明出现在它们所在的作用域顶部
    'vars-on-top': 0,
    // 要求 IIFE 使用括号括起来
    'wrap-iife': [2, 'any'],
    // 要求或禁止 “Yoda” 条件
    yoda: [2, 'never'],

    //////////////
    //  变量声明 //
    //////////////

    // 要求或禁止 var 声明中的初始化(初值)
    'init-declarations': 0,
    // 不允许 catch 子句的参数与外层作用域中的变量同名
    'no-catch-shadow': 0,
    // 禁止删除变量
    'no-delete-var': 2,
    // 不允许标签与变量同名
    'no-label-var': 2,
    // 禁用特定的全局变量
    'no-restricted-globals': 0,
    // 禁止 var 声明 与外层作用域的变量同名
    'no-shadow': 0,
    // 禁止覆盖受限制的标识符
    'no-shadow-restricted-names': 2,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    // 'no-undef': 2,
    // 禁止将变量初始化为 undefined
    // 'no-undef-init': 2,
    // 禁止将 undefined 作为标识符
    'no-undefined': 0,
    // 禁止出现未使用过的变量
    'no-unused-vars': [2, {
      vars: 'all',
      args: 'none'
    }],
    // 不允许在变量定义之前使用它们
    'no-use-before-define': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
