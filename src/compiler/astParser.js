// id="app" id='app' id=app
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
//标签名  <my-header></my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
// <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`)
// > />
const startTagClose = /^\s*(\/?)>/;
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

/*
<div id="app" style="color: red;font-size: 20px;">
  你好，{{ name }}
  <span class="text" style="color: green">{{age}}</span>
</div>
*/

function parseHtmlToAst(html) {

  let text,
      root,
      currentParent,
      stack = []
  
  while(html) {
    let textEnd = html.indexOf('<')

    if (textEnd === 0) {
      // 处理开始标签
      const startTagMatch = parseStartTag()
      
      if (startTagMatch) {
        const { tagName, attrs } = startTagMatch
        start(tagName, attrs)
        continue
      }

      // 处理一个完整标签的结束
      const endTagMatch = html.match(endTag)

      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      } 
    }

    // 处理两个开始标签中间的文本
    if (textEnd > 0) {
      text = html.substring(0, textEnd)
    }

    if (text) {
      advance(text.length)
      chars(text)
    }
  }

  function parseStartTag() {
    // 匹配开始标签  处理<div id="app" style="color: red;font-size: 20px;">
    const start = html.match(startTagOpen)
    // console.log(start)

    let end, attr

    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }

      advance(start[0].length)

      // 匹配属性  条件：不是开始标签的结束 并且 能够匹配到属性
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        })

        advance(attr[0].length)
      }

      if (end) {
        // console.log(end)
        advance(end[0].length)
        return match
      }
    }
  }

  function advance(n) {
    html = html.substring(n)
    // console.log(html)
  }

  function start(tagName, attrs) {
    // console.log('----------------开始--------------------')
    // console.log(tagName, attrs)
    const element = createASTElement(tagName, attrs)
    
    if (!root) {
      root = element
    }

    currentParent = element
    stack.push(element)
  }

  function end(tagName) { 
    // console.log('----------------结束--------------------')
    // console.log(tagName)
    const element = stack.pop()
    currentParent = stack[stack.length - 1]

    if (currentParent) {
      element.parent = currentParent
      currentParent.children.push(element)
    }
  }

  function chars(text) {
    // console.log('----------------文本--------------------')
    // console.log(text)
    text = text.trim()

    if (text.length) {
      currentParent.children.push({
        type: 3,
        text
      })
    }

  }
  
  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent
    }
  }

  return root

}


export {
  parseHtmlToAst
}