// JQuery function - Adiciona ou remove uma classe quando o botão for clicado
mobileBtnMenu = '#mobile-btn-menu';
mobileNavMenu = '#mobile-navmenu';
$(document).ready(() => {
  $(mobileBtnMenu).on("click", () => {
    $(mobileNavMenu).toggleClass('mobile-menu-active');
  })
});

function loadProducts() {
  $.getJSON("products.json", (item) => {
    if (!item || item.length === 0) {
      console.error("Nenhum produto encontrado!");
      return;
    };

    // Cria os cards de produtos dinamicamente
    item.forEach(() => {
      $('#product-card').append('<div class="product-card-item"></div>'); // Adiciona os cards vazios
    });

    $('.product-card-item').each(function (index) {
      $(this).load('card.html', function () {
        // Preenche os dados do produto carregado
        $(this).find('img').attr('src', item[index].img);
        $(this).find('.product-card-title').text(item[index].title);
        $(this).find('.product-card-description').text(item[index].description);
        $(this).find('.product-card-value').text(item[index].price);
        $(this).find('.product-card-rating-reviews').text(item[index].reviews);
        // Gera as estrelas
        let ratingHtml = "";
        for (let i = 0; i < 5; i++) {
          if (i < item[index].rating) {
            ratingHtml += '<i class="fa-solid fa-star"></i>';
          } else {
            ratingHtml += '<i class="fa-regular fa-star"></i>';
          }
        }
        $(this).find('.product-card-rating-stars li').html(ratingHtml);

      });
    });
  }).fail(function () {
    console.error("Erro ao carregar os produtos!");
  });
}

$(document).ready(function () {
  loadProducts();
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
