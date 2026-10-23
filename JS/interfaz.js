//este es el módulo de la interfaz del tablero donde vamos a manipular
//el tablero

/*Seleccionamos los contenedores de tarjetas. */
const contenedorPendientes = document.querySelector("#contenedor_por_hacer");
const contenedorTerminadas = document.querySelector("#contenedor_terminadas");

/*Ahra seleccionamos los elementos que muestran los contadores. */
const contadorPendientes = document.querySelector("#contador_por_hacer");
const contadorTerminados = document.querySelector("#contador_terminadas");

/*Actualizamos los contadores del tablero */
//hacemos que la función se pueda exportar
//creamos una función donde vamos a actualizar los contadores de los div de cada zona
export function actualizarContadores(){

    //contamos las tarjetas que hay en cada contenedor
    const cantidadPendientes = contenedorPendientes.querySelectorAll(".tarjeta").length;
    const cantidadTerminadas = contenedorTerminadas.querySelectorAll(".tarjeta").length;

    //Ahora, vamos a actualizar los números que se mues en el HTML
    contadorPendientes.textContent = cantidadPendientes;
    contadorTerminados.textContent = cantidadTerminadas;

}//fin de la función que actualiza los contadores