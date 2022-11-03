let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener('submit', validarFormulario);

function validarFormulario(evento){
    evento.preventDefault();
    console.log("Formulario Enviado");
}