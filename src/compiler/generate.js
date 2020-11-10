/**
 * _c => createElement()
 * _v => createTextNode()
 * _s => {{name}} => _s(name)
 */
const defaultTagReg = /\{\{((?:.|\r?\n)+?)\}\}/g;

function formatProps(attrs) {
  let attrStr = ''
  attrs.forEach(attr => {
    if (attr.name === 'style') {
      const attrStyle = {}
      attr.value.split(';').map(style => {
        if (style) {
          const [key, value] = style.split(':')
          attrStyle[key] = value.trim()
        }
      })
      attr.value = attrStyle
    }
    attrStr += `${attr.name}: ${JSON.stringify(attr.value)},`
  })

  // console.log(`{${ attrStr.slice(0, -1) }}`)
  return `{${ attrStr.slice(0, -1) }}`
}

function generateChild(node) {
  const type = node.type
  if (type === 1) {
    return generate(node)
  } else if (type === 3) {
    const text = node.text

    if (!defaultTagReg.test(text)) {
      // 不是{{xxxxx}}
      return `_v(${ JSON.stringify(text) })`
    }

    let match,
        index,
        lastIndex = defaultTagReg.lastIndex = 0, // defaultTagReg.lastIndex初始化设置为0.每次匹配之后会改变
        textArr = []

    while (match = defaultTagReg.exec(text)) {
      index = match.index
      // 匹配的是存字符串
      if (index > lastIndex) {
        textArr.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      // 匹配到了{{xxxx}}
      textArr.push(`_s(${ match[1].trim() })`)
      lastIndex = index + match[0].length
    }

    // 匹配{{xxxx}}后面仍有存文本
    if (lastIndex < text.length) {
      textArr.push(JSON.stringify(text.slice(lastIndex)))
    }
    
    return `_v(${ textArr.join('+') })`
  }
}

function getChildren(el) {
  const children = el.children

  if (children) {
    return children.map(child => generateChild(child)).join(',')
  }
}

function generate(el) {
  let children = getChildren(el)
  let code = `_c(
                "${ el.tag }",
                ${
                  el.attrs.length
                  ?
                  formatProps(el.attrs)
                  :
                  "undefined"
                },
                ${
                  children
                  ?
                  `${children}`
                  :
                  ''
                }
              )
            `
  return code
  // return 魔板字符串的时候 注意不能折行 如下 这样return出去是undefined
  // return `
  //   内容
  // `
}

export {
  generate
}