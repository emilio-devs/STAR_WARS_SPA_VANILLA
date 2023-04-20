import { fetchHtmlAsString } from "./../utils/fetchHTML.js";

/*
Clase base controler, carga el template del controlador y permite mostrar errores
y mostrar un loader cuando se este esperando la respuesta de peticiones asincronas.
*/
class Controller {
    constructor(template_url) {
        this.template_url = template_url;
        this._template = null;
        window.addEventListener("hashchange", () => {
            this.borrar_mensaje_error();
        });
    }

    //Obtenermos la template si no se ha obtenido aún de manera asincrona
    async template() {
        if (!this._template) {
            this._template = await fetchHtmlAsString(this.template_url);
        }
        return this._template;
    }

    //Muestra un error en la vista y vincula el boton de cerrar para poder cerrar la notificación
    mostrar_mensaje_error(msg) {
        let element = document.getElementById('error-message');
        let text = element.querySelector('.error-text');
        if (element && text) {
            text.innerHTML = msg;
            element.classList.remove('hidden')
        }

        //Si el boton de cerrar no tiene la función la asignamos
        let close_error = document.querySelector('#close_error');
        if (close_error) {
            close_error.removeEventListener('click', this.borrar_mensaje_error);
            close_error.addEventListener('click', this.borrar_mensaje_error);
        }

    }

    //Elimina el mensaje de error al hacerle clic
    borrar_mensaje_error() {
        let element = document.getElementById('error-message');
        if (element) {
            element.classList.add('hidden')
        }
    }

    //Muestra en pantalla un loader de Star Wars
    cargando_solicitud() {
        document.body.classList.add('no-pointer-events')
        let element = document.getElementById('overlay-loader');
        if (element) {
            element.classList.add('overlay-active')
        }
    }

    //Elimina de pantalla el loader
    fin_carga_solicitud() {
        //Se pone algo de tiempo para que no haya parpadeos del cargador
        setTimeout(() => {
            document.body.classList.remove('no-pointer-events')
            let element = document.getElementById('overlay-loader');
            if (element) {
                element.classList.remove('overlay-active')
            }
        }, 300);
    }

}


export { Controller };