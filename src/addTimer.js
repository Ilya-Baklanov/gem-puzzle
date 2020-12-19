sessionStorage.setItem('timerOn', true);

//ADD TIMER
//Create DOM elements

let headerWrapper = document.querySelector('#header-wrapper');
let time = document.createElement('time');
time.class = 'header__time';
time.id = 'header__time';
let hour = 0;
let min = 0;
let sec = 0;

//Function for counting time
const showTime = () =>{
	let timerOn = sessionStorage.getItem('timerOn');
	if(sessionStorage.getItem('newTimer') === 'true'){
		sessionStorage.setItem('newTimer', false);
		hour = 0;
		min = 0;
		sec = 0;
	} else if(localStorage.getItem('LoadGame') === 'true'){
		let loadTime = localStorage.getItem('TimeGemPuzzle');
		hour = +loadTime.substring(0, 2);
		min = +loadTime.substring(3, 5);
		sec = +loadTime.substring(6, 8);
		localStorage.setItem('LoadGame', false)
	}
	if(timerOn === 'true'){
		time.innerText = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
		sessionStorage.setItem('time', `${time.innerText}`);
		sec++;
		if(sec === 60){
			sec = 0;
			++min;
		}
		if(min === 60){
			min = 0;
			++hour;
		}
	}
}
timer = setInterval(showTime, 1000)

//Add zero for digits in timer
let addZero = (n) => {
  return (n < 10 ? '0' : '') + n;
}

//Append timer in Header
headerWrapper.appendChild(time);
