class CalculadoraBasica {

    constructor() {
        this.basicOperationShape = new RegExp("(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?[\-\+\*\/])(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?)");
        this.memoryRegister = 0;
    }

    printMemoryContents() {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister);
    }

    subtractFromMemory() {
        this.memoryRegister -= this.solveOperation();
    }

    addToMemory() {
        this.memoryRegister += this.solveOperation();
    }

    writeToDisplay(data) {
        let legacy = document.getElementById("displayBox").value;
        if (data == ".") {
            legacy += data;
        } else {
            legacy = legacy == "0" ? data : legacy += data;
        }
        document.getElementById("displayBox").value = legacy;
    }

    writeOperatorToDisplay(operator) {
        let legacy = document.getElementById("displayBox").value;
        if (this.basicOperationShape.test(legacy)) {
            this.solveOperation();
        }
        this.writeToDisplay(operator);
    }

    clearDisplay() {
        document.getElementById("displayBox").value = "0";
    }

    solveOperation() {
        let operation = document.getElementById("displayBox").value;
        let result = 0;
        try {
            result = eval(operation == "" ? 0 : operation);
        } catch (err) {
            alert("Syntax error");
            this.clearDisplay();
        }
        document.getElementById("displayBox").value = result;
        return result;
    }

}

class CalculadoraCientifica extends CalculadoraBasica {

    constructor() {
        super();
        this.inputList = new Array();
        this.operationString = "";
        this.justSolved = false;
        this.operationMap = {
            "sin(": "Math.sin(",
            "cos(": "Math.cos(",
            "tan(": "Math.tan(",
            "log(": "Math.log10(",
            "ln(": "Math.log(",
            "sqrt(": "Math.sqrt(",
            "PI": "Math.PI",
            "e": "Math.E"
        };
    }

    /**
     * Writes new user input from the calculator buttons onto the
     * display.
     * 
     * @param {String} data The data to display on the screen.
     * Given by a button click from the user. 
     */
    writeToDisplay(data) {
        if (document.getElementById("displayBox").value == "Syntax Error") {
            super.clearDisplay();
        }
        super.writeToDisplay(data);
        this.operationString += data;
        this.inputList.push(data);
    }

    /**
     * Writes the operator clicked by the user to the screen.
     * 
     * @param {String} operator An string representing the operator 
     * that has been clicked on by the user. 
     */
    writeOperatorToDisplay(operator) {
        if (document.getElementById("displayBox").value == "Syntax Error") {
            super.clearDisplay();
        }
        this.operationString += operator;
        super.writeToDisplay(operator);
        this.inputList.push(operator);
    }


    solveOperation() {
        let result = 0;
        try {
            result = eval(this.operationString == "" || this.operationString == "Syntax Error" ? 0 : this.operationString);
        } catch (err) {
            result = "Syntax Error";
        }
        document.getElementById("displayBox").value = result;
        this.operationString = "";
        this.operationString += result;
        this.justSolved = true;
        return result;
    }

    /**
     * Clears the display screen.
     */
    clearDisplay() {
        super.clearDisplay();
        this.operationString = "";
    }

    toggleSign() {
        var displayBox = document.getElementById("displayBox");
        var displayContents = displayBox.value;
        if (displayContents == "Syntax Error") {
            super.clearDisplay();
        }
        if (displayContents == "0") {
            displayBox.value = "-";
            this.operationString += "-";
        } else {
            displayBox.value = "-" + displayBox.value;
            this.operationString = "-" + this.operationString;
        }
    }

    clearMemory() {
        super.subtractFromMemory(this.memoryRegister);
    }

    readMemory() {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister);
    }

    saveToMemory() {
        this.memoryRegister = this.solveOperation();
    }

    eraseLastInput() {
        this.inputList.pop();
        var recreatedOperation = "";
        for (var each in this.inputList) {
            recreatedOperation += this.inputList[each];
        }
        document.getElementById("displayBox").value = recreatedOperation;
        for (var each in this.operationMap) {
            recreatedOperation = recreatedOperation.replace(each, this.operationMap[each]);
        }
        this.operationString = recreatedOperation;
    }

    writeMathFunction(data) {
        if (document.getElementById("displayBox").value == "Syntax Error") {
            super.clearDisplay();
        }
        super.writeToDisplay(data);
        this.operationString += this.operationMap[data];
        this.inputList.push(data);
    }

    calculateFactorial() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        var result = 0;
        try {
            result = this.calculateRecursiveFactorial(number);
        } catch(err) {
            document.getElementById("displayBox").value = "That number is too big";
        }
        this.clearDisplay();
        document.getElementById("displayBox").value = result;
    }

    calculateRecursiveFactorial(number) {
        if (number == 1 || number == 0) {
            return 1;
        }
        return number * this.calculateRecursiveFactorial(number - 1);
    }

    nthTenPower() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(10, parseInt(number));
    }

    square() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(parseInt(number), 2);
    }

    cube() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(parseInt(number), 3);
    }

    inverseNumber() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(parseInt(number), -1);
    }

}

const calculadora = new CalculadoraCientifica();

// Este código define una clase llamada CalculadoraBasica, que contiene una serie de métodos para realizar operaciones aritméticas básicas. A continuación, se describe cada una de las líneas del código:

// class CalculadoraBasica {: Define la clase CalculadoraBasica.

// constructor() {: Define el constructor de la clase.

// this.basicOperationShape = new RegExp("(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?[\-\+\*\/])(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?)");: Define una expresión regular que se utiliza para validar las operaciones matemáticas.

// this.memoryRegister = 0;: Inicializa el registro de memoria en 0.

// printMemoryContents() {: Define un método para imprimir el contenido de la memoria.

// this.clearDisplay();: Limpia la pantalla de la calculadora.

// this.writeToDisplay(this.memoryRegister);: Escribe el contenido de la memoria en la pantalla de la calculadora.

// subtractFromMemory() {: Define un método para restar el resultado actual de la operación de la memoria.

// this.memoryRegister -= this.solveOperation();: Resta el resultado actual de la operación de la memoria.

// addToMemory() {: Define un método para sumar el resultado actual de la operación a la memoria.

// this.memoryRegister += this.solveOperation();: Suma el resultado actual de la operación a la memoria.

// writeToDisplay(data) {: Define un método para escribir en la pantalla de la calculadora.

// let legacy = document.getElementById("displayBox").value;: Obtiene el contenido actual de la pantalla.

// if (data == ".") {: Verifica si el dato a escribir es un punto.

// legacy += data;: Agrega el punto al contenido actual.

// legacy = legacy == "0" ? data : legacy += data;: Verifica si el contenido actual es igual a "0" y, si es así, reemplaza el contenido con el nuevo dato. Si no, agrega el nuevo dato al contenido actual.

// document.getElementById("displayBox").value = legacy;: Actualiza el contenido de la pantalla con el contenido actualizado.

// writeOperatorToDisplay(operator) {: Define un método para escribir el operador en la pantalla de la calculadora.

// let legacy = document.getElementById("displayBox").value;: Obtiene el contenido actual de la pantalla.

// if (this.basicOperationShape.test(legacy)) {: Verifica si el contenido actual de la pantalla corresponde a una operación matemática válida.

// this.solveOperation();: Resuelve la operación actual.

// this.writeToDisplay(operator);: Escribe el operador en la pantalla de la calculadora.

// clearDisplay() {: Define un método para limpiar la pantalla de la calculadora.

// document.getElementById("displayBox").value = "0";: Actualiza el contenido de la pantalla con "0".

// solveOperation() {: Define un método para resolver la operación matemática actual.

// let operation = document.getElementById("displayBox").value;: Obtiene el contenido actual de la pantalla.

// let result = 0;: Inicializa el resultado de la operación en 0.


class Vector {
    constructor(valores) {
      this.valores = valores;
    }
  
    sumar(vector) {
      if (this.valores.length !== vector.valores.length) {
        throw new Error('Los vectores deben tener la misma longitud.');
      }
  
      const resultado = [];
      for (let i = 0; i < this.valores.length; i++) {
        resultado.push(this.valores[i] + vector.valores[i]);
      }
  
      return new Vector(resultado);
    }
  
    restar(vector) {
      if (this.valores.length !== vector.valores.length) {
        throw new Error('Los vectores deben tener la misma longitud.');
      }
  
      const resultado = [];
      for (let i = 0; i < this.valores.length; i++) {
        resultado.push(this.valores[i] - vector.valores[i]);
      }
  
      return new Vector(resultado);
    }
  
    multiplicar(vector) {
      if (this.valores.length !== vector.valores.length) {
        throw new Error('Los vectores deben tener la misma longitud.');
      }
  
      const resultado = [];
      for (let i = 0; i < this.valores.length; i++) {
        resultado.push(this.valores[i] * vector.valores[i]);
      }
  
      return new Vector(resultado);
    }
  
    dividir(vector) {
      if (this.valores.length !== vector.valores.length) {
        throw new Error('Los vectores deben tener la misma longitud.');
      }
  
      const resultado = [];
      for (let i = 0; i < this.valores.length; i++) {
        if (vector.valores[i] === 0) {
          throw new Error('No se puede dividir por cero.');
        }
        resultado.push(this.valores[i] / vector.valores[i]);
      }
  
      return new Vector(resultado);
    }
  }
  
  function realizarOperacion(operacion) {
    const partes = operacion.split(/(\+|\-|\*|\/)/);
  
    const vectores = [];
    const operaciones = [];
  
    for (let i = 0; i < partes.length; i++) {
      const parte = partes[i].trim();
      if (parte === '+' || parte === '-' || parte === '*' || parte === '/') {
        operaciones.push(parte);
      } else {
        const valores = parte.split(',').map(Number);
        if (valores.some(isNaN)) {
          console.log('Valores inválidos.');
          return;
        }
        vectores.push(new Vector(valores));
      }
    }
  
    let resultado = vectores[0];
    for (let i = 1; i < vectores.length; i++) {
      const operacion = operaciones[i - 1];
      switch (operacion) {
        case '+':
          resultado = resultado.sumar(vectores[i]);
          break;
        case '-':
          resultado = resultado.restar(vectores[i]);
          break;
        case '*':
          resultado = resultado.multiplicar(vectores[i]);
          break;
        case '/':
          resultado = resultado.dividir(vectores[i]);
          break;
        default:
          console.log('Operación inválida.');
          return;
      }
    }
  
    console.log('El resultado de la operación es:', resultado.valores);
    
    document.getElementById("displayBox").value = resultado.valores;
  }
  
 function realizarOperacion1(){
    var Suma = document.getElementById("displayBox").value ;
    realizarOperacion(Suma);
  };