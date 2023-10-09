// get the necessary elements using DOM
const hourDisplay = document.getElementById('hourClock')
const minuteDisplay = document.getElementById('minuteClock')
const secondDisplay = document.getElementById('secondClock')
const millisecondDisplay = document.getElementById('millisecondClock')

const lapBox = document.getElementById('lapBox')

const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const lapBtn = document.getElementById('lapBtn')
const resetBtn = document.getElementById('resetBtn')

// initialize
let hour = 0, minute = 0, second = 0, millisecond = 0
let clockActive = false
let lapIndex = 1, lapScore = ''

const getTwoDigit = (val) => {
    // to make sure we always output 2 digit
    // if it is one digit 0-9 then add 0 to start
    if (val < 10) {
        val = '0' + val
    }
    return val
}

// function to increment the clock
const stopwatch = () => {
    if (clockActive) {
        // increment millisecond.
        if (++millisecond === 100) {
            // if millisecond == 100 then reset millisecond and increment second
            millisecond = 0
            if (++second === 60) {
                // if second == 60 then reset second and increment minute
                second = 0
                if (++minute === 60) {
                    // if minute == 60 then reset minute and increment hour
                    minute = 0
                    hour++
                    hourDisplay.innerText = getTwoDigit(hour)
                }
                minuteDisplay.innerText = getTwoDigit(minute)
            }
            secondDisplay.innerText = getTwoDigit(second)
        }
        millisecondDisplay.innerText = getTwoDigit(millisecond)

        // call stopwatch() every 10millisecond
        setTimeout(stopwatch, 10)
    }
}

// on clicking start set clockActive = true
startBtn.onclick = () => {
    clockActive = true
    stopwatch()
}

// on clicking stop set clockActive = false
stopBtn.onclick = () => {
    clockActive = false;
}

// on clicking lap append the lab record in variable and export to HTML
lapBtn.onclick = () => {
    if (lapIndex > 10) {
        return alert('Maximum lap record reached')
    }
    // append new lap record and export to HTML
    lapScore += `<p>${lapIndex++}.<span class="margin-x">${getTwoDigit(hour)} : ${getTwoDigit(minute)} : ${getTwoDigit(second)} : ${getTwoDigit(millisecond)}</span></p>`
    lapBox.innerHTML = lapScore
}

// on clicking reset set clockActive = false and reset all variables to 0 and lap record to blank
resetBtn.onclick = () => {
    clockActive = false;

    // reset variables to 0
    hour = 0, minute = 0, second = 0, millisecond = 0
    hourDisplay.innerText = getTwoDigit(hour)
    minuteDisplay.innerText = getTwoDigit(minute)
    secondDisplay.innerText = getTwoDigit(second)
    millisecondDisplay.innerText = getTwoDigit(millisecond)

    // reset lap
    lapIndex = 1
    lapScore = ''
    lapBox.innerHTML = '<p>1.  <span class="margin-x">-- : -- : -- : --</span></p>'
}