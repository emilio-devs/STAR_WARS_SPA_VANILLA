//Función para cargar los templates de html a javascript y así poder cargar las vistas
const fetchHtmlAsString = async(url) => {
    try {
        const result = await fetch(url)
        const html = await result.text()
        return html;
    } catch (error) {
        console.log("Error cargando html", error.message);
    }
}

export { fetchHtmlAsString }