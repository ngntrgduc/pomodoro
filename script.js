let interval;
let startMinutes = 45;
let minutes = startMinutes;
let running = false;
let paused = true;
let relaxing = false;
let bell = true;

const audio = new Audio("assets/sounds/levelUp.wav");

function padding(number) {
    return number.toString().padStart(2, '0');
}

function display(minutes, seconds = 0) {
    seconds = seconds % 60; // What time: 40:60 ?
    let time = padding(minutes) + ':' + padding(seconds);

    if (minutes >= 60) {
        time = Math.floor(minutes/60).toString() + ':' + padding(minutes%60) + ':' + padding(seconds);
    }

    document.getElementById("time").innerHTML = time;
    document.title = time; // Update title
}

async function playSound() {
    if (bell) {
        await audio.play();
    }
}

async function alertMessage() {
    await playSound();
    alert("＼(＾▽＾)／"); // Yayyyyyyyy
    clearInterval(interval);
}

function resetPlayButton() {
    if (!paused) {
        paused = true;
        document.getElementById("play").className = "fa-solid fa-play";
    }
}

function changePlayPauseButton() {
    paused = !paused;
    document.getElementById("play").className = paused ? "fa-solid fa-play" : "fa-solid fa-stop";
}

function start() {
    changePlayPauseButton();
    if (!running) {
        running = true;
        minutes = startMinutes;
        let seconds = 60;
        interval = setInterval(() => {
            if (minutes <= 0 && seconds == 60) {
                resetPlayButton(); // For better UI
                alertMessage();
                return;
            }
            if (seconds == 60 && !paused) {
                minutes -= 1;
            }
            if (!paused) {
                seconds--;
            }
            display(minutes, seconds);
            if (seconds == 0) {
                seconds = 60;
            }
        }, 1000);
    }
}

function reset(time = 45) {
    startMinutes = time;
    display(startMinutes);
    clearInterval(interval);
    running = false;
    relaxing = false;
    resetPlayButton();
}

function relax() {
    reset(5);
    relaxing = true;
}

function increaseTime() {
    if (!running) {
        if (!relaxing) {
            startMinutes += 5;
        } else {
            startMinutes += 1;
        }
        display(startMinutes);
    }
}

function decreaseTime() {
    if (startMinutes == 0) return; // No time machine
    if (!running) {
        if (!relaxing) {
            startMinutes -= 5;
        } else {
            startMinutes -= 1;
        }
        display(startMinutes);
    }
}

function toggleBell() {
    bell = !bell;
    document.getElementById("bell").className = bell ? "fa-solid fa-bell" : "fa-regular fa-bell";
}

function stopwatch() {
    reset(0);
    changePlayPauseButton();
    if (!running) {
        running = true;
        minutes = startMinutes;
        let seconds = 0;
        interval = setInterval(() => {
            if (!paused) {
                seconds++;
            }
            if (seconds == 60 && !paused) {
                minutes += 1;
                seconds = 0;
            }
            display(minutes, seconds);
        }, 1000);
    }
}

function handleKeyDown(event) {
    switch (event.key) {
        case ' ':
            start();
            break;
        case 'r':
            reset();
            break;
        case 's':
            stopwatch();
            break;
        case 'b':
            relax();
            break;
        case 'a':
            toggleBell();
            break;
        case '+':
        case '=': 
        case `k`:
            increaseTime();
            break;
        case '-':
        case 'j':
            decreaseTime();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    reset(); // Initial
    document.addEventListener('keydown', handleKeyDown);
});

document.addEventListener("contextmenu", (event) => event.preventDefault());
