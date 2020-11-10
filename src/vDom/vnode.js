function createElement(tag, attrs = {}, ...children) {
  return vnode(tag, attrs, children)
}

function createTextNode(text) {
  return vnode(undefined, undefined, undefined, text)
}

function vnode(tag, props, children, text) {
  return {
    tag,
    props,
    children,
    text
  }
}

export {
  createElement,
  createTextNode
}