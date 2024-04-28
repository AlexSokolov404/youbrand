// $(document).ready(function () {
//   const buttonPrev = document.querySelector('.product-sliderMobileControls-prev')
//   const buttonNext = document.querySelector('.product-sliderMobileControls-next')
//
//   $('.product-sliderMobile')
//     .slick({
//       lazyLoad: 'ondemand',
//       infinite: true,
//       arrows: true,
//       dots: true,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       autoplay: true,
//       autoplaySpeed: 3000,
//       pauseOnFocus: false,
//       pauseOnHover: false,
//       pauseOnDotsHover: false,
//       customPaging: (slider, i) => {
//         return (
//           `
//         <div class="introSlider__dotsContainer">
//             <div class="slider-dot__container introSlider__dotsContainer-dot">
//             <div class="circle-loader">
//                 <div class="circle-loader__dot"></div>
//             </div>
//         </div>
//         `
//         )
//       },
//       prevArrow: buttonPrev,
//       nextArrow: buttonNext,
//     })
//
//   const slider = document.querySelector('.product-sliderMobile')
//   const sliderDotsContainer = document.querySelector('.product-sliderMobileControls-container')
//   const sliderDots = slider.querySelector('.slick-dots')
//
//   sliderDotsContainer.appendChild(sliderDots)
//
// });


$(document).ready(function () {
  function setBoundries(slick, state) {
    if (state === 'default') {
      slick.find('ul.slick-dots li').eq(4).addClass('n-small-1');
    }
  }

  // Slick Selector.
  var slickSlider = $('.slick-slider');
  var maxDots = 4;
  var transformXIntervalNext = -36;
  var transformXIntervalPrev = 36;

  slickSlider.on('init', function (event, slick) {
    $(this).find('ul.slick-dots').wrap("<div class='slick-dots-container'></div>");
    $(this).find('ul.slick-dots li').each(function (index) {
      $(this).addClass('dot-index-' + index);
    });
    $(this).find('ul.slick-dots').css('transform', 'translateX(0)');
    setBoundries($(this), 'default');
  });

  var transformCount = 0;
  slickSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var totalCount = $(this).find('.slick-dots li').length;
    if (totalCount > maxDots) {
      if (nextSlide > currentSlide) {
        if ($(this).find('ul.slick-dots li.dot-index-' + nextSlide).hasClass('n-small-1')) {
          if (!$(this).find('ul.slick-dots li:last-child').hasClass('n-small-1')) {
            transformCount = transformCount + transformXIntervalNext;
            $(this).find('ul.slick-dots li.dot-index-' + nextSlide).removeClass('n-small-1');
            var nextSlidePlusOne = nextSlide + 1;
            $(this).find('ul.slick-dots li.dot-index-' + nextSlidePlusOne).addClass('n-small-1');
            $(this).find('ul.slick-dots').css('transform', 'translateX(' + transformCount + 'px)');
            var pPointer = nextSlide - 3;
            var pPointerMinusOne = pPointer - 1;
            $(this).find('ul.slick-dots li').eq(pPointerMinusOne).removeClass('p-small-1');
            $(this).find('ul.slick-dots li').eq(pPointer).addClass('p-small-1');
          }
        }
      } else {
        if ($(this).find('ul.slick-dots li.dot-index-' + nextSlide).hasClass('p-small-1')) {
          if (!$(this).find('ul.slick-dots li:first-child').hasClass('p-small-1')) {
            transformCount = transformCount + transformXIntervalPrev;
            $(this).find('ul.slick-dots li.dot-index-' + nextSlide).removeClass('p-small-1');
            var nextSlidePlusOne = nextSlide - 1;
            $(this).find('ul.slick-dots li.dot-index-' + nextSlidePlusOne).addClass('p-small-1');
            $(this).find('ul.slick-dots').css('transform', 'translateX(' + transformCount + 'px)');
            var nPointer = currentSlide + 3;
            var nPointerMinusOne = nPointer - 1;
            $(this).find('ul.slick-dots li').eq(nPointer).removeClass('n-small-1');
            $(this).find('ul.slick-dots li').eq(nPointerMinusOne).addClass('n-small-1');
          }
        }
      }
    }
  });

  const buttonPrev = document.querySelector('.product-sliderMobileControls-prev')
  const buttonNext = document.querySelector('.product-sliderMobileControls-next')

  $('.slick-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    focusOnSelect: true,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    customPaging: (slider, i) => {
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
    },
    prevArrow: buttonPrev,
    nextArrow: buttonNext,
  });

  const sliderDotsContainer = document.querySelector('.slick-dots-container')
  const sliderDots = document.querySelector('.slick-dots')

  sliderDotsContainer.before(buttonPrev)
  sliderDotsContainer.after(buttonNext)

  sliderDotsContainer.appendChild(sliderDots)

  // 'Add to favorites' icon behavior
  const favoritesIcon = document.querySelector('.product-sliderMobile__item-hoverButtons-top-favoriteIcon')

  favoritesIcon.addEventListener('click', () => {
    favoritesIcon.classList.toggle('product-sliderMobile__item-hoverButtons-top-favoriteIconActive')
  })
});
