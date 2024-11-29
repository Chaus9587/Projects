const button = document.querySelector("#button");

window.addEventListener("resize", reloadWindow);
window.onload = reloadWindow();

function reloadWindow() {
    let orientation = document.querySelector("#orientation");
    document.querySelector("#width").innerHTML = `Width: ${window.innerWidth}px`;
    document.querySelector("#height").innerHTML = `Height: ${window.innerHeight}px`;
    if(window.innerWidth > window.innerHeight) {
        orientation.innerHTML = "Orientation: Landscape";
    }
    else {
        orientation.innerHTML = "Orientation: Portrait";
    }
}

button.onclick = () => {
    window.close();
}


