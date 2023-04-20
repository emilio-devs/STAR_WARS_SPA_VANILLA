import { fetchHtmlAsString } from "../utils/fetchHTML.js";

class Paginador {
    constructor(total_items, page_change_callback, pagina_actual = 1) {
        this.total_items = total_items
        this.page_change_callback = page_change_callback;
        this._pagina_actual = pagina_actual;
        this.items_per_page = 10;
        this.total_paginas = Math.ceil(this.total_items / this.items_per_page);
    }

    render() {
        const max_paginas_mostradas = 2;
        let inicio = Math.max(this._pagina_actual - max_paginas_mostradas, 1);
        let fin = Math.min(this._pagina_actual + max_paginas_mostradas, this.total_paginas);

        const element = document.querySelector(".paginas");
        element.innerHTML = ''

        //Creamos el botón para volver a la pagina anterior
        const btnAnterior = this._crearBotonAnterior();
        element.appendChild(btnAnterior);


        //Enlace a primera pagina
        if (this._pagina_actual > max_paginas_mostradas + 1) {
            //Primera pagina
            const li = this._crearBotonPagina(1, "1");
            element.appendChild(li);

        }

        //Salto entre paginas solo si hay más de 2 hasta la inicial
        if (this._pagina_actual > max_paginas_mostradas + 2) {
            const liElement = document.createElement("li");
            liElement.textContent = "...";
            liElement.classList.add('disabled')
            element.appendChild(liElement);
        }

        //Ponemos las paginas intermedias
        for (let i = inicio; i <= fin; i++) {
            const li = this._crearBotonPagina(i, i.toString());
            element.appendChild(li);
        }

        //Salto de paginas solo si hay más de dos hasta la final
        if (this._pagina_actual < this.total_paginas - (max_paginas_mostradas + 1)) {
            const liElement = document.createElement("li");
            liElement.textContent = "...";
            liElement.classList.add('disabled')
            element.appendChild(liElement);
        }

        //Pagina final
        if (this.pagina_actual < this.total_paginas - max_paginas_mostradas) {
            const btn = this._crearBotonPagina(this.total_paginas, this.total_paginas.toString());
            element.appendChild(btn);
        }





        const btnSiguiente = this._crearBotonSiguiente();
        element.appendChild(btnSiguiente);

        return element;
    }

    _crearBotonPagina(numero, texto) {
        const liElement = document.createElement("li");
        liElement.textContent = texto;
        liElement.addEventListener("click", () => {
            this._pagina_actual = numero;
            this.page_change_callback(numero);
        });
        if (numero === this._pagina_actual) {
            liElement.classList.add("active");
        }
        return liElement;
    }

    _crearBotonAnterior() {
        const liElement = document.createElement("li");
        liElement.textContent = "❮❮";
        liElement.addEventListener("click", () => {
            if (this._pagina_actual > 1) {
                this._pagina_actual--;
                this.page_change_callback(this._pagina_actual);
            }
        });
        if (this._pagina_actual === 1) {
            liElement.disabled = true;
            liElement.classList.add('disabled')
        }
        return liElement;
    }

    _crearBotonSiguiente() {
        const liElement = document.createElement("li");
        liElement.textContent = "❯❯";
        liElement.addEventListener("click", () => {
            if (this._pagina_actual < this.total_paginas) {
                this._pagina_actual++;
                this.page_change_callback(this._pagina_actual);
            }
        });
        if (this._pagina_actual === this.total_paginas) {
            liElement.disabled = true;
            liElement.classList.add('disabled')
        }
        return liElement;
    }

    disable_paginator() {
        const element = document.querySelector(".paginas");
        element.childNodes.forEach(e => e.classList.add('disabled'))
    }

    get pagina_actual() {
        return this._pagina_actual
    }
}


export { Paginador };