document.addEventListener('DOMContentLoaded', () => {

  const wrapper = document.querySelector('.product-recommendations__content')
  const cards = wrapper.querySelectorAll('.catalogGrid__wrapper-item')

  cards.forEach(card => {
    const colorBoxes = card.querySelectorAll('.catalogGrid__wrapper-item-info-colorIcons-item-default')

    const removeActiveColor = () => {
      colorBoxes.forEach(item => {
        item.classList.remove('catalogGrid__wrapper-item-info-colorIcons-item-defaultActive')
      })
    }

    const getImageByColor = async (id, color) => {
      fetch(`component/product-recommendations/colorImages.json?` + new URLSearchParams({
        id,
        color,
      }))
        .then(res => res.json()
          .then(data => {
            const thisProduct = wrapper.querySelector(`[data-id='${id}']`)
            const defaultImg = thisProduct.querySelector('.catalogGrid__wrapper-item-imgWrapper-defaultImg')
            const hoverImg = thisProduct.querySelector('.catalogGrid__wrapper-item-imgWrapper-hoverImg')

            defaultImg.setAttribute('src', data.defaultImg)
            hoverImg.setAttribute('src', data.hoverImg)
          }))
    }

    colorBoxes.forEach(item => {
      item.addEventListener('click', () => {
        const currentId = item.getAttribute('data-id')
        const currentColor = item.getAttribute('data-color')
        getImageByColor(currentId, currentColor)


        removeActiveColor()
        if (card.getAttribute('data-id') === item.getAttribute('data-id')) {
          item.classList.add('catalogGrid__wrapper-item-info-colorIcons-item-defaultActive')
        }
      })
    })
  })

})