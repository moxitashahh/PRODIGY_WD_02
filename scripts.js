let startTime, updatedTime, difference, lastLapTime = 0;
let tInterval;
let running = false;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startStopBtn.textContent = 'Stop';
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
    } else {
        startStopBtn.textContent = 'Start';
        clearInterval(tInterval);
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.textContent = 'Start';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    millisecondsElement.textContent = '00';
    difference = 0;
    lastLapTime = 0;
    lapsList.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    hoursElement.textContent = (hours < 10) ? '0' + hours : hours;
    minutesElement.textContent = (minutes < 10) ? '0' + minutes : minutes;
    secondsElement.textContent = (seconds < 10) ? '0' + seconds : seconds;
    millisecondsElement.textContent = (milliseconds < 10) ? '0' + milliseconds : milliseconds;
}

function recordLap() {
    if (running) {
        const currentLapTime = new Date().getTime() - startTime;
        const lapDifference = currentLapTime - lastLapTime;
        lastLapTime = currentLapTime;

        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap: ${differenceToLap(lapDifference)} (Total: ${differenceToLap(currentLapTime)})`;
        lapsList.appendChild(lapItem);
    }
}

function differenceToLap(diff) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((diff % 1000) / 10);

    const formattedHours = (hours < 10) ? "0" + hours : hours;
    const formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
    const formattedSeconds = (seconds < 10) ? "0" + seconds : seconds;
    const formattedMilliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}
