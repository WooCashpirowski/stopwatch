let prevTime,
  stopwatchInterval,
  elapsedTime = 0;

function updateTime() {
  let tempTime = elapsedTime,
    mSec = tempTime % 1000;
  tempTime = Math.floor(tempTime / 1000);
  let sec = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);
  let min = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);

  if (mSec < 10) {
    mSec = "0" + mSec;
  }
  if (mSec >= 100) {
    mSec = Math.floor(mSec / 10);
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min < 10) {
    min = "0" + min;
  }

  const time = min + ":" + sec + ":" + mSec;

  $(".display").text(time);

  // Animated stroke
  var r = $("#svg #bar").attr("r");
  var c = Math.PI * (r * 2);

  var pct = ((59 - sec) / 59) * c;

  $("#svg #bar").css({ strokeDashoffset: pct });

  $("#cont").attr("data-min", min);
}

function go() {
  stopwatchInterval = setInterval(function() {
    if (!prevTime) {
      prevTime = Date.now();
    }
    elapsedTime += Date.now() - prevTime;
    prevTime = Date.now();

    updateTime();
  }, 10);
}

function pause() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;

  prevTime = null;
  $(".reset").attr("disabled", false);
}

$(".toggle").click(function() {
  if (!stopwatchInterval) {
    go();
    this.innerText = "Pause";
    $(".lap").attr("disabled", false);
  } else if (stopwatchInterval) {
    pause();
    this.innerText = "Go";
    $(".lap").attr("disabled", true);
  }
});

$(".lap").click(function() {
  let savedLap = $("<li></li>");
  savedLap.text($(".display").text());
  $(".laps").append(savedLap.hide().fadeIn(300));
});

$(".reset").click(function() {
  $(".stop").click();
  elapsedTime = 0;
  // $(".laps").html("");
  $(".laps")
    .children()
    .fadeOut(800, function() {
      this.remove();
    });
  updateTime();
  $(".reset").attr("disabled", true);
});

$(document).ready(function() {
  updateTime();
});
