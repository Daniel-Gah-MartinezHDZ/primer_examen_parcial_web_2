//vamos a hacer uso de la modularidad
//Este es un concepto de aprendí en un curso de python y creo que lo puedo aplicar para este proyecto

// Importamos la función que obtiene las tarjetas iniciales.
import { obtenerTarjetasIniciales,
        crearTarjeta} from "./actividades.js";

//importamos la función de actualizar los contadores del archivo de interfaz
import{
    actualizarContadores
} from "./interfaz.js";


//importamos la función de arrastre del archivo arrastrar.js
import {
    iniciarArrastre
} from "./arrastra.js";

//--------------------------------- fin de las importaciones de otros achirvos js ------------------------------------------------

//creamos el contador para identificar las tarjetas nuevas
let siguiente_id = 7;

//hacemos una función para inicializar el uso del formulario y que el usuario pueda agregar más tarejtas
function iniciarFormulario(){

    //seleccionamos el formulario desde el html
    const formulario = document.querySelector("#formulario_actividad");

    //Seleccionamos el campo de texto
    const campoActividad = document.querySelector("#nombre_actividad");

    //agregamos un listener para que pueda enviar los datos del formulario
    formulario.addEventListener("submit", function(evento) {

        //Evitamos que la página se recargue con el prevent deafult
        evento.preventDefault();

        //obtenemos el texto y eliminamos espacios principales y al final
        //usamos el método trim para eliminar los espacios en blanco
        const nombre_de_actividad = campoActividad.value.trim();

        //validamos que el campo no está vacío
        if(nombre_de_actividad === ""){
            //devolvemos el valor de la actividad
            return;
        }//fin de la sentencia if que valida si la tarjeta está en blanco


        //creamos la tarjeta
        const nuevaTarjeta = crearTarjeta(nombre_de_actividad,siguiente_id);

        //Incrementamos el identificador para la siguiente tarjeta
        siguiente_id ++;

        //seleccionamos el contenedor de las tarejetas pendientes
        const contenedorPendientes = document.querySelector("#contenedor_por_hacer");

        //añadimos la tarejta nueva
        contenedorPendientes.appendChild(nuevaTarjeta);

        //Actualizamos los contadores
        actualizarContadores();

        //Limpiamos el campo del formulario
        campoActividad.value = "";

        //devolvemos el foco al campo para escribir otra actividad
        campoActividad.focus();


    }); //fin del evento submit para el formulario
    //-----------------------------------------------------------------------------------------------------

}//fin de la función iniciarFormulario
//-------------------------------------------------------------------------------------------------------



/*Creamos la función iniciarBotonReinicio*/
function iniciarBotonReinicio() {
    //1. Seleccionamos el botón de reinicio del html
    const botonReinicio = document.querySelector("#boton_reinicio");

    //2. Agregamos un listener cuando el usuario haga click
    botonReinicio.addEventListener("click", function(){

        //dentro del evento vamos a seleccionar los dos contenedores
        //3. Vamos a seleccionar los dos contenedores
        const contenedorPendientes = document.querySelector("#contenedor_por_hacer");
        const contenerdorTerminadas = document.querySelector("#contenedor_terminadas");

        //4. Vaciamos ambos contenedores
        contenedorPendientes.innerHTML = ""; //vaciamos el contenedor de tarejtas pendientes
        contenerdorTerminadas.innerHTML = ""; //vaciamos el contenedor de tarjetas terminadas solamnete las agregadas por
        //el usuario

        //5. Recuperamos las 6 tarjetas iniciales originales
        const tarjetasIniciales = obtenerTarjetasIniciales();

        //6. Agregamos las tarjetas originales a la zona de por hacer
        tarjetasIniciales.forEach(function (tarjeta) {

            //eliminamos el contorno verde (indicador de terminada) de la tarjeta
            //cuando reiniciamos el sistema
            tarjeta.classList.remove("actividad_terminada");

            contenedorPendientes.appendChild(tarjeta);
        });//fin del for each que recorre las 6 tarjetas iniciales


        //7. Actualizamos los contadores de las zonas
        //invocando la función que ya definimos
        actualizarContadores();


    }); //fin del evento del click cuando el usuario hace clic en el botón de reinicio
}//fin de la función iniciarBotonReincio
//------------------------------------------------------------------------------------------------------------------------


//Agreamos la función donde cambiamos el tema temaOscuro
function temaOscuro() {

    //Buscamos el botón en el DOM
    const botonTema =document.querySelector("#boton_tema");

    //Escuchamos el evento cuando el usuario da click en el botón
    botonTema.addEventListener("click", () =>{

        //hacemos que se alterne la clase del elemento root del documnento
        document.documentElement.classList.toggle("tema_oscuro");
    }); //fin del evento click para el tema escuro
}//fin de la función  temaOscuro
//----------------------------------------------------------------------------------------------------------------


// Función principal para iniciar el tablero.
function iniciarTablero() {

    // Obtenemos las tarjetas iniciales.
    const tarjetas = obtenerTarjetasIniciales();

    // Mostramos información en la consola para comprobar que funciona.
    console.log("Tablero inicializado correctamente");

    console.log(`Cantidad de tarjetas iniciales: ${tarjetas.length}`);

    //------------------Craeamos una tarjeta de prueba a partir de la función que definimos crearTarjeta
    // ---------------------------------------------------

    //Creamos una tarjeta para probar
    //const nuevaTarjeta = crearTarjeta("Estudiar JavaScript", 7);


    //Mostramos la tarjeta en el contenedor de tarjetas pendientes
    //const contenedorPendientes = document.querySelector("#contenedor_por_hacer");
    //contenedorPendientes.appendChild(nuevaTarjeta);

    //-----------------------------------Función actualizar contadores ---------------------------------------------

    //invocamos a la función de actualizar contadores
    actualizarContadores();


    //invocamos a la función que nos permite arrastrar
    iniciarArrastre();

    //Invocamos a la función iniciarFormulario
    iniciarFormulario();

    //invocamos a la función iniciarBotonReinicio
    iniciarBotonReinicio();

    //invocamos a la función del temaOscuro
    temaOscuro();
}//Fin de la función inicarTablero
//---------------------------------------------------------------------------------------------------------------------
// Ejecutamos la función principal.
iniciarTablero();