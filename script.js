let interval;
let startMinutes = 30;
let minutes = startMinutes;
let started = false;

function padding(number) {
    return number.toString().padStart(2, '0');
}

function display(minutes, seconds) {
    let time = padding(minutes) + ":"+ padding(seconds);
    document.getElementById("time").innerHTML = time;
    document.title = time; // Update title
}

function start() {
    if (!started) {
        minutes = startMinutes;
        started = true;
        let seconds = 60;
        interval = setInterval(function() {
            if(minutes <= 0 && seconds == 60) {
                alert('<(￣︶￣)> Done');
                clearInterval(interval); 
                return;
            }
            if (seconds == 60) { minutes -= 1; }
            seconds--;
            display(minutes, seconds);
            if(!seconds) { seconds = 60; }
        },1000)
    }
}

function reset() {
    display(startMinutes, 0)
    clearInterval(interval);
    started = false;
}

reset() // Initial