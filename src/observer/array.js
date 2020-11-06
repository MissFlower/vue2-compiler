const originArrayMethods = Array.prototype,
      newArrayMethods = Object.create(originArrayMethods)

const ARRAY_METHODS = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]

ARRAY_METHODS.forEach(method => {
  newArrayMethods[method] = function() {
    const args = Array.prototype.slice.call(arguments),
          result = originArrayMethods[method].call(this, args),
          ob = this.__ob__

    let newArr
    
    switch (method) {
      case 'push':
      case 'unshift':
        newArr = args
        break;
      case 'splice':
        newArr = args.slice(2)
        break;
      default:
        break;
    }

    newArr && ob.observeArray(newArr)

    return result

  }
})

export default newArrayMethods