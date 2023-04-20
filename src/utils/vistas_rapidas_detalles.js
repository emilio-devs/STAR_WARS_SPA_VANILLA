//Creamos una tabla para mostrar los residentes
const crear_vista_rapida_personajes = lista => {
        if (!lista.length) return 'Ninguno';

        let tabla = `
      <div>
          <table class="table-tiny secondary-card">
              <thead>
                  <tr>
                      <th>Nombre</th>
                      <th>Altura</th>
                      <th>Peso</th>
                      <th>Genero</th>
                  </tr>
              </thead>
              <tbody>
                  ${lista.map((e) => `
                  <tr>
                    <td><a href="${e.url_vista}">${e.name}</a></td>
                    <td>${e.height}</td>
                    <td>${e.mass}</td>
                    <td>${e.gender}</td>
                  </tr>
                `).join('')}
              </tbody>
          </table>
      </div>
      `
    return tabla;
}

//Creamos una tabla para mostrar las peliculas
const crear_vista_rapida_peliculas = lista => {
    if(!lista.length) return 'Ninguna';
    let tabla = `
  <div>
      <table class="table-tiny secondary-card">
          <thead>
              <tr>
                <th>Titulo</th>
                <th>Director</th>
                <th>Productor</th>
                <th>Fecha de salida</th>
              </tr>
          </thead>
          <tbody>
              ${lista.map(e => `
              <tr>
                <td><a href="${e.url_vista}">${e.title}</a></td>
                <td>${e.director}</td>
                <td>${e.producer}</td>
                <td>${e.release_date}</td>
              </tr>
            `).join('')}
          </tbody>
      </table>
  </div>
  `
return tabla;
}


//Creamos una tabla para mostrar las especies
const crear_vista_rapida_especies = lista => {
  if (!lista.length) return 'Ninguna';

  let tabla = `
<div>
    <table class="table-tiny secondary-card">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Idioma</th>
                <th>Clasificacion</th>
                <th>Designación</th>
            </tr>
        </thead>
        <tbody>
            ${lista.map((e) => `
            <tr>
              <td><a href="${e.url_vista}">${e.name}</a></td>
              <td>${e.language}</td>
              <td>${e.classification}</td>
              <td>${e.designation}</td>
            </tr>
          `).join('')}
        </tbody>
    </table>
</div>
`
return tabla;
}

//Creamos una tabla para mostrar los vehiculos y naves
const crear_vista_rapida_vehiculos = lista => {
  if (!lista.length) return 'Ninguno';

  let tabla = `
<div>
    <table class="table-tiny secondary-card">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>Fabricante</th>
                <th>Tamaño</th>
            </tr>
        </thead>
        <tbody>
            ${lista.map((e) => `
            <tr>
              <td><a href="${e.url_vista}">${e.name}</a></td>
              <td>${e.model}</td>
              <td>${e.manufacturer}</td>
              <td>${e.length}</td>
            </tr>
          `).join('')}
        </tbody>
    </table>
</div>
`
return tabla;
}





const crearPropiedadBasica = (DOM_padre, nombre, valor) => {
  //Contenedor de la propiedad
  let div = document.createElement('div');

  //Clave de propiedad
  let key_element = document.createElement('span')
  key_element.classList.add('fw-bold', 'text-capitalize')
  key_element.innerHTML = nombre + ': ';

  //Valor de propiedad
  let value_element = document.createElement('span')
  value_element.classList.add('text-capitalize')
  value_element.innerHTML = valor;

  //Separador de atributos
  let hr = document.createElement('hr')

  //Metemos los elementos en el la nueva
  div.append(key_element, value_element, hr)
  DOM_padre.append(div)
}

const crearPropiedadLinkeada = (DOM_padre, nombre, valor) => {
  //Contenedor de la propiedad
  let div = document.createElement('div');

  //Clave de propiedad
  let key_element = document.createElement('span')
  key_element.classList.add('fw-bold', 'text-capitalize')
  key_element.innerHTML = nombre + ': ';

  //Valor de propiedad
  let value_element = document.createElement('span')
  value_element.classList.add('text-capitalize')
  let link = document.createElement('a');
  link.href = valor.url_vista;
  link.innerHTML = valor.name;
  value_element.append(link);

  //Separador de atributos
  let hr = document.createElement('hr')

  //Metemos los elementos en el la nueva
  div.append(key_element, value_element, hr)
  DOM_padre.append(div)
}

const crearPropiedadHTML = (DOM_padre, key, html_string) => {
    //Contenedor de la propiedad
    let div = document.createElement('div');

    //Clave de propiedad
    let key_element = document.createElement('span')
    key_element.classList.add('fw-bold', 'text-capitalize')
    key_element.innerHTML = key + ': ';

    //Valor de propiedad
    let value_element = document.createElement('span')
    value_element.classList.add('text-capitalize')
    value_element.innerHTML = html_string;

    //Separador de atributos
    let hr = document.createElement('hr')

    //Metemos los elementos en el la nueva
    div.append(key_element, value_element, hr)
    DOM_padre.append(div)
}


export { crear_vista_rapida_personajes, crear_vista_rapida_peliculas, crear_vista_rapida_especies, crear_vista_rapida_vehiculos, crearPropiedadBasica, crearPropiedadLinkeada, crearPropiedadHTML }