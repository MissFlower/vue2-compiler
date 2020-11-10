import { initState } from './state'
import { compileToRenderFunction } from '../compiler'
import { mountComponent } from './lifeCycle'

function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this
    this.$options = options

    initState(vm)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function(el) {
    const vm = this,
          options = vm.$options
    
    el = document.querySelector(el)
    vm.$el = el

    if (!options.render) {
      let template = options.template

      if (!template && el) {
        template = el.outerHTML
      }

      const _render = compileToRenderFunction(template)
      options.render = _render
    }
    
    mountComponent(vm)

  }
}

export {
  initMixin
}