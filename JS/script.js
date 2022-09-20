function saludar(){
    let nombre = prompt('Ingrese su nombre:');
    let apellido = prompt('Ingrese su apellido:');
    alert("hola " + nombre + " " + apellido);
    }
    
saludar();
    

let producto1 = "autos";
let precioProducto1 = 10000;
let stockProducto1 = 10;

let producto2 = "motos";
let precioProducto2 = 5000;
let stockProducto2 = 20;

let producto3 = "embarcaciones";
let precioProducto3 = 50000;
let stockProducto3 = 20;

alert("Estos son nuestros productos : \n - Autos \n - Motos \n - Embarcaciones");
let cantidadProductosComprar= prompt("Que cantidad de productos distintos quiere comprar?");
let precioTotal = 0;


for(let i = 0; i < cantidadProductosComprar; i++){

let productoCompra = prompt('Ingrese el producto que quiere comprar \n - Autos \n - Motos \n - Embarcaciones');

if (productoCompra.toLowerCase() == 'autos'){
    let cantidadProductoAuto = parseInt(prompt('Ingrese que cantidad de ' + producto1 + ' quiere comprar'));
    if (cantidadProductoAuto  <= stockProducto1 ){
        precioTotal = precioTotal + (cantidadProductoAuto * precioProducto1);
    }
        else{
            alert('actualmente tenemos' + stockProducto1 + "unidades del producto");
    }
}
else if (productoCompra.toLowerCase() == 'motos'){
    let cantidadProductoMoto = parseInt(prompt ('Ingrese que cantidad de ' + producto2 + ' quiere comprar'));
    if (cantidadProductoMoto  <= stockProducto2 ){
        precioTotal = precioTotal +  (cantidadProductoMoto * precioProducto2);
    }
        else{
            alert('actualmente tenemos ' + stockProducto1 + " unidades del producto");
    }
    }
    else if (productoCompra.toLocaleLowerCase() == 'embarcaciones'){
        let cantidadProductoEmbarcacion = parseInt(prompt ('Ingrese que cantidad de ' + producto3 + ' quiere comprar'));
        if (cantidadProductoEmbarcacion  <= stockProducto3 ){
            precioTotal = precioTotal +  (cantidadProductoEmbarcacion * precioProducto3);
        }
            else{
                alert('actualmente tenemos ' + stockProducto1 + " unidades del producto");
    }
    }
}
alert('El precio total de la compra es: ' + precioTotal);
