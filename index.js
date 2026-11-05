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
            <button class="add-btn">+</button>
        </div>`
    })
    menu.innerHTML = menuList
}

renderMenu()
