import { initMixin } from './_init'
import { lifeCycleMixin } from './_init/lifeCycle'
import { renderMixin } from './vDom'

function Vue(options) {
  this._init(options)
}

initMixin(Vue)
lifeCycleMixin(Vue)
renderMixin(Vue)

export default Vue;