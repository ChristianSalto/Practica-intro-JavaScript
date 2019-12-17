let packOfcards = ["AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "TS", "JS", "QS", "KS", "AS",
    "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "TH", "JH", "QH", "KH", "AH",
    "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "TC", "JC", "QC", "KC", "AC",
    "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "TD", "JD", "QD", "KD", "AD"];

let stop = true;
let highC = [];

const poker = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8,
    "9": 9, "T": 10, "J": 11, "Q": 12, "K": 13, "A": 14
};

const player1 = {
    mano: [],
    play: "",
    value: 0,
    msj: "player1 wins by"
};

const player2 = {
    mano: [],
    play: "",
    value: 0,
    msj: "player2 wins by"
};

const secondPackOfcards = packOfcards.join('');

const removeAses = () => {
    for (let x = 0; x < packOfcards.length; x++) {
        if (x === 0 || x === 13 || x === 26 || x === 39) {
            packOfcards.splice(x, 1);
        }
    }
};

const handString = (hands) => {
    if (stop) {
        hands.push(player1.mano.join(''), player2.mano.join(''));
        for (let i = 0; i < 5; i++) {
            hands[0] = hands[0].replace(/[SHDC]/, '');
            hands[1] = hands[1].replace(/[SHDC]/, '');
        }

    } else {
        hands.push(player1.mano.join(''), player2.mano.join(''));
        for (let x = 0; x < 5; x++) {
            hands[0] = hands[0].replace(/[123456789TJQKA]/, '');
            hands[1] = hands[1].replace(/[123456789TJQKA]/, '');
        }
        stop = true;
        return hands;
    }
    stop = false;
    return hands;
}

const handGenerator = () => {
    let playCard = 0;
    let g = 52;
    for (let i = 0; i < 5; i++) {
        playCard = Math.floor(Math.random() * (g));
        player1.mano.push(packOfcards[playCard]);
        packOfcards.splice(playCard, 1);
        g--;
        playCard = Math.floor(Math.random() * (g));
        player2.mano.push(packOfcards[playCard]);
        packOfcards.splice(playCard, 1);
        g--;
    }
    straightFlush();
};

const straightFlush = () => {
    let gamester1 = player1.mano.join('');
    let gamester2 = player2.mano.join('');
    let g1 = new RegExp(gamester1);
    let g2 = new RegExp(gamester2);
    let test1 = g1.test(secondPackOfcards);
    let test2 = g2.test(secondPackOfcards);
    if (test1 === true) {
        player1.play = "straight flush";
    }
    if (test2 === true) {
        player2.play = "straight flush";
    }

    if (test1 === true && test2 === true) {
        if (gamester1[0] === "T" && gamester2[0] === "T") {
            return console.log(`Draw because both have the same play -> ${player1.play} ${player2.play}`);
        } else if (gamester1[0] === "T") {
            return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
        } else if (gamester2[0] === "T") {
            return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
        } else {
            if (gamester1[0] !== "A" && gamester1[0] > gamester2[0]) {
                return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
            } else {
                return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
            }
        }
    } else if (test1 === true) {
        return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
    } else if (test2 === true) {
        return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
    } else {
        fourOfAKind();
    }
};

const fourOfAKind = () => {
    //  player1.mano = ["2SAHACADAH"];
    //  player2.mano = ["2SQHQCQDQH"];
    let count = 1;
    let hands = [];
    hands = handString(hands);
    for (let x = 0; x < hands[0].length; x++) {
        if (hands[0][x] === hands[0][x + 1]) {
            count++
            if (count === 4) {
                player1.play = "poker";
                player1.value = poker[hands[0][1]];
            }
        }
    }
    count = 1;
    for (let x = 0; x < hands[1].length; x++) {
        if (hands[1][x] === hands[1][x + 1]) {
            count++
            if (count === 4) {
                player2.play = "poker";
                player2.value = poker[hands[1][1]];
            }
        }
    }

    if (player1.play === "poker" && player2.play === "poker") {
        if (player1.value > player2.value) {
            return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
        } else {
            return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
        }
    } else if (player1.play === "poker" && player2.play !== "poker") {
        return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
    } else if (player1.play !== "poker" && player2.play === "poker") {
        return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
    } else {
        fullHouse();
    }
};

const fullHouse = () => {
    flush();
}

const flush = () => {
    player1.mano = ["AS5S7SQS2S"];
    player2.mano = ["2HQH3H9HKH"];
    let count = 0;
    let handsColors = [];
    handsColors = handString(handsColors);

    for (let x = 0; x < handsColors[0].length; x++) {
        if (handsColors[0][x] === handsColors[0][x + 1]) {
            count++
            if (count === 5) {
                player1.play = "flush";

            }
        }
    }
    count = 1;
    for (let x = 0; x < handsColors[1].length; x++) {
        if (handsColors[1][x] === handsColors[1][x + 1]) {
            count++
            if (count === 5) {
                player2.play = "flush";

            }
        }
    }

    straight()
}

const straight = () => {

    threeOfAKind()
}

const threeOfAKind = () => {

    twoPairs()
}

const twoPairs = () => {

    pair()
}

const pair = () => {


}

const highCard = () => {
    let p1 = 0;
    let p2 = 0;
    let handPlayer1 = player1.mano.join('');
    let handPlayer2 = player2.mano.join('');
    for (let i = 0; i < 5; i++) {
        handPlayer2 = handPlayer2.replace(/[SHDC]/, '');
        handPlayer1 = handPlayer1.replace(/[SHDC]/, '');
    }
    for (let i of handPlayer1) {
        highC.push(poker[i]);
    }
    p1 = Math.max(...highC);
    player1.value = p1;
    highC = [];
    for (let x of handPlayer2) {
        highC.push(poker[x]);
    }
    p2 = Math.max(...highC);
    player2.value = p2;
}

removeAses();
handGenerator();




/*


### Cartas
Una carta se compone de dos cosas:

Palo (suit) que pueden ser los siguientes:
* picas/spades (S)
* corazones/hearts (H)
* tréboles/clubs (C)
* diamantes/diamonds (D).

Valor:
* 2
* 3
* 4
* 5
* 6
* 7
* 8
* 9
* 10 /Ten (T)
* dama/Jack (J)
* reina/Queen (Q)
* rey/King (K)
* as/Ace (A).

### Mano

Una mano es un conjunto de 5 cartas, estamos jugando con una baraja, por lo que no puede haber cartas repetidas.

Las manos de poker se ordenan de menor a mayor dependiendo de una serie de reglas asociadas a la mano.

* High Card (Carta Más Alta): Para manos que no entran en ninguna de las manos superior, el ganador es aquel que tiene la carta más alta. Si se produce un empate entonces se compara la siguiente carta más alta y así sucesivamente.

* Pair (Parejas): 2 de las 5 cartas de la mano tienen el mismo valor. Si las dos manos tienen pareja, entonces gana la que tenga la pareja más alta. Si ambas parejas son iguales entonces gana el que tenga la carta más alta.

* Two Pairs (Dobles Parejas): La mano contiene 2 parejas diferentes. Si las dos manos tienen dobles parejas diferentes entonces gana aquella que tenga la pareja más alta. Si las dos manos tienen las mismas parejas entonces se compara la otra pareja. Si ambas manos tiene las mismas parejas entonces gana el que tenga la carta más alta restante.

* Three of a Kind (Trio): 3 cartas de la mano tienen el mismo valor. Gana la mano que tiene las 3 cartas con mayor valor.

* Straight (Escalera): La mano contiene 5 cartas consecutivas. Si las dos manos tienen escalera entonces gana la que tiene la carta más alta.

* Flush (Color): La mano tiene 5 cartas con la misma cara. Si ambas manos tienen escalera entonces gana el que tenga la carta más alta.

* Full House (Full): La mano tiene un trío y una pareja. En caso de tener ambas manos full entonces gana el que tenga el trío más alto.

* Four of a Kind (Poker): 4 cartas con el mismo valor. En caso de tener ambas manos poker gana el que tenga el valor más alto.

* Straight flush (Escalera de Color): 5 cartas de la misma cara pero con valores consecutivos. En caso de tener escalera las dos manos entonces gana el que tenga el valor más alto.

### Ejemplos

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2C 3H 4S 8C AH
Salida: Jugador 2 gana, carta más alta:

Entrada: Jugador 1: 2H 4S 4C 2D 4H Jugador 2: 2S 8S AS QS 3S
Salida: Jugador 1 gana, escalera de color

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2C 3H 4S 8C KH
Salida: Jugador 1 gana, carta más alta

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2D 3H 5C 9S KH
Salida: Empate

*/