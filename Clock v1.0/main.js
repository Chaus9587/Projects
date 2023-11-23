


const update = () => {
    const date = new Date();
    document.getElementById('displayTime').innerHTML = getCurrentTime(date);
    document.getElementById('displayDate').innerHTML = getCurrentDate(date);
}

const getCurrentTime = (date) => {  
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    if(hours < 10 ? hours = '0' + mins: hours = hours);
    if(mins < 10 ? mins = '0' + mins: mins);
    if(secs < 10 ? secs = '0' + secs: secs);

    return `${hours}:${mins}:${secs}`
}

const getCurrentDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    return `${day}/${month}/${year}`
}

window.onload = update();
setInterval(update, 1); // For more accurate time

