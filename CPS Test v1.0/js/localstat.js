let currentValue;
let cps_arr = [[],[],[],[],[]];
const displayMax = document.querySelectorAll("#displayMax");
const displayAvg = document.querySelectorAll("#displayAvg");
const clear = document.getElementById("clear");

function sortRecord() {
    for(i = 0; i < localStorage.length; i++) {
        currentValue = JSON.parse(localStorage.getItem(`CPS_${i}`));  // Attempting to get the JSON array
        // If the value is not null then sort it using switch
        if(currentValue !== null) {
            switch(currentValue.test_duration) {
                case 1:
                    cps_arr[0].push(currentValue.cps);
                    break;
                case 2:
                    cps_arr[1].push(currentValue.cps);
                    break;
                case 5:
                    cps_arr[2].push(currentValue.cps);
                    break;   
                case 10:
                    cps_arr[3].push(currentValue.cps);
                    break;
                case 30:
                    cps_arr[4].push(currentValue.cps);
                    break;
                default:
                    return null;            
            }
        }
    }
    displayRecord();
    return cps_arr;
}

function displayRecord() {
    let average, max;
    for(i = 0; i < cps_arr.length; i++) {
        if(cps_arr[i].length !== 0) {
            average = cps_arr[i].reduce((prev, current) => prev + current) / cps_arr[i].length;
            max = Math.max(...cps_arr[i]);
            displayAvg[i].innerHTML = `Avg: ${average.toFixed(1)}`;
            displayMax[i].innerHTML = `Max: ${max.toFixed(1)}`;
        }
        else {
            displayAvg[i].innerHTML = "Avg: null";
            displayMax[i].innerHTML = "Max: null";
        }
    }
}

clear.onclick = () => {
    localStorage.clear();
    sortRecord();
}

window.onload = sortRecord();