// Importação da base de dados e das funçoes

import { getProdId, loadProducts} from "./functions.js";

// -------- Variaveis do projeto ------------------------
const sectionNovidades = document.querySelector("#section-1 .carrousel")
const sectionMaisVendidos = document.querySelector("#section-2 .carrousel")
const sectionPromocoes = document.querySelector("#section-3 .carrousel")


// //Fitros
// let filtroCategoriaNovidades = database.filter(produto => produto.classificacaoProduto === "Novidades" && produto.exibirHome == true )
// let filtroMaisVendidos = database.filter(produto => produto.classificacaoProduto === "Mais_Vendidos" && produto.exibirHome == true )
// let filtroPromocoes = database.filter(produto => produto.classificacaoProduto === "Promocoes" && produto.exibirHome == true )


async function fetchProductsByCategory(category, section) {
  try {
      const response = await fetch(`http://127.0.0.1:8000/api/produtos?classificacao=${category}&exibirHome=true`);
      if (!response.ok) throw new Error("Erro ao carregar produtos");
      const produtos = await response.json();
      loadProducts(produtos, section);
  } catch (error) {
      console.error("Erro:", error);
  }
}

//Funçoes com parametros
fetchProductsByCategory("Lançamentos", sectionNovidades);
fetchProductsByCategory("Mais_Vendidos", sectionMaisVendidos);
fetchProductsByCategory("Promocoes", sectionPromocoes);

getProdId();








// ------- carrousel de imagens home -------------------

document.querySelectorAll('.section-product').forEach( carrousel => {
const productCarousel = carrousel.querySelector('.carrousel');
const prevBtn = carrousel.querySelector('.prev');
const nextBtn = carrousel.querySelector('.next');

let scrollAmount = 0;

nextBtn.addEventListener('click', () => {
  scrollAmount += 340; // Largura do produto + margem
  if (scrollAmount > productCarousel.scrollWidth - carrousel.offsetWidth) {
    scrollAmount = productCarousel.scrollWidth - carrousel.offsetWidth;
  }
  productCarousel.style.transform = `translateX(-${scrollAmount}px)`;
});

prevBtn.addEventListener('click', () => {
  scrollAmount -= 340; // Largura do produto + margem
  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
  productCarousel.style.transform = `translateX(-${scrollAmount}px)`;
});
})