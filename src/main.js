import './styles.css'

const startButton = document.querySelector('.welcome-button');

startButton.addEventListener('click', (e) => {
    console.log(e.target);
    clearWelcomeScreen();
})

const clearWelcomeScreen = () => {
    let welcomeScreen = document.querySelector('.welcome-screen');
    welcomeScreen.remove();
}

const createPregameBoard = () => {
    
}