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


