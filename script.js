document.getElementById('vectorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores ingresados para los vectores
    const vector1 = document.getElementById('vector1').value;
    const vector2 = document.getElementById('vector2').value;

    // Convertir los vectores a arreglos de números
    const arrVector1 = vector1.split(',').map(Number);
    const arrVector2 = vector2.split(',').map(Number);

    // Verificar que los vectores tengan la misma longitud
    if (arrVector1.length !== arrVector2.length) {
        document.getElementById('resultado').innerText = 'Los vectores deben tener la misma longitud.';
        return;
    }

    // Realizar la suma de los vectores
    const resultado = arrVector1.map((valor, indice) => valor + arrVector2[indice]);

    // Mostrar el resultado en el elemento <div>
    document.getElementById('resultado').innerText = 'Resultado: ' + resultado.join(', ');
});