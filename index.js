import { menuArray } from "./data.js"

const menu = document.getElementById('menu')

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
        document.getElementById('order').style.display = 'block'
    } else {
        document.getElementById('order').style.display = 'none'
    }
}

document.getElementById('order-items').addEventListener('click', function(e){
    if(e.target.classList.contains('remove-btn')){
        console.log(e.target.dataset.index)
        order = order.filter(function(orderItem, index){
            return index != Number(e.target.dataset.index)
        })
        renderOrder()
    }
})