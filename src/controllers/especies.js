import { Controller } from "../classes/controller.class.js";
import { Paginador } from "../classes/paginador.class.js";
import { API } from "../services/api.js";

/*
Controlador de Especies.
Controla las operaciones de la vista de Especies.
*/
class Especies extends Controller {
    constructor(template_url = '/src/views/especies.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.especies = []; //Lista de items a mostrar en pantalla
        this._total_especies = 0; //Numero total de items mostrados en pantalla
        this.paginador = null; //Elemento paginador para poder cambiar de pagina
    }

    init() {
        this.total_especies = 0;
        this.init_buscador()
        this.obtenerEspecies()
    }

    //Obtener vehiculos actuales por página y filtro
    async obtenerEspecies(pagina = 1, filtro = '') {
        try {

            //Mostramos loader
            this.cargando_solicitud()
                //Desactivamos el paginador mientras carga
            if (this.paginador) this.paginador.disable_paginator();

            //Si hay una busqueda filtrada la acoplamos a la petición
            if (filtro) filtro = '&search=' + filtro

            //Solicitamos la información al servidor
            let result = await API.get(`https://swapi.dev/api/species/?page=${pagina}${filtro}`)

            //Numero total de vehiculos
            this.total_especies = result.count;

            //vehiculos
            this.especies = result.results;
            this.renderizarEspecies()

            //Si no existe un paginador lo creamos y lo actualizamos
            this.paginador = new Paginador(this.total_especies, this.cambiarPagina.bind(this), pagina)
            this.paginador.render()

            //Ocultamos loader
            this.fin_carga_solicitud()
        } catch (error) {
            //Ocultamos loader en caso de error
            this.fin_carga_solicitud()
            console.log(error);
            this.mostrar_mensaje_error(error.message)
        }
    }

    //Mostramos la lista de vehiculos en una tabla html
    renderizarEspecies() {
        let tabla_body = document.getElementById('listaEspecies')
        if (!tabla_body) return;

        //Reiniciamos el contenido
        tabla_body.innerHTML = '';

        //Por cada vehiculo vamos a poner los datos más interesantes
        for (const especie of this.especies) {
            let tr = document.createElement('tr');

            //Nombre
            let nombre_td = document.createElement('td')
            nombre_td.innerHTML = especie.name;
            tr.append(nombre_td)

            //Idioma
            let idioma_td = document.createElement('td')
            idioma_td.innerHTML = especie.language;
            tr.append(idioma_td)

            //clasificacion
            let clasificacion_td = document.createElement('td')
            clasificacion_td.innerHTML = especie.classification;
            tr.append(clasificacion_td)

            //designacion
            let designacion_td = document.createElement('td')
            designacion_td.innerHTML = especie.designation;
            tr.append(designacion_td)

            //esperanza
            let esperanza_td = document.createElement('td')
            esperanza_td.innerHTML = especie.average_lifespan;
            tr.append(esperanza_td)

            //Detalles
            let detalles_td = document.createElement('td')
            detalles_td.classList.add('text-center')
            let boton_detalles = document.createElement('button')
            boton_detalles.textContent = "DETALLES"
            boton_detalles.addEventListener('click', () => { this.cargar_detalles_especie(especie.url) })
            detalles_td.append(boton_detalles)
            tr.append(detalles_td)

            //Poner la linea entera
            tabla_body.append(tr)
        }
    }

    //Buscamos una nueva pagina
    cambiarPagina(pagina) {
        this.obtenerEspecies(pagina);
    }

    get total_especies() {
        return this._total_especies;
    }

    //Al cambiar el total de vehiculos se pone automaticamente en el html
    set total_especies(valor) {
        this._total_especies = valor;
        this.mostrar_numero_items();
    }

    //Mostramos el número de vehiculos
    mostrar_numero_items() {
        let element = document.getElementById('numElementos');
        if (element) {
            element.innerHTML = this.total_especies;
        }
    }

    //Cargamos los detalles del especie
    cargar_detalles_especie(url_especie) {
        window.location.hash = '/detalles_especie'
        localStorage.setItem('url_especie', url_especie)
    }

    //Vinculamos la función de cargar especies al buscador
    init_buscador() {
        let btn = document.getElementById('boton-buscar');
        if (btn) {
            btn.addEventListener('click', () => {
                let input = document.getElementById('input-buscar');
                let valor = input.value || '';
                input.value = '';
                this.obtenerEspecies(1, valor);
            })
        }
    }
}

export { Especies }