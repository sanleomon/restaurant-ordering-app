import { menuArray } from "./data.js"

const menu = document.getElementById('menu')
const orderContainer = document.getElementById('order')
const paymentModal = document.getElementById('payment-modal')
const modalOverlay = document.getElementById('modal-overlay')
const themeToggleBtn = document.getElementById('theme-toggle-btn')

let order = []

function renderMenu(){
    let menuList = ''
    menuArray.forEach(function (menuItem) {
        menuList += `
        <div class="menu-item">
            <p class="menu-item-emoji">${menuItem.emoji}</p>
            <div class="menu-item-info">
                <h2>${menuItem.name}</h2>
                <p class="menu-item-info-ingredients">${menuItem.ingredients.join(', ')}</p>
                <p class="menu-item-info-price">$${menuItem.price}</p>
            </div>
            <button data-id="${menuItem.id}" class="add-btn">+</button>
        </div>`
    })
    menu.innerHTML = menuList
}

function calculateDiscount(order, menuArray){
    let hamburgerCount = 0
    let beerCount = 0

    const discountRate = 0.10

    const hamburger = menuArray.find(function(item){
        return item.name === 'Hamburger'
    })

    const beer = menuArray.find(function(item){
        return item.name === 'Beer'
    })

    order.forEach(function(orderItem){
        if(orderItem.name === 'Hamburger'){
            hamburgerCount++
        }

        if(orderItem.name === 'Beer'){
            beerCount++
        }
    })

    const comboCount = Math.min(hamburgerCount, beerCount)
    const discount = comboCount * (hamburger.price + beer.price) * discountRate

    return {
        comboCount: comboCount,
        discount: discount,
        discountRate: discountRate
    }
}

function renderOrder(){
    let orderList = ''
    let totalPrice = 0

    order.forEach(function(orderItem, index){
        orderList += `
        <div class="order-item">
            <div class="order-item-info">
                <span class="order-item-name">${orderItem.name}</span>
                <button data-index="${index}" class="remove-btn">remove</button>
            </div>
            <span class="price">$${orderItem.price}</span>
        </div>`

        totalPrice += orderItem.price
    })

    const mealDeal = calculateDiscount(order, menuArray)

    if(mealDeal.comboCount > 0){
        orderList += `
        <div class="order-item discount-item">
            <span>Meal deal discount (${mealDeal.discountRate * 100}%) x ${mealDeal.comboCount}</span>
            <span>-$${mealDeal.discount.toFixed(2)}</span>
        </div>`
    }

    totalPrice -= mealDeal.discount

    document.getElementById('order-items').innerHTML = orderList
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`

    if(order.length > 0){
        orderContainer.style.display = 'block'
    } else {
        orderContainer.style.display = 'none'
    }
}

function closePaymentModal(){
    paymentModal.style.display = 'none'
    modalOverlay.style.display = 'none'
    paymentModal.reset()
}

themeToggleBtn.addEventListener('click', function(){
    document.body.classList.toggle('dark-mode')
    if(document.body.classList.contains('dark-mode')){
        themeToggleBtn.textContent = '☀️'
    } else{
        themeToggleBtn.textContent = '🌙'
    }
})

menu.addEventListener('click', function(e){
    if(e.target.classList.contains('add-btn')){
        document.getElementById('order-confirmation').style.display = 'none'
        order.push(menuArray.find(function(menuItem){
            return menuItem.id === Number(e.target.dataset.id)
        }))
        renderOrder()
    }
})

document.getElementById('order-items').addEventListener('click', function(e){
    if(e.target.classList.contains('remove-btn')){
        order = order.filter(function(_, index){
            return index !== Number(e.target.dataset.index)
        })
        renderOrder()
    }
})

document.getElementById('complete-order-btn').addEventListener('click', function(){
    paymentModal.style.display = 'block'
    modalOverlay.style.display = 'block'
})

document.getElementById('close-modal-btn').addEventListener('click', function(){
    closePaymentModal()
})

paymentModal.addEventListener('submit', function(e){
    e.preventDefault()
    const customerName = document.getElementById('payment-name').value
    document.querySelector('#order-confirmation p').textContent =
        `Thanks, ${customerName}! Your order is on its way!`

    closePaymentModal()
    orderContainer.style.display = 'none'
    order = []
    document.getElementById('order-confirmation').style.display = 'flex'
})

renderMenu()