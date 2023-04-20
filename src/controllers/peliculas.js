import { Controller } from "../classes/controller.class.js";
import { Paginador } from "../classes/paginador.class.js";
import { API } from "../services/api.js";

/*
Controlador de Peliculas.
Controla las operaciones de la vista de Peliculas.
*/
class Peliculas extends Controller {
    constructor(template_url = '/src/views/peliculas.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.peliculas = []; //Lista de items a mostrar en pantalla
        this._total_peliculas = 0; //Numero total de items mostrados en pantalla
        this.paginador = null; //Elemento paginador para poder cambiar de pagina
    }

    init() {
        this.total_peliculas = 0;
        this.init_buscador()
        this.obtenerPeliculas()
    }

    //Obtener peliculas actuales por página y filtro
    async obtenerPeliculas(pagina = 1, filtro = '') {
        try {

            //Mostramos loader
            this.cargando_solicitud()
                //Desactivamos el paginador mientras carga
            if (this.paginador) this.paginador.disable_paginator();

            //Si hay una busqueda filtrada la acoplamos a la petición
            if (filtro) filtro = '&search=' + filtro

            //Solicitamos la información al servidor
            let result = await API.get(`https://swapi.dev/api/films/?page=${pagina}${filtro}`)

            //Numero total de peliculas
            this.total_peliculas = result.count;

            //peliculas
            this.peliculas = result.results;
            this.renderizarPeliculas()

            //Si no existe un paginador lo creamos y lo actualizamos
            this.paginador = new Paginador(this.total_peliculas, this.cambiarPagina.bind(this), pagina)
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

    //Mostramos la lista de peliculas en una tabla html
    renderizarPeliculas() {
        let tabla_body = document.getElementById('listaPeliculas')
        if (!tabla_body) return;

        //Reiniciamos el contenido
        tabla_body.innerHTML = '';
        //Por cada pelicula vamos a poner los datos más interesantes
        for (const film of this.peliculas) {
            let tr = document.createElement('tr');

            //Titulo
            let title_td = document.createElement('td')
            title_td.innerHTML = film.title;
            tr.append(title_td)

            //Director
            let director_td = document.createElement('td')
            director_td.innerHTML = film.director;
            tr.append(director_td)

            //productor
            let productor_td = document.createElement('td')
            productor_td.innerHTML = film.producer;
            tr.append(productor_td)

            //fecha
            let fecha_td = document.createElement('td')
            fecha_td.innerHTML = film.release_date;
            tr.append(fecha_td)

            //Detalles
            let detalles_td = document.createElement('td')
            detalles_td.classList.add('text-center')
            let boton_detalles = document.createElement('button')
            boton_detalles.textContent = "DETALLES"
            boton_detalles.addEventListener('click', () => { this.cargar_detalles_pelicula(film.url) })
            detalles_td.append(boton_detalles)
            tr.append(detalles_td)

            //Poner la linea entera
            tabla_body.append(tr)
        }
    }

    //Buscamos una nueva pagina
    cambiarPagina(pagina) {
        this.obtenerPeliculas(pagina);
    }

    get total_peliculas() {
        return this._total_peliculas;
    }

    //Al cambiar el total de peliculas se pone automaticamente en el html
    set total_peliculas(valor) {
        this._total_peliculas = valor;
        this.mostrar_numero_items();
    }

    //Mostramos el número de peliculas
    mostrar_numero_items() {
        let element = document.getElementById('numElementos');
        if (element) {
            element.innerHTML = this.total_peliculas;
        }
    }

    //Cargamos los detalles del pelicula
    cargar_detalles_pelicula(url_pelicula) {
        window.location.hash = '/detalles_pelicula'
        localStorage.setItem('url_pelicula', url_pelicula)
    }

    //Vinculamos la función de cargar peliculas al buscador
    init_buscador() {
        let btn = document.getElementById('boton-buscar');
        if (btn) {
            btn.addEventListener('click', () => {
                let input = document.getElementById('input-buscar');
                let valor = input.value || '';
                input.value = '';
                this.obtenerPeliculas(1, valor);
            })
        }
    }
}

export { Peliculas }