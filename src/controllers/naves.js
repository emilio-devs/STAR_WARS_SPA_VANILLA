import { Controller } from "../classes/controller.class.js";
import { Paginador } from "../classes/paginador.class.js";
import { API } from "../services/api.js";

/*
Controlador de Naves.
Controla las operaciones de la vista de naves.
*/
class Naves extends Controller {
    constructor(template_url = '/src/views/naves.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.naves = []; //Lista de items a mostrar en pantalla
        this._total_naves = 0; //Numero total de items mostrados en pantalla
        this.paginador = null; //Elemento paginador para poder cambiar de pagina
    }

    init() {
        this.total_naves = 0;
        this.init_buscador()
        this.obtenerNaves()
    }

    //Obtener naves actuales por página y filtro
    async obtenerNaves(pagina = 1, filtro = '') {
        try {

            //Mostramos loader
            this.cargando_solicitud()
                //Desactivamos el paginador mientras carga
            if (this.paginador) this.paginador.disable_paginator();

            //Si hay una busqueda filtrada la acoplamos a la petición
            if (filtro) filtro = '&search=' + filtro

            //Solicitamos la información al servidor
            let result = await API.get(`https://swapi.dev/api/starships/?page=${pagina}${filtro}`)

            //Numero total de naves
            this.total_naves = result.count;

            //naves
            this.naves = result.results;
            this.renderizarNaves()

            //Si no existe un paginador lo creamos y lo actualizamos
            this.paginador = new Paginador(this.total_naves, this.cambiarPagina.bind(this), pagina)
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

    //Mostramos la lista de naves en una tabla html
    renderizarNaves() {
        let tabla_body = document.getElementById('listaNaves')
        if (!tabla_body) return;

        //Reiniciamos el contenido
        tabla_body.innerHTML = '';

        //Por cada nave vamos a poner los datos más interesantes
        for (const nave of this.naves) {
            let tr = document.createElement('tr');

            //Nombre
            let nombre_td = document.createElement('td')
            nombre_td.innerHTML = nave.name;
            tr.append(nombre_td)

            //Modelo
            let modelo_td = document.createElement('td')
            modelo_td.innerHTML = nave.model;
            tr.append(modelo_td)

            //Fabricante
            let fabricante_td = document.createElement('td')
            fabricante_td.innerHTML = nave.manufacturer;
            tr.append(fabricante_td)

            //Coste en creditos
            let coste_td = document.createElement('td')
            coste_td.innerHTML = nave.cost_in_credits;
            tr.append(coste_td)

            //Tamaño
            let length_td = document.createElement('td')
            length_td.innerHTML = nave.length;
            tr.append(length_td)

            //Carga
            let carga_td = document.createElement('td')
            carga_td.innerHTML = nave.cargo_capacity;
            tr.append(carga_td)

            //Max_speed
            let speed_td = document.createElement('td')
            speed_td.innerHTML = nave.max_atmosphering_speed;
            tr.append(speed_td)

            //Detalles
            let detalles_td = document.createElement('td')
            detalles_td.classList.add('text-center')
            let boton_detalles = document.createElement('button')
            boton_detalles.textContent = "DETALLES"
            boton_detalles.addEventListener('click', () => { this.cargar_detalles_nave(nave.url) })
            detalles_td.append(boton_detalles)
            tr.append(detalles_td)

            //Poner la linea entera
            tabla_body.append(tr)
        }
    }

    //Buscamos una nueva pagina
    cambiarPagina(pagina) {
        this.obtenerNaves(pagina);
    }

    get total_naves() {
        return this._total_naves;
    }

    //Al cambiar el total de naves se pone automaticamente en el html
    set total_naves(valor) {
        this._total_naves = valor;
        this.mostrar_numero_items();
    }

    //Mostramos el número de naves
    mostrar_numero_items() {
        let element = document.getElementById('numElementos');
        if (element) {
            element.innerHTML = this.total_naves;
        }
    }

    //Cargamos los detalles del nave
    cargar_detalles_nave(url_nave) {
        window.location.hash = '/detalles_nave'
        localStorage.setItem('url_nave', url_nave)
    }

    //Vinculamos la función de cargar naves al buscador
    init_buscador() {
        let btn = document.getElementById('boton-buscar');
        if (btn) {
            btn.addEventListener('click', () => {
                let input = document.getElementById('input-buscar');
                let valor = input.value || '';
                input.value = '';
                this.obtenerNaves(1, valor);
            })
        }
    }
}

export { Naves }