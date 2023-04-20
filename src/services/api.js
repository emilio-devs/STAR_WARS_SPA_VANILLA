import { ocurreEvento } from "../utils/random.js";

class API {
    //Creamos una configuración de retardo
    static retardo = {
            ms: 0,
            probabilidad: 0
        }
        //Creamos una configuración de error aleatorio
    static customError = {
        msg: '',
        probabilidad: 0
    }
    static async get(endpoint) {
        try {
            // Si ocurre un evento de error devolvemos ese error;
            if (ocurreEvento(this.customError.probabilidad)) throw new Error(`Error programado: ${API.customError.msg}`);

            // Para hacer el evento de retardo, creamos una promesa que se resuelve después de 'ms' milisegundos
            const data = await new Promise((resolve, reject) => {
                setTimeout(async() => {
                    try {
                        const response = await fetch(endpoint)
                        if (!response.ok) {
                            const error = new Error(`Error realizando la petición. Status: ${response.status} ${response.statusText}`);
                            error.response = response;
                            reject(error);
                        }
                        const data = await response.json();
                        resolve(data);
                    } catch (error) {
                        reject(error);
                    }
                }, ocurreEvento(API.retardo.probabilidad) ? API.retardo.ms : 0);
            });
            return data
        } catch (error) {
            console.error("Error en petición: ", error);
            throw error;
        }
    }
    static setRetardo(milisegundos = 1000, probabilidad = 1 / 10) {
        API.retardo.ms = milisegundos;
        API.retardo.probabilidad = probabilidad;
    }
    static setCustomError(msg = 'Ha ocurrido un error aleatorio configurable.', probabilidad = 1 / 20) {
        API.customError.msg = msg;
        API.customError.probabilidad = probabilidad;
    }

}




export { API };