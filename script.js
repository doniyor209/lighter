const lights = {
    red: document.getElementById("red"),
    yellow: document.getElementById("yellow"),
    green: document.getElementById("green")
};

let current = "red";
let timer = null;
let blinkInterval = null;

const durations = {
    red: 5,
    yellow: 2,
    green: 5
};

function updateLight(name, secondsLeft) {
    for (let key in lights) {
        lights[key].classList.remove("active");
        lights[key].textContent = "";
    }

    lights[name].classList.add("active");
    lights[name].textContent = secondsLeft;
}

function startTrafficLight() {
    let timeLeft = durations[current];
    updateLight(current, timeLeft);

    timer = setInterval(() => {
        timeLeft--;

        
        if (timeLeft === 2) {
            startBlinking(current);
        }

        if (timeLeft > 0) {
            updateLight(current, timeLeft);
        } else {
            stopBlinking(); 
            current = getNextLight(current);
            timeLeft = durations[current];
            updateLight(current, timeLeft);
        }
    }, 1000);
}

function getNextLight(current) {
    if (current === "red") return "green";
    if (current === "green") return "yellow";
    return "red";
}

function startBlinking(color) {
    const light = lights[color];
    let visible = true;

    blinkInterval = setInterval(() => {
        visible = !visible;
        light.style.opacity = visible ? "1" : "0.2"; 
    }, 300);
}

function stopBlinking() {
    clearInterval(blinkInterval);
    for (let key in lights) {
        lights[key].style.opacity = "1";
    }
}

startTrafficLight();
