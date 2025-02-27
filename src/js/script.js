const productCard = "src/page/components/card.html"
// JQuery function - Adiciona ou remove uma classe quando o botão for clicado
mobileBtnMenu = '#mobile-btn-menu';
mobileNavMenu = '#mobile-navmenu';
const sections2 = $('section');
const nav1 = $('header');
const nav2 = $('#nav-logo-container');




function loadProducts() {
  $.getJSON("products.json", (item) => {
    if (!item || item.length === 0) {
      console.error("Nenhum produto encontrado!");
      return;
    }

    // Cria os cards de produtos dinamicamente
    item.forEach(() => {
      $('#product-card').append('<div class="product-card-item"></div>'); // Adiciona os cards vazios
    });

    $('.product-card-item').each(function (index) {
      let cardElement = $(this); // Guarda a referência do card atual

      cardElement.load(productCard, function (response, status, xhr) {
        if (status === "error") {
          console.error("Erro ao carregar o card:", xhr.status, xhr.statusText);
          // Adiciona a mensagem de erro dentro do card específico
          cardElement.html('<h2 class="error-message">Erro ao carregar o produto</h2>');
          return; // Para evitar a execução do restante do código
        }

        // Se Não der erro continua.
        cardElement.find('img').attr('src', item[index].img);
        cardElement.find('.product-card-title').text(item[index].title);
        cardElement.find('.product-card-description').text(item[index].description);
        cardElement.find('.product-card-value').text(item[index].price);
        cardElement.find('.product-card-rating-reviews').text(item[index].reviews);

        // Gera as estrelas dinâmicas
        let ratingHtml = "";
        for (let i = 0; i < 5; i++) {
          if (i < item[index].rating) {
            ratingHtml += '<i class="fa-solid fa-star"></i>';
          } else {
            ratingHtml += '<i class="fa-regular fa-star"></i>';
          }
        }
        cardElement.find('.product-card-rating-stars li').html(ratingHtml);
      });
    });
  }).fail(function () {
    console.error("Erro ao carregar os produtos!");
  });
}


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

    sections.each(function (i) {
      const section = $(this);
      const posicaoDesejada = section.offset().top - header.outerHeight();

      const sectionTop = section.offset().top - header.outerHeight();
      const sectionBottom = sectionTop + section.outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        activeSectionIndex = i;
        // console.log(activeSectionIndex);
        // if (activeSectionIndex >= 1) {
        //   $('#scroll-to-top').removeClass('hidden');
        // } else {
        //   $('#scroll-to-top').addClass('hidden');
        // }

        // if (scrollPosition >= 1400) {
        //   $('#scroll-to-top a').css('background-color', "rgba(255, 255, 255, 1)")
        // } else {
        //   $('#scroll-to-top a').css('background-color', "rgba(255, 203, 69, 1)")
        // }
        return false
      }
      // console.log(`SP: ${scrollPosition.toFixed(2)} | AS: ${activeSectionIndex} | sT: ${sectionTop.toFixed(2)} | sB: ${sectionBottom.toFixed(2)} | Posicao: ${posicaoDesejada.toFixed(2)}`);
    })

    navItems.removeClass('active');
    $(navItems[activeSectionIndex]).addClass('active');
  })
}

function smoothScrollOffSet() {
  // Captura clique nos links do menu
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
  // Mudar a cor do botão ao entrar no footer
  if (scrollPosition + windowHeight + (buttonHeight / 2) - headerHeight >= footerTop) {
    $("#scroll-to-top a").css("background-color", "rgba(255, 255, 255, 1)"); // Branco
  } else {
    $("#scroll-to-top a").css("background-color", "rgba(255, 203, 69, 1)"); // Amarelo
  }
}

// Executa a função no scroll
$(window).on("scroll", handleScrollButton);

$(document).ready(function () {
  loadProducts();
  headerAnimation();
  smoothScrollOffSet();
  $(document).ready(() => {
    $(mobileBtnMenu).on("click", () => {
      $(mobileNavMenu).toggleClass('mobile-menu-active');
    })
  });
});

// Função para atualizar o tamanho da tela
function updateScreenSize() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  document.getElementById('screenSize').textContent = 'Screen Size ' + width + 'px  x ' + height + 'px';
}
updateScreenSize();
// Atualiza o tamanho da tela sempre que a janela for redimensionada
window.onresize = updateScreenSize;
