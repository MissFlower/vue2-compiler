import babel from 'rollup-plugin-babel'
import livereload from 'rollup-plugin-livereload'
import commonjs from 'rollup-plugin-commonjs'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/index.js',
  output: {
    format: 'umd',
    // 和构造函数名一定保持一致
    name: 'Vue',
    file: 'dist/umd/vue-compiler.js',
    sourcemap: true
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
    // 省去添加文件时写/index.js rollup本身做不到
    commonjs()
  ]
}