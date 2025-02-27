const productCard = "src/page/components/card.html"
// JQuery function - Adiciona ou remove uma classe quando o botão for clicado
mobileBtnMenu = '#mobile-btn-menu';
mobileNavMenu = '#mobile-navmenu';



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


function animations() {
  const sections = $('section');
  const navItems = $('.nav-list-item');

  $(window).on('scroll', () => {
    const header = $('header');
    const scrollPosition = $(window).scrollTop() - header.outerHeight();

    console.log(scrollPosition);
    
  })
}

$(document).ready(function () {
  loadProducts();
  animations();

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
