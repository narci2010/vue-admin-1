// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 文末新行
    'eol-last': 0,
    // 末尾逗号
    'comma-dangle': 0,
    // 全局引入资源
    'global-require': 0,
    // \r\n和\n
    'linebreak-style': 0,
    // return;命令
    'no-useless-return': 0,
    // console.log
    'no-console': 0,
    // alert提示框
    'no-alert': 0,
    // 行长度超过100
    'max-len': 0,
    // const let
    // 'prefer-const': 0,
    // es6变量简写语法
    // 'object-shorthand': 0,
    // 箭头函数参数是否需要括号
    // 'arrow-parens': 0,
    // 箭头函数返回值不用代码块return
    // 'arrow-body-style': 0,
    // 模版变量花括号内不允许有空格
    // 'template-curly-spacing': 0,
    // 对象花括号内要有空格
    // 'object-curly-spacing': 0,
  }
}
