const numberRandom = Math.floor(Math.random() * (100 - 1)) + 1;
let value = 1;
let stringWords = "";
let whyStringWords = "";
const listFooBarQuix = ["Foo", "Bar", "Quix"];
const whyFooBarQuix = [" divisible por 3,", " divisible por 5,", " divisible por 7,",
    " contiene el 3,", " contiene el 5,", " contiene el 7"];

let fooBarQuix = numberRandom => {

    for (value; value < numberRandom; value++) {

        if (value % 3 === 0) {
            stringWords += listFooBarQuix[0];
            whyStringWords += whyFooBarQuix[0];
        }

        if (value % 5 === 0) {
            stringWords += listFooBarQuix[1];
            whyStringWords += whyFooBarQuix[1];
        }

        if (value % 7 === 0) {
            stringWords += listFooBarQuix[2];
            whyStringWords += whyFooBarQuix[2];
        }

        howManyNumber(value);

        if (stringWords === "") {
            console.log(`${value} -> ${value}`);
        } else {
            console.log(`${value} -> ${stringWords} -> ${whyStringWords}`);
            whyStringWords = "";
            stringWords = "";
        }

    }
}

let howManyNumber = value => {
    let valueString = value.toString();

    for (let i = 0; i < valueString.length; i++) {
        switch (valueString[i]) {
            case "3":
                stringWords += listFooBarQuix[0];
                whyStringWords += whyFooBarQuix[3]
                break;
            case "5":
                stringWords += listFooBarQuix[1];
                whyStringWords += whyFooBarQuix[4]
                break
            case "7":
                stringWords += listFooBarQuix[2];
                whyStringWords += whyFooBarQuix[5];
                break;
        }
    }
}

fooBarQuix(numberRandom);


/*

Nos dan un número entre el 1 y 100, y tenemos que devolver por orden lo siguiente:

* Si el número es divisible por 3, escribiremos “Foo” en lugar del número
* Si el número es divisible por 5, añadimos “Bar”
* Si el número es divisible por 7, añadimos “Quix”.
* Por cada dígito 3,5 o 7, añadiremos “Foo”, “Bar”, “Quix” respectivamente y en orden de aparición.

### Ejemplos:

* 1  -> 1
* 2  -> 2
* 3  -> FooFoo (divisible por 3, contiene 3)
* 4  -> 4
* 5  -> BarBar (divisible por 5, contains 5)
* 6  -> Foo (divisible por 3)
* 7  -> QuixQuix (divisible por 7, contiene 7)
* 8  -> 8
* 9  -> Foo
* 10 -> Bar
* 13 -> Foo
* 15 -> FooBarBar (divisible por 3, divisible por 5, contiene 5)
* 21 -> FooQuix
* 33 -> FooFooFoo (divisible por 3, contiene 3)
* 51 -> FooBar
* 53 -> BarFoo
* 75 -> FooBarQuixBar(divisible por 3, divisible por 5, contiene un 7, contiene un 5)

*/