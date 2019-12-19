let packOfcards = ["AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "TS", "JS", "QS", "KS", "AS",
    "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "TH", "JH", "QH", "KH", "AH",
    "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "TC", "JC", "QC", "KC", "AC",
    "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "TD", "JD", "QD", "KD", "AD"];

let stop = true;
let highC = [];
let p1 = "";
let p2 = "";

const poker = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "T": 10, "J": 11, "Q": 12, "K": 13, "A": 14
};

const player1 = {
    mano: [],
    play: "",
    value: 0,
    msj: "player1 wins by",
    deckStick: ""
};

const player2 = {
    mano: [],
    play: "",
    value: 0,
    msj: "player2 wins by",
    deckStick: ""
};

const secondPackOfcards = packOfcards.join('');

const threePackOfcards = ["A23456789TJQKA"];

const removeAses = () => {
    for (let x = 0; x < packOfcards.length; x++) {
        if (x === 0 || x === 13 || x === 26 || x === 39) {
            packOfcards.splice(x, 1);
        }
    }
};

const getKeys = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
};

const handSticks = (hands) => {
    let count = 1;
    hands.push(player1.mano.join(''), player2.mano.join(''));
    for (let x = 0; x < 5; x++) {
        hands[0] = hands[0].replace(/[123456789TJQKA]/, '');
        hands[1] = hands[1].replace(/[123456789TJQKA]/, '');
    }

    for (let x = 0; x < hands[0].length; x++) {
        if (hands[0][x] === hands[0][x + 1]) {
            count++
            if (count === 5) {
                player1.play = "flush";
            }
        }
    }
    count = 1;
    for (let x = 0; x < hands[1].length; x++) {
        if (hands[1][x] === hands[1][x + 1]) {
            count++
            if (count === 5) {
                player2.play = "flush";
            }
        }
    }

    return hands;
};

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
    player1.mano = ["4D", "4D", "7D", "7D", "7D"];
    player2.mano = ["3D", "8D", "3S", "8H", "8D"];
    p1 = ["4D", "4D", "7D", "7D", "7D"];
    p2 = ["JD", "8D", "JS", "JH", "8D"];
    straightFlush();
};

const orderCards = () => {
    let regExp = /2345A/;
    let trap1 = true;
    let trap2 = true;
    for (let i = 0; i < p1.length; i++) {
        p1[i] = p1[i].replace(/[SHDC]/, '');
        p1[i] = poker[p1[i]];
    }

    for (let i = 0; i < p2.length; i++) {
        p2[i] = p2[i].replace(/[SHDC]/, '');
        p2[i] = poker[p2[i]];
    }

    p1 = p1.sort(function (a, b) { return a - b; });
    p2 = p2.sort(function (a, b) { return a - b; });

    for (let i = 0; i < p1.length; i++) {
        p1[i] = getKeys(poker, p1[i]);
    }

    for (let i = 0; i < p2.length; i++) {
        p2[i] = getKeys(poker, p2[i]);
    }

    p1 = p1.join('');
    p2 = p2.join('');

    trap1 = regExp.test(p1);
    trap2 = regExp.test(p2);

    if (trap1 === true || trap2 === true) {
        if (trap1) {
            p1 = p1.replace(regExp, "A2345");
        } else {
            p2 = p2.replace(regExp, "A2345");
        }
    }
};

const straightFlush = () => {
    let tryColors = [];
    handSticks(tryColors);
    orderCards();
    highCard();
    let g1 = new RegExp(p1);
    let g2 = new RegExp(p2);
    let straight1 = g1.test(threePackOfcards);
    let straight2 = g2.test(threePackOfcards);

    if (straight1 === true && straight2 === true) {

        if (player1.play === "flush") {
            player1.play = "straight flush";
        }
        if (player2.play === "flush") {
            player2.play = "straight flush";
        }

        if (player1.play === "flush" && player2.play === "flush") {
            if (p1.charAt(0) === "T" && p2.charAt(0) === "T") {
                return console.log(`Draw because both have the same play -> ${player1.play} ${player2.play}`);
            } else if (p1.charAt(0) === "T") {
                return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
            } else if (p2.charAt(0) === "T") {
                return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
            } else {
                if (p1.charAt(0) === "A") {
                    return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
                } else if (p2.charAt(0) === "A") {
                    return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
                } else {
                    if (player1.value > player2.value) {
                        return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
                    } else {
                        return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
                    }
                }
            }
        } else {
            player1.play = "straight";
            player2.play = "straight";
            straight();
        }
    } else if (player1.play === "flush" && straight1 === true) {
        player1.play = "straight flush";
        return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
    } else if (player2.play === "flush" && straight2 === true) {
        player1.play = "straight flush";
        return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
    } else if (straight1 === true) {
        player1.play = "straight";
    } else if (straight2 === true) {
        player2.play = "straight";
    }

    fourOfAKind();
};

const fourOfAKind = () => {
    let count = 1;
    for (let x = 0; x < p1.length; x++) {
        if (p1[x] === p1[x + 1]) {
            count++
            if (count === 4) {
                if (p1.charAt(0) === p1.charAt(0 + 1)) {
                    player1.play = "fullHouse";
                    player1.value = poker[p1[2]];
                } else {
                    player1.play = "poker";
                    player1.value = poker[p1[1]];
                }
            }
        }
    }
    count = 1;
    for (let x = 0; x < p2.length; x++) {
        if (p2[x] === p2[x + 1]) {
            count++
            if (count === 4) {
                if (p2.charAt(0) === p2.charAt(0 + 1)) {
                    player2.play = "fullHouse";
                    player2.value = poker[p2[2]];
                } else {
                    player2.play = "poker";
                    player2.value = poker[p2[1]];
                }
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
    }
    fullHouse();
};

const fullHouse = () => {

    if (player1.play === "fullHouse" && player2.play === "fullHouse") {
        if (player1.value > player2.value) {
            return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
        } else {
            return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
        }
    } else if (player1.play === "fullHouse" && player2.play !== "fullHouse") {
        return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
    } else if (player1.play !== "fullHouse" && player2.play === "fullHouse") {
        return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
    }
    flush();
}

const flush = () => {
    let handsColors = [];
    handsColors = handSticks(handsColors);


    if (player1.play === "flush" && player2.play === "flush") {
        if (player1.value === player2.value) {
            return console.log(`Draw because both have the same play -> ${player1.play} to ${player1.deckStick}`)
        } else if (player1.value > player2.value) {
            return console.log(`${player1.msj} ${player1.play} -> ${player1.deckStick} -> ${player1.mano}`);
        } else if (player1.value < player2.value) {
            return console.log(`${player2.msj} ${player2.play} -> ${player2.deckStick} -> ${player2.mano}`);
        }
    } else if (player1.play === "flush" && player2.play !== "flush") {
        return console.log(`${player1.msj} ${player1.play} -> ${player1.deckStick} -> ${player1.mano}`);
    } else if (player1.play !== "flush" && player2.play === "flush") {
        return console.log(`${player2.msj} ${player2.play} -> ${player2.deckStick} -> ${player2.mano}`);
    } else {
        straight();
    }
}

const straight = () => {
    if (player1.play === "straight" && player2.play === "straight") {
        if (p1.charAt(0) === "A") {
            return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
        } else if (p2.charAt(0) === "A") {
            return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
        } else {
            if (player1.value > player2.value) {
                return console.log(`${player1.msj} ${player1.play} -> ${player1.mano}`);
            } else {
                return console.log(`${player2.msj} ${player2.play} -> ${player2.mano}`);
            }
        }
    }
    threeOfAKind();
}

const threeOfAKind = () => {

    twoPairs()
}

const twoPairs = () => {

    pair()
}

const pair = () => {
    player1.play = "highCard";
    player2.play = "highCard";
    highCard()
}

const highCard = () => {

    if (player1.play === "highCard" && player2.play === "highCard") {
        if (player1.value === player2.value) {
            return console.log(`Draw because both have the same play -> ${player1.play} to ${player1.deckStick}`)
        } else if (player1.value > player2.value) {
            return console.log(`${player1.msj} ${player1.play} -> ${player1.deckStick} -> ${player1.mano}`);
        } else if (player1.value < player2.value) {
            return console.log(`${player2.msj} ${player2.play} -> ${player2.deckStick} -> ${player2.mano}`);
        }
    }

    let h1 = 0;
    let h2 = 0;
    for (let i of p1) {
        highC.push(poker[i]);
    }
    h1 = Math.max(...highC);
    player1.value = h1;

    for (let x of p2) {
        highC.push(poker[x]);
    }
    h2 = Math.max(...highC);
    player2.value = h2;
    player1.deckStick = getKeys(poker, player1.value);
    player2.deckStick = getKeys(poker, player2.value);
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