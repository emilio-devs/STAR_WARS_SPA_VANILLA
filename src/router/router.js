import { fetchHtmlAsString } from "../utils/fetchHTML.js";

class Router {
    constructor() {
        this.routes = {};
        this.rootElement = document.getElementById('rootElement')

        //Cada vez que se cambie la ruta con hash renderizamos
        window.addEventListener("hashchange", () => {
            this.render();
        });
    }

    //Asignamos una ruta a un controlador y renderizamos
    use(path, controlador) {
        this.routes[path] = controlador;
    }

    async render() {

        // Borramos el contenido del root element.
        this.rootElement.innerHTML = ''

        // Obtener la ruta actual
        const currentPath = window.location.hash.replace("#", '');

        // Encontrar el controlador correspondiente a la ruta actual
        const controlador = this.routes[currentPath];

        // Si no hay un controlador para la ruta actual, mostrar página de 404 not found.
        if (!controlador) {
            console.log("Vista desconocida!");
            this.rootElement.innerHTML = await fetchHtmlAsString("/src/views/404.html");
            return;
        }

        // Ejecutar el controlador y renderizar su contenido
        const vista = await controlador.template();
        this.rootElement.innerHTML = vista;
        controlador.init()
    }
}


export { Router };