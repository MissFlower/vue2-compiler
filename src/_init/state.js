import { proxy } from '../shared'
import { observe } from '../observer'

function initState(vm) {
  const options = vm.$options

  if (options.props) {
    initProps(vm)
  }

  if (options.methods) {
    initMethods(vm)
  }

  if(options.data) {
    initData(vm)
  }

  if (options.computed) {
    initComputed(vm)
  }

  if (options.watch) {
    initWatch(vm)
  }
}

function initData(vm) {
  let data = vm.$options.data

  vm._data = data = typeof data === 'function' ? data.call(vm) : data

  Object.keys(data).forEach(key => {
    proxy(vm, '_data', key)
  })

  observe(data)
}

export {
  initState
}