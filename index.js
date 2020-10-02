const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const gameTime = document.querySelector('#game-time')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');

let score = 0;
let isGameStarted = false;

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide');
}

$start.addEventListener('click', startGame);
$game.addEventListener('click', hadleBoxClick)
gameTime.addEventListener('change', setGameTime)

function startGame() {
    score = 0;
    setGameTime();
    gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff';
    hide($start);
    let interval = setInterval(() => {
        let time = parseFloat($time.textContent)
        
        if(time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100)


    renderBox()
}


function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = +gameTime.value
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function endGame() {
    isGameStarted = false;
    setGameScore();
    show($start)
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    hide($timeHeader);
    show($resultHeader);
    gameTime.removeAttribute('disabled')
}

function hadleBoxClick(event) {
    if (!isGameStarted) {
        return
    }


    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function renderBox() {
    $game.innerHTML = '';
    const box = document.createElement('div');
    let boxSize = getRandom(30, 100)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.backgroundColor = '#000';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
