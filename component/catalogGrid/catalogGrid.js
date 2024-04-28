document.addEventListener('DOMContentLoaded', () => {
  // Filter dropdown logic
  const filterSelectBox = document.querySelector('.catalogGrid__header-select')
  const filterSelectBoxArrow = document.querySelector('.catalogGrid__header-select-icon')
  const filterActiveValue = document.querySelector('.catalogGrid__header-select-text')
  const filterDropdownMenu = document.querySelector('.catalogGrid__header-select-dropdownMenu')
  const filterDropdownMenuItem = document.querySelectorAll('.catalogGrid__header-select-dropdownMenu-item')


  filterSelectBox?.addEventListener('click', () => {
    filterDropdownMenu.classList.toggle('hidden')
  })

  const getProductsByCategory = async (key) => {
    setLoadingStatus(true)
    return fetch(`component/catalogGrid/${key}.json`)
      .then(res => res.json()
        .then(data => {
          catalogWrapper.innerHTML = ''
          data.map(item => {
            catalogWrapper.insertAdjacentHTML('beforeend', `
            <div class="catalogGrid__wrapper-item" data-id=${item.id}>
                <div class="catalogGrid__wrapper-item-imgWrapper">
                
                    <a href=${item.url}>
                        <!-- Default image -->
                        <img loading="lazy" src=${item.defaultImg} alt="catalog-item" class="catalogGrid__wrapper-item-imgWrapper-defaultImg">
                        <!-- Image on hover -->
                        <img loading="lazy" src=${item.hoverImg} alt="catalog-item" class="catalogGrid__wrapper-item-imgWrapper-hoverImg">
                    </a>
                    
                    
                    <!-- Colored boxes -->
                    <div class="catalogGrid__wrapper-item-offerBox">
                        ${item.isNew ? `<div class="catalogGrid__wrapper-item-offerBox-green">Новинка</div>` : ''}
                        ${item.isBestseller ? `<div class="catalogGrid__wrapper-item-offerBox-yellow">Бестселлер</div>` : ''}
                        ${item.isDiscounted ? `<div class="catalogGrid__wrapper-item-offerBox-red">Скидка ${item.discountSize}%</div>` : ''}
                    </div>

                    <!-- Elements on hover -->
                    <button class="catalogGrid__wrapper-item-button">В корзину</button>
                    
                    <!-- 'Add to favorites' icon -->
                    <div class="catalogGrid__wrapper-item-favoriteIconWrapper 
                         ${key === 'favoritesPageData'
              ? 'catalogGrid__wrapper-item-favoriteIconWrapper--favoritesPage'
              : null}">
                        <img src="component/catalogGrid/img/favorite-icon.svg" alt="favorite" class="catalogGrid__wrapper-item-favoriteIconWrapper-icon">

                        <!-- Tooltip -->
                        <div class="catalogGrid__wrapper-item-favoriteIconWrapper-tooltip">
                            ${key === 'favoritesPageData'
              ? 'Убрать из избранного'
              : 'В избранное'}
                        </div>
                    </div>
                    
                  
                </div>
                <div class="catalogGrid__wrapper-item-info">
                    <a href=${item.url} class="catalogGrid__wrapper-item-info-title">${item.title}</a>

                    <div class="catalogGrid__wrapper-item-info-prices">
                        <div class="catalogGrid__wrapper-item-info-prices-main">${item.newPrice} ₽</div>
                        ${item.oldPrice ? `<div class="catalogGrid__wrapper-item-info-prices-old">${item.oldPrice} ₽</div>` : ''}
                    </div>

                <!-- Colors -->
                <div class="catalogGrid__wrapper-item-info-colorIcons">
                    
                    ${item.colors?.map(color => {
                        return(`
                        <div class="catalogGrid__wrapper-item-info-colorIcons-item" data-color=${color.id}>
                            <div class="catalogGrid__wrapper-item-info-colorIcons-item-default catalogGrid__wrapper-item-info-colorIcons-item-defaultActive">
                               <div class="catalogGrid__wrapper-item-info-colorIcons-item-default-inner" style='background-color: ${color.code}'></div>
                        </div>
                        <!-- Tooltip -->
                        <div class="catalogGrid__wrapper-item-info-colorIcons-item-tooltip">
                            ${color.name}
                        </div>
                    </div>
                        `)
                     })}
                    
                </div>
                </div>
                </div>
          `)
          })
          addToCartLogic()
        }))
      .catch(e => {
        throw new Error(e)
      })
      .finally(() => {
        setTimeout(() => setLoadingStatus(false), 500)
        getColorBoxes()

        // Color boxes changing logic
        const cards = document.querySelectorAll('.catalogGrid__wrapper-item')
        cards.forEach(card => {
          const colorBoxes = card.querySelectorAll('.catalogGrid__wrapper-item-info-colorIcons-item-default')

          const removeActiveColor = () => {
            colorBoxes.forEach(item => {
              item.classList.remove('catalogGrid__wrapper-item-info-colorIcons-item-defaultActive')
            })
          }

          colorBoxes.forEach(item => {
            item.addEventListener('click', () => {
              removeActiveColor()
              item.classList.add('catalogGrid__wrapper-item-info-colorIcons-item-defaultActive')
            })
          })
        })

      }) // Finally
  }

  const catalogWrapper = document.querySelector('.catalogGrid__wrapper')

  // Check current page by <body> class (main, catalog, favorites, e.t.c)
  // and define a .json file, from which we will get data array.
  switch (document.body.classList[0]) {
    case 'catalog':
      getProductsByCategory('catalogPageData')
      break
    case 'favorites':
      getProductsByCategory('favoritesPageData')
      break
    default:
      getProductsByCategory('bestSellers')
  }

  filterDropdownMenuItem.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('key')
      filterActiveValue.textContent = item.textContent
      filterDropdownMenu.classList.remove('hidden')
      getProductsByCategory(key)
    })
  })

  // Color boxes
  let colorBoxes
  const getColorBoxes = () => {
    colorBoxes = document.getElementsByClassName('catalogGrid__wrapper-item-info-colorIcons-item')
    for (const item of colorBoxes) {
      item.addEventListener('click', () => {
        const color = item.getAttribute('data-color')
        const id = item.getAttribute('data-id')
        getImageByColor(id, color)
      })
    }
  }


  const getImageByColor = async (id) => {
    fetch(`component/catalogGrid/colorImages.json?` + new URLSearchParams({
      id,
    }))
      .then(res => res.json()
        .then(data => {
          const thisProduct = document.querySelector(`[data-id='${id}']`)
          console.log(thisProduct)
          const defaultImg = thisProduct.querySelector('.catalogGrid__wrapper-item-imgWrapper-defaultImg')
          const hoverImg = thisProduct.querySelector('.catalogGrid__wrapper-item-imgWrapper-hoverImg')

          defaultImg.setAttribute('src', data.defaultImg)
          hoverImg.setAttribute('src', data.hoverImg)
        }))
  }

  document.addEventListener('click', (e) => {
    if (!filterSelectBox?.contains(e.target)) {
      filterDropdownMenu?.classList.add('hidden')
    }

    if (!filterDropdownMenu?.classList.contains('hidden')) {
      filterSelectBoxArrow?.setAttribute('style', 'transform: rotate(180deg);')
    } else {
      filterSelectBoxArrow?.removeAttribute('style')
    }
  })

  // Sort dropdown logic
  const sortingSelectBox = document.querySelector('.catalogGrid__sortBox-activeSorting')
  const sortingSelectBoxIcon = document.querySelector('.catalogGrid__sortBox-activeSorting-icon')
  const sortingActiveValue = document.querySelector('.catalogGrid__sortBox-activeSorting-value')
  const sortingDropdown = document.querySelector('.catalogGrid__sortBox-dropdownMenu')
  const sortingDropdownItem = document.querySelectorAll('.catalogGrid__sortBox-dropdownMenu-item')
  const sortingMobilePopup = document.querySelector('.catalogGrid__sortBox-mobile')
  const sortingMobileListItem = document.querySelectorAll('.catalogGrid__sortBox-mobile-content-list-item')

  sortingSelectBox?.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sortingMobilePopup.classList.toggle('hidden')
    } else {
      sortingDropdown.classList.toggle('hidden')
    }
  })

  sortingDropdownItem.forEach(item => {
    item.addEventListener('click', () => {
      sortingActiveValue.textContent = item.textContent
      sortingDropdown.classList.toggle('hidden')
    })
  })

  document.addEventListener('click', (e) => {
    if (!sortingSelectBox?.contains(e.target)) {
      sortingDropdown?.classList.add('hidden')
    }

    if (sortingDropdown?.classList.contains('hidden')) {
      sortingSelectBoxIcon.classList.remove('rotated')
    } else {
      sortingSelectBoxIcon?.classList.add('rotated')
    }

    // Mobile sorting box
    if (window.innerWidth <= 768 && e.target === sortingMobilePopup) {
      sortingMobilePopup.classList.add('hidden')
    }
  })

  sortingMobileListItem.forEach(item => {
    item.addEventListener('click', () => {
      sortingActiveValue.innerText = item.innerText
      sortingMobilePopup.classList.add('hidden')
    })
  })


  // Add to cart logic
  const addToCartLogic = () => {
    const cartPopup = document.querySelector('.product-cartPopup')

    // open logic
    const addToCartButtons = document.querySelectorAll('.catalogGrid__wrapper-item-button')
    addToCartButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        cartPopup.classList.remove('product-cartPopupHidden')
      })
    })
  }

})