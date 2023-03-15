import './styles.css'

const boardWidth = 10;
const container = document.querySelector('.container');
const startButton = document.querySelector('.welcome-button');

startButton.addEventListener('click', (e) => {
    clearWelcomeScreen();
    createPregameScreen();
})


const clearWelcomeScreen = () => {
    let welcomeScreen = document.querySelector('.welcome-screen');
    welcomeScreen.remove();
}

const createPregameScreen = () => {

    let pregameContainer = document.createElement('div');
    pregameContainer.classList = 'pregame-container';

    let helpText = document.createElement('div');
    helpText.classList = 'help-text';
    helpText.innerText = 'Place your ships on the board'

    let shipsContainer = document.createElement('div');
    shipsContainer.classList = 'ships-container';
    
    for (let i = 1; i < 5; i++) {
        let ship = document.createElement('div');
        ship.classList.add('ship')
        ship.setAttribute('id', `${i}`)
        ship.style.height = `${i*20}px`
        ship.style.width = '20px'
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
    rotateButton.innerText = 'ROTATE'

    let playerBoard = document.createElement('div');
    playerBoard.classList = 'player-board';
    
    for (let i = 0; i < boardWidth * boardWidth; i++) {
        let field = document.createElement('div');
        field.classList = 'field';
        field.setAttribute('id', `${i}`)
        playerBoard.appendChild(field);
    }
    
    pregameContainer.appendChild(helpText)
    pregameContainer.appendChild(shipsContainer)
    pregameContainer.appendChild(rotateButton)
    pregameContainer.appendChild(playerBoard)
    container.appendChild(pregameContainer);
    startShipPlacement();
}


const startShipPlacement = () => {
    let dragged;
    let fields = Array.from(document.querySelectorAll('.field'))

    fields.forEach(field => field.addEventListener("dragover", (e) => {
          // prevent default to allow drop
          e.preventDefault();
        },
        false
      ));

    fields.forEach(field => field.addEventListener('dragenter', (e) => {
        e.target.classList.add('dragover');
    }))

    fields.forEach(field => field.addEventListener('dragleave', (e) => {
        setTimeout(() => {
            e.target.classList.remove('dragover');
        }, 100);
    }))
    
    fields.forEach(field => field.addEventListener('drop', (e) => {
        e.preventDefault();
        e.target.classList.remove('dragover');
        e.target.classList.add('ship');
        e.target.classList.add('ship1');
        console.log(field);
    }))


    let ships = Array.from(document.querySelectorAll('.ship'));
    ships.forEach(ship => ship.addEventListener('drag', (e) => {
        dragged = e.target;
    })) 
    ships.forEach(ship => ship.addEventListener('ondragstart', (e) => {
        return false
    }))

    let rotateButton = document.querySelector('.rotate-button')
    rotateButton.addEventListener('click', (e) => {
        rotateShips();
    })
}


let vertical = true;
const rotateShips = () => {
    let width;
    let height;
    let ships = Array.from(document.querySelectorAll('.ship'));
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


// clearWelcomeScreen();
// createPregameScreen();