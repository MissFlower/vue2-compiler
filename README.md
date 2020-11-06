# vue2-compiler
vue2-compiler
#### 安装rollup babel依赖 
```shell
npm install rollup rollup-plugin-babel rollup-plugin-serve rollup-plugin-commonjs rollup-plugin-livereload @babel/core @babel/preset-env -D
```
#### 创建rollup.config.js
```javascript
import babel from 'rollup-plugin-babel'
import livereload from 'rollup-plugin-livereload'
import commonjs from 'rollup-plugin-commonjs'
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'Vue-compiler',
    file: 'dist/umd/vue-compiler.js',
    soucemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    // 热更新 默认监听根文件夹
    livereload(),
    serve({
      open: true,
      port: 9999,
      contentBase: '',
      openPage: '/index.html'
    }),
    // 省去添加文件时写/index.js
    commonjs()
  ]
}
```
#### package.json添加dev命令
```javascript
"dev": "rollup -c -w"
```
AST  Abstract syntax tree 抽象语法树
源代码的抽象语法结构的树形描述
