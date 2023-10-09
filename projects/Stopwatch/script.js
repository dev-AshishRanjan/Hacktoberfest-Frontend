// get the necessary elements using DOM
const hrDisplay = document.getElementById('hrClock')
const minDisplay = document.getElementById('minClock')
const secDisplay = document.getElementById('secClock')
const msDisplay = document.getElementById('msClock')

const lapBox = document.getElementById('lapBox')

const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const lapBtn = document.getElementById('lapBtn')
const resetBtn = document.getElementById('resetBtn')

// initialize
let hr = 0, min = 0, sec = 0, ms = 0
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

const stopwatch = () => {
    if (clockActive) {
        if (++ms == 100) {
            ms = 0
            if (++sec == 60) {
                sec = 0
                if (++min == 60) {
                    min = 0
                    hr++
                    hrDisplay.innerText = getTwoDigit(hr)
                }
                minDisplay.innerText = getTwoDigit(min)
            }
            secDisplay.innerText = getTwoDigit(sec)
        }
        msDisplay.innerText = getTwoDigit(ms)

        // call stopwatch() every 10ms
        setTimeout(stopwatch, 10)
    }
}

startBtn.onclick = () => {
    clockActive = true
    stopwatch()
}

stopBtn.onclick = () => {
    clockActive = false;
}

lapBtn.onclick = () => {
    if (lapIndex > 10) {
        return alert('Maximum lap record reached')
    }
    // append new lap record and export to HTML
    lapScore += `<p>${lapIndex++}.<span class="margin-x">${getTwoDigit(hr)} : ${getTwoDigit(min)} : ${getTwoDigit(sec)} : ${getTwoDigit(ms)}</span></p>`
    lapBox.innerHTML = lapScore
}

resetBtn.onclick = () => {
    clockActive = false;

    // reset variables to 0
    hr = 0, min = 0, sec = 0, ms = 0
    hrDisplay.innerText = getTwoDigit(hr)
    minDisplay.innerText = getTwoDigit(min)
    secDisplay.innerText = getTwoDigit(sec)
    msDisplay.innerText = getTwoDigit(ms)

    // reset lap
    lapIndex = 1
    lapScore = ''
    lapBox.innerHTML = '<p>1.  <span class="margin-x">-- : -- : -- : --</span></p>'
}