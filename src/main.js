import './styles.css'

const boardWidth = 10;
const container = document.querySelector('.container');
const startButton = document.querySelector('.welcome-button');
let vertical = true;
let dragged;


startButton.addEventListener('click', () => {
    clearWelcomeScreen();
    createPregameScreen();
})

const clearWelcomeScreen = () => {
    let welcomeScreen = document.querySelector('.welcome-screen');
    welcomeScreen.remove();
}

const createPregameScreen = () => {
    let gameContainer = document.createElement('div');
    gameContainer.classList = 'game-container';

    let helpText = document.createElement('div');
    helpText.classList = 'help-text';
    helpText.innerText = 'Place your ships on the board'

    let shipsContainer = document.createElement('div');
    shipsContainer.classList = 'ships-container';
    
    for (let i = 1; i < 5; i++) {
        let ship = document.createElement('div');
        ship.classList.add('ship');
        ship.classList.add('movable');
        ship.setAttribute('id', `${i}`);
        ship.style.height = `${i*20}px`;
        ship.style.width = '20px';
        ship.draggable = true;
        if (i == 2) {
            shipsContainer.appendChild(ship);
            // cloneNode needed to add 2nd time #2 ship
            shipsContainer.appendChild(ship.cloneNode(true));
        } else {
            shipsContainer.appendChild(ship);
        }
    }

    let rotateButton = document.createElement('button');
    rotateButton.classList = 'rotate-button';
    rotateButton.innerText = 'ROTATE';

    let board = document.createElement('div');
    board.classList = 'board';
    board.setAttribute('id', 'playerBoard');
    
    for (let i = 0; i < boardWidth * boardWidth; i++) {
        let field = document.createElement('div');
        field.classList = 'field';
        field.setAttribute('id', `${i}`);
        board.appendChild(field);
    }
    
    gameContainer.appendChild(helpText);
    gameContainer.appendChild(shipsContainer);
    gameContainer.appendChild(rotateButton);
    gameContainer.appendChild(board);
    container.appendChild(gameContainer);
    startShipsPlacement();
}

const startShipsPlacement = () => {
    let fields = Array.from(document.querySelectorAll('.field'));

    fields.forEach(field => field.addEventListener("dragover", (e) => {
          // prevent default to allow drop
          e.preventDefault();
        },
        false
      ));

    fields.forEach(field => field.addEventListener('dragenter', (e) => {
        findAndMark(e, fields)
    }))

    fields.forEach(field => field.addEventListener('dragleave', (e) => {
        setTimeout(() => {
            findAndMark(e, fields)
        }, 100);
    }))
    
    fields.forEach(field => field.addEventListener('drop', (e) => {
        e.preventDefault();
        findAndMark(e, fields);
        let correct = findAndMark(e, fields, true);
        if (correct) {
            dragged.remove();
            placeShip(dragged.id)
        }
        // check initial ships if we can start next phase
        let shipsToPlace = Array.from(document.querySelectorAll('.ships-container > .ship'));
        if (!shipsToPlace.length) {
            finishPreGame();
        }
    }))


    let ships = Array.from(document.querySelectorAll('.ship'));
    ships.forEach(ship => ship.addEventListener('drag', (e) => {
        dragged = e.target;
    })) 


    let rotateButton = document.querySelector('.rotate-button');
    rotateButton.addEventListener('click', (e) => {
        rotateShips();
        // console.log('vertical '+vertical);
    })
}

const findAndMark = (e, fields, drop = false) => {
    let fieldId = e.target.id;
    let shipLength = dragged.id;
    let markFields = [];
    if (vertical) {
        for (let i = 0; i < shipLength; i++) {
            let nextFieldId = Number(fieldId) + 10*i;
            markFields.push(nextFieldId);
        }
    } else {
        for (let i = 0; i < shipLength; i++) {
            let nextFieldId = Number(fieldId) + 1*i;
            markFields.push(nextFieldId);
        }
    }
    let correctPlacement = checkPlacement(markFields);
    // console.log('correct placemenet '+ correctPlacement)
    if (!correctPlacement) {
        return false;
    } 
    markFields.forEach(markField => {
            let field = fields[markField]
            if (drop) {
                field.classList.add('ship')
                field.classList.remove('movable')
            } else {
                field.classList.toggle('dragover');
            }
    });
    return true;
}

const rotateShips = () => {
    let width;
    let height;
    let ships = Array.from(document.querySelectorAll('.ships-container > .ship'));
    for (let i = 0; i < ships.length; i++) {
        if (vertical) {
            width = ships[i].id * 20;
            ships[i].style.width = `${width}px`;
            ships[i].style.height = '20px';
            if (i+1 == ships.length) {
                vertical = false;
            }
        } else {
            height = ships[i].id * 20;
            ships[i].style.height = `${height}px`;
            ships[i].style.width = '20px';
            if (i+1 == ships.length) {
                vertical = true;
            }
        }
    }
}

let playerShips = [];
let computerShips = [];

class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.hit = () => {
            this.hits += 1;
        };
        this.isSunk = () => {
            return this.hits == this.length ? true : false;
        };
    }
}

const placeShip = (shipLength, player = true) => {
    let ship = new Ship(shipLength);
    if (player) {
        playerShips.push(ship);
    } else {
        computerShips.push(ship);
    }
}

const checkPlacement = (fieldsId, player = true) => {
    if (!fieldsId.every((fieldId) => fieldId < 100)) {
        return false
    } 
    // check for horizontal ships, if fieldId divided by 10 gives 0 in division remainder
    // it means we're crossing the edge of board
    if (!vertical) {
        if (fieldsId[0] == 0) {
            return true;
        }
        else
         if (!fieldsId.every((fieldId) => fieldId % 10 != 0)) {
            return false
        }
    }
    let board;
    if (player) {
        board = document.getElementById('playerBoard')
    } else {
        board = document.getElementById('computerBoard');
    }
    let fields = Array.from(board.querySelectorAll('.ship'));
    if (!fields.length) {
        return true
    } else {
        let fieldNotBusy = true;
        fieldsId.forEach(fieldId => {
            if (fields.find((field) => field.id == fieldId)) {
                fieldNotBusy = false;
            } 
        });
        if (!fieldNotBusy) {
            return false;
        }
    }
    return true;
}

const finishPreGame = () => {
    let shipsContainer = document.querySelector('.ships-container');
    let helpText = document.querySelector('.help-text')
    let rotateButton = document.querySelector('.rotate-button')
    shipsContainer.remove()
    helpText.remove()
    rotateButton.remove()
    createComputerBoard();
    createComputerShips();
    placeComputerShips();
}

const createComputerBoard = () => {
    let gameContainer = document.querySelector('.game-container');

    let computerBoard = document.createElement('div');
    computerBoard.classList = 'board';
    computerBoard.setAttribute('id', 'computerBoard');
    
    for (let i = 0; i < boardWidth * boardWidth; i++) {
        let field = document.createElement('div');
        field.classList = 'field';
        field.setAttribute('id', `${i}`);
        computerBoard.appendChild(field);
    }
    gameContainer.classList.add('orientation');
    gameContainer.append(computerBoard);
}

const createComputerShips = () => {
    for (let i = 1; i < 5; i++) {
        if (i == 2) {
            placeShip(false, i);
            placeShip(false, i);
        } else {
            placeShip(false, i);
        }
    }
}

const placeComputerShips = () => {
    for (let i = 1; i < 5; i++) {
        let randomVertical = Math.random() < 0.5;
        let startField = Math.floor(Math.random() * 100);
        console.log('startField '+startField);
        console.log('i '+ i);
        let shipCords = calcShipFields(startField, i, randomVertical);
        shipCords.forEach(shipCord => {
            let board = document.querySelector('#computerBoard');
            let field = board.getElementsByTagName('div')[shipCord];
            field.classList.add('ship');
        });
        if (i == 2) {
            startField = Math.floor(Math.random() * 100);
            shipCords = calcShipFields(startField, i, randomVertical);
            shipCords.forEach(shipCord => {
                let board = document.querySelector('#computerBoard');
                let field = board.getElementsByTagName('div')[shipCord];
                field.classList.add('ship');
            });
        } 
    }

}

const calcShipFields = (startField, i, vertical) => {
    let fields = [];
    if (vertical) {
        for (let j = 0; j < i; j++) {
            let nextFieldId = startField + 10*j;
            fields.push(nextFieldId);
        }
    } else {
        for (let j = 0; j < i; j++) {
            let nextFieldId = startField + 1*j;
            fields.push(nextFieldId);
        }
    }
    let correctPlacement = checkPlacement(fields, false);
    console.log('correct placemenet '+ correctPlacement)
    console.log('fields');
    console.log(fields);
    if (!correctPlacement) {
        let startField = Math.floor(Math.random() * 100);
        calcShipFields(startField, i, vertical)
    }
    return fields
}