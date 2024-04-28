document.addEventListener('DOMContentLoaded', () => {

  const referralLink = document.getElementById('referralLink')
  const copyReferralLinkButton = document.getElementById('copyReferralLink')
  copyReferralLinkButton.addEventListener('click', () => {
    navigator.clipboard.writeText(referralLink.innerText)
  })

  const promoCode = document.getElementById('promoCode')
  const copyPromoCodeButton = document.getElementById('copyPromoCode')
  copyPromoCodeButton.addEventListener('click', () => {
    navigator.clipboard.writeText(promoCode.innerText)
  })

})