const timerHrs = document.getElementById("timer_hrs");
const timerMin = document.getElementById("timer_min");
const timerSec = document.getElementById("timer_sec");

const startBtn = document.querySelector(".start-btn");
const startBtnImg = startBtn.querySelector("img");
const resetBtn = document.querySelector(".reset-btn");

const time = document.querySelector("time");

let hrs = 0;
let min = 0;
let sec = 0;

let timerState = false;
let totalTime = 0;

function getTotalTime() {
    return hrs * 24 * 60 + min * 60 + sec;
}

function setTime() {
    time.dateTime = `${timerHrs.value}-${timerMin.value}-${timerSec.value}`;
}

function setHrs(val) {
    hrs = val;
    let fill = "";
    if (hrs < 10 && 0 <= hrs) {
        fill += 0;
    } else if (hrs > 24) {
        hrs = 24;
        return setHrs(24);
    } else if (hrs < 0) {
        return setHrs(0);
    }
    timerHrs.value = fill + hrs;
    setTime();
}

function setMin(val) {
    min = val;
    let fill = "";
    if (min < 10 && 0 <= min) {
        fill += 0;
    } else if (min > 59) {
        setHrs(hrs + 1);
        fill = 0;
        min = 0;
        return setMin(0);
    } else if (min < 0) {
        setHrs(--hrs);
        setMin(59);
    }
    timerMin.value = fill + min;
    setTime();
}

function setSec(val) {
    sec = val;
    let fill = "";
    if (sec < 10 && 0 <= sec) {
        fill += 0;
    } else if (sec > 59) {
        setMin(min + 1);
        fill = 0;
        sec = 0;
        return setSec(0);
    } else if (sec < 0) {
        setMin(--min);
        setSec(59);
    }
    timerSec.value = fill + sec;
    setTime();
}

function reset() {
    hrs = 0;
    min = 0;
    sec = 0;
    timerHrs.value = "00";
    timerMin.value = "00";
    timerSec.value = "00";
    timerState = false;
    setTime();
}

function timerHandler() {
    timerHrs.addEventListener("click", () => {
        setHrs(++hrs);
    });

    timerMin.addEventListener("click", () => {
        setMin(++min);
    });

    timerSec.addEventListener("click", () => {
        setSec(++sec);
    });

    timerHrs.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        setHrs(--hrs);
    });

    timerMin.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        setMin(--min);
    });

    timerSec.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        setSec(--sec);
    });
}

timerHandler();

function startEvt() {
    startBtn.addEventListener("click", () => {
        timerState = !timerState;

        if (timerState) {
            startBtnImg.style.objectPosition = "0 -16px";
        } else {
            startBtnImg.style.objectPosition = "0 16px";
        }

        timerActive();
    });
}

startEvt();

function timerActive() {
    setTimeout(() => {
        if (timerState && getTotalTime() > 0) {
            setSec(--sec);
            console.log(getTotalTime());
            return timerActive();
        }
    }, 1000);

    if (getTotalTime() === 0) {
        timerState = false;
        startBtnImg.style.objectPosition = "0 16px";
        return alert("알람종료");
    }
}

function resetEvt() {
    resetBtn.addEventListener("click", () => {
        reset();
    });
}

resetEvt();
