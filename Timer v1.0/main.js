const startTimer = document.getElementById('button-start');
const stopTimer = document.getElementById('button-stop');
const resetTimer = document.getElementById('button-reset');
const display = document.getElementById('timer');
let currentCount = 0;
let countState = 0;

const updateTimerMs = () => {
    if(countState == 1) {
        currentCount = Number(currentCount);
        currentCount += 0.01;
        currentCount = currentCount.toFixed(2);
        console.log(currentCount)
        display.innerHTML = currentCount;
    }
}

startTimer.onclick = function() {
    if(countState == 0) {
        countState = 1;
        timer = setInterval(updateTimerMs, 10);
        startTimer.style.cursor = 'not-allowed';
    }
}

stopTimer.onclick = function() {
    clearInterval(timer);
    countState = 0;
    startTimer.style.cursor = 'pointer';
}

resetTimer.onclick = function() {
    clearInterval(timer);
    countState = 0;
    currentCount = 0;
    display.innerHTML = currentCount.toFixed(2);
    startTimer.style.cursor = 'pointer';
}

