const numberRomanArab = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

let romanToArab = numberRoman => {



}

let arabToRoman = numberArab => {
    let countSum = 0;
    let sumaArab = 0;
    numberArab = firstAndSecondRule(numberArab);
    if (numberArab != undefined) {
        for (countSum; countSum < numberArab.length; countSum++) {
            if (numberArab[countSum] === "I") {
                sumaArab += numberRomanArab[numberArab[countSum]];
            } else if (numberArab[countSum] === "V") {
                sumaArab += numberRomanArab[numberArab[countSum]];
                if (numberArab[countSum - 1] === "I") {
                    sumaArab -= 2;
                }
            } else if (numberArab[countSum] === "X") {
                sumaArab += numberRomanArab[numberArab[countSum]];
                if (numberArab[countSum - 1] === "I") {
                    sumaArab -= 2;
                }
            } else if (numberArab[countSum] === "L") {
                sumaArab += numberRomanArab[numberArab[countSum]];
                if (numberArab[countSum - 1] === "X") {
                    sumaArab -= 20;
                }
            } else if (numberArab[countSum] === "C") {
                sumaArab += numberRomanArab[numberArab[countSum]];
                if (numberArab[countSum - 1] === "X") {
                    sumaArab -= 20;
                }
            } else if (numberArab[countSum] === "D") {
                sumaArab += numberRomanArab[numberArab[countSum]];
                if (numberArab[countSum - 1] === "C") {
                    sumaArab -= 200;
                }
            } else if (numberArab[countSum] === "M") {
                sumaArab += numberRomanArab[numberArab[countSum]];
                if (numberArab[countSum - 1] === "C") {
                    sumaArab -= 200;
                }
            }

        }
    } else {
        return console.log("Sorry, the number could not be translated");
    }

    console.log(sumaArab)
}

let firstAndSecondRule = numberToValidate => {
    numberToValidate = numberToValidate.toUpperCase();
    let numberLength = numberToValidate.length;
    let count = 0;
    let validator = true;
    let validatorChar = "";
    //  let countLetters = [{ I: 0, X: 0, C: 0, M: 0 }, { V: 0, L: 0, D: 0 }];

    // Here we are validating that they just be roman number

    for (let i of numberToValidate) {
        for (let x in numberRomanArab) {
            if (i === x) {
                count++;
            }
        }
    }


    if (count === numberLength && numberLength !== 0) {
        //Here no more than three times for letter
        for (let i = 0; i < numberToValidate.length; i++) {
            validatorChar = numberToValidate.charAt(i);
            validator = repetitiveNumber(validatorChar, numberToValidate);
            if (validator === false) {
                return console.log("Do not repeat (I, X, C, M) more than three consecutive times and (V, L, D) do not repeat at any time")
            }
        }

    } else {
        return console.log(`only roman numerals`);
    }
    return myRule(numberToValidate);
}

let fourthRule = numberToValidate => {
    let positionLetter = 0;
    for (let i of numberToValidate) {
        valueNumber = numberRomanArab[i];
        positionLetter = numberToValidate.indexOf(i);
        for (positionLetter; positionLetter < numberToValidate.length; positionLetter++) {
            if (i === "V" || i === "L" || i === "D") {
                if (positionLetter != 0) {
                    if (valueNumber <= numberRomanArab[numberToValidate[positionLetter]]) {
                        return console.log("The symbols V, L and D cannot be placed to the left of another higher");
                    }
                }
            }
        }
    }

    return numberToValidate;
}

let myRule = numberToValidate => {
    let myValidator = 0;
    for (let i = 0; i < numberToValidate.length; i++) {
        if (numberToValidate[i] === numberToValidate[i + 1]) {
            myValidator = numberRomanArab[numberToValidate[i]];
            if (myValidator < numberRomanArab[numberToValidate[i + 2]]) {
                return console.log("you cannot subtract two equal numbers in a row");
            }
        }
    }
    return fourthRule(numberToValidate);;
}

let repetitiveNumber = (charAt, numberToValidate) => {
    let countChar = 0;
    let validadorCount = true;
    if (charAt === "I" || charAt === "X" || charAt === "C" || charAt === "M") {
        for (let i of numberToValidate) {
            if (i === charAt) {
                countChar++;
                if (countChar === 4) {
                    validadorCount = false;
                    return validadorCount;
                }
            } else {
                countChar = 0;
            }

        }
    } else {
        for (let i of numberToValidate) {
            if (i === charAt) {
                countChar++;
                if (countChar === 2) {
                    validadorCount = false;
                    return validadorCount;
                }
            }
        }
    }
    return validadorCount;
}


arabToRoman("vm");

/*
# Segunda Kata
## Sistema Romano
Vamos a hacer un ejercicio clásico y es jugar con los números romanos y árabes.

Como refresco, vamos a ver sus símboles y reglas.

#### Símbolos

 Romano | Árabe
--------|-------
 I | 1
 V | 5
 X | 10
 L | 50
 C | 100
 D | 500
 M | 1000

### Reglas

Sólo se contemplan números entre el 1 y el 3999

* Los símbolos I, X, C y M se pueden repetir hasta tres veces.
* Los símbolos V, L y D no pueden repetirse.
* Los símbolos I, X y C se suman si están a la derecha de otro mayor o igual.
* Los símbolos I, X y C se restan si están a la izquierda de otro mayor y solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
* I se resta de V y X
* X se resta de L y C
* C se resta de D y M
* Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor.

### Ejercicios

* Crear una función para pasar de número romanos a árabes
* Crear una función para pasar de árabes a romanos
* Hacer un validador de números romanos

*/
