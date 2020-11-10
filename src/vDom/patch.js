function patch(oldNode, vNode) {
  const el = createElement(vNode),
        parentElement = oldNode.parentNode
        parentElement.insertBefore(el, oldNode.nextSibling)
        parentElement.removeChild(oldNode)
}

function createElement(vnode) {
  const { tag, props, children, text } = vnode

  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)

    updateProps(vnode.el, props)

    children.map(child => {
      vnode.el.appendChild(createElement(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }

  return vnode.el
}

function updateProps(el, props = {}) {
  Object.keys(props).forEach(prop => {
    if (prop === 'style') {
      for (let sKey in props.style) {
        el.style[sKey] = props.style[sKey];
      }
    } else if (prop === 'class') {
      el.className = props.class
    } else {
      el.setAttribute(prop, props[prop])
    }
  })
}

export {
  patch
}