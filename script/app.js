let product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

let burgersBtn = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn = document.querySelector('.wrapper__navbar-btn')
    cartList = document.querySelector('.wrapper__navbar-basket'),
    cartClose = document.querySelector('.wrapper__navbar-close'),
    cartAmount = document.querySelector('.warapper__navbar-count'),
    cartListItem = document.querySelector('.wrapper__navbar-checklist'),
    cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    box = document.querySelector('.box');
    
burgersBtn.forEach((btn) => {
    btn.addEventListener('click', function() {
        addCount(this)
    })
})

function addCount(btn) {
    // closest() - позволяет нам подключится к указаному ближайшему родителю
    let parent = btn.closest('.wrapper__list-card')
    let parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

cartBtn.addEventListener('click', () => cartList.classList.add('active'))
cartClose.addEventListener('click', () => cartList.classList.remove('active'))
box.addEventListener('click', () => cartList.classList.remove('active'))

function basket() {
    let productArray = []
    for(let key in product) {
        let burger = product[key]
        let productBurger = document.querySelector(`#${key}`)
        let productCount = productBurger.querySelector('.wrapper__list-count')
        if(burger.amount > 0) {
            productArray.push(burger)
            productCount.classList.add('active')
            productCount.innerHTML = burger.amount
        }else {
            productCount.classList.remove('active')
            productCount.innerHTML = ''
        }
    }
    let allCount = totalCountProduct()
    if(allCount > 0) {
        cartAmount.classList.add('active')
    }else {
        cartAmount.classList.remove('active')
    }
    cartAmount.innerHTML = allCount
    
    cartListItem.innerHTML = ''
    
    productArray.forEach((burger) => {
        cartListItem.innerHTML += createBurger(burger)
    })
    
    cartTotalPrice.innerHTML = totalSumProduct()
    
    productArray.length == 0 ? cartListItem.innerHTML = `<h2 class="product__title">Нет</h2` : ''
    
}


function totalCountProduct() {
    let total = 0;
    for(let key in product) {
        total += product[key].amount
    }
    return total
}

function totalSumProduct() {
    let sum = 0;
    for(let key in product) {
        sum += product[key].totalSum
    }
    
    return sum + 'сумм'
    
}




function createBurger(burger) {
    
    return `<div class="navbar__item" id="${burger.name.toLowerCase()}-burger">
    <div class="navbar__item-left">
        <img src="${burger.img}" alt="">
        <div class="navbar__item-left-info">
            <p class="navbar__item-left-name">${burger.name}</p>
            <p class="navbar__item-left-price">${burger.price} сум</p>
        </div>
    </div>
    <div class="navbar__item-right">
        <button data-symbol="-" class="navbar__item-btn">-</button>
        <output class="navbar__item-count">${burger.amount}</output>
        <button data-symbol="+" class="navbar__item-btn">+</button>
    </div>
</div>`
}

window.addEventListener('click', (event) => {
    if(event.target.classList.contains('navbar__item-btn')) {
        const dataValue = event.target.getAttribute('data-symbol')
        const parentBurger = event.target.closest('.navbar__item')
        if(parentBurger) {
            let burgerId = parentBurger.getAttribute('id').split('-')[0]
            if(dataValue == '-') {
                product[burgerId].amount--
            }else if(dataValue == '+') {
                product[burgerId].amount++
            }
            basket()
        }
    }
})