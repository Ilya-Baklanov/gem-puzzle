import {createGame} from '../src/createGameBoard_3x3';

//ADD PAUSE MENU
//Create DOM element for button "Pause"
const header = document.querySelector('#header-wrapper');
const buttonPause = document.createElement('button');

//Add attribute for button "Pause"
buttonPause.classList.add('header__pause');
buttonPause.id = 'pause';
buttonPause.innerText = 'Pause'

//Append button "Pause" for header
header.appendChild(buttonPause);

//Create DOM element for Pause Menu
const body = document.querySelector('body');
const overlay = document.createElement('div');
const pauseMenu = document.createElement('div');
pauseMenu.classList.add('pause-menu');

//Create "New Game" button
const newGame = document.createElement('button');
newGame.classList.add('menu-item');
newGame.innerText = 'New Game';

//Create "Saved Game" button
const savedGames = document.createElement('button');
savedGames.classList.add('menu-item');
savedGames.innerText = 'Saved Game';

//Create "Load Game" button
const loadGame = document.createElement('button');
loadGame.classList.add('menu-item');
loadGame.innerText = 'Load Game';

//Create "Best Score" button
const bestScoreButton = document.createElement('button');
bestScoreButton.classList.add('menu-item');
bestScoreButton.innerText = 'Best Score';

//Adding buttons in menu
pauseMenu.appendChild(newGame);
pauseMenu.appendChild(savedGames);
pauseMenu.appendChild(loadGame);
pauseMenu.appendChild(bestScoreButton);

//Create Pause Menu
const createPauseMenu = () => {

//Add overlay
	overlay.classList.add('overlay');
	body.append(overlay);

//Add a list of menu items
	body.appendChild(pauseMenu);
  overlay.addEventListener('click', pauseMenuOff);
  sessionStorage.setItem('timerOn', false);
}

//Pause-menu ON
buttonPause.addEventListener('click', createPauseMenu)

//Create options for Select-menu
const selectMenu = document.createElement('select');
selectMenu.classList.add('select-menu');
const optionChildish = document.createElement('option');
optionChildish.innerText = '3x3...Pfff...';
optionChildish.value = '9';
const optionEasy = document.createElement('option');
optionEasy.innerText = '4x4 Well.....';
optionEasy.value = '16';
const optionMedium = document.createElement('option');
optionMedium.innerText = '5x5 So, OK...';
optionMedium.value = '25';
const optionHard = document.createElement('option');
optionHard.innerText = '6x6 Hmm, good!';
optionHard.value = '36';
const optionGenius = document.createElement('option');
optionGenius.innerText = '7x7 Serious?';
optionGenius.value = '49';
const optionCrazy = document.createElement('option');
optionCrazy.innerText = '8x8 Danila, are you crazy?!';
optionCrazy.value = '64';

//Adding options in Select-menu
selectMenu.appendChild(optionChildish);
selectMenu.appendChild(optionEasy);
selectMenu.appendChild(optionMedium);
selectMenu.appendChild(optionHard);
selectMenu.appendChild(optionGenius);
selectMenu.appendChild(optionCrazy);

//Create button "Go" in Select-menu
const newGameButton = document.createElement('button');
newGameButton.classList.add('new-game-button');
newGameButton.innerText = 'Go'

//Create Select-menu
const createSelectMenu = () => {
  body.replaceChild(selectMenu, pauseMenu);
  body.appendChild(newGameButton);
  overlay.addEventListener('click', selectMenuOff);
  selectMenu.addEventListener('change', () => {
    sessionStorage.setItem('sizeGameBoard', selectMenu.options[selectMenu.selectedIndex].value)
  })
}
newGame.addEventListener('click', createSelectMenu);

//Restart game
newGameButton.addEventListener('click', () => {
  overlay.classList.remove('overlay');
  let gameBoard = document.querySelector('#game-board');
	body.removeChild(gameBoard);
	let muteButton = document.querySelector('.mute');
	header.removeChild(muteButton);
  body.removeChild(selectMenu);
  body.removeChild(newGameButton);
  createGame();
  sessionStorage.setItem('timerOn', true);
	sessionStorage.setItem('newTimer', true);
	sessionStorage.setItem('steps', 0);
})

//Pause-menu OFF
const pauseMenuOff = () => {
  overlay.classList.remove('overlay');
  body.removeChild(body.lastChild);
  sessionStorage.setItem('timerOn', true);
};

//Select-menu OFF
const selectMenuOff = () => {
  overlay.classList.remove('overlay');
  body.removeChild(body.lastChild);
  sessionStorage.setItem('timerOn', true);
};

//Create "Best Score" menu
const bestScoreMenu = document.createElement('div');
bestScoreMenu.classList.add('best-score-menu');
//Best Time
const bestTimeWrapp = document.createElement('div');
bestTimeWrapp.classList.add('best-time-wrapper');
const bestTimeTitle = document.createElement('h2');
bestTimeTitle.classList.add('best-time-title');
bestTimeTitle.innerText = 'Best Time'
const bestTimeList = document.createElement('ol');
bestTimeList.classList.add('best-time-list')
for(let i = 1; i < 11; i++){
	const bestTimeListItem = document.createElement('li');
	bestTimeListItem.innerText = localStorage.getItem(`bestTime-${i}`);
	bestTimeList.appendChild(bestTimeListItem);
}
bestTimeWrapp.appendChild(bestTimeTitle);
bestTimeWrapp.appendChild(bestTimeList);

//Best Step
const bestStepWrapp = document.createElement('div');
bestStepWrapp.classList.add('best-step-wrapper');
const bestStepTitle = document.createElement('h2');
bestStepTitle.classList.add('best-step-title');
bestStepTitle.innerText = 'Best Step'
const bestStepList = document.createElement('ol');
bestStepList.classList.add('best-step-list')
for(let i = 1; i < 11; i++){
	const bestStepListItem = document.createElement('li');
	bestStepListItem.innerText = localStorage.getItem(`bestAmountSteps-${i}`);
	bestStepList.appendChild(bestStepListItem);
}
bestStepWrapp.appendChild(bestStepTitle);
bestStepWrapp.appendChild(bestStepList);

//Create "Go Back" button
const goBack = document.createElement('button');
goBack.classList.add('go-back-button')
goBack.innerText = 'Go Back';
goBack.addEventListener('click', () => {
	body.replaceChild(pauseMenu, bestScoreMenu);
	body.removeChild(goBack);
})

//Append Best Score Menu
bestScoreMenu.appendChild(bestTimeWrapp);
bestScoreMenu.appendChild(bestStepWrapp);
const createBestScoreMenu = () => {
  body.replaceChild(bestScoreMenu, pauseMenu);
  body.appendChild(goBack);
  overlay.addEventListener('click', selectMenuOff);
};
bestScoreButton.addEventListener('click', createBestScoreMenu);

//Create save-game
savedGames.addEventListener('click', () => {
	localStorage.setItem('FlowGemPuzzle', sessionStorage.getItem('gameBoardFlow'));
	localStorage.setItem('TimeGemPuzzle', sessionStorage.getItem('time'));
	localStorage.setItem('StepsGemPuzzle', sessionStorage.getItem('steps'));
});

//Create loading-game
loadGame.addEventListener('click', () => {
  let gameBoard = document.querySelector('#game-board');
	body.removeChild(gameBoard);
	let muteButton = document.querySelector('.mute');
	header.removeChild(muteButton);
	pauseMenuOff();
	localStorage.setItem('LoadGame', true);
	sessionStorage.setItem('steps', localStorage.getItem('StepsGemPuzzle'));
  createGame();
});
