// Seleccionamos el contenedor de actividades pendientes.
const contenedorPendientes = document.querySelector("#contenedor_por_hacer");

// Seleccionamos el contenedor de actividades terminadas.
const contenedorTerminadas = document.querySelector("#contenedor_terminadas");

// Obtenemos las tarjetas iniciales.
const tarjetasIniciales = contenedorPendientes.querySelectorAll(".tarjeta");

// Exportamos una función para obtener las tarjetas iniciales.
export function obtenerTarjetasIniciales() {

    //obtenemos las tarjetas iniciales
    const tarjetas = tarjetasIniciales;

    //Permitimos arrastrar cada tarjeta
    //usamos un for each para que se puedan arrastar todas las tarejtas en el div
    tarjetas.forEach(function(tarjeta){
        tarjeta.draggable = true;
    });//fin del for each para arrastar todas las tarjetas


    return tarjetasIniciales;
}

//Vamos a crear una tarjeta nueva
export function crearTarjeta(nombreActividad, numero) {
    //creamos el elemento article
    const tarjeta = document.createElement("article");

    //le asingamos una clas CSS
    tarjeta.classList.add("tarjeta");

    //asignamos un id que será único para la tarjeta
    tarjeta.id = `actividad-${numero}`;

    //usamos la propiedad draggable para poder arrastrarla
    tarjeta.draggable = true;

    //creamos un título de la actividad
    const titulo = document.createElement("h3");

    //luego le asignamos el nombre que será recibido como argumento
    titulo.textContent = nombreActividad;

    //ahora introducimos el título dentro de la tarjeta
    tarjeta.appendChild(titulo);

    //devolvemos la tarjeta creada
    return tarjeta;
}//fin de la función crearTarjeta


