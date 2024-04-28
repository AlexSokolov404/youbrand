document.addEventListener('DOMContentLoaded', () => {

  const galleryContainer = document.querySelector('.product-gallery__images')

  const colorButtons = document.querySelectorAll('.product-sidebar__colors-buttons-item')

  colorButtons.forEach(item => {
    item.addEventListener('click', () => {
      const jsonFile = item.getAttribute('data-images-json')
      setLoadingStatus(true)
      fetch(`component/product-gallery/${jsonFile}`)
        .then(res => res.json())
        .then(res => {
          galleryContainer.innerHTML = ''
          res.map(item => {
            galleryContainer.insertAdjacentHTML('afterbegin', `
              <img class="product-gallery__images-item"
                   src=${item.src}
                   alt="gallery">
            `)
          })
        })
        .finally(() => {
          setLoadingStatus(false)
        })
    })
  })
})