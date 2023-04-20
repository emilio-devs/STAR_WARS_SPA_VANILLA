import { Controller } from "../classes/controller.class.js";
import { Paginador } from "../classes/paginador.class.js";
import { API } from "../services/api.js";

/*
Controlador de planetas.
Controla las operaciones de la vista de planetas.
*/
class Planetas extends Controller {
    constructor(template_url = '/src/views/planetas.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.planetas = []; //Lista de items a mostrar en pantalla
        this._total_planetas = 0; //Numero total de items mostrados en pantalla
        this.paginador = null; //Elemento paginador para poder cambiar de pagina
    }

    init() {
        this.total_planetas = 0;
        this.init_buscador()
        this.obtenerPlanetas()
    }

    //Obtener los planetas actuales por página y filtro
    async obtenerPlanetas(pagina = 1, filtro = '') {
        try {

            //Mostramos loader
            this.cargando_solicitud()
                //Desactivamos el paginador mientras carga
            if (this.paginador) this.paginador.disable_paginator();

            //Si hay una busqueda filtrada la acoplamos a la petición
            if (filtro) filtro = '&search=' + filtro

            //Solicitamos la información al servidor
            let result = await API.get(`https://swapi.dev/api/planets/?page=${pagina}${filtro}`)
            console.log(result);
            //Numero total de planetas
            this.total_planetas = result.count;

            //Planetas
            this.planetas = result.results;
            this.renderizarPlanetas()

            //Si no existe un paginador lo creamos y lo actualizamos
            this.paginador = new Paginador(this.total_planetas, this.cambiarPagina.bind(this), pagina)
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

    //Mostramos la lista de planetas en una tabla html
    renderizarPlanetas() {
        let tabla_body = document.getElementById('listaPlanetas')
        if (!tabla_body) return;

        //Reiniciamos el contenido
        tabla_body.innerHTML = '';

        //Por cada planeta vamos a poner los datos más interesantes
        for (const planeta of this.planetas) {
            let tr = document.createElement('tr');

            //Nombre
            let nombre_td = document.createElement('td')
            nombre_td.innerHTML = planeta.name;
            tr.append(nombre_td)

            //Clima
            let clima_td = document.createElement('td')
            clima_td.innerHTML = planeta.climate;
            tr.append(clima_td)

            //Terreno
            let terreno_td = document.createElement('td')
            terreno_td.innerHTML = planeta.terrain;
            tr.append(terreno_td)

            //Poblacion
            let poblacion_td = document.createElement('td')
            poblacion_td.innerHTML = planeta.population;
            tr.append(poblacion_td)

            //Gravedad
            let gravedad_td = document.createElement('td')
            gravedad_td.innerHTML = planeta.gravity;
            tr.append(gravedad_td)

            //Diametro
            let diametro_td = document.createElement('td')
            diametro_td.innerHTML = planeta.diameter;
            tr.append(diametro_td)

            //Detalles
            let detalles_td = document.createElement('td')
            detalles_td.classList.add('text-center')
            let boton_detalles = document.createElement('button')
            boton_detalles.textContent = "DETALLES"
            boton_detalles.addEventListener('click', () => { this.cargar_detalles_planeta(planeta.url) })
            detalles_td.append(boton_detalles)
            tr.append(detalles_td)

            //Poner la linea entera
            tabla_body.append(tr)
        }
    }

    //Buscamos una nueva pagina de planetas
    cambiarPagina(pagina) {
        this.obtenerPlanetas(pagina);
    }

    get total_planetas() {
        return this._total_planetas;
    }

    //Al cambiar el total de planetas se pone automaticamente en el html
    set total_planetas(valor) {
        this._total_planetas = valor;
        this.mostrar_numero_items();
    }

    //Mostramos el número de planetas
    mostrar_numero_items() {
        let element = document.getElementById('numElementos');
        if (element) {
            element.innerHTML = this.total_planetas;
        }
    }

    //Cargamos los detalles del planeta
    cargar_detalles_planeta(url_planeta) {
        window.location.hash = '/detalles_planeta'
        localStorage.setItem('url_planeta', url_planeta)
    }

    //Vinculamos la función de cargar planetas al buscador
    init_buscador() {
        let btn = document.getElementById('boton-buscar');
        if (btn) {
            btn.addEventListener('click', () => {
                let input = document.getElementById('input-buscar');
                let valor = input.value || '';
                input.value = '';
                this.obtenerPlanetas(1, valor);
            })
        }
    }
}

export { Planetas }