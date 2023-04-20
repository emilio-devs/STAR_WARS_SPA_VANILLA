import { Controller } from "../classes/controller.class.js";
import { API } from "../services/api.js";
import { crearPropiedadBasica, crearPropiedadHTML, crearPropiedadLinkeada, crear_vista_rapida_especies, crear_vista_rapida_peliculas, crear_vista_rapida_personajes, crear_vista_rapida_vehiculos } from "../utils/vistas_rapidas_detalles.js";

/*
Controlador de detalles de personaje.
*/
class Detalles_personaje extends Controller {
    constructor(template_url = '/src/views/detalles_item.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.personaje = {} //Item
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
            let url_item = localStorage.getItem('url_personaje');

            //Mostramos loader
            this.cargando_solicitud()

            //Solicitamos la información al servidor
            let result = await API.get(url_item)
            this.personaje = result;

            //Resolvemos las URL que hay dentro del objeto recibido
            await this.cargar_claves_ajenas()

            //Quitamos metadatos que no interesan visualizar
            delete this.personaje.url
            delete this.personaje.created
            delete this.personaje.edited

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
        await this.cargar_peliculas()
        await this.cargar_homeworld()
    }

    async cargar_naves() {
        let lista = [];
        for (var nave of this.personaje.starships) {
            const result = await API.get(nave);
            nave = result;
            nave.url_vista = '#/naves';
            lista.push(nave)
        }
        this.personaje.starships = lista;

    }
    async cargar_especies() {
        let lista = [];
        for (var item of this.personaje.species) {
            const result = await API.get(item);
            item = result;
            item.url_vista = '#/especies';
            lista.push(item)
        }
        this.personaje.species = lista;
    }
    async cargar_vehiculos() {
        let lista = [];
        for (var item of this.personaje.vehicles) {
            const result = await API.get(item);
            item = result;
            item.url_vista = '#/vehiculos';
            lista.push(item)
        }
        this.personaje.vehicles = lista;
    }

    async cargar_peliculas() {
        let lista = [];
        for (var film of this.personaje.films) {
            const result = await API.get(film);
            film = result;
            film.url_vista = '#/peliculas';
            lista.push(film)
        }
        this.personaje.films = lista;
    }

    async cargar_homeworld() {
        let item = {};
        const result = await API.get(this.personaje.homeworld);
        item = result;
        item.url_vista = '#/planetas';
        this.personaje.homeworld = item;
    }




    //Renderiza todos los elementos del item
    render() {
        this.set_title();
        let element = document.getElementById('lista_elementos')
        element.innerHTML = ''

        crearPropiedadBasica(element, 'Nombre', this.personaje['name']);
        crearPropiedadBasica(element, 'Altura', this.personaje['height']);
        crearPropiedadBasica(element, 'Peso', this.personaje['mass']);
        crearPropiedadBasica(element, 'Color piel', this.personaje['skin_color']);
        crearPropiedadBasica(element, 'Color pelo', this.personaje['hair_color']);
        crearPropiedadBasica(element, 'Color ojos', this.personaje['eye_color']);
        crearPropiedadBasica(element, 'Año de nacimiento', this.personaje['birth_year']);
        crearPropiedadLinkeada(element, 'Planeta de nacimiento', this.personaje['homeworld']);
        crearPropiedadBasica(element, 'Género', this.personaje['gender']);
        crearPropiedadHTML(element, 'Vehiculos', crear_vista_rapida_vehiculos(this.personaje.vehicles))
        crearPropiedadHTML(element, 'Naves', crear_vista_rapida_vehiculos(this.personaje.starships))
        crearPropiedadHTML(element, 'Especies', crear_vista_rapida_especies(this.personaje.species))
        crearPropiedadHTML(element, 'Peliculas', crear_vista_rapida_peliculas(this.personaje.films))
    }


    volver() {
        window.history.back()
    }
    set_title() {
        let element = document.getElementById('nombre')
        if (element) element.innerHTML = this.personaje.name;
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

export { Detalles_personaje }