const numberRomanArab = {
    "": 0,
    I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10,
    XX: 20, XXX: 30, XL: 40, L: 50, LX: 60, LXX: 70, LXXX: 80, XC: 90, C: 100, CC: 200,
    CCC: 300, CD: 400, D: 500, DC: 600, DCC: 700, DCCC: 800, CM: 900, M: 1000, MM: 2000, MMM: 3000,

    getKeys(keys) {
        for (let key in numberRomanArab) {
            if (numberRomanArab[key] == keys) {
                return key;
            }
        }
    }
};

let romanToArab = numberRoman => {
    let sumRoman = "";
    let numberString = "";
    let numberInt = 0;
    let numberLength = numberRoman.toString().length;
    numberString = numberRoman.toString();
    for (let x = 0; x < numberLength; x++) {
        for (let i of numberString) {
            if (numberLength === 4) {
                numberInt = parseInt(i);
                sumRoman += numberRomanArab.getKeys(numberInt * 1000);
                numberString = numberString.slice(1);
                numberLength = numberString.length;
            } else if (numberLength === 3) {
                numberInt = parseInt(i);
                sumRoman += numberRomanArab.getKeys(numberInt * 100);
                numberString = numberString.slice(1);
                numberLength = numberString.length;
            } else if (numberLength === 2) {
                numberInt = parseInt(i);
                sumRoman += numberRomanArab.getKeys(numberInt * 10);
                numberString = numberString.slice(1);
                numberLength = numberString.length;
            } else {
                numberInt = parseInt(i);
                sumRoman += numberRomanArab.getKeys(numberInt);
                numberString = numberString.slice(1);
                numberLength = numberString.length;
            }
        }
    }
    console.log(sumRoman)
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
    if (sumaArab < 4000) {
        console.log(sumaArab);
    } else {
        console.log("Only numbers smallest of 4000, this number is more higher")
    }
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
                    if (valueNumber < numberRomanArab[numberToValidate[positionLetter + 1]]) {
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


arabToRoman("MCCCXXXV");
romanToArab(1335);

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
