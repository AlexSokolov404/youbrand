document.addEventListener('DOMContentLoaded', () => {
  const collectionsSliderButtonPrev = document.querySelector('.collectionSlider__header-sliderControls-prev')
  const collectionsSliderButtonNext = document.querySelector('.collectionSlider__header-sliderControls-next')

  const sliderItems = document.querySelectorAll('.collectionSlider__sliderWrapper-item')

  const returnSlidesAmount = () => {
    if (window.innerWidth > 1600) {
      if (sliderItems.length < 6) {
        return sliderItems.length
      } else {
        return 6
      }
    } else if (window.innerWidth > 1280) {
      if (sliderItems.length < 5) {
        return sliderItems.length
      } else {
        return 5
      }
    } else if (window.innerWidth > 991) {
      if (sliderItems.length < 4) {
        return sliderItems.length
      } else {
        return 4
      }
    } else if (window.innerWidth > 768) {
      if (sliderItems.length < 3) {
        return sliderItems.length
      } else {
        return 3
      }
    }
  }

  window.addEventListener('resize', returnSlidesAmount)


  $('.collectionSlider__sliderWrapper')
    .slick({
      lazyLoad: 'ondemand',
      infinite: true,
      arrows: true,
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      customPaging: () => {
        const thisTrack = document.querySelector('.collectionSlider__sliderWrapper').querySelector('.slick-track')
        if (thisTrack.clientWidth < window.innerWidth) {
          return (
            `
        <div class="introSlider__dotsContainer">
            <div class="slider-dot__container introSlider__dotsContainer-dot">
            <div class="circle-loader">
                <div class="circle-loader__dot"></div>
            </div>
        </div>
        `
          )
        }

      },
      slidesToShow: returnSlidesAmount(),
      slidesToScroll: 1,
      prevArrow: collectionsSliderButtonPrev,
      nextArrow: collectionsSliderButtonNext,
      responsive: [
        {
          breakpoint: 1680,
          settings: {
            slidesToShow: returnSlidesAmount(),
          }
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: returnSlidesAmount(),
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: returnSlidesAmount(),
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            arrows: false,
            dots: false,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: false,
          }
        }
      ]
    })

  const collectionsSlider = document.querySelector('.collectionSlider__sliderWrapper')
  const collectionsSliderDots = collectionsSlider.querySelector('.slick-dots')
  const thisTrack = collectionsSlider.querySelector('.slick-track')

  if (thisTrack.clientWidth > window.innerWidth) {
    collectionsSliderButtonPrev.after(collectionsSliderDots)
  }

})