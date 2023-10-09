var milli = 0;
var sec = 0;
var mint = 0;
var interval;

function millisecond() {
  var result = document.getElementById("millisec");
  milli++;
  result.value = milli;
}

function start() {
  interval = setInterval(millisecond, 10);
}

function stop() {
  clearInterval(interval);
}

function reset() {
  milli = 0;
  sec = 0;
  mint = 0;
  millisecond() = 0;
}

function second() {
  var result = document.getElementById("sec");
  if (milli == 100) {
    milli = 0;
    sec++;
  }
  result.value = sec;
}

setInterval(second);

function minute() {
  var result = document.getElementById("mint");
  if (sec == 60) {
    sec = 0;
    mint++;
  }
  result.value = mint;
}

setInterval(minute);


function disable_start() {
  var btn = document.getElementById("disabled1")
  btn.disabled = true;
  var btn = document.getElementById("disabled2")
  btn.disabled = false;
  var btn = document.getElementById("disabled3")
  btn.disabled = false;
}


function disable_stop() {
  var btn = document.getElementById("disabled1")
  btn.disabled = false;
  var btn = document.getElementById("disabled2")
  btn.disabled = true;
  var btn = document.getElementById("disabled3")
  btn.disabled = false;
}