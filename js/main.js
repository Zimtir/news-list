let initAll = () => {
  const createElem = (elemConfig, into) => {
    let element = document.createElement(elemConfig.type)

    if (elemConfig.id) element.id = elemConfig.id
    if (elemConfig.placeholder) element.placeholder = elemConfig.placeholder
    if (elemConfig.handler) element.onclick = elemConfig.handler
    if (elemConfig.text) element.innerText = elemConfig.text
    if (elemConfig.style) element.style = elemConfig.style
    if (elemConfig.value) element.value = elemConfig.value

    document.getElementById(into).appendChild(element)

    return element
  }

  const getElemValue = id => {
    return document.getElementById(id).value
  }

  const getDocumentFrom = text => {
    return new DOMParser().parseFromString(text, 'text/html')
  }

  const fillIn = (id, doc, selector) => {
    let items = doc.querySelectorAll(selector)
    items.forEach(item => {
      let span = createElem(config.outputLine, config.output.id)
      span.innerText = item.innerText
    })
  }

  const config = {
    proxy: 'https://api.codetabs.com/v1/proxy?quest=',
    container: {
      id: 'container'
    },
    outputLine: {
      type: 'div'
    },
    url: {
      id: 'url',
      type: 'input',
      placeholder: 'URL',
      value: 'https://mirnov.ru/lenta-novostej'
    },
    selector: {
      id: 'selector',
      type: 'input',
      placeholder: 'selector',
      value: '.slavecon-title a'
    },
    output: {
      id: 'output',
      type: 'div'
    },
    parse: {
      id: 'url',
      type: 'button',
      text: 'parse',
      handler: async () => {
        let url = getElemValue(config.url.id)
        let selector = getElemValue(config.selector.id)

        let fetchResponse = await fetch(`${config.proxy}${url}`)
        let pageHTML = await fetchResponse.text()
        let pageDoc = getDocumentFrom(pageHTML)

        fillIn(config.output.id, pageDoc, selector)
      }
    }
  }

  createElem(config.url, config.container.id)
  createElem(config.selector, config.container.id)
  createElem(config.parse, config.container.id)
  createElem(config.output, config.container.id)
}

document.addEventListener('DOMContentLoaded', initAll)
