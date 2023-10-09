const hrDisplay = document.getElementById('hrClock')
const minDisplay = document.getElementById('minClock')
const secDisplay = document.getElementById('secClock')
const msDisplay = document.getElementById('msClock')

const lapBox = document.getElementById('lapBox')

const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const lapBtn = document.getElementById('lapBtn')
const resetBtn = document.getElementById('resetBtn')

let hr = 0, min = 0, sec = 0, ms = 0
let clockActive = false
let lapIndex = 1, lapScore = ''

const getTwoDigit = (val) => {
    // alternate if(val.toString().length == 1)
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
    // lapScore += `<p>${lapIndex++}.  ${getTwoDigit(hr)}:${getTwoDigit(min)}:${getTwoDigit(sec)}:${getTwoDigit(ms)}</p>`
    lapScore += `<p>${lapIndex++}.<span class="margin-x">${getTwoDigit(hr)} : ${getTwoDigit(min)} : ${getTwoDigit(sec)} : ${getTwoDigit(ms)}</span></p>`
    lapBox.innerHTML = lapScore
}

resetBtn.onclick = () => {
    clockActive = false;
    hr = 0, min = 0, sec = 0, ms = 0
    hrDisplay.innerText = getTwoDigit(hr)
    minDisplay.innerText = getTwoDigit(min)
    secDisplay.innerText = getTwoDigit(sec)
    msDisplay.innerText = getTwoDigit(ms)

    lapIndex = 1
    lapScore = ''
    lapBox.innerHTML = '<p>1.  <span class="margin-x">-- : -- : -- : --</span></p>'
}