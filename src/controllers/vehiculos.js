import { Controller } from "../classes/controller.class.js";
import { Paginador } from "../classes/paginador.class.js";
import { API } from "../services/api.js";

/*
Controlador de Vehiculos.
Controla las operaciones de la vista de vehiculos.
*/
class Vehiculos extends Controller {
    constructor(template_url = '/src/views/vehiculos.html') {
        super(template_url) //Establece por defecto la vista del controlador
        this.vehiculos = []; //Lista de items a mostrar en pantalla
        this._total_vehiculos = 0; //Numero total de items mostrados en pantalla
        this.paginador = null; //Elemento paginador para poder cambiar de pagina
    }

    init() {
        this.total_vehiculos = 0;
        this.init_buscador()
        this.obtenerVehiculos()
    }

    //Obtener vehiculos actuales por página y filtro
    async obtenerVehiculos(pagina = 1, filtro = '') {
        try {

            //Mostramos loader
            this.cargando_solicitud()
                //Desactivamos el paginador mientras carga
            if (this.paginador) this.paginador.disable_paginator();

            //Si hay una busqueda filtrada la acoplamos a la petición
            if (filtro) filtro = '&search=' + filtro

            //Solicitamos la información al servidor
            let result = await API.get(`https://swapi.dev/api/vehicles/?page=${pagina}${filtro}`)

            //Numero total de vehiculos
            this.total_vehiculos = result.count;

            //vehiculos
            this.vehiculos = result.results;
            this.renderizarVehiculos()

            //Si no existe un paginador lo creamos y lo actualizamos
            this.paginador = new Paginador(this.total_vehiculos, this.cambiarPagina.bind(this), pagina)
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
    renderizarVehiculos() {
        let tabla_body = document.getElementById('listaVehiculos')
        if (!tabla_body) return;

        //Reiniciamos el contenido
        tabla_body.innerHTML = '';

        //Por cada vehiculo vamos a poner los datos más interesantes
        for (const vehiculo of this.vehiculos) {
            let tr = document.createElement('tr');

            //Nombre
            let nombre_td = document.createElement('td')
            nombre_td.innerHTML = vehiculo.name;
            tr.append(nombre_td)

            //Modelo
            let modelo_td = document.createElement('td')
            modelo_td.innerHTML = vehiculo.model;
            tr.append(modelo_td)

            //Fabricante
            let fabricante_td = document.createElement('td')
            fabricante_td.innerHTML = vehiculo.manufacturer;
            tr.append(fabricante_td)

            //Coste en creditos
            let coste_td = document.createElement('td')
            coste_td.innerHTML = vehiculo.cost_in_credits;
            tr.append(coste_td)

            //Tamaño
            let length_td = document.createElement('td')
            length_td.innerHTML = vehiculo.length;
            tr.append(length_td)

            //Carga
            let carga_td = document.createElement('td')
            carga_td.innerHTML = vehiculo.cargo_capacity;
            tr.append(carga_td)

            //Max_speed
            let speed_td = document.createElement('td')
            speed_td.innerHTML = vehiculo.max_atmosphering_speed;
            tr.append(speed_td)

            //Detalles
            let detalles_td = document.createElement('td')
            detalles_td.classList.add('text-center')
            let boton_detalles = document.createElement('button')
            boton_detalles.textContent = "DETALLES"
            boton_detalles.addEventListener('click', () => { this.cargar_detalles_vehiculo(vehiculo.url) })
            detalles_td.append(boton_detalles)
            tr.append(detalles_td)

            //Poner la linea entera
            tabla_body.append(tr)
        }
    }

    //Buscamos una nueva pagina
    cambiarPagina(pagina) {
        this.obtenerVehiculos(pagina);
    }

    get total_vehiculos() {
        return this._total_vehiculos;
    }

    //Al cambiar el total de vehiculos se pone automaticamente en el html
    set total_vehiculos(valor) {
        this._total_vehiculos = valor;
        this.mostrar_numero_items();
    }

    //Mostramos el número de vehiculos
    mostrar_numero_items() {
        let element = document.getElementById('numElementos');
        if (element) {
            element.innerHTML = this.total_vehiculos;
        }
    }

    //Cargamos los detalles del vehiculo
    cargar_detalles_vehiculo(url_vehiculo) {
        window.location.hash = '/detalles_vehiculo'
        localStorage.setItem('url_vehiculo', url_vehiculo)
    }

    //Vinculamos la función de cargar vehiculos al buscador
    init_buscador() {
        let btn = document.getElementById('boton-buscar');
        if (btn) {
            btn.addEventListener('click', () => {
                let input = document.getElementById('input-buscar');
                let valor = input.value || '';
                input.value = '';
                this.obtenerVehiculos(1, valor);
            })
        }
    }
}

export { Vehiculos }