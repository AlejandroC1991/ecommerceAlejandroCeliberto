// BIENVENIDA AL SITIO CON SWEETALERT//

Swal.fire({
    title: 'Bienvenidos a Luxury Market!',
    width: 650,
    padding: '2rem',
    color: '#fff',
    timer: 2500,
    background: '#212529 ',
    confirmButtonColor: '#212529',
    
    backdrop: ` 
    rgba(33, 37, 41, 0.9)
      url("/images/gifFerrari.gif")
      left top
      no-repeat
    `
})

// FUNCION SALUDAR AL USUARIO//

let saludo = document.getElementById("bienvenido")
saludo.addEventListener ("click", saludar);

    function saludar() {
        let nombreOutput = document.getElementById("ingresaNombre").value; 
        let imprimeNombre = document.getElementById("imprimeNombre")
        imprimeNombre.innerText = "Bienvenid@ "  + nombreOutput + " a continuación verás los productos disponibles de nuestra tienda!";

}

// FECHA Y HORA ACTUAL//

let hoy = new Date();
let fecha = document.getElementById("fecha");
fecha.innerText = hoy.toLocaleString();

//CREAR PRODUCTOS//

class Producto{
    constructor(nombre,precio,stock,img,id,categoria){
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.img= img;
        this.id = id;
        this.categoria = categoria;
    }
}

let producto1 = new Producto("BMW 240i M Package", 50000, 20, "../images/bmw240.jpeg",1, "autos");
let producto2 = new Producto("Bmw s1000rr", 20000, 50, "./images/s1000rr.jpeg",2, "motos");
let producto3 = new Producto("Segue46", 100000, 10, "./images/klase42.jpeg",3, "embarcaciones");
let producto4 = new Producto("Private Jet", 1000000, 5, "./images/privateJet.jpeg",4, "aviones");

let listaProductos = [producto1,producto2,producto3,producto4];
let listaProductosConStock = listaProductos.filter((cadaProducto) => cadaProducto.stock > 0);
let listaNombres = listaProductosConStock.map((cadaProducto) => cadaProducto.nombre);

// FASE DE PRUEBA

let catalogo = document.getElementById('catalogo');
let cartList = document.getElementById('agregaProductoAlCarrito');
let totalValue = document.getElementById('totalPriceCart');
let titulosCart = document.getElementById("titulosCart");
let productosTotales = document.getElementById("productosTotales");
let cart = [];
let catalogoDeApis = document.getElementById('catalogoDeApis');


listaProductosConStock.forEach((producto) =>{
    // BODY
    let cardBody = document.createElement("div");
    cardBody.classList.add('propiedadesCard')
    // IMAGEN
    let cardImg = document.createElement("img");
    cardImg.classList.add('card-img');
    cardImg.src = `${producto.img}`;
    // TITLE
    let cardTitle = document.createElement("h2");
    cardTitle.classList.add('nombreProducto');
    cardTitle.innerText = `${producto.nombre}`;
    // PRECIO
    let cardPrice = document.createElement("p");
    cardPrice.classList.add('card-price');
    cardPrice.innerText = `Precio: $${producto.precio}`;
    // STOCK
    let cardStock = document.createElement("p");
    cardStock.stock = ("stockActualProductos");
    cardStock.classList.add('card-stock');
    cardStock.innerText = `Stock : ${producto.stock} unidades`;
    // BUTTON
    let cardButton = document.createElement("button");
    cardButton.classList.add('btn', 'btn-primary');
    cardButton.innerText = 'Comprar';
    cardButton.setAttribute("identify", producto.id);
    cardButton.addEventListener('click', addProductToCart);


    cardBody.append(cardImg);
    cardBody.append(cardTitle);
    cardBody.append(cardPrice);
    cardBody.append(cardStock);
    cardBody.append(cardButton);
    catalogo.append(cardBody);
    
})


function addProductToCart(evento){
    cart.push(evento.target.getAttribute('identify'));
    renderCart();

    Toastify({
        text: "Agregado al carrito!",
        style: {
          background: "linear-gradient(to right, #72e501, #00c73e)",
        }
      }).showToast();
}

//API
fetch('https://www.breakingbadapi.com/api/characters/2')
    .then((response) => response.json())
    .then((info) => renderApi(info));
   
   
function renderApi(cardsApi){
    catalogoDeApis.innerHTML = ""

    for(const producto of cardsApi){
    // BODY
        let cardBody = document.createElement("div");
        cardBody.classList.add('propiedadesApi');
        cardBody.innerText = 'CEO Luxury Market';
       // IMAGEN
       let cardImg = document.createElement("img");
       cardImg.classList.add('imagenApi');
       cardImg.src = `${producto.img}`;
        // TITLE
        let cardTitle = document.createElement("h2");
        cardTitle.classList.add('nombreProducto');
        cardTitle.innerText = `${producto.name}`;

        // STOCK
        let cardId = document.createElement("p");
        cardId.classList.add('card-stock');
        cardId.innerText = `ID : ${producto.char_id} `;
       
        cardBody.append(cardTitle);
        cardBody.append(cardId);
        cardBody.append(cardImg);
        catalogoDeApis.append(cardBody);
        
        }
    }

// 
function renderCart(){
    storage();
    cartList.innerHTML = '';

    let cartNotRepeat = [...new Set(cart)];

    cartNotRepeat.forEach((itemId) => {
        let item = listaProductosConStock.filter((producto) => {
            return producto.id === parseInt(itemId);
        })
        
        let quantity = cart.reduce((total, id) => {
            return id === itemId ? total +=1 : total;
        },0)
        
        
        let linea = document.createElement('tbody');
        linea.innerHTML =`<td scope="col"><img class="imgProductoComprado" src="${item[0].img}"></td><td  scope="col">${item[0].nombre}</td><td scope="col">${quantity}</td><td  scope="col">$${item[0].precio*quantity }</td>`;
        titulosCart.innerHTML = `<tr class="table-primary"><td scope="col">Item</td><td scope="col">Producto</td><td scope="col">Cantidad</td><td scope="col">Total</td></tr>`;
        productosTotales.innerHTML = `<tr><th scope="row" colspan="2" >Total Productos</th><td><button class="btn btn-danger btn-sm" id="vaciarElCarrito">Vaciar carrito</button></td> <td id="totalPriceCart">$ ${calculateTotalPrice() }</td></tr>`;
        totalValue.innerText = calculateTotalPrice();

        let buttonDelete = document.createElement('button');
        buttonDelete.classList.add('btn', 'btn-danger' );
        buttonDelete.innerText = '↑ Eliminar Item ↑';

        buttonDelete.dataset.item = itemId;
        buttonDelete.addEventListener('click', deleteProduct);

        linea.append(buttonDelete);
        cartList.append(linea);
        agregaProductoAlCarrito.append(titulosCart);
        agregaProductoAlCarrito.append(productosTotales);
 
        let vaciarElCarrito = document.getElementById("vaciarElCarrito");    
        vaciarElCarrito.addEventListener("click", emptyCart);
    })

    
}

function emptyCart(){
    cart = [];
    cartList.innerHTML = '';
    totalValue.innerText = 0;
    Swal.fire({
    
        icon: 'success',
        title: 'Vaciaste el carrito',
        showConfirmButton: false,
        timer: 1500
      })
}

function deleteProduct(event){
    Swal.fire({
        title: 'Estas seguro que queres eliminar el producto?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
      })
      
      .then((result) => {
        if (result.isConfirmed) {
            let id = event.target.dataset.item
            cart = cart.filter((cartId) => {
                return cartId !=id
            })
            Swal.fire('Eliminado', '', 'success')
            renderCart();
            
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info')
        }
      }) 
}

function calculateTotalPrice(){
    return cart.reduce((total, itemId) =>{
        let item = listaProductosConStock.filter((producto) => {
            return producto.id === parseInt(itemId);
        })
        return total + item[0].precio;
    },0)
}

function storage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}
 
function loadCartFromStorage(){
    if(localStorage.getItem('cart') !== null){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

//FILTRADO PRODUCTOS//
function render(listaProductosConStock) {
    catalogo.innerHTML = ""

    for(const producto of listaProductosConStock){
            // BODY
        let cardBody = document.createElement("div");
        cardBody.classList.add('propiedadesCard');
        // IMAGEN
        let cardImg = document.createElement("img");
        cardImg.classList.add('card-img');
        cardImg.src = `${producto.img}`;
        // TITLE
        let cardTitle = document.createElement("h2");
        cardTitle.classList.add('nombreProducto');
        cardTitle.innerText = `${producto.nombre}`;
        // PRECIO
        let cardPrice = document.createElement("p");
        cardPrice.classList.add('card-price');
        cardPrice.innerText = `Precio: $${producto.precio}`;
        // STOCK
        let cardStock = document.createElement("p");
        cardStock.classList.add('card-stock');
        cardStock.innerText = `Stock : ${producto.stock} unidades`;
        // BUTTON
        let cardButton = document.createElement("button");
        cardButton.classList.add('btn', 'btn-primary');
        cardButton.innerText = 'Comprar';
        cardButton.setAttribute("identify", producto.id);
        cardButton.addEventListener('click', addProductToCart);
        
        
        cardBody.append(cardImg);
        cardBody.append(cardTitle);
        cardBody.append(cardPrice);
        cardBody.append(cardStock);
        cardBody.append(cardButton);
        catalogo.append(cardBody);
        
        }
    }


render(listaProductosConStock);
let categoriaElegida = '';

let categoria = document.getElementById("categoria");
categoria.addEventListener("change", ()=>categoriaElegida = categoria.value);


let filtrar = document.getElementById("filtrar");
filtrar.addEventListener("click",filtrado);


function filtrado(){
    if(categoriaElegida == ""){
        render(listaProductosConStock);
    } else {
        let filtroActual = listaProductosConStock.filter((producto) =>producto.categoria == categoriaElegida);
        render(filtroActual);
    }
}
loadCartFromStorage();
renderCart();

