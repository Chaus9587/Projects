const container = document.getElementById('container');
let delayGreen, delayRetry, timerStart, timerEnd, reactionTime_ms;
let pbTime_ms = 0;

const main = () => {
    container.removeEventListener('click', main); // Disabled after clicking

    document.getElementById('container').style.backgroundColor = '#DF6161' // Change background color to red
    document.getElementById('content').innerText = 'Click when the background turn green';
    container.addEventListener('click', checkMisclick); // Check Misclick
    let randomWaitTime = ((Math.random() * 2) + 1.5) * 1000;
    delayGreen = setTimeout(() => {
        document.getElementById('container').style.backgroundColor = '#55B914'
        container.removeEventListener('click', checkMisclick); // Remove the misclicker listener when the screen turn green
        container.addEventListener('click', checkActualClick);
        timerStart = performance.now();
    }, randomWaitTime)
}

const checkMisclick = () => {
    container.removeEventListener('click', checkMisclick); // Disabled after clicking
    clearTimeout(delayGreen); // Prevent the bg color turning green
    document.getElementById('container').style.backgroundColor = '#234567'
    document.getElementById('content').innerText = 'You clicked too early';
    delayRetry = setTimeout(() => {
        init();
    }, 750);
}

const checkActualClick = () => {
    container.removeEventListener('click', checkActualClick); // Disabled after clicking
    document.getElementById('container').style.backgroundColor = '#234567';
    timerEnd = performance.now();
    reactionTime_ms = Math.round(timerEnd - timerStart);
    if(reactionTime_ms < pbTime_ms || pbTime_ms == 0) {
        pbTime_ms = reactionTime_ms;
        document.getElementById('pb').innerHTML = `Personal Best: ${pbTime_ms}ms`;
    }
    document.getElementById('content').innerHTML = `Your reaction time: ${reactionTime_ms} ms`;
    delayRetry = setTimeout(() => {
        init();
    }, 1000);
}

const init = () => {
    document.getElementById('content').innerHTML = 'Click anywhere to begin';
    container.addEventListener('click', main);
}

window.onload = init();
