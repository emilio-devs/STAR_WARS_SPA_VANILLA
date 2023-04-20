import { Controller } from "../classes/controller.class.js";
import { API } from "../services/api.js";
import { crearPropiedadBasica, crearPropiedadHTML, crearPropiedadLinkeada, crear_vista_rapida_especies, crear_vista_rapida_peliculas, crear_vista_rapida_personajes, crear_vista_rapida_vehiculos } from "../utils/vistas_rapidas_detalles.js";

/*
Controlador de detalles de pelicula.
*/
class Detalles_pelicula extends Controller {
    constructor(template_url = '/src/views/detalles_item.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.pelicula = {} //Item
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
            let url_item = localStorage.getItem('url_pelicula');

            //Mostramos loader
            this.cargando_solicitud()

            //Solicitamos la información al servidor
            let result = await API.get(url_item)
            this.pelicula = result;

            //Resolvemos las URL que hay dentro del objeto recibido
            await this.cargar_claves_ajenas()

            //Quitamos metadatos que no interesan visualizar
            delete this.pelicula.url
            delete this.pelicula.created
            delete this.pelicula.edited

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
        await this.cargar_naves()
        await this.cargar_especies()
        await this.cargar_vehiculos()
        await this.cargar_personajes()
    }

    async cargar_naves() {
        let lista = [];
        for (var nave of this.pelicula.starships) {
            const result = await API.get(nave);
            nave = result;
            nave.url_vista = '#/naves';
            lista.push(nave)
        }
        this.pelicula.starships = lista;

    }
    async cargar_especies() {
        let lista = [];
        for (var item of this.pelicula.species) {
            const result = await API.get(item);
            item = result;
            item.url_vista = '#/especies';
            lista.push(item)
        }
        this.pelicula.species = lista;
    }
    async cargar_vehiculos() {
        let lista = [];
        for (var item of this.pelicula.vehicles) {
            const result = await API.get(item);
            item = result;
            item.url_vista = '#/vehiculos';
            lista.push(item)
        }
        this.pelicula.vehicles = lista;
    }

    async cargar_personajes() {
        let lista = [];
        for (var personaje of this.pelicula.characters) {
            const result = await API.get(personaje);
            personaje = result;
            personaje.url_vista = '#/personajes';
            lista.push(personaje)
        }
        this.pelicula.characters = lista;
    }

    //Renderiza todos los elementos del item
    render() {
        this.set_title();
        let element = document.getElementById('lista_elementos')
        element.innerHTML = ''

        crearPropiedadBasica(element, 'Título', this.pelicula['title']);
        crearPropiedadBasica(element, 'Director', this.pelicula['director']);
        crearPropiedadBasica(element, 'Productor', this.pelicula['producer']);
        crearPropiedadBasica(element, 'Fecha', this.pelicula['release_date']);
        crearPropiedadBasica(element, 'Episodio', this.pelicula['episode_id']);
        crearPropiedadBasica(element, 'Texto comienzo', this.pelicula['opening_crawl']);
        crearPropiedadHTML(element, 'Vehiculos', crear_vista_rapida_vehiculos(this.pelicula.vehicles))
        crearPropiedadHTML(element, 'Naves', crear_vista_rapida_vehiculos(this.pelicula.starships))
        crearPropiedadHTML(element, 'Especies', crear_vista_rapida_especies(this.pelicula.species))
        crearPropiedadHTML(element, 'Personajes', crear_vista_rapida_personajes(this.pelicula.characters))
    }


    volver() {
        window.history.back()
    }
    set_title() {
        let element = document.getElementById('nombre')
        if (element) element.innerHTML = this.pelicula.title;
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

export { Detalles_pelicula }