const timerHrs = document.getElementById("timer_hrs");
const timerMin = document.getElementById("timer_min");
const timerSec = document.getElementById("timer_sec");

const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");

let hrs = 0;
let min = 0;
let sec = 0;

function setHrs(val) {
    let hours = "";
    if (val < 10) {
        hours += 0;
    } else if (val > 24) {
        hours = 24;
    }
    timerHrs.value = hours + val;
}

function setMin(val) {
    let minute = "";
    if (val < 10) {
        minute += 0;
    } else if (val > 59) {
        setHrs(hrs + 1);
        min = 0;
        return setMin(0);
    }
    timerMin.value = minute + val;
}

function setSec(val) {
    let second = "";
    if (val < 10) {
        second += 0;
    } else if (val > 59) {
        setMin(min + 1);
        sec = 0;
        return setSec(0);
    }
    timerSec.value = second + val;
}

function reset() {
    hrs = 0;
    min = 0;
    sec = 0;
    timerHrs.value = "00";
    timerMin.value = "00";
    timerSec.value = "00";
}

function validCheck(time, type) {
    if (type === "hrs") {
        if (time > 24) {
            return 0;
        }
    } else {
        if (time > 59) {
            return 2;
        }
    }

    return 1;
}

function timerHandler() {
    timerHrs.addEventListener("click", () => {
        setHrs(hrs++);
    });

    timerMin.addEventListener("click", () => {
        setMin(min++);
    });

    timerSec.addEventListener("click", () => {
        setSec(sec++);
    });
}

timerHandler();

function startEvt() {}

function resetEvt() {
    resetBtn.addEventListener("click", () => {
        reset();
    });
}

resetEvt();
