import { Controller } from "../classes/controller.class.js";
import { API } from "../services/api.js";
import { crearPropiedadBasica, crearPropiedadHTML, crear_vista_rapida_peliculas, crear_vista_rapida_personajes } from "../utils/vistas_rapidas_detalles.js";

/*
Controlador de detalles de planeta.
*/
class Detalles_planeta extends Controller {
    constructor(template_url = '/src/views/detalles_item.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.planeta = {} //Planeta
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
            let url_item = localStorage.getItem('url_planeta');

            //Mostramos loader
            this.cargando_solicitud()

            //Solicitamos la información al servidor
            let result = await API.get(url_item)
            this.planeta = result;

            //Resolvemos las URL que hay dentro del objeto recibido
            await this.cargar_claves_ajenas()

            //Quitamos metadatos que no interesan visualizar
            delete this.planeta.url
            delete this.planeta.created
            delete this.planeta.edited

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
        await Promise.all([this.cargar_residentes(), this.cargar_peliculas()])
    }

    async cargar_residentes() {
        let lista = [];
        for (var resident of this.planeta.residents) {
            const result = await API.get(resident);
            resident = result;
            resident.url_vista = '#/personajes';
            lista.push(resident)
        }
        this.planeta.residents = lista;

    }

    async cargar_peliculas() {
        let lista = [];
        for (var film of this.planeta.films) {
            const result = await API.get(film);
            film = result;
            film.url_vista = '#/peliculas';
            lista.push(film)
        }
        this.planeta.films = lista;
    }


    //Renderiza todos los elementos del item
    render() {
        this.set_title();
        let element = document.getElementById('lista_elementos')
        element.innerHTML = ''

        crearPropiedadBasica(element, 'Nombre', this.planeta['name']);
        crearPropiedadBasica(element, 'Periodo de rotación', this.planeta['rotation_period']);
        crearPropiedadBasica(element, 'Periodo de orbita', this.planeta['orbital_period']);
        crearPropiedadBasica(element, 'Diametro', this.planeta['diameter']);
        crearPropiedadBasica(element, 'Clima', this.planeta['climate']);
        crearPropiedadBasica(element, 'Gravedad', this.planeta['gravity']);
        crearPropiedadBasica(element, 'Terreno', this.planeta['terrain']);
        crearPropiedadBasica(element, 'Porcentaje de agua superficial', this.planeta['surface_water']);
        crearPropiedadBasica(element, 'Población', this.planeta['population']);
        crearPropiedadHTML(element, 'Residentes', crear_vista_rapida_personajes(this.planeta.residents))
        crearPropiedadHTML(element, 'Peliculas', crear_vista_rapida_peliculas(this.planeta.films))
    }


    volver() {
        window.history.back()
    }
    set_title() {
        let element = document.getElementById('nombre')
        if (element) element.innerHTML = this.planeta.name;
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

export { Detalles_planeta }