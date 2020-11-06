import {
  isArray,
  isObject,
  isEqual,
  setConstantProperty
} from '../shared'
import newArrayMethods from './array'


class Observer {
  constructor(data) {
    setConstantProperty(data, '__ob__', this)

    if (isArray(data)) {
      // 处理数组
      data.__proto__ = newArrayMethods
      this.observeArray(data)
    } else {
      // 处理对象
      this.walk(data)
    }
  }

  walk(data) {
    Object.keys(data).forEach(key => {
      defindReactive(data, key, data[key])
    })
  }

  observeArray(data) {
    data.forEach(item => {
      observe(item)
    })
  }
}

function defindReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('数据获取value:----------->'+ value)
      return value
    },
    set(newValue) {
      if (isEqual(newValue, value)) { return }
      observe(newValue)
      console.log('数据新增value:----------->'+ newValue)
      value = newValue
    }
  }) 
}

function observe(data) {
  if (!isObject(data) || data.__ob__) { return }
  new Observer(data)
}

export {
  observe
}