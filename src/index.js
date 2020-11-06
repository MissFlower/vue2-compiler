import { initMixin } from './_init'

function Vue(options) {
  this._init(options)
}

initMixin(Vue)

export default Vue;