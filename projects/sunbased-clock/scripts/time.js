export var timeData = {
    direction: 1,
    speed: 1,
    time: new Date()
};

/**
* @Called : Every clock-second
* @Do : Update the time based on the timeDirection and in the timeSpeed
*/
export function updateTime() {
    let seconds = timeData.time.getSeconds();
    timeData.time.setSeconds(seconds + timeData.direction * timeData.speed);
}