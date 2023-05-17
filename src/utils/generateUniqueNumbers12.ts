
function generateUniqueNumbers12(): Promise<Number[]> {
    const numeros: any = [];

    // Adiciona números de 1 a 75 ao array
    for (let i = 1; i <= 60; i++) {
        numeros.push(i);
    }

    // Embaralha os números
    for (let i = numeros.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }

    // Retorna os primeiros 5 números do array
    const numbers = numeros.slice(0, 19)
    const numberOrders = numbers.sort((a: number, b: number) => a - b)
    return numberOrders
}

export { generateUniqueNumbers12 }