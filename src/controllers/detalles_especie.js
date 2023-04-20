import { Controller } from "../classes/controller.class.js";
import { API } from "../services/api.js";
import { crearPropiedadBasica, crearPropiedadHTML, crearPropiedadLinkeada, crear_vista_rapida_peliculas, crear_vista_rapida_personajes } from "../utils/vistas_rapidas_detalles.js";

/*
Controlador de detalles de especie.
*/
class Detalles_especie extends Controller {
    constructor(template_url = '/src/views/detalles_item.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.especie = {} //Item
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
            let url_item = localStorage.getItem('url_especie');

            //Mostramos loader
            this.cargando_solicitud()

            //Solicitamos la información al servidor
            let result = await API.get(url_item)
            this.especie = result;

            //Resolvemos las URL que hay dentro del objeto recibido
            await this.cargar_claves_ajenas()

            //Quitamos metadatos que no interesan visualizar
            delete this.especie.url
            delete this.especie.created
            delete this.especie.edited

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
        await this.cargar_personajes()
        await this.cargar_peliculas()
        await this.cargar_homeworld()
    }

    async cargar_personajes() {
        let lista = [];
        for (var persona of this.especie.people) {
            const result = await API.get(persona);
            persona = result;
            persona.url_vista = '#/personajes';
            lista.push(persona)
        }
        this.especie.people = lista;

    }

    async cargar_peliculas() {
        let lista = [];
        for (var film of this.especie.films) {
            const result = await API.get(film);
            film = result;
            film.url_vista = '#/peliculas';
            lista.push(film)
        }
        this.especie.films = lista;
    }

    async cargar_homeworld() {
        let item = {};
        const result = await API.get(this.especie.homeworld);
        item = result;
        item.url_vista = '#/planetas';
        this.especie.homeworld = item;
    }

    //Renderiza todos los elementos del item
    render() {
        this.set_title();
        let element = document.getElementById('lista_elementos')
        element.innerHTML = ''

        crearPropiedadBasica(element, 'Nombre', this.especie['name']);
        crearPropiedadBasica(element, 'Idioma', this.especie['language']);
        crearPropiedadBasica(element, 'Clasificación', this.especie['classification']);
        crearPropiedadBasica(element, 'Designación', this.especie['designation']);
        crearPropiedadBasica(element, 'Esperanza de vida', this.especie['average_lifespan']);
        crearPropiedadBasica(element, 'Altura media', this.especie['average_height']);
        crearPropiedadLinkeada(element, 'Planeta natal', this.especie['homeworld']);
        crearPropiedadBasica(element, 'Color de piel', this.especie['skin_colors']);
        crearPropiedadBasica(element, 'Color de pelo', this.especie['hair_colors']);
        crearPropiedadBasica(element, 'Color de ojos', this.especie['eye_colors']);
        crearPropiedadHTML(element, 'Personajes', crear_vista_rapida_personajes(this.especie.people))
        crearPropiedadHTML(element, 'Peliculas', crear_vista_rapida_peliculas(this.especie.films))
    }


    volver() {
        window.history.back()
    }
    set_title() {
        let element = document.getElementById('nombre')
        if (element) element.innerHTML = this.especie.name;
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

export { Detalles_especie }