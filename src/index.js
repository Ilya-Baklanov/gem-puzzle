import '../src/addTimer.js';
import '../src/addPauseMenu.js';
import '../src/createGameBoard_3x3.js';
import '../src/style.css';
import Icon from '../src/assets/Brain_Icon.ico';

const linkIcon = document.createElement('link');
linkIcon.rel = 'shortcut icon';
linkIcon.href = Icon;
document.querySelector('#head').appendChild(linkIcon);
