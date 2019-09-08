let prevTime,
  stopwatchInterval,
  elapsedTime = 0;

function updateTime() {
  let tempTime = elapsedTime,
    mSec = tempTime % 100;
  tempTime = Math.floor(tempTime / 1000);
  let sec = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);
  let min = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);

  if (mSec < 10) {
    mSec = "0" + mSec;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min < 10) {
    min = "0" + min;
  }

  const time = min + ":" + sec + ":" + mSec;

  $(".display").text(time);

  var r = $("#svg #bar").attr("r");
  var c = Math.PI * (r * 2);

  var pct = ((59 - sec) / 60) * c;

  $("#svg #bar").css({ strokeDashoffset: pct });

  $("#cont").attr("data-min", min);
}

$(".start").click(function() {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(function() {
      if (!prevTime) {
        prevTime = Date.now();
      }
      elapsedTime += Date.now() - prevTime;
      prevTime = Date.now();

      updateTime();
    }, 10);
  }
  $(".reset").attr("disabled", true);
});

$(".stop").click(function() {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
  prevTime = null;
  $(".reset").attr("disabled", false);
});

$(".reset").click(function() {
  $(".stop").click();
  elapsedTime = 0;
  updateTime();
});

$(document).ready(function() {
  updateTime();
});
