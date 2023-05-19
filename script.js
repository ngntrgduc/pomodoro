let interval;
let startMinutes = 40;
let minutes = startMinutes;
let started = false;
let relaxed = false;
let bell = false;
let paused = true;

function padding(number) {
    return number.toString().padStart(2, "0");
}

function display(minutes, seconds = 0) {
    let time = padding(minutes) + ":" + padding(seconds);
    document.getElementById("time").innerHTML = time;
    document.title = time; // Update title
}

function alertMessage() {
    if (bell) {
        let audio = new Audio("assets/sounds/levelUp.wav");
        audio.play();
    }
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
    if (!paused) {
        paused = true;
        document.getElementById("play").className = "fa-solid fa-play";
    } else {
        paused = false;
        document.getElementById("play").className = "fa-solid fa-stop";
    }
}

function start() {
    changePlayPauseButton();
    if (!started) {
        minutes = startMinutes;
        started = true;
        let seconds = 60;
        interval = setInterval(function () {
            if (minutes <= 0 && seconds == 60) {
                resetPlayButton(); // For better UI
                alertMessage();
                return;
            }
            if (seconds == 60) {
                minutes -= 1;
            }
            if (!paused) {
                seconds--;
            }
            display(minutes, seconds);
            if (!seconds) {
                seconds = 60;
            }
        }, 1000);
    }
}

function reset(time = 40) {
    startMinutes = time;
    display(startMinutes);
    clearInterval(interval);
    started = false;
    relaxed = false;
    resetPlayButton();
}

function relax() {
    reset(5);
    relaxed = true;
}

function increaseTime() {
    if (!started) {
        if (!relaxed) {
            startMinutes += 5;
        } else {
            startMinutes += 1;
        }
        display(startMinutes);
    }
}

function decreaseTime() {
    if (startMinutes == 0) return; // No time machine in here
    if (!started) {
        if (!relaxed) {
            startMinutes -= 5;
        } else {
            startMinutes -= 1;
        }
        display(startMinutes);
    }
}

function toggleBell() {
    if (!bell) {
        bell = true;
        document.getElementById("bell").className = "fa-solid fa-bell";
    } else {
        bell = false;
        document.getElementById("bell").className = "fa-regular fa-bell";
    }
}

reset(); // Initial
