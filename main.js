const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const burgerMenu = document.querySelector('.menu');
const carritoMenuIcon = document.querySelector('.navbar-shopping-cart');
const shoppingCartContainer = document.querySelector('#shoppingCartContainer');
const cardsContainer = document.querySelector('.cards-container');
const shoppingCartCount= document.querySelector('.navbar-shopping-cart__count');
const addToCartShopping = document.querySelector('.my-order-content');

let addedItem=0;
let total;
let shoppingCartList =[];
let productClicked =[];

shoppingCartCount.style.setProperty('display','none');

const productDetailAside = document.querySelector('#productDetail');


menuEmail.addEventListener('click',toggleDesktopMenu);
burgerMenu.addEventListener('click',toggleMobileMenu);
carritoMenuIcon.addEventListener('click',toggleCarritoAside);


function toggleDesktopMenu(){
   
        let emailNavbar='desktopMenu';
        closeWindows(emailNavbar);
}

function toggleMobileMenu(){
        let mobileMenu='mobileMenu';
        closeWindows(mobileMenu);
}

function toggleCarritoAside(){
        let carritoIcon='carritoDeCompras';
        closeWindows(carritoIcon);

}

function openProductDetail() {
    productDetailAside.replaceChildren();
     let productDetail ='productDetail';
     closeWindows(productDetail);
    renderProductDetail(this.alt);

}

function closeProductDetail() {
    productDetailAside.classList.add('inactive');
}

function closeWindows(etiqueta){
    console.log(etiqueta);
    const isMobileMenuOpen = !mobileMenu.classList.contains('inactive');
    const isAsideOpen = !shoppingCartContainer.classList.contains('inactive');
    const isdesktopMenuOpen = !desktopMenu.classList.contains('inactive');
    const isProductDetailOpen = !productDetailAside.classList.contains('inactive');

    switch (etiqueta) {
        case 'desktopMenu':
            if (isAsideOpen) {
                shoppingCartContainer.classList.add('inactive');
            }else if (isProductDetailOpen) {
                productDetailAside.classList.add('inactive');
            }
            desktopMenu.classList.toggle('inactive');
            break;
        case 'carritoDeCompras':
            if (isdesktopMenuOpen) {
                desktopMenu.classList.add('inactive');
            }else if (isMobileMenuOpen) {
                mobileMenu.classList.add('inactive');
            }else if (isProductDetailOpen) {
                productDetailAside.classList.add('inactive');
            }
            shoppingCartContainer.classList.toggle('inactive');
            break;
        case 'mobileMenu':
            if (isAsideOpen) {
                shoppingCartContainer.classList.add('inactive');
            }else if (isProductDetailOpen) {
                productDetailAside.classList.add('inactive');
            }
            mobileMenu.classList.toggle('inactive');
            break;
        case 'productDetail':
            if (isdesktopMenuOpen) {
                desktopMenu.classList.add('inactive');
            }else if (isMobileMenuOpen) {
                mobileMenu.classList.add('inactive');
            }else if (isAsideOpen) {
                shoppingCartContainer.classList.add('inactive');
            }
            productDetailAside.classList.remove('inactive');
            break;
    }

}

function addToCart() {
    addToCartShopping.replaceChildren();
    shoppingCartCount.style.setProperty('display','flex');
    addedItem+=1;
    shoppingCartCount.innerText = addedItem;
    let item = this.name;
    console.log(item);
    const itemAddedCart = productList.find(function (product) {
      return product.name === item;
    })
    console.log(itemAddedCart);
    shoppingCartList.push(itemAddedCart);
    console.log(shoppingCartList);
    renderAddToCartItem(shoppingCartList);
}

function deleteItemFromCart() {
    total=0;
    addedItem=addedItem-1;
    shoppingCartCount.innerText = addedItem;
    if (addedItem==0) {
        shoppingCartCount.style.setProperty('display','none');
        toggleCarritoAside();    
    }
    addToCartShopping.replaceChildren();
    shoppingCartList.pop(this.name);
    renderAddToCartItem(shoppingCartList);
  
        
}

function renderAddToCartItem(arr) {
    total=0;

for (const productAddedToCart of arr) {
const shoppingCart = document.createElement('div');
    shoppingCart.classList.add('shopping-cart');
       
       const shoppingCartFigure =document.createElement('figure');
         const shoppingCartFigureImg = document.createElement('img');
         shoppingCartFigureImg.setAttribute('src',productAddedToCart.image);
 
       shoppingCartFigure.appendChild(shoppingCartFigureImg);
 
       const shoppingCartItemName = document.createElement('p');
       shoppingCartItemName.innerText = productAddedToCart.name;
       
       const shoppingCartItemPrice = document.createElement('p');
       shoppingCartItemPrice.innerText ='$'+productAddedToCart.price;
 
       const shoppingCartDeleteItem = document.createElement('img');
       shoppingCartDeleteItem.setAttribute('src','./icons/icon_close.png');
       shoppingCartDeleteItem.setAttribute('name',productAddedToCart.name);
       shoppingCartDeleteItem.addEventListener('click',deleteItemFromCart)
 
       shoppingCart.append(shoppingCartFigure,shoppingCartItemName,shoppingCartItemPrice,shoppingCartDeleteItem);
 
    
     addToCartShopping.append(shoppingCart)
     
     //addToCartShopping.insertAdjacentElement("afterbegin",shoppingCart);//para insertar un elemento antes de otro ya existente podemos ocupar insertAdjacentElement(parametroDePosicion,ElementoAgregado); los paramatros de posicion pueden ser los siguientes: 
     /* 
     beforebegin: El elemento se inserta antes de la etiqueta HTML de apertura.
     afterbegin: El elemento se inserta dentro de la etiqueta HTML, antes de su primer hijo.
     beforeend: El elemento se inserta dentro de la etiqueta HTML, después de su último hijo. Es el equivalente a usar el método .appendChild().
     afterend: El elemento se inserta después de la etiqueta HTML de cierre.
     */
  
    
}

const totalOrder = document.createElement('div');
totalOrder.classList.add('order');
  const totalOrderP=document.createElement('p');
    const totalOrderPSpan = document.createElement('span');
    totalOrderPSpan.innerText='Total';
  totalOrderP.appendChild(totalOrderPSpan);
  const totalOrderSum= document.createElement('p');

  let sumOfPricesAddedToCart=arr.map(function (prices) {
    return prices.price;
});
for (let i = 0; i < sumOfPricesAddedToCart.length; i++) {
 total = total + sumOfPricesAddedToCart[i];
}

totalOrderSum.innerText='$'+total;

totalOrder.append(totalOrderP,totalOrderSum);

const shoppingCartBtn = document.createElement('button');
shoppingCartBtn.classList.add('primary-button');
shoppingCartBtn.innerText='Checkout';

addToCartShopping.append(totalOrder,shoppingCartBtn);

}

function renderProducts(arr) {
  /* el for of nos siver para recorrer un objeto por sus atributos, esto nos sirve para que no tengamos que usar el indice de un array con mayor dificultad cuando se habla de objetos.
  
  para maquetar desde el JS con la manipulacion del DOM debemos primero crear los elementos del html de arriba hacia abajo con document.createElement('Elemento a crear: div,p,section, img, etc...') de arriba hacia abajo, luego debemos de ir anexando a los elementos padres cada uno de los elecmentos hijos con appendChild(variable otorgada las elementos), se puede ocupar el append(variable1,variable2,etc...) para agregar mas elementos de una vez en el elemento padre*/  
for (const product of arr) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    
    const img = document.createElement('img');
    img.setAttribute('src',product.image);
    img.setAttribute('alt',product.name);

    img.addEventListener('click',openProductDetail);
    
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    
    const productInfoDiv = document.createElement('div');
    
    const productPrice = document.createElement('p');
    productPrice.innerText='$'+product.price;
    
    const productName = document.createElement('p');
    productName.innerText=product.name;
    
    productInfoDiv.appendChild(productPrice);
    productInfoDiv.appendChild(productName);
    
    const productInfoFigure = document.createElement('figure');
    const productImgCart = document.createElement('img');
    productImgCart.setAttribute('src','./icons/bt_add_to_cart.svg');
    
    productImgCart.addEventListener('click',addToCart)
    productImgCart.setAttribute('name',product.name);

    productInfoFigure.appendChild(productImgCart);
    
    productInfo.appendChild(productInfoDiv);
    productInfo.appendChild(productInfoFigure);
    
    productCard.append(img,productInfo);
    
    cardsContainer.appendChild(productCard);
        
    }
}

function renderProductDetail(productName){
  productClicked = productList.find(function (product) {
    return product.name === productName;
  })

  const productDetailClose = document.createElement('div');
  productDetailClose.classList.add('product-detail-close');
    const imgClose = document.createElement('img');
    imgClose.setAttribute('src','./icons/icon_close.png')
    imgClose.setAttribute('atl','close');

    productDetailClose.addEventListener('click',closeProductDetail);

    productDetailClose.appendChild(imgClose);

  const productDetailImg = document.createElement('img');
  productDetailImg.setAttribute('src',productClicked.image);
  productDetailImg.setAttribute('alt',productClicked.name);

  const productDetailInfo = document.createElement('div');
  productDetailInfo.classList.add('product-info');
    const productDetailPrice =document.createElement('p');
    productDetailPrice.innerText = '$'+productClicked.price;
    const productDetailName = document.createElement('p');
    productDetailName.innerText =productClicked.name;
    const productDetailDescription =document.createElement('p');
    productDetailDescription.innerText='With its practical position, this bike also fulfills a decorative function, add your hall or workspace.';

    const productDetailBtn = document.createElement('button');
    productDetailBtn.classList.add('primary-button');
    productDetailBtn.classList.add('add-to-cart-button');
    productDetailBtn.setAttribute('name',productClicked.name);
    productDetailBtn.addEventListener('click',addToCart);
        const productDetialBtnImg = document.createElement('img');
        productDetialBtnImg.setAttribute('src','./icons/bt_add_to_cart.svg');
        productDetialBtnImg.setAttribute('alt','add to cart');
    productDetailBtn.innerText='Add to cart';

    productDetailBtn.appendChild(productDetialBtnImg); 
  productDetailInfo.append(productDetailPrice,productDetailName,productDetailDescription,productDetailBtn)  
  
productDetailAside.append(productDetailClose,productDetailImg,productDetailInfo)

}

const productList =[];
productList.push({
    name: 'Bike',
    price: 120,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
});

productList.push({
    name: 'Pantalla',
    price: 12000,
    image: 'https://m.media-amazon.com/images/I/81tmsk6LYiL._AC_SL1500_.jpg'
});

productList.push({
    name: 'Computador',
    price: 1200,
    image: 'https://m.media-amazon.com/images/I/71n0k0TSRwS._AC_SL1500_.jpg'
});

productList.push({
    name: 'Sofa',
    price: 3500,
    image: 'https://www.klaussner.com/cid645/css/1235/images/hp-tile-living-room.jpg'
});

productList.push({
    name: 'Cama',
    price: 600,
    image: 'https://media.admagazine.com/photos/618a60d829327ed3de99d538/3:2/w_3498,h_2332,c_limit/86276.jpg'
});

productList.push({
    name: 'Audifonos',
    price: 600,
    image: 'https://m.media-amazon.com/images/I/61VR62H-uBL._AC_SS450_.jpg'
});

productList.push({
    name: 'Iphone',
    price: 1120,
    image: 'https://skytree.com.au/wp-content/uploads/2020/01/1.jpeg'
});

console.log(productList);
renderProducts(productList);

