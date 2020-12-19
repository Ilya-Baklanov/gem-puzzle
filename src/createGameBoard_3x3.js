sessionStorage.setItem('sizeGameBoard', 9)
sessionStorage.setItem('steps', 0);

//Create Best Score
if(localStorage.getItem('bestTime') === null){
	localStorage.setItem('bestTime', 0);
}
if(localStorage.getItem('bestAmountSteps') === null){
	localStorage.setItem('bestAmountSteps', 0);
}
let bestTime = localStorage.getItem('bestTime').split(',');
let bestAmountSteps = localStorage.getItem('bestAmountSteps').split(',');

//Create game
const createGame = () => {
	let sizeGameBoard = Number(sessionStorage.getItem('sizeGameBoard'));
	let gameBoardFlow = [];
	let arrTemp = [];

//Create chip-Index for Game Board
	const createGameBoardFlow = () => {
		if(gameBoardFlow.length === Math.sqrt(sizeGameBoard) - 1 && arrTemp.length === Math.sqrt(sizeGameBoard) - 1){
			arrTemp.push(0);
			gameBoardFlow.push(arrTemp);
			return gameBoardFlow;
		}
		let chipIndRand = Math.floor(Math.random() * sizeGameBoard);
		if(gameBoardFlow.flat().includes(chipIndRand) || chipIndRand === 0 || arrTemp.includes(chipIndRand)){
			createGameBoardFlow();
		} else {
			arrTemp.push(chipIndRand)
			if(arrTemp.length === Math.sqrt(sizeGameBoard)){
				gameBoardFlow.push(arrTemp);
				arrTemp = [];
			}
			createGameBoardFlow();
		}
	}
	createGameBoardFlow();

//Checking solution for puzzle
	let inversionCounter = 0;
	for(let i = 0; i < gameBoardFlow.flat().length - 2; i++){
		for(let j = i + 1; j < gameBoardFlow.flat().length - 1; j++){
			if(gameBoardFlow.flat()[i] > gameBoardFlow.flat()[j]){
				inversionCounter += 1;
			}
		}
	};
	if(inversionCounter % 2 !== 0){
		return createGame();
	}

//Create Game Board
  let gameBoard = document.createElement('section');
  gameBoard.classList.add('game-board');
	gameBoard.id = 'game-board';
  const createGameBoard = () => {
		let gamePlayFlow = gameBoardFlow;

//Function for find chip position in gameboard
    const findChipPosition = (chip) => {
			let chipPosition = {
				row: 0,
				ind: 0,
			}
			gamePlayFlow.forEach((item, index) => {
				if(item.indexOf(+chip.id) !== -1){
					chipPosition['ind'] = item.indexOf(+chip.id);
					chipPosition['row'] = index;
				}
			})
			return chipPosition;
		}

//Create Step-counter
    let steps = sessionStorage.getItem('steps');
		let stepCounter = document.querySelector('.step-counter');
		stepCounter.innerText = `Steps: ${steps}`;

//Setting sound
    let soundOn = true;
		const sound = (typeAudio) => {
			if(soundOn === true){
				let audio = document.querySelector(`.${typeAudio}`);
				setTimeout(audio.pause(), 250);
				audio.play();
			}
		}
		let muteButton = document.createElement('button');
		muteButton.classList.add('mute');
		muteButton.innerText = 'Mute';
		document.querySelector('.header-wrapper').appendChild(muteButton);
		muteButton.addEventListener('click', () => {
			soundOn = !soundOn;
			muteButton.classList.toggle('mute-active');
		});

//Change position chip and rules changing
    const changePosition = (chip) => {
      let emptyChip = document.querySelector('.empty');
      let emptyPosRow = findChipPosition(emptyChip).row;
      let chipPosRow = findChipPosition(chip).row;
      let emptyPosInd = findChipPosition(emptyChip).ind;
      let chipPosInd = findChipPosition(chip).ind;
      let top = emptyPosRow === chipPosRow + 1 && emptyPosInd === chipPosInd ? true : false;
      let bottom = emptyPosRow === chipPosRow - 1 && emptyPosInd === chipPosInd ? true : false;
      let left = emptyPosRow === chipPosRow && emptyPosInd === chipPosInd + 1 ? true : false;
			let right = emptyPosRow === chipPosRow && emptyPosInd === chipPosInd - 1 ? true : false;

//Change full end empty places
      if(top | bottom | left | right){
				sound('success');
        emptyChip.innerText = chip.innerText;
        emptyChip.id = chip.innerText;
        chip.innerText = '';
        chip.id = '0';
        emptyChip.classList.replace('empty', 'full');
        chip.classList.replace('full', 'empty');
				steps ++;
				sessionStorage.setItem('steps', steps);
				stepCounter.innerText = `Steps: ${steps}`;
				localStorage.setItem('LoadGame', false);
			} else {
				sound('miss');
			}

//Defining the sequence of chip
      let allChip = document.querySelectorAll('.chip');
			gamePlayFlow = [];
			let arrTemp = [];
			allChip.forEach(item => {
				arrTemp.push(+item.id)
				if(arrTemp.length === Math.sqrt(sizeGameBoard)){
					gamePlayFlow.push(arrTemp);
					arrTemp = [];
				}
			})
			sessionStorage.setItem('gameBoardFlow', gamePlayFlow);
      let currentSequence = gamePlayFlow.flat().slice(0, sizeGameBoard - 1).join('');
			let winningSequence = gamePlayFlow.flat().sort((a,b) => a - b).slice(1, sizeGameBoard).join('');

//Compare current & winning sequence, winning action
      if(currentSequence === winningSequence){
        setTimeout(() => {
					sound('win');
					sessionStorage.setItem('timerOn', false);
					let time = sessionStorage.getItem('time');
					alert(`Ура! Вы решили головоломку за ${time} и ${steps} ходов`);

//Converting time in seconds
					const convertingTime = (time) => {
						let timeInSec = 0;
						time.split(':').forEach((item, index) => {
							if(index === 0){
								timeInSec += +item * 3600;
							} else if(index === 1){
								timeInSec += +item * 60;
							} else {
								timeInSec += +item;
							}
						})
						return timeInSec;
					}

//Fill best score arrays
					bestTime.push(time);
					if(bestTime.length > 1){
						bestTime.sort((a, b) => convertingTime(a) - convertingTime(b));
					}
					localStorage.setItem('bestTime', bestTime);
					bestAmountSteps.push(steps);
					if(bestAmountSteps.length > 1){
						bestAmountSteps.sort((a, b) => a - b);
					}
					localStorage.setItem('bestAmountSteps', bestAmountSteps);

//Save best score in localStorage
					for(let i = 0; i < 11; i++){
						if(bestTime[i] === undefined){
							localStorage.setItem(`bestTime-${i}`, 0);
						} else {
							localStorage.setItem(`bestTime-${i}`, bestTime[i]);
						}
					}
					console.log(bestAmountSteps)
					for(let i = 0; i < 11; i++){
						if(bestAmountSteps[i] === undefined){
							localStorage.setItem(`bestAmountSteps-${i}`, 0);
						} else {
							localStorage.setItem(`bestAmountSteps-${i}`, bestAmountSteps[i]);
						}
					}
					document.body.removeChild(gameBoard);
					document.querySelector('.header-wrapper').removeChild(muteButton);
					sessionStorage.setItem('timerOn', true);
					sessionStorage.setItem('newTimer', true);
					sessionStorage.setItem('steps', 0);
					stepCounter.innerText = `Steps: ${0}`;
					createGame();
				}, 250);
			};
			let arr
		};

//Adding chip
		if(localStorage.getItem('LoadGame') === 'true'){
			gameBoardFlow = localStorage.getItem('FlowGemPuzzle').split(',');
		}
    gameBoardFlow.flat().forEach((item, index) => {
			let chip = document.createElement('div');
			chip.style.width = `calc((100% / ${Math.sqrt(sizeGameBoard)}) - 2px)`;
			chip.style.order = `${index + 1}`;
			if(+item === 0){
				chip.classList.add('chip', 'empty');
				chip.setAttribute('id', `${+item}`);
			} else{
				chip.classList.add('chip', 'full');
				chip.innerText = +item;
				chip.setAttribute('id', `${+item}`);
			}
			gameBoard.appendChild(chip);
			chip.addEventListener('click', () => {
				changePosition(chip);
			});
    });
	};
//Set gameboard
  createGameBoard();
  document.body.appendChild(gameBoard);
};
createGame();
export {createGame};
