const cpsButton = document.getElementById("cps-button");
const displayTime = document.getElementById("displayTime");
const displayClicks = document.getElementById("clicks");
let timerStart, timerCurrent_ms, timerCurrent_secs, cps, clicks, countTime, countState;

function init() {
    cpsButton.innerHTML = "Click me to start";
    displayTime.innerHTML = "Timer: 0.0";
    displayClicks.innerHTML = "Clicks: 0";
    clicks = 0;
    countState = true;
}

function countTimeCps(count_secs) {
    if(clicks == 0) {
        timerStart = performance.now();
        timerStart = Number(timerStart.toFixed(2));
        // Timer and click counter
        countTime = setInterval(() => {
            timerCurrent_ms = performance.now() - timerStart;
            timerCurrent_ms = Number(timerCurrent_ms.toFixed(2))
            timerCurrent_secs = timerCurrent_ms / 1000;
            displayTime.innerHTML = `Timer: ${timerCurrent_secs.toFixed(1)}`; // Display timer round to 2 decimal place (Note: toFixed() returns string type)

            if(timerCurrent_secs >= count_secs) {
                clearInterval(countTime);
                countState = false;
                cps = clicks / Math.round(timerCurrent_secs);
                cps = Number(cps.toFixed(1));
                saveRecord(cps, count_secs);
                cpsButton.innerHTML = `CPS: ${cps}`;
                setTimeout(() => {
                    init();
                }, 1250)
            }
        }, 1);
    }
    if(countState == true) {
        clicks += 1;
        displayClicks.innerHTML = `Clicks: ${clicks}`; // Display current click count when the button is clicked
    }
}

function saveRecord(cps, test_secs) {
    time = new Date();
    localStorage.setItem(`CPS_${localStorage.length}`, JSON.stringify(
        {
            date: `Date: ${time.getDay()}/${time.getMonth() + 1}/${time.getFullYear()}, Time: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            test_duration: test_secs,
            cps: cps
        }
    ))
}

window.onload = init();
