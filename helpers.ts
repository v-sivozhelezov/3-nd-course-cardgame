/* eslint @typescript-eslint/no-var-requires: "off" */
export const Timer = require('easytimer.js').Timer;
export const myTimer = new Timer();
export const getMinutes = () => {
    const minutes = myTimer.getTimeValues().minutes;
    return minutes > 9 ? minutes : '0' + minutes;
};
export const getSeconds = () => {
    const seconds = myTimer.getTimeValues().seconds;
    return seconds > 9 ? seconds : '0' + seconds;
};

export function renderTimer({ timerHTML }: { timerHTML: HTMLDivElement }) {
    timerHTML.innerHTML = ` <div class="timer__header" >
    <h4 class="timer__min">min</h4>
    <h4 class="timer__min">sek</h4>
    </div>
        <p class="timer__clock-face">${getMinutes()}:${getSeconds()}</p>`;
    return;
}
