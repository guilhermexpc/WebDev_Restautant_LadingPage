const productCard = "src/page/components/card.html"

$(document).ready(function () {
  loadProducts();
});

function loadProducts() {
  $.getJSON("products.json", (item) => {
    if (!item || item.length === 0) {
      console.error("Nenhum produto encontrado!");
      return;
    }

    // Cria os cards de produtos dinamicamente
    item.forEach(() => {
      $('#product-card').append('<div class="product-card-item"></div>');
    });

    $('.product-card-item').each(function (index) {
      let cardElement = $(this); // Guarda a referência do card atual

      // funcao para capturar algum erro e interromper a operacao
      cardElement.load(productCard, function (response, status, xhr) {
        if (status === "error") {
          console.error("Erro ao carregar o card:", xhr.status, xhr.statusText);
          cardElement.html('<h2 class="error-message">Erro ao carregar o produto</h2>');
          return;
        }

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