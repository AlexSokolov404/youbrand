document.addEventListener('DOMContentLoaded', () => {

  if (window.innerWidth <= 991) {

    const backButton = document.querySelector('.clients-sidebar__backButton')

    const wrapperMain = document.querySelector('.clients-wrapper__main')
    const wrapperSidebar = document.querySelector('.clients-sidebar')
    const wrapperSidebarTitle = document.querySelector('.clients-sidebar__title')
    const wrapperSidebarNav = document.querySelector('.clients-sidebar__nav')

    wrapperMain.classList.add('clients-wrapper__main-Hidden')

    const buttons = document.querySelectorAll('.clients-sidebar__nav-button')
    buttons.forEach(item => {
      item.addEventListener('click', (e) => {
        const relativeArea = document.getElementById(item.getAttribute('aria-controls'))
        backButton.classList.remove('clients-sidebar__backButton-Hidden')

        wrapperSidebar.innerHTML = ''
        wrapperSidebar.appendChild(backButton)
        wrapperSidebar.appendChild(relativeArea)


      })
    })

    backButton?.addEventListener('click', () => {
      wrapperSidebar.innerHTML = ''
      wrapperSidebar.appendChild(wrapperSidebarTitle)
      wrapperSidebar.appendChild(wrapperSidebarNav)
    })

  }

})