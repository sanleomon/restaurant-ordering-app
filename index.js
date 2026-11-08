import { menuArray } from "./data.js"

const menu = document.getElementById('menu')
const orderContainer = document.getElementById('order')

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

renderMenu()

let order = []

menu.addEventListener('click', function(e){
    if(e.target.classList.contains('add-btn')){
        document.getElementById('order-confirmation').style.display = 'none'
        order.push(menuArray.find(function(menuItem){
            return menuItem.id === Number(e.target.dataset.id)
        }))
        renderOrder()
    }
})

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

    document.getElementById('order-items').innerHTML = orderList
    document.getElementById('total-price').textContent = `$${totalPrice}`

    if(order.length > 0){
        orderContainer.style.display = 'block'
    } else {
        orderContainer.style.display = 'none'
    }
}

document.getElementById('order-items').addEventListener('click', function(e){
    if(e.target.classList.contains('remove-btn')){
        order = order.filter(function(orderItem, index){
            return index !== Number(e.target.dataset.index)
        })
        renderOrder()
    }
})

const paymentModal = document.getElementById('payment-modal')

document.getElementById('complete-order-btn').addEventListener('click', function(){
    paymentModal.style.display = 'block'
})

paymentModal.addEventListener('submit', function(e){
    e.preventDefault()
    const customerName = document.getElementById('payment-name').value
    document.querySelector('#order-confirmation p').textContent = 
        `Thanks, ${customerName}! Your order is on its way!`
    
    paymentModal.style.display = 'none'
    paymentModal.reset()
    orderContainer.style.display = 'none'
    order = []
    document.getElementById('order-confirmation').style.display = 'flex'
})