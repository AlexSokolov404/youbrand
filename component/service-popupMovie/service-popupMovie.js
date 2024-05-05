document.addEventListener('DOMContentLoaded', () => {

    const fastBuyWrapper = document.querySelector('.service-moviePopup')
  
    // Opening logic
    const fastBuyButton = document.querySelectorAll('.btn-play')
    fastBuyButton.forEach(item => {
      item.addEventListener('click', () => {
        fastBuyWrapper.classList.remove('service-moviePopupHidden')
      })
    })
  
    // Closing cases
    const closeIcon = document.querySelector('.service-moviePopup__content-closeIcon')
    closeIcon.addEventListener('click', () => {
      fastBuyWrapper.classList.add('service-moviePopupHidden')
    })
  
  })