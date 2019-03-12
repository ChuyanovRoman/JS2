const goods = [{
    images: 'img/Shirt.jpg',
    title: 'Shirt',
    price: 150,
  },
  {
    images: 'img/Socks.jpg',
    title: 'Socks',
    price: 50,
  },
  {
    images: 'img/Jacket.jpg',
    title: 'Jacket',
    price: 350,
  },
  {
    images: 'img/Shoes.jpg',
    title: 'Shoes',
    price: 250,
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

const renderGoodsItem = (images = 'img/orig.jpg', title = 'Товар отсутствует', price = 'Цена отсутствует') =>
  `<div class="goods-item">
  <img src="${images}">
  <h3>${title}</h3>
  <p>${price}</p>
  <button>Добавить</button>
  </div>`;

const renderGoodsList = list => {
  const goodsList = list.map(item => renderGoodsItem(item.images, item.title, item.price));
  document.querySelector('.goods-list').innerHTML = goodsList.join('');//.join('') убирает запятые
}

window.onload = () => {
  renderGoodsList(goods);
};