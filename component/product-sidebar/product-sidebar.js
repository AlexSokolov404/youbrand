document.addEventListener('DOMContentLoaded', () => {

  // Size changing
  const currentSize = document.querySelector('.product-sidebar__sizes-title-value')
  const sizeButtons = document.querySelectorAll('.product-sidebar__sizes-buttons-item')

  sizeButtons.forEach(item => {
    item.addEventListener('click', (e) => {

      // Remove active class from all buttons
      sizeButtons.forEach(item => {
        item.classList.remove('product-sidebar__sizes-buttons-itemActive')
      })

      // Add active class to clicked button
      if (e.target.getAttribute('data-size') === item.getAttribute('data-size')) {
        item.classList.add('product-sidebar__sizes-buttons-itemActive')
        currentSize.innerText = item.getAttribute('data-size')
      }
    })
  })

  // Color changing
  const currentColor = document.querySelector('.product-sidebar__colors-title-value')
  const colorButtons = document.querySelectorAll('.product-sidebar__colors-buttons-item')


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

  // Fixed bottom buttons
  const staticActionButtons = document.querySelector('.product-sidebar__actionButtons')
  const fixedActionButtons = document.querySelector('.product-sidebar__actionButtonsFixed')

  window.addEventListener('scroll', () => {

    if (window.innerWidth >= 991) {
      fixedActionButtons.setAttribute('style', 'display: none !important')
      return
    }

    if (staticActionButtons.getBoundingClientRect().bottom <= 50) {
      fixedActionButtons.setAttribute('style', 'display: flex !important')
    } else if (staticActionButtons.getBoundingClientRect().bottom > 50) {
      fixedActionButtons.setAttribute('style', 'display: none !important')
    }

    const footer2SocialWrapper = document.querySelector('.footer2__wrapper-socialWrapper')

    if (footer2SocialWrapper.getBoundingClientRect().bottom < window.innerHeight - (footer2SocialWrapper.clientHeight - 10)) {
      fixedActionButtons.setAttribute('style', 'display: none !important')
    }
  })



  // Timer
  const deadline = '2023-07-18';

  const daysLeft = document.querySelector('.product-sidebar__timer-timeLeft-days')
  const hoursLeft = document.querySelector('.product-sidebar__timer-timeLeft-hours')
  const minutesLeft = document.querySelector('.product-sidebar__timer-timeLeft-minutes')
  const secondsLeft = document.querySelector('.product-sidebar__timer-timeLeft-seconds')

  const getTimeRemaining = (endtime) => {

    const t = Date.parse(endtime) - Date.parse(new Date());

    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    if (t <= 0) {
      return
    }

    daysLeft.innerText = days < 10 ? '0' + days : days
    hoursLeft.innerText = hours < 10 ? '0' + hours : hours
    minutesLeft.innerText = minutes < 10 ? '0' + minutes : minutes
    secondsLeft.innerText = seconds < 10 ? '0' + seconds : seconds

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  getTimeRemaining(deadline)
  setInterval(() => getTimeRemaining(deadline), 1000)

  // 'Add to favorites' icon click
  const favoritesIconDesktop = document.querySelector('.product-sidebar__header-icon')
  favoritesIconDesktop.addEventListener('click', () => {
    favoritesIconDesktop.classList.toggle('product-sidebar__header-iconActive')
  })

})