import { Router } from "./router/router.js";
import { Planetas } from "./controllers/planetas.js";
import { Detalles_planeta } from "./controllers/detalles_planeta.js";
import { Naves } from "./controllers/naves.js";
import { Detalles_nave } from "./controllers/detalles_nave.js";
import { Vehiculos } from "./controllers/vehiculos.js";
import { Detalles_vehiculo } from "./controllers/detalles_vehiculo.js";
import { Personajes } from "./controllers/personajes.js";
import { Detalles_personaje } from "./controllers/detalles_personaje.js";
import { Peliculas } from "./controllers/peliculas.js";
import { Detalles_pelicula } from "./controllers/detalles_pelicula.js";
import { Especies } from "./controllers/especies.js";
import { Detalles_especie } from "./controllers/detalles_especie.js";
import { API } from "./services/api.js";

//Inicializamos la clase enrutador
const inicializar = () => {
    const router = new Router()
    router.use('/planetas', new Planetas())
    router.use('/detalles_planeta', new Detalles_planeta())
    router.use('/naves', new Naves())
    router.use('/detalles_nave', new Detalles_nave())
    router.use('/vehiculos', new Vehiculos())
    router.use('/detalles_vehiculo', new Detalles_vehiculo())
    router.use('/personajes', new Personajes())
    router.use('/detalles_personaje', new Detalles_personaje())
    router.use('/peliculas', new Peliculas())
    router.use('/detalles_pelicula', new Detalles_pelicula())
    router.use('/especies', new Especies())
    router.use('/detalles_especie', new Detalles_especie())
    router.render();

};

//Función para resaltar la página del NAV actual
const highlightnavs = () => {
    let currentPath = window.location.hash.replace("#/", '');
    let navlinks = document.querySelectorAll('.nav-link')
    navlinks.forEach(element => {
        element.classList.remove('active')
        if (element.getAttribute('data-id') === currentPath || element.getAttribute('data-detail-id') === currentPath) element.classList.add('active')
    });
};

//Función para poder customizar el error de petición a servidor
const custom_errors = () => {
    const msInput = document.getElementById('ms-input');
    const msButton = document.getElementById('ms-button');
    const msgInput = document.getElementById('msg-input');
    const msgButton = document.getElementById('msg-button');
    const errorCheckbox = document.getElementById("errorCheckbox");

    msButton.addEventListener('click', () => {
        API.setRetardo(parseInt(msInput.value))
    });
    msgButton.addEventListener('click', () => {
        API.setCustomError(msgInput.value);
    });
    errorCheckbox.addEventListener('click', () => {
        //Si los errores estan activos se ponen los valores por defecto de error
        if (errorCheckbox.checked) {
            API.setCustomError()
            API.setRetardo()
            msInput.disabled = false;
            msButton.disabled = false;
            msgInput.disabled = false;
            msgButton.disabled = false;
        } else {
            API.setCustomError('', 0)
            API.setRetardo(0, 0)
            msInput.disabled = true;
            msButton.disabled = true;
            msgInput.disabled = true;
            msgButton.disabled = true;
        }
    });
};

window.onload = () => {
    inicializar();
    window.addEventListener("hashchange", () => { highlightnavs() });
    highlightnavs();
    custom_errors();
    //Por defecto pagina planetas
    window.location.hash = "#/planetas"
}