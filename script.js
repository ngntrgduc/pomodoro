let interval;
let startMinutes = 30;
let minutes = startMinutes;
let started = false;

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

function reset() {
    startMinutes = 30;
    display(startMinutes)
    clearInterval(interval);
    started = false;
}

function relax() {
    if (started) clearInterval(interval);
    started = false;
    startMinutes = 5;
    display(startMinutes);
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
        startMinutes += 5;
        display(startMinutes);
    }
}

function decreaseTime() {
    if (!started) {
        startMinutes -= 5;
        display(startMinutes);
    }
}


reset() // Initial