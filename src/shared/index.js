function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
      if (isEqual(vm[target][key], newValue)) { return }
      vm[target][key] = newValue
    }
  })
}

function isObject(source) {
  return typeof source === 'object' && source !== null 
}

function isArray(source) {
  return Array.isArray(source)
}

function isEqual(source, target) {
  return source === target
}

function setConstantProperty(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false,
    configurable: false,
    value
  })
}
 
export {
  proxy,
  isObject,
  isArray,
  isEqual,
  setConstantProperty
}