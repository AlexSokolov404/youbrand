document.addEventListener('DOMContentLoaded', () => {

  const signInBlock = document.querySelector('.signIn-commonBlock__white-SignIn')
  const registrationBlock = document.querySelector('.signIn-commonBlock__registration')
  const restorePasswordBlock = document.querySelector('.signIn-commonBlock__white-restorePassword')
  const transparentBlock = document.querySelector('.signIn-commonBlock__transparent')

  // Кнопка "Регистрация" в окне "Регистрация"
  const registrationButton = document.querySelector('.signIn-commonBlock__transparent-content-button')

  registrationButton.addEventListener('click', () => {
    signInBlock.classList.add('signIn-commonBlock__hidden')
    transparentBlock.classList.add('signIn-commonBlock__hidden')
    restorePasswordBlock.classList.add('signIn-commonBlock__hidden')

    registrationBlock.classList.remove('signIn-commonBlock__hidden')
  })

  // Кнопка "Войти" в окне "Регистрация"
  const registrationBlockButton = document.querySelector('.registrationBlock__button')
  registrationBlockButton.addEventListener('click', () => {
    registrationBlock.classList.add('signIn-commonBlock__hidden')

    signInBlock.classList.remove('signIn-commonBlock__hidden')
    transparentBlock.classList.remove('signIn-commonBlock__hidden')
  })

  // Кнопка "Забыли пароль?"
  const restorePasswordButton = document.querySelector('.signIn-commonBlock__white-content-link')
  restorePasswordButton.addEventListener('click', () => {
    signInBlock.classList.add('signIn-commonBlock__hidden')
    transparentBlock.classList.remove('signIn-commonBlock__hidden')

    restorePasswordBlock.classList.remove('signIn-commonBlock__hidden')
  })

  // Кнопка "Назад" в окне "Сбросить пароль"
  const restorePasswordBackButton = document.querySelector('.restorePassword__backButton')
  restorePasswordBackButton.addEventListener('click', () => {
    restorePasswordBlock.classList.add('signIn-commonBlock__hidden')
    signInBlock.classList.remove('signIn-commonBlock__hidden')
  })

})
