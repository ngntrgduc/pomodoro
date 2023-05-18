let interval;
let startMinutes = 30;
let minutes = startMinutes;
let started = false;
let relaxed = false;

// document.body.style.overflow = 'hidden'; // Hide scrollbar

function padding(number) {
    return number.toString().padStart(2, '0');
}

function display(minutes, seconds=0) {
    let time = padding(minutes) + ":"+ padding(seconds);
    document.getElementById("time").innerHTML = time;
    document.title = time; // Update title
}

function alertMessage() {
    alert('<(￣︶￣)> Done');
    clearInterval(interval); 
}

function start(loop=false) {
    if (!started) {
        minutes = startMinutes;
        started = true;
        let seconds = 60;
        interval = setInterval(function() {
            if(minutes <= 0 && seconds == 60) {
                if (!loop) {
                    alertMessage();
                    return;
                } else {
                    clearInterval(interval); 
                    startMinutes = 30;
                    start(loop=true)
                }
            }
            if (seconds == 60) { minutes -= 1; }
            seconds--;
            display(minutes, seconds);
            if(!seconds) { seconds = 60; }
        },1000)
    }
}

function reset(time=30) {
    startMinutes = time;
    display(startMinutes);
    clearInterval(interval);
    started = false;
    relaxed = false;
}

function relax() {
    reset(5);
    relaxed = true;
}

// function loop() {
//     clearInterval(interval);
//     started = false;
//     startMinutes = 30;
//     start(loop=true)
//     display(startMinutes)   
// }

function increaseTime() {
    if (!started) {
        if (!relaxed) { startMinutes += 5; } 
        else { startMinutes += 1; }
        display(startMinutes);
    }
}

function decreaseTime() {
    if (startMinutes == 0) return; // No time machine in here
    if (!started) {
        if (!relaxed) { startMinutes -= 5; } 
        else { startMinutes -= 1; }
        display(startMinutes);
    }
}


reset() // Initial