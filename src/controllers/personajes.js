import { Controller } from "../classes/controller.class.js";
import { Paginador } from "../classes/paginador.class.js";
import { API } from "../services/api.js";

/*
Controlador de Personajes.
Controla las operaciones de la vista de Personajes.
*/
class Personajes extends Controller {
    constructor(template_url = '/src/views/personajes.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.personajes = []; //Lista de items a mostrar en pantalla
        this._total_personajes = 0; //Numero total de items mostrados en pantalla
        this.paginador = null; //Elemento paginador para poder cambiar de pagina
    }

    init() {
        this.total_personajes = 0;
        this.init_buscador()
        this.obtenerPersonajes()
    }

    //Obtener personajes actuales por página y filtro
    async obtenerPersonajes(pagina = 1, filtro = '') {
        try {

            //Mostramos loader
            this.cargando_solicitud()
                //Desactivamos el paginador mientras carga
            if (this.paginador) this.paginador.disable_paginator();

            //Si hay una busqueda filtrada la acoplamos a la petición
            if (filtro) filtro = '&search=' + filtro

            //Solicitamos la información al servidor
            let result = await API.get(`https://swapi.dev/api/people/?page=${pagina}${filtro}`)

            //Numero total de personajes
            this.total_personajes = result.count;

            //personajes
            this.personajes = result.results;
            this.renderizarPersonajes()

            //Si no existe un paginador lo creamos y lo actualizamos
            this.paginador = new Paginador(this.total_personajes, this.cambiarPagina.bind(this), pagina)
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

    //Mostramos la lista de personajes en una tabla html
    renderizarPersonajes() {
        let tabla_body = document.getElementById('listaPersonajes')
        if (!tabla_body) return;

        //Reiniciamos el contenido
        tabla_body.innerHTML = '';
        //Por cada personaje vamos a poner los datos más interesantes
        for (const personaje of this.personajes) {
            let tr = document.createElement('tr');

            //Nombre
            let nombre_td = document.createElement('td')
            nombre_td.innerHTML = personaje.name;
            tr.append(nombre_td)

            //Altura
            let altura_td = document.createElement('td')
            altura_td.innerHTML = personaje.height;
            tr.append(altura_td)

            //Peso
            let peso_td = document.createElement('td')
            peso_td.innerHTML = personaje.mass;
            tr.append(peso_td)

            //Genero
            let genero_td = document.createElement('td')
            genero_td.innerHTML = personaje.gender;
            tr.append(genero_td)

            //Color de piel
            let piel_td = document.createElement('td')
            piel_td.innerHTML = personaje.skin_color;
            tr.append(piel_td)

            //Pelo
            let pelo_td = document.createElement('td')
            pelo_td.innerHTML = personaje.hair_color;
            tr.append(pelo_td)

            //Ojos
            let ojos_td = document.createElement('td')
            ojos_td.innerHTML = personaje.eye_color;
            tr.append(ojos_td)


            //Detalles
            let detalles_td = document.createElement('td')
            detalles_td.classList.add('text-center')
            let boton_detalles = document.createElement('button')
            boton_detalles.textContent = "DETALLES"
            boton_detalles.addEventListener('click', () => { this.cargar_detalles_personaje(personaje.url) })
            detalles_td.append(boton_detalles)
            tr.append(detalles_td)

            //Poner la linea entera
            tabla_body.append(tr)
        }
    }

    //Buscamos una nueva pagina
    cambiarPagina(pagina) {
        this.obtenerPersonajes(pagina);
    }

    get total_personajes() {
        return this._total_personajes;
    }

    //Al cambiar el total de personajes se pone automaticamente en el html
    set total_personajes(valor) {
        this._total_personajes = valor;
        this.mostrar_numero_items();
    }

    //Mostramos el número de personajes
    mostrar_numero_items() {
        let element = document.getElementById('numElementos');
        if (element) {
            element.innerHTML = this.total_personajes;
        }
    }

    //Cargamos los detalles del personaje
    cargar_detalles_personaje(url_personaje) {
        window.location.hash = '/detalles_personaje'
        localStorage.setItem('url_personaje', url_personaje)
    }

    //Vinculamos la función de cargar personajes al buscador
    init_buscador() {
        let btn = document.getElementById('boton-buscar');
        if (btn) {
            btn.addEventListener('click', () => {
                let input = document.getElementById('input-buscar');
                let valor = input.value || '';
                input.value = '';
                this.obtenerPersonajes(1, valor);
            })
        }
    }
}

export { Personajes }