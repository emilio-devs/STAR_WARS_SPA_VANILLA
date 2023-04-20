import { Controller } from "../classes/controller.class.js";
import { API } from "../services/api.js";
import { crearPropiedadBasica, crearPropiedadHTML, crear_vista_rapida_peliculas, crear_vista_rapida_personajes } from "../utils/vistas_rapidas_detalles.js";

/*
Controlador de detalles de nave.
*/
class Detalles_nave extends Controller {
    constructor(template_url = '/src/views/detalles_item.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.nave = {} //Item
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
            let url_item = localStorage.getItem('url_nave');

            //Mostramos loader
            this.cargando_solicitud()

            //Solicitamos la información al servidor
            let result = await API.get(url_item)
            this.nave = result;

            //Resolvemos las URL que hay dentro del objeto recibido
            await this.cargar_claves_ajenas()

            //Quitamos metadatos que no interesan visualizar
            delete this.nave.url
            delete this.nave.created
            delete this.nave.edited

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
        for (var persona of this.nave.pilots) {
            const result = await API.get(persona);
            persona = result;
            persona.url_vista = '#/personajes';
            lista.push(persona)
        }
        this.nave.pilots = lista;

    }

    async cargar_peliculas() {
        let lista = [];
        for (var film of this.nave.films) {
            const result = await API.get(film);
            film = result;
            film.url_vista = '#/peliculas';
            lista.push(film)
        }
        this.nave.films = lista;
    }


    //Renderiza todos los elementos del item
    render() {
        this.set_title();
        let element = document.getElementById('lista_elementos')
        element.innerHTML = ''

        crearPropiedadBasica(element, 'Nombre', this.nave['name']);
        crearPropiedadBasica(element, 'Modelo', this.nave['model']);
        crearPropiedadBasica(element, 'Fabricante', this.nave['manufacturer']);
        crearPropiedadBasica(element, 'Costo en créditos', this.nave['cost_in_credits']);
        crearPropiedadBasica(element, 'Tamaño', this.nave['length']);
        crearPropiedadBasica(element, 'Velocidad atmosférica máxima', this.nave['max_atmosphering_speed']);
        crearPropiedadBasica(element, 'Tripulación', this.nave['crew']);
        crearPropiedadBasica(element, 'Pasajeros', this.nave['passengers']);
        crearPropiedadBasica(element, 'Capacidad de carga', this.nave['cargo_capacity']);
        crearPropiedadBasica(element, 'Tiempo máximo de reabastecimiento', this.nave['consumables']);
        crearPropiedadBasica(element, 'Clase de hiper espacio', this.nave['hyperdrive_rating']);
        crearPropiedadBasica(element, 'MGLT', this.nave['MGLT']);
        crearPropiedadBasica(element, 'Clase de nave', this.nave['starship_class']);
        crearPropiedadHTML(element, 'Pilotos', crear_vista_rapida_personajes(this.nave.pilots))
        crearPropiedadHTML(element, 'Peliculas', crear_vista_rapida_peliculas(this.nave.films))
    }


    volver() {
        window.history.back()
    }
    set_title() {
        let element = document.getElementById('nombre')
        if (element) element.innerHTML = this.nave.name;
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

export { Detalles_nave }