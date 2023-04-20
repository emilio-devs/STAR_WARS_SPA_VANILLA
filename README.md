# Biblioteca Star Wars Vanilla

Este proyecto ha sido creado desde 0 de manera totalmente nativa. Sin utilizar ningún framework de renderizado ni utilidades.
La aplicación consiste en una biblioteca web que implementa el API de [SWAPI](https://swapi.dev/)

## Tecnologías

HTML
JavaScript
Css

nodeJS - serve
PostMan

## Como empezar

Dentro de la raiz de la carpeta abrimos una consola y ejecutamos `npm install` para instalar las dependencias. Despues de eso usaremos `npx serve` para lanzar un servidor de desarrollo y ver el proyecto.

## Autor

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/emiliojosefullstackdeveloper/)](https://www.linkedin.com/in/emiliojosefullstackdeveloper/)
[![Gmail Badge](https://img.shields.io/badge/-ejperezmariscal@gmail.com-D14836?style=flat-square&logo=Gmail&logoColor=white&link=mailto:ejperezmariscal@gmail.com)](mailto:ejperezmariscal@gmail.com)<br>

### En que consiste

El proyecto consistía en desarrollar una SPA (Single Page Application) desde cero sin utilizar ningún tipo de framework o librería de utilidades. Existen muchas tecnologías para facilitar estos trabajos pero también es muy importante el entendimiento de como está construido todo. 

Gracias a esto he tenido la oportunidad de tener el control de toda la estructura de mi proyecto así como de mejorar mis habilidades de programación.

### Estructura

``Controladores`` - Llevan a cabo la lógica enlazada con una vista.
``Vistas`` - Muestran el contenido genérico de una parte de la aplicación
``Enrutador`` - Gestiona el sistema de enrutamiento, las vistas que se van a mostrar y sus controladores
``API`` - Utilidad para hacer peticiones http y gestionar errores

### Extras

`Loader` - Cargador animado con imagen de Star Wars.
`Paginador` - Paginador para gestionar las páginas de la colección visualizada.
`Buscador` - Buscador para filtrar la colección visualizada.
`404 not found` - Página personalizada para rutas no existentes.
`Detalles` - Página de detalles donde se podrá ver un registro en detalle, además se mostrará brevemente los otros registros con los que está enlazado y permitirá viajar a visualizar esa colección.

### Bonus round

Como bonus round se ha incluido en la estructura un mecanismo para añadir un retardo configurable en las peticiones http que puede ocurrir 1 de cada 10 veces, además de
un error configurable que se lanza en las peticiones http 1 de cada 20 veces. En la parte inferior de la aplicación se puede activar y desactivar este mecanismo además de elegir el retardo y el error deseado.
