//Introduce un valor de 1 a 0 que indicará la probabilidad de que ocurra el evento
const ocurreEvento = (probabilidad = 0) => {
    const randomNum = Math.random();
    if (randomNum <= probabilidad) console.log('ocurriioo');
    return randomNum <= probabilidad;
}

export { ocurreEvento }