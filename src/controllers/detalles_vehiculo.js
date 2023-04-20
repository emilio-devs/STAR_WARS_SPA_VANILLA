import { Controller } from "../classes/controller.class.js";
import { API } from "../services/api.js";
import { crearPropiedadBasica, crearPropiedadHTML, crear_vista_rapida_peliculas, crear_vista_rapida_personajes } from "../utils/vistas_rapidas_detalles.js";

/*
Controlador de detalles de vehiculo.
*/
class Detalles_vehiculo extends Controller {
    constructor(template_url = '/src/views/detalles_item.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.vehiculo = {} //Item
    }

    init() {
        //Vinculamos los botones a su función
        this.bind_btns();
        //Obtenermos el item
        this.obtener_detalles();
    }

    //Obtener detalles
    async obtener_detalles() {
        try {
            //Se obtiene la url del item
            let url_item = localStorage.getItem('url_vehiculo');

            //Mostramos loader
            this.cargando_solicitud()

            //Solicitamos la información al servidor
            let result = await API.get(url_item)
            this.vehiculo = result;

            //Resolvemos las URL que hay dentro del objeto recibido
            await this.cargar_claves_ajenas()

            //Quitamos metadatos que no interesan visualizar
            delete this.vehiculo.url
            delete this.vehiculo.created
            delete this.vehiculo.edited

            //Renderizamos los resultados
            this.render()

            //Ocultamos loader
            this.fin_carga_solicitud()
        } catch (error) {
            //Ocultamos loader en caso de error
            this.fin_carga_solicitud()
            console.log(error);
            this.mostrar_mensaje_error(error.message)
        }
    }

    async cargar_claves_ajenas() {
        await Promise.all([this.cargar_personajes(), this.cargar_peliculas()])
    }

    async cargar_personajes() {
        let lista = [];
        for (var persona of this.vehiculo.pilots) {
            const result = await API.get(persona);
            persona = result;
            persona.url_vista = '#/personajes';
            lista.push(persona)
        }
        this.vehiculo.pilots = lista;

    }

    async cargar_peliculas() {
        let lista = [];
        for (var film of this.vehiculo.films) {
            const result = await API.get(film);
            film = result;
            film.url_vista = '#/peliculas';
            lista.push(film)
        }
        this.vehiculo.films = lista;
    }


    //Renderiza todos los elementos del item
    render() {
        this.set_title();
        let element = document.getElementById('lista_elementos')
        element.innerHTML = ''

        crearPropiedadBasica(element, 'Nombre', this.vehiculo['name']);
        crearPropiedadBasica(element, 'Modelo', this.vehiculo['model']);
        crearPropiedadBasica(element, 'Fabricante', this.vehiculo['manufacturer']);
        crearPropiedadBasica(element, 'Costo en créditos', this.vehiculo['cost_in_credits']);
        crearPropiedadBasica(element, 'Tamaño', this.vehiculo['length']);
        crearPropiedadBasica(element, 'Velocidad atmosférica máxima', this.vehiculo['max_atmosphering_speed']);
        crearPropiedadBasica(element, 'Tripulación', this.vehiculo['crew']);
        crearPropiedadBasica(element, 'Pasajeros', this.vehiculo['passengers']);
        crearPropiedadBasica(element, 'Capacidad de carga', this.vehiculo['cargo_capacity']);
        crearPropiedadBasica(element, 'Tiempo máximo de reabastecimiento', this.vehiculo['consumables']);
        crearPropiedadBasica(element, 'Clase de vehiculo', this.vehiculo['vehicle_class']);
        crearPropiedadHTML(element, 'Pilotos', crear_vista_rapida_personajes(this.vehiculo.pilots))
        crearPropiedadHTML(element, 'Peliculas', crear_vista_rapida_peliculas(this.vehiculo.films))
    }


    volver() {
        window.history.back()
    }
    set_title() {
        let element = document.getElementById('nombre')
        if (element) element.innerHTML = this.vehiculo.name;
    }

    bind_btns() {
        let btn = document.getElementById('volver-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                this.volver();
            })
        }
    }
}

export { Detalles_vehiculo }