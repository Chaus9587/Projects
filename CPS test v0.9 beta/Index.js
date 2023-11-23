const buttonStart = document.querySelector(".button1");
const buttonRetry = document.querySelector(".button2");
const clickCount = document.querySelector(".clickCount");
const display = document.querySelector(".timer");
const showRecord = document.querySelector(".showRecords");

let count, timer, clickAvailable, cps, time;
let currentCount = 0;
let record = new Map()
console.log(`For developers only.`)

const init = () => {
    count = 0;
    currentCount = 0;
    clickCount.innerHTML = 'Clicks: 0';
    display.innerHTML = 'Time: 0.00';
    clickAvailable = true;
    buttonStart.innerHTML = 'Click me to start!';
    getAllRecord()
    
}

const start = () => {
    if(count == 0) {
        setTimeout(countCPS, 5000);
        timer = setInterval(countTime, 10);
    }
    if(clickAvailable) {
        count += 1;
        buttonStart.innerHTML = `Keep clicking!`
    }
    clickCount.innerHTML = `Clicks: ${count}`;
}

const countTime = () => {
    currentCount = Number(currentCount);
    currentCount += 0.01;
    currentCount = currentCount.toFixed(2);
    display.innerHTML = `Time: ${currentCount}`;
}

const countCPS = () => {
    time = new Date();
    clearInterval(timer);
    clickAvailable = false;
    cps = count / 5;
    buttonStart.innerHTML = `CPS: ${cps}`
    setTimeout(init, 1500);
    localStorage.setItem(`CPS_record_${localStorage.length + 1}`, JSON.stringify({
        key: `CPS_record_${localStorage.length + 1}`,
        date_ms: time.getTime(),
        cps: cps
    }));
    getAllRecord();
    
}

const getAllRecord = () => {
    showRecord.innerHTML = "";
    let currentData, parsedData;
    for(i = 0; i < localStorage.length; i++) {
        currentData = localStorage.getItem(`CPS_record_${i + 1}`);
        if(currentData == null) {
            continue;
        }
        parsedData = JSON.parse(currentData);
        if(i >= localStorage.length - 5) {
            fullDate = new Date(parsedData.date_ms);
            console.log(typeof fullDate);
            hours = fullDate.getHours();
            mins = fullDate.getMinutes();
            secs = fullDate.getSeconds();
            days = fullDate.getDate();
            months = fullDate.getMonth() + 1;
            years = fullDate.getFullYear();
            if(hours < 10 ? hours = '0' + hours : hours);
            if(mins < 10 ? mins = '0' + mins : mins);
            if(secs < 10 ? secs = '0' + secs : secs);
            convertedDate = `${hours}:${mins}:${secs} ${days}/${months}/${years}`;
            showRecord.innerHTML += `Date: ${convertedDate}, CPS: ${parsedData.cps}`+ "<br><br>";
        }
        
    }
    
    /*
    for(j = 0; j < dataArr.length; j++) {
        if(dataArr[j+1] == undefined) {
            console.log(dataArr);
            return 0;
        }
        else {
            let a = JSON.parse(dataArr[j]).cps;
            let b = JSON.parse(dataArr[j+1]).cps;
            console.log(typeof a, typeof b);
            dataArr.sort((a = JSON.parse(dataArr[j]).cps, b = JSON.parse(dataArr[j+1]).cps) => b - a);
            console.log(dataArr);
        }
        
    }
    */
    
    /*
    let currentRecord, parsedCurrentRecordValue;
    for(i = 0; i < localStorage.length; i++) {
        currentRecord = localStorage.key(i);
        parsedCurrentRecordValue = JSON.parse(localStorage.getItem(currentRecord));
        if(typeof parsedCurrentRecordValue.key == 'undefined') { // Test if currentRecord contain key value in the JSON string
            console.log(`${currentRecord} is not related.`)
        }
        else {
            if(currentRecord !== parsedCurrentRecordValue.key) { // Test if key in the localStorage matches the key in the JSON string
                console.log(`${currentRecord} does not have a valid key.`);
            }
            else {
                if(typeof parsedCurrentRecordValue.cps == 'undefined') { // Check the validity of cps object in JSON string
                    console.log(`${currentRecord} does not contain a cps value.`)
                }
                else {
                    console.log(parsedCurrentRecordValue)
                    
                }
            }
        }
    }
    */
}

const sortMap = () => {
    /*
    let convertedDate, fullDate, nextValue, hours, mins, secs, days, months, years;
    record = new Map([...record.entries()].sort());
    let orginalDate = record.keys();
    for(i = 0; i < record.size; i++) {
        nextValue = orginalDate.next().value;
        fullDate = new Date(Number(nextValue));
        console.log(fullDate);
        hours = fullDate.getHours();
        mins = fullDate.getMinutes();
        secs = fullDate.getSeconds();
        days = fullDate.getDate();
        months = fullDate.getMonth() + 1;
        years = fullDate.getFullYear();
        if(hours < 10 ? hours = '0' + hours : hours);
        if(mins < 10 ? mins = '0' + mins : mins);
        if(secs < 10 ? secs = '0' + secs : secs);
        convertedDate = `${hours}:${mins}:${secs} ${days}/${months}/${years}`;
        showRecord.innerHTML += `${convertedDate}, ${record.get(nextValue)}` + "<br>"; 
    }
    */
}

document.querySelector(".button3").onclick = () => {
    localStorage.clear();
    showRecord.innerHTML = "";
}

window.onload = init();

buttonStart.addEventListener('click', start);