document.addEventListener('DOMContentLoaded', () => {

  if (window.innerWidth <= 991) {

    const backButton = document.querySelector('.cabinet-sidebar__backButton')

    const wrapperMain = document.querySelector('.cabinet-wrapper__main')
    const wrapperSidebar = document.querySelector('.cabinet-sidebar')
    const wrapperSidebarTitle = document.querySelector('.cabinet-sidebar__title')
    const wrapperSidebarLoyaltyBlock = document.querySelector('.cabinet-sidebar__loyaltyBlock')
    const wrapperSidebarNav = document.querySelector('.cabinet-sidebar__nav')

    wrapperMain.classList.add('cabinet-wrapper__main-Hidden')

    backButton?.addEventListener('click', () => {
      wrapperSidebar.innerHTML = ''
      wrapperSidebar.appendChild(wrapperSidebarTitle)
      wrapperSidebar.appendChild(wrapperSidebarLoyaltyBlock)
      wrapperSidebar.appendChild(wrapperSidebarNav)
    })

    const buttons = document.querySelectorAll('.cabinet-sidebar__nav-button')
    buttons.forEach(item => {
      item.addEventListener('click', (e) => {
        const itemAria = item.getAttribute('aria-controls')
        const relativeArea = document.querySelector('#' + itemAria)
        backButton.classList.remove('cabinet-sidebar__backButton-Hidden')

        wrapperSidebar.innerHTML = ''
        wrapperSidebar.appendChild(backButton)
        wrapperSidebar.appendChild(relativeArea)
      })
    })

  }

})