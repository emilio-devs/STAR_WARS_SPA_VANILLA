# Biblioteca Star Wars Vanilla

Este proyecto ha sido creado desde 0 de manera totalmente nativa. Sin utilizar ningún framework de renderizado ni utilidades.
La aplicación consiste en una biblioteca web que implementa el API de [SWAPI](https://swapi.dev/)

## Tecnologías

- HTML
- JavaScript
- Css

- NodeJS (Serve como servidor frontal)
- PostMan (Pruebas API)

## Como empezar

Se necesita NPM para poder instalar el servidor frontal.
Dentro de la raiz de la carpeta abrimos una consola y ejecutamos `npm install` para instalar las dependencias. Despues de eso usaremos `npx serve` para lanzar un servidor de desarrollo y ver el proyecto.

## Autor

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/emiliojosefullstackdeveloper/)](https://www.linkedin.com/in/emiliojosefullstackdeveloper/)
[![Gmail Badge](https://img.shields.io/badge/-ejperezmariscal@gmail.com-D14836?style=flat-square&logo=Gmail&logoColor=white&link=mailto:ejperezmariscal@gmail.com)](mailto:ejperezmariscal@gmail.com)<br>

### En que consiste

El objetivo del proyecto se centró en el desarrollo de una SPA (Single Page Application) desde cero, sin hacer uso de frameworks o cualquier librería de utilidades. A pesar de la existencia de múltiples tecnologías que facilitan este tipo de trabajo, es crucial contar con un conocimiento profundo acerca de la estructura de la aplicación en sí.

Gracias a este enfoque, se me brindó la oportunidad de ejercer un control total sobre la arquitectura de mi proyecto, al mismo tiempo que pude perfeccionar mis habilidades en programación y amplicar mis conocimientos en las tecnologías que utilizo habitualmente para trabajar.

### Estructura

- `Controladores` - Llevan a cabo la lógica enlazada con una vista.
- `Vistas` - Muestran el contenido genérico de una parte de la aplicación
- `Enrutador` - Gestiona el sistema de enrutamiento, las vistas que se van a mostrar y sus controladores
- `API` - Utilidad para hacer peticiones http y gestionar errores

### Extras

- `Loader` - Cargador animado con imagen de Star Wars.
- `Paginador` - Paginador para gestionar las páginas de la colección visualizada.
- `Buscador` - Buscador para filtrar la colección visualizada.
- `404 not found` - Página personalizada para rutas no existentes.
- `Detalles` - Página de detalles donde se podrá ver un registro en detalle, además se mostrará brevemente los otros registros con los que está enlazado y permitirá viajar a visualizar esa colección.

### Bonus round

Como bonus round se ha incluido en la estructura un mecanismo para añadir un retardo configurable en las peticiones http que puede ocurrir 1 de cada 10 veces, además de un error configurable que se lanza en las peticiones http 1 de cada 20 veces. En la parte inferior de la aplicación se puede activar y desactivar este mecanismo además de elegir el retardo y el error deseado.
