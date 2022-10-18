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
fecha.innerText = hoy.toLocaleString()

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
calculoStock(cantidad){
    if (cantidad  <= this.stock){
        calculoPrecio(cantidad, this.precio);
        this.stock -= cantidad;
    }
        else{
            alert('actualmente tenemos' + this.stock + "unidades del producto");
    }
}
}
function calculoPrecio(cantidad, precio) {
    precioTotal += (cantidad * precio) ;

}


let producto1 = new Producto("BMW 240i M Package", 50000, 20, "../images/bmw240.jpeg",1, "autos");
let producto2 = new Producto("Bmw s1000rr", 20000, 50, "./images/s1000rr.jpeg",2, "motos");
let producto3 = new Producto("Segue46", 100000, 10, "./images/klase42.jpeg",3, "embarcaciones");
let producto4 = new Producto("Private Jet", 1000000, 5, "./images/privateJet.jpeg",4, "aviones");

let listaProductos = [producto1,producto2,producto3,producto4];

let listaDeProductos = document.getElementById("listaDeProductos");
listaDeProductos.innerText = "La cantidad de productos diferentes es: " + listaProductos.length;


let listaProductosConStock = listaProductos.filter((producto) => producto.stock > 0);
let listaNombres = listaProductosConStock.map((producto) => producto.nombre);

alert("Estos son nuestros productos : \n - " + listaNombres.join("\n - "));
let cantidadProductosComprar= prompt("Que cantidad de productos distintos quiere comprar?");
let precioTotal = 0; 



// FASE DE PRUEBA




let catalogo = document.getElementById('catalogo');
let cartList = document.getElementById('agregaProductoAlCarrito')
let totalValue = document.getElementById('totalPriceCart')
let titulosCart = document.getElementById("titulosCart")
let productosTotales = document.getElementById("productosTotales")

let cart = [];


listaProductosConStock.forEach((producto) =>{
// BODY
let cardBody = document.createElement("div");
cardBody.classList.add('propiedadesCard')
// IMAGEN
let cardImg = document.createElement("img");
cardImg.classList.add('card-img');
cardImg.src = `${producto.img}`
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
cardStock.id = ("stockActualProductos")
cardStock.classList.add('card-stock');
cardStock.innerText = `Stock : ${producto.stock} unidades`;
// BUTTON
let cardButton = document.createElement("button");
cardButton.classList.add('btn', 'btn-primary');
cardButton.innerText = 'Comprar'
cardButton.setAttribute("identify", producto.id)
cardButton.addEventListener('click', addProductToCart)


cardBody.append(cardImg)
cardBody.append(cardTitle)
cardBody.append(cardPrice)
cardBody.append(cardStock)
cardBody.append(cardButton)
catalogo.append(cardBody)

})




function addProductToCart(evento){
    cart.push(evento.target.getAttribute('identify'))
    renderCart()
}

function renderCart(){
storage();
cartList.innerHTML = ''

    let cartNotRepeat = [...new Set(cart)];

    cartNotRepeat.forEach((itemId) => {
        let item = listaProductosConStock.filter((producto) => {
            return producto.id === parseInt(itemId)
        })
        
        let quantity = cart.reduce((total, id) => {
            return id === itemId ? total +=1 : total
        },0)
        
        
        let linea = document.createElement('tbody');
        linea.innerHTML =`<td scope="col"><img class="imgProductoComprado" src="${item[0].img}"></td><td  scope="col">${item[0].nombre}</td><td scope="col">${quantity}</td><td  scope="col">$${item[0].precio*quantity }</td>`;
        titulosCart.innerHTML = `<tr class="table-primary"><td scope="col">Item</td><td scope="col">Producto</td><td scope="col">Cantidad</td><td scope="col">Total</td></tr>`;
        productosTotales.innerHTML = `<tr><th scope="row" colspan="2" >Total Productos</th><td><button class="btn btn-danger btn-sm" id="vaciarElCarrito">Vaciar carrito</button></td> <td id="totalPriceCart">$ ${item[0].precio*quantity }</td></tr>`;
        totalValue.innerText = calculateTotalPrice();

        let buttonDelete = document.createElement('button');
        buttonDelete.classList.add('btn', 'btn-danger' );
        buttonDelete.innerText = '↑ Eliminar Item ↑'

        buttonDelete.dataset.item = itemId;
        buttonDelete.addEventListener('click', deleteProduct);

        linea.append(buttonDelete);
        cartList.append(linea);
        agregaProductoAlCarrito.append(titulosCart);
        agregaProductoAlCarrito.append(productosTotales);
 
    })




    let vaciarElCarrito = document.getElementById("vaciarElCarrito");    
    vaciarElCarrito.addEventListener("click", emptyCart)

  

    
}
function emptyCart(){
    cart = [];
    cartList.innerHTML = '';
    totalValue.innerText = 0;
}

function deleteProduct(event){
    let id = event.target.dataset.item
    cart = cart.filter((cartId) => {
        return cartId !=id
    })
    renderCart();
    


}

function calculateTotalPrice(){
    return cart.reduce((total, itemId) =>{
        let item = listaProductosConStock.filter((producto) => {
            return producto.id === parseInt(itemId)
        })
        return total + item[0].precio
    },0)
}

function storage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}
 





// FASE DE PRUEBA

//FILTRADO PRODUCTOS.//
function render(listaProductosConStock) {
    catalogo.innerHTML = ""

    for(const producto of listaProductosConStock){

        
            // BODY
        let cardBody = document.createElement("div");
        cardBody.classList.add('propiedadesCard')
        // IMAGEN
        let cardImg = document.createElement("img");
        cardImg.classList.add('card-img');
        cardImg.src = `${producto.img}`
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
        cardButton.innerText = 'Comprar'
        cardButton.setAttribute("identify", producto.id)
        cardButton.addEventListener('click', addProductToCart)
        
        
        cardBody.append(cardImg)
        cardBody.append(cardTitle)
        cardBody.append(cardPrice)
        cardBody.append(cardStock)
        cardBody.append(cardButton)
        catalogo.append(cardBody)
        
        }
    }


render(listaProductosConStock);
let categoriaElegida = ''

let categoria = document.getElementById("categoria");
categoria.addEventListener("change", ()=>categoriaElegida = categoria.value);


let filtrar = document.getElementById("filtrar");
filtrar.addEventListener("click",filtrado);


function filtrado(){
    if(categoriaElegida == ""){
        render(listaProductosConStock)
    }else{
    let filtroActual = listaProductosConStock.filter((producto) =>producto.categoria == categoriaElegida);
    
    render(filtroActual);
    
}}



for(let i = 0; i < cantidadProductosComprar; i++){

let productoCompra = prompt('Ingrese el producto que quiere comprar : \n - ' + listaNombres.join("\n - "  ));

if (productoCompra.toLowerCase() == 'autos'){
    let cantidadProductoAuto = parseInt(prompt('Ingrese que cantidad de ' + producto1.nombre + ' quiere comprar'));
        producto1.calculoStock(cantidadProductoAuto);  
}
    else if (productoCompra.toLowerCase() == 'motos'){
    let cantidadProductoMoto = parseInt(prompt ('Ingrese que cantidad de ' + producto2.nombre + ' quiere comprar'));
    producto2.calculoStock(cantidadProductoMoto);
    }
    else if (productoCompra.toLocaleLowerCase() == 'embarcaciones'){
        let cantidadProductoEmbarcacion = parseInt(prompt ('Ingrese que cantidad de ' + producto3.nombre + ' quiere comprar'));
        producto3.calculoStock(cantidadProductoEmbarcacion);
    }
    else if (productoCompra.toLocaleLowerCase() == 'aviones'){
        let cantidadProductoAviones = parseInt(prompt ('Ingrese que cantidad de ' + producto4.nombre + ' quiere comprar'));
        producto4.calculoStock(cantidadProductoAviones);
    }
}


let stockActualProductos = document.getElementById("stockActualProductos");
stockActualProductos.innerText = '- Stock actual Autos: ' + producto1.stock + "\n" + '- Stock actual Motos: ' + producto2.stock + "\n" + '- Stock actual Embarcaciones: ' + producto3.stock + "\n" + '- Stock actual Aviones: ' + producto4.stock + "\n" + 'El precio total de la compra es: $' + precioTotal;




