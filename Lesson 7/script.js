http();

function http() {
  let promise = makeGetRequest('http://localhost:3001/catalog');
  promise.then(result => {
      console.log(result)
    },
    error => {
      console.log(error)
    },
  );
}

Vue.component('search-input', {
  template: '' +
    '<div>' +
    '<label> Поиск: <input v-on:input="$emit(\'input\', $event.target.value)" type="text" title="search"></label>' +
    '</div>',
});

Vue.component('basket', {
  template: '' +
    '<div id="basket">' +
    '   <div id="itemsPool"></div>' +
    '</div>'
});

Vue.component('alert', {
  template: '<div id="alert">Нет товара.</div>'
});

let app = new Vue({
  el: '#app',
  data: {
    filter: '',
    isVisibleCart: {
      visibility: 'hidden'
    }
  },
  methods: {
    search: function () {
      goodsItems.filter = this.filter;
      goodsItems.render();
    },
    visibleBasket: function () {
      if (this.isVisibleCart.visibility === 'hidden') {
        this.isVisibleCart.visibility = 'visible'
      } else {
        this.isVisibleCart.visibility = 'hidden'
      }
    }
  }
});

function makeGetRequest(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.status === 200) {
        if (xhr.readyState === 4) {
          resolve(xhr);
        }
      } else {
        reject("Error");
      }
    }
  });
}

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
    this.filterGoods = [];
    this.filter = '';
  }
  fetchGoods() {
    return new Promise(function (resolve, reject) {
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
      resolve();
    }.bind(this))
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

  FilterGoods() {
    this.filterGoods = [{
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

  render() {
    this.FilterGoods();
    document.querySelector('.goods-list').innerHTML = '';
    if (this.filterGoods.length > 0) {
      let goodsList = this.filterGoods.map(item => {
        return `<div class="goods-item">
        <img src="${item.images || 'img/orig.jpg'}">
        <h3>${item.title || 'Товар отсутствует'}</h3>
        <p>${item.price || 'Цена отсутствует'}</p>
        <button>Добавить</button>
        </div>`;
      });
      document.querySelector('.goods-list').innerHTML = goodsList.join('');
    } else {
      document.querySelector('.goods-list').innerHTML = 'Нет данных!';
    }

    for (let i in this.goods) {
      let button = document.getElementById(this.goods[i].title);
      if (button) button.onclick = () => {
        basket.addItems([this.goods[i]])
      }
    }
  }
}

let goodsItems = new GoodsList();

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