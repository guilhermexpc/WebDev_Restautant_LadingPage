mobileBtnMenu = '#mobile-btn-menu';
mobileNavMenu = '#mobile-navmenu';
const sections2 = $('section');
const nav1 = $('header');
const nav2 = $('#nav-logo-container');

function headerAnimation() {
  const sections = $('section');
  const navItems = $('.nav-list-item');

  $(window).on('scroll', () => {
    const header = $('header');
    const scrollPosition = $(window).scrollTop();
    let activeSectionIndex = 0;

    if (scrollPosition <= 0) {
      header.css('box-shadow', 'none');
    }
    else {
      header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
    }

    sections.each(function (index) {
      const section = $(this);
      const posicaoDesejada = section.offset().top - header.outerHeight();
      let offsetHeight = 30;
      const sectionTop = section.offset().top - header.outerHeight() - offsetHeight;
      const sectionBottom = sectionTop + section.outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        activeSectionIndex = index;
        return false
      }
      // console.log(`SP: ${scrollPosition.toFixed(2)} | AS: ${activeSectionIndex} | sT: ${sectionTop.toFixed(2)} | sB: ${sectionBottom.toFixed(2)} | Posicao: ${posicaoDesejada.toFixed(2)}`);
    })

    navItems.removeClass('active');
    $(navItems[activeSectionIndex]).addClass('active');
  })
}

function smoothScrollOffSet() {
  // Captura clique nos <a/>
  $('#nav-list a[href^="#"], #mobile-nav-list a[href^="#"]').on("click", function (event) {
    event.preventDefault(); // Impede o comportamento padrão do navegador
    let target = $(this.getAttribute("href"));
    if (target.length) {
      let headerHeight = $("header").outerHeight();
      let targetPosition = target.offset().top - headerHeight + 5;
      $("html, body").animate(
        { scrollTop: targetPosition },
        750
      );
    }
  });

  $('#scroll-to-top').on("click", function (event) {
    event.preventDefault();
    const target = $('#home');
    let headerHeight = $("header").outerHeight();

    if (target.length) {
      const targetPosition = target.offset().top - headerHeight;

      $("html, body").animate(
        { scrollTop: targetPosition },
        1000
      );
    }
  });
}

function handleScrollButton() {
  const scrollPosition = $(window).scrollTop();
  const windowHeight = $(window).height();
  const footerTop = $("footer").offset().top;
  const productTop = $("#products").offset().top;
  const headerHeight = $("header").outerHeight();
  const buttonHeight = $("#scroll-to-top").outerHeight();
  // Mostrar ou ocultar o botão
  if (scrollPosition > productTop - headerHeight) { // Ajuste conforme necessário
    $("#scroll-to-top").fadeIn();
  } else {
    $("#scroll-to-top").fadeOut();
  }
  console.log(`SP: ${scrollPosition.toFixed(2)} | W: ${windowHeight} | F: ${footerTop.toFixed(2)} | bH: ${buttonHeight.toFixed(2)}`);
  if (scrollPosition + windowHeight + (buttonHeight / 2) - headerHeight >= footerTop) {
    $("#scroll-to-top a").css("background-color", "rgba(255, 255, 255, 1)"); // Branco
  } else {
    $("#scroll-to-top a").css("background-color", "rgba(255, 203, 69, 1)"); // Amarelo
  }
}

function AnimationElements() {
  ScrollReveal().reveal('#cta', {
    delay: 50,
    origin: 'left',
    duration: 2000,
    distance: '20%'
  });

  ScrollReveal().reveal('#products', {
    origin: 'left',
    duration: 1500,
    distance: '20%'
  });

  ScrollReveal().reveal('#review-chef', {
    delay: 50,
    origin: 'left',
    duration: 1000,
    distance: '20%'
  });

  ScrollReveal().reveal('.review-card', {
    delay: 400,
    origin: 'right',
    duration: 1000,
    distance: '20%',
    rotate: {
      x: 20,
      z: 20
    }
  });
}

$(document).ready(function () {
  headerAnimation();
  smoothScrollOffSet();
  $(document).ready(() => {
    $(mobileBtnMenu).on("click", () => {
      $(mobileNavMenu).toggleClass('mobile-menu-active');
    })
  });
});

// Executa a função no scroll
$(window).on("scroll", handleScrollButton);

// Função para atualizar o tamanho da tela
function updateScreenSize() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  document.getElementById('screenSize').textContent = 'Screen Size ' + width + 'px  x ' + height + 'px';
}
updateScreenSize();
// Atualiza o tamanho da tela sempre que a janela for redimensionada
window.onresize = updateScreenSize;
