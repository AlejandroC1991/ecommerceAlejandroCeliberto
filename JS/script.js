function saludar(){
    let nombre = prompt('Ingrese su nombre:');
    let apellido = prompt('Ingrese su apellido:');
    alert("Bienvenido " + nombre + " " + apellido + "!, a continuación verás nuestra lista de productos.");
    }
    
saludar();

let hoy = new Date();
alert("Fecha de hoy : " + hoy.toLocaleString());

function Producto(nombre,precio,stock){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
   
}

let producto1 = new Producto("Autos", 10000, 10);
let producto2 = new Producto("Motos", 5000, 50);
let producto3 = new Producto("Embarcaciones", 75000, 5);
let producto4 = new Producto("Aviones", 150000, 2);

let listaProductos = [producto1,producto2,producto3,producto4];


let listaProductosConStock = listaProductos.filter((producto) => producto.stock > 0);
let listaNombres = listaProductosConStock.map((producto) => producto.nombre);

alert("Estos son nuestros productos : \n - " + listaNombres.join("\n - "));
let cantidadProductosComprar= prompt("Que cantidad de productos distintos quiere comprar?");
let precioTotal = 0; 

function calculoPrecio(cantidad, precio) {
    precioTotal += (cantidad * precio) ;

}

function calculoStock(cantidad, stock, precio) {
    if (cantidad  <= stock){
        calculoPrecio(cantidad, precio);
    }
        else{
            alert('actualmente tenemos' + stock + "unidades del producto");
    }
}

for(let i = 0; i < cantidadProductosComprar; i++){

let productoCompra = prompt('Ingrese el producto que quiere comprar : \n - ' + listaNombres.join("\n - "  ));

if (productoCompra.toLowerCase() == 'autos'){
    let cantidadProductoAuto = parseInt(prompt('Ingrese que cantidad de ' + producto1.nombre + ' quiere comprar'));
        calculoStock(cantidadProductoAuto,producto1.stock,producto1.precio);
        producto1.stock -= cantidadProductoAuto;
}
    else if (productoCompra.toLowerCase() == 'motos'){
    let cantidadProductoMoto = parseInt(prompt ('Ingrese que cantidad de ' + producto2.nombre + ' quiere comprar'));
    calculoStock(cantidadProductoMoto,producto2.stock,producto2.precio);
    producto2.stock -= cantidadProductoMoto;
    }
    else if (productoCompra.toLocaleLowerCase() == 'embarcaciones'){
        let cantidadProductoEmbarcacion = parseInt(prompt ('Ingrese que cantidad de ' + producto3.nombre + ' quiere comprar'));
        calculoStock(cantidadProductoEmbarcacion,producto3.stock,producto3.precio);
        producto3.stock -= cantidadProductoEmbarcacion;
    }
    else if (productoCompra.toLocaleLowerCase() == 'aviones'){
        let cantidadProductoAviones = parseInt(prompt ('Ingrese que cantidad de ' + producto4.nombre + ' quiere comprar'));
        calculoStock(cantidadProductoAviones,producto4.stock,producto4.precio);
        producto4.stock -= cantidadProductoAviones;
    }
}
alert('El stock actual de autos es ' + producto1.stock);
alert('El stock actual de motos es ' + producto2.stock);
alert('El stock actual de embarcaciones es ' + producto3.stock);
alert('El stock actual de aviones es ' + producto4.stock);
alert('El precio total de la compra es: ' + precioTotal + ". \nMuchas gracias por su compra!");
