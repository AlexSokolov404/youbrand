document.addEventListener('DOMContentLoaded', () => {

  const fastBuyWrapper = document.querySelector('.product-fastBuyPopup')

  // Opening logic
  const fastBuyButton = document.querySelectorAll('.btn-fastBuy')
  fastBuyButton.forEach(item => {
    item.addEventListener('click', () => {
      fastBuyWrapper.classList.remove('product-fastBuyPopupHidden')
    })
  })

  // Closing cases
  const closeIcon = document.querySelector('.product-fastBuyPopup__content-closeIcon')
  closeIcon.addEventListener('click', () => {
    fastBuyWrapper.classList.add('product-fastBuyPopupHidden')
  })

})