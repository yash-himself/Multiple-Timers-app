const no_alarm_msg = document.getElementById('current-timers');
const alarmTone = document.getElementById('alarm-tone');
alarmTone.style.display = 'none';

const set_alarm_btn = document.getElementById('set-btn');

const timers = [];
let seconds;
let alarms = 0;

if (alarms === 0) {
    no_alarm_msg.style.display = 'block';
}
else {
    no_alarm_msg.style.display = 'none';
}



set_alarm_btn.addEventListener('click', (event) => {
    // time inputs
    let hours = parseInt(document.getElementById('hour').textContent);
    let min = parseInt(document.getElementById('min').textContent);
    let sec = parseInt(document.getElementById('sec').textContent);

    // converting given time into seconds
    seconds = hours * 60 * 60 + min * 60 + sec;
    event.preventDefault();
    
if (min >= 0 && min < 60 && sec >= 0 && sec < 60) {
        timers.push({name:timers.length + 1, duration: seconds});
        initializeTimers(timers[timers.length - 1]);
    }
    else alert('Enter valid time! Eg : 00:00:05');

});


const timersList = document.getElementById('timers-list');
function initializeTimers(timer) {
    
    var alarmBox = document.createElement('div');
        alarmBox.setAttribute('id', timer.name);
        alarmBox.className = 'timer-div';
        alarmBox.innerHTML = ``;
    
        timersList.appendChild(alarmBox);
        handleTimer(timer);

        alarms++;
        no_alarm_msg.style.display = 'none';
}

function updateTimerDisplay(timer) {
    if (document.getElementById(timer.name)) {
        const timerElement = document.getElementById(timer.name);
        timerElement.innerHTML = `
        <div class="display-flex-row-center gap-2rem timer-box">
        <p id="set-time">Time Left  :</p>
        <div id="time-count-active" class="display-flex-row-center">
            <p id="hour">${Math.floor(timer.duration / 3600).toString().padStart(2, '0')}</p>
            <p>:</p>
            <p id="min">${Math.floor((timer.duration % 3600) / 60).toString().padStart(2, '0')}</p>
            <p>:</p>
            <p id="sec">${Math.floor(timer.duration % 60).toString().padStart(2, '0')}</p>
        </div>
        <div id="set-btn" onClick="deleteAlarm(${timer.name})">Delete</div>
    </div>
        `;
    }
    
}
console
function handleTimer(timer) {
    updateTimerDisplay(timer);
    timer.interval = setInterval(()=>{
        timer.duration--;
        updateTimerDisplay(timer);
        if (timer.duration <= 0) {
            clearInterval(timer.interval);
            if (document.getElementById(timer.name)) {
                const timerElement = document.getElementById(timer.name);
                timerElement.className = 'timer-div-finished';
                timerElement.innerHTML = `
                <div class="display-flex-row-center gap-2rem timer-box-finished">
                <p id="set-time-finished">Set Time :</p>
                <div id="time-count-finished" class="display-flex-row-center">
                    <p>Timer is Up!</p>
                </div>
                <div id="set-btn-finished" onClick="deleteAlarm(${timer.name})">Stop</div>
            </div>
                `;

                alarmTone.play();
            }
        }
    }, 1000);
}

function deleteAlarm(elementId) {
    timersList.removeChild(document.getElementById(`${elementId}`));
    timers.splice(elementId - 1, 1);
    alarms--;
    if (alarms === 0) {
        no_alarm_msg.style.display = 'block';
    }
    else {
        no_alarm_msg.style.display = 'none';
    }
    alarmTone.pause();
}
