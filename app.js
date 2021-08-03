const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

setProgress(100);


let pomodoro = 25;
let shortBreak = 5;
let longBreak = 10;

const settingsHolder = document.getElementsByClassName("settings")[0];
const settingCloseButton = document.getElementById("setting_close");
const settingOpenButton = document.getElementById("setting_open")

const pomodoroHolder = document.getElementById("pomodoro")
const shortBreakHolder = document.getElementById("shortBreak")
const longBreakHolder = document.getElementById("longBreak")
const applyButton = document.getElementById("apply")

pomodoroHolder.value = pomodoro;
shortBreakHolder.value = shortBreak;
longBreakHolder.value = longBreak;


settingOpenButton.addEventListener("click", () => {
    settingsHolder.style.display = "block";
})


settingCloseButton.addEventListener("click", () => {
    settingsHolder.style.display = "none";
})

applyButton.addEventListener("click", () => {
    settingsHolder.style.display = "none"
    pomodoro = pomodoroHolder.value;
    shortBreak = shortBreakHolder.value;
    longBreak = longBreakHolder.value;

    pomoSelectorTrigger();
})





const clockHolder = document.getElementById("clock")
const pauseButton = document.getElementById("pause")

let timer = 25 * 60;
let mode = "pomodoro"
let isPasued = true;
let isAudioPlaying = false;

function pauseToggler() {
    if(!isPasued){
        pauseButton.innerText = "R E S U M E"
    }

    if(isPasued){
        pauseButton.innerText = "P A U S E"
    }

    isPasued = !isPasued
}

pauseButton.addEventListener("click", pauseToggler)

let clockRender = () => {
    let minutes = Math.floor(timer / 60);
        let seconds = Math.floor(timer % 60);
    
        if(seconds < 10){
            seconds = '0' + String(seconds);
        }
    
        if(minutes < 10){
            minutes = '0' + String(minutes);
        }
    
        clockHolder.innerText = minutes + ":" + seconds;

        switch(mode){
            case "pomodoro": 
                setProgress((timer / (pomodoro * 60)) * 100);
                break;
            case "sb": 
                setProgress((timer / (shortBreak * 60)) * 100);
                break;
            case "lb":
                setProgress((timer / (longBreak * 60)) * 100);
                break;

        }

}


setInterval(() => {
    if(!isPasued && timer > 0){
        timer = timer - 1;
        clockRender();
    }

    if(timer == 0 && !isAudioPlaying){
        let audio = new Audio("alarm.wav");
        audio.play()
        isAudioPlaying = true
        if(mode != "pomodoro"){
            pomoSelectorTrigger();
        }
        else{
            shortBreakTrigger();
        }
    }
}, 1000)


const pomoSelector = document.getElementById("pomoSelector")
const sbSelector = document.getElementById("sbSelector")
const lbSelector = document.getElementById("lbSelector")

function resetSelection () {
    pomoSelector.parentElement.classList.remove("selected");
    sbSelector.parentElement.classList.remove("selected");
    lbSelector.parentElement.classList.remove("selected");
}

function pomoSelectorTrigger() {
    resetSelection();
    pomoSelector.parentElement.classList.add("selected");
    mode = "pomodoro"
    timer = pomodoro * 60;
    isPasued = false;
    isAudioPlaying = false;
    pauseToggler();
    clockRender();
}

pomoSelector.addEventListener("click", pomoSelectorTrigger)


function shortBreakTrigger(){
    resetSelection();
    sbSelector.parentElement.classList.add("selected");
    mode = "sb"
    timer = shortBreak * 60;
    isPasued = false;
    isAudioPlaying = false;
    pauseToggler();
    clockRender();
}

sbSelector.addEventListener("click", () => shortBreakTrigger())

lbSelector.addEventListener("click", () => {
    resetSelection();
    lbSelector.parentElement.classList.add("selected");
    mode = "lb"
    timer = longBreak * 60;
    isPasued = false;
    isAudioPlaying = false;
    pauseToggler();
    clockRender();
})
