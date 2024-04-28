document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.product-tabs__buttonSection-item')
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('id')
      const bindedArea = document.querySelector(`[aria-labelledby=${tabId}]`)

      const bindedAreaImages = bindedArea.querySelectorAll('img')
      bindedAreaImages.forEach(img => {
        const imgDataSrc = img.getAttribute('data-src')

        if (imgDataSrc) {
          img.setAttribute('src', imgDataSrc)
        }

      })
    })
  })
})