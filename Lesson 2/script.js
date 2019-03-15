class GoodsItem {
  constructor(title, price, images) {
    this.title = title;
    this.price = price;
    this.images = images;
  }
  render() {
    return `<div class="goods-item">
  <img src="${this.images || 'img/orig.jpg'}">
  <h3>${this.title || 'Товар отсутствует'}</h3>
  <p>${this.price || 'Цена отсутствует'}</p>
  <button>Добавить</button>
  </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [{
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
  }

  //Сумма товаров
  countPrice() {
    return this.goods.reduce((totalPrice, good) => {
      if (!good.price) return totalPrice;
      return totalPrice += good.price;
    }, 0)
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price, good.images);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

//Элемент корзины
class basketGoods extends GoodsItem {
  constructor() {
    super()
  }
  render() {
    return `<div class="cart-item">
  <h3>${this.title}</h3>
  <p>${this.price}</p>
  <button>Добавить</button>
  </div>`;
  }
}

//Корзина
class basket {
  constructor() {
    this.goods = [];
  }

  add(good) {
    this.goods.push(good);
    this.render();
  }

  remove(good) {
    const goodIndex = this.goods.findIndex(item => item.title == good.title);
    this.goods.splice(goodIndex, 1);
    this.render();
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.cart-list').innerHTML = listHtml;
  }
}

const list = new GoodsList();
list.fetchGoods();

window.onload = () => {
  list.render();
  console.log(list.countPrice());
};