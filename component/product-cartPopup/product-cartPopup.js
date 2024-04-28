document.addEventListener('DOMContentLoaded', () => {
  const cartPopup = document.querySelector('.product-cartPopup')

  // Opening logic
  const openButton = document.querySelectorAll('.btn-addToCart')
  openButton.forEach(item => {
    item.addEventListener('click', () => {
      cartPopup.classList.remove('product-cartPopupHidden')
    })
  })


  // Amount changing
  const valueInput = document.querySelectorAll('.product-cartPopup__content-body-actions-inputWrapper-input')

  const minusButton = document.querySelectorAll('.product-cartPopup__content-body-actions-inputWrapper-minus')
  const plusButton = document.querySelectorAll('.product-cartPopup__content-body-actions-inputWrapper-plus')

  minusButton.forEach(item => {
    item.addEventListener('click', () => {

      valueInput.forEach(item => {
        if (Number(item.value) > 1) {
          item.value = Number(item.value) - 1
        } else {
          item.value = 1
        }
      })

    })
  })

  plusButton.forEach(item => {
    item.addEventListener('click', () => {

      valueInput.forEach(item => {
        if (Number(item.value) > 0) {
          item.value = Number(item.value) + 1
        } else {
          return
        }
      })
    })
  })

  // amount input change event
  valueInput.forEach(input => {
    input.addEventListener('input', e => {
      const value = Number(e.target.value)
      if (!value || value === 0) {
        e.target.value = 1
      }
    })
  })



  // Closing cases
  const closeButton = document.querySelector('.product-cartPopup__content-header-closeIcon')
  closeButton.addEventListener('click', () => {
    cartPopup.classList.add('product-cartPopupHidden')
  })

  const continueButton = document.querySelector('.product-cartPopup__content-buttons-continue')
  continueButton.addEventListener('click', () => {
    cartPopup.classList.add('product-cartPopupHidden')
  })

  const fastBuyButton = document.querySelector('.product-cartPopup__content-buttons-fastBuy')
  fastBuyButton.addEventListener('click', () => {
    cartPopup.classList.add('product-cartPopupHidden')
  })

  const goToCartButton = document.querySelector('.product-cartPopup__content-buttons-goToCart')
  goToCartButton.addEventListener('click', () => {
    cartPopup.classList.add('product-cartPopupHidden')
  })



  // Size changing
  const currentSize = document.querySelector('.product-cartPopup__content-body-actions-main-productValues-size-title-value')
  const sizeButtons = document.querySelectorAll('.product-cartPopup__content-body-actions-main-productValues-size-title-buttons-item')

  sizeButtons.forEach(item => {
    item.addEventListener('click', (e) => {

      // Remove active class from all buttons
      sizeButtons.forEach(item => {
        item.classList.remove('product-cartPopup__content-body-actions-main-productValues-size-title-buttons-itemActive')
      })

      // Add active class to clicked button
      if (e.target.getAttribute('data-size') === item.getAttribute('data-size')) {
        item.classList.add('product-cartPopup__content-body-actions-main-productValues-size-title-buttons-itemActive')
        currentSize.innerText = item.getAttribute('data-size')
      }
    })
  })


  // Insert sidebar size to cart popup
  const cartPopupSizeBtnWrapper = document.querySelector('.product-cartPopup__content-body-actions-main-productValues-size-title-buttons')
  const cartPopupCurrentSize = document.querySelector('.product-cartPopup__content-body-actions-main-productValues-size-title-value')

  // Default inserting (before click on any size button at sidebar
  const defaultActiveSidebarSizeBtn = document.querySelector('.product-sidebar__sizes-buttons-itemActive')
  const defaultChosenSidebarSize = defaultActiveSidebarSizeBtn?.getAttribute('data-size')
  const cartPopupMatchButton = cartPopupSizeBtnWrapper.querySelector(`[data-size=${defaultChosenSidebarSize}]`)
  cartPopupMatchButton?.classList.add('product-cartPopup__content-body-actions-main-productValues-size-title-buttons-itemActive')


  const sidebarSizeButtons = document.querySelectorAll('.product-sidebar__sizes-buttons-item')
  sidebarSizeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {

      // remove all active classes
      sizeButtons.forEach(item => {
        item.classList.remove('product-cartPopup__content-body-actions-main-productValues-size-title-buttons-itemActive')
      })

      const chosenDataSize = e.target.getAttribute('data-size')
      const cartPopupMatchButton = cartPopupSizeBtnWrapper.querySelector(`[data-size=${chosenDataSize}]`)
      cartPopupMatchButton.classList.add('product-cartPopup__content-body-actions-main-productValues-size-title-buttons-itemActive')
      cartPopupCurrentSize.innerHTML = chosenDataSize
    })
  })


  // Color changing
  const currentColor = document.querySelector('.product-cartPopup__content-body-actions-main-productValues-color-title-value')
  const colorButtons = document.querySelectorAll('.product-cartPopup__content-body-actions-main-productValues-color-buttons-item')


  // Remove active class from all colors
  const removeActiveColor = () => {
    colorButtons.forEach(item => {
      item.firstElementChild.classList.remove('product-sidebar__colors-buttons-item-defaultActive')
    })
  }


  colorButtons.forEach(item => {
    item.addEventListener('click', () => {

      removeActiveColor()
      item.firstElementChild.classList.add('product-sidebar__colors-buttons-item-defaultActive')

      currentColor.innerText = item
        .querySelector('[data-color]')
        .getAttribute('data-color')
    })
  })


  // Insert color from sidebar to cart popup
  const cartPopupCurrentColorValue = document.querySelector('.product-cartPopup__content-body-actions-main-productValues-color-title-value')

  const cartPopupColorBtnWrapper = document.querySelector('.product-cartPopup__content-body-actions-main-productValues-color-buttons')


  const sidebarColorButtons = document.querySelectorAll('.product-sidebar__colors-buttons-item')
  sidebarColorButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      const clickedDataColor = e.target.getAttribute('data-color')
      cartPopupCurrentColorValue.innerHTML = clickedDataColor


      const cartPopupMatchColorBtnWrapper = cartPopupColorBtnWrapper.querySelector(`[data-color-wrapper=${clickedDataColor}]`)

      // remove active class from all cart popup color buttons
      const cartPopupColorButtons = document.querySelectorAll('.product-cartPopup__content-body-actions-main-productValues-color-buttons-item-default')
      cartPopupColorButtons.forEach(btn => {
        btn.classList.remove('product-sidebar__colors-buttons-item-defaultActive')
      })

      // add active class to match button
      cartPopupMatchColorBtnWrapper.classList.add('product-sidebar__colors-buttons-item-defaultActive')
    })
  })


})