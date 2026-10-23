//importamos la función de actualizar contadores del archivo interfaz.js

import{ actualizarContadores} from "./interfaz.js";

//vamos a seleccionar las dos zonas que pueden recibir tarjetas
const contenedores = document.querySelectorAll(".contenedor_tarjetas");

//ahora, inicializamos el drag and drop
export function iniciarArrastre() {

    contenedores.forEach(function(contenedor){

        // 1. Detectamos cuando es que inicia el arrastre
        contenedor.addEventListener("dragstart", function(evento){

            //
            const tarjeta = evento.target.closest(".tarjeta");

            //validamos que haya tarjetas
            if (!tarjeta){
                //retornamos la tarjeta
                return;
            }


            //ahora, guardamos el identificador de la tarejeta que vamos a arrastar
            evento.dataTransfer.setData("text/plain", tarjeta.id);

            //Indicamos que queremos mover el elemento
            evento.dataTransfer.effectAllowed = "move";

            //
            tarjeta.classList.add("arrastrando");

            //también vamos a registrar el evento de dragned en las tarjetas.
            //que se dispara cuando termina la operación de arrastre, incluso si no se completa el drop, lo usamos para evitar
            //que la tarjeta conserve el efecto visual cuando el arrastre termina de otra manera

            tarjeta.addEventListener("dragend", function(){
                tarjeta.classList.remove("arrastrando");
            });//fin del evento dragned

            
        }); //fin del comportamiento del contenedor para que pueda recibir la tarjeta arrastrada
        //------------------------------------------------------------------------------------------------------------------





        // 2. Hacemos que se pueda soltar la tarjeta dentro de la zona
        contenedor.addEventListener("dragover", function(evento){

            evento.preventDefault();

            evento.dataTransfer.dropEffect = "move";

        });//fin del comportamiento dragover para el contenedor
        //----------------------------------------------------------------------------------------------


        // 3. Ahora hacemos que se detecten cuándo se suelte la tarjeta
        contenedor.addEventListener("drop", function(evento){

            evento.preventDefault();

            //Recuperamos el ID guardado cuando comenzamos el arrastre
            const id_tarjeta = evento.dataTransfer.getData("text/plain");

            //Buscamos la tarjeta original
            const tarjeta = document.getElementById(id_tarjeta);

            //vamos a usar console.log para que en la terminal mis indique la información de la tarjeta
            //que estamos arrastrando
            console.log("ID: ",id_tarjeta);
            console.log("Tarjeta encontrada: ",tarjeta);
            console.log("Contenedor destino: ",contenedor);


            //validamos que haya tarjetas, con un if
            if (!tarjeta){
                return;
            }

            //movemos la tarjeta al contenedor donde se soltó
            contenedor.appendChild(tarjeta);

            //Después de mover la tarjeta, necesitamos comprobar en qué contenedor quedó
            if (contenedor.id === "contenedor_terminadas") {
                tarjeta.classList.add("actividad_terminada");

            }else {
                tarjeta.classList.remove("actividad_terminada");
            }//fin de la sentencia if-else que valida que la tarjeta está en el contenedor de terminadas
            //además validamos que si una tarjeta regresa a "por hacer", debe perder el estilo verde



            tarjeta.classList.remove("arrastrando");
            //agregamos el vento que después de mover la tarjeta elimina la clase de resaltado
            contenedor.classList.remove("drag-destino");


            //actualizamos los contadores del tablero
            actualizarContadores();

        });//fin del evento drop

        //-----------------------------------------------------------------------------------


        //Cuando la tarjeta entra en la zona
        contenedor.addEventListener("dragenter", function(evento){
            evento.preventDefault();
            contenedor.classList.add("drag-destino");

            //usamos una sentencia if que valide que el contenedor está recibiendo una tarjeta
            if(contenedor.id === "contenedor_terminadas"){
                contenedor.classList.add("destino_terminadas");
            }
        });//fin del evento dragnenter
        //--------------------------------------------------------------------------------


        //Ahora vamos hacer el evento cuando la tarejta sale de la zona
        contenedor.addEventListener("dragleave", function(evento){
            contenedor.classList.remove("drag-destino");

            //Agregamos la eliminiación de la nueva clase
            contenedor.classList.remove("destino_terminadas");
        });//fin del evento dragleave
        //--------------------------------------------------------------------------------



    });// fin del for each que recorre las tarjetas
}//fin de la función iniciarArrastre