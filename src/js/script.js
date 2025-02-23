// JQuery function - Adiciona ou remove uma classe quando o botão for clicado
mobileBtnMenu = '#mobile-btn-menu';
mobileNavMenu = '#mobile-navmenu';
$(document).ready(() => {
  $(mobileBtnMenu).on("click", () => {
    $(mobileNavMenu).toggleClass('mobile-menu-active');
  })
})