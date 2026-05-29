(function () {
  'use strict';

  var TARGET_MS = new Date('2026-08-29T14:20:00+03:00').getTime();
  if (isNaN(TARGET_MS)) {
    TARGET_MS = Date.UTC(2026, 7, 29, 11, 20, 0);
  }
  var root = document.getElementById('wedding-countdown');

  if (!root) {
    return;
  }

  var grid = root.querySelector('.wedding-countdown__grid');
  var message = root.querySelector('.wedding-countdown__message');
  var units = {
    days: root.querySelector('[data-unit="days"]'),
    hours: root.querySelector('[data-unit="hours"]'),
    minutes: root.querySelector('[data-unit="minutes"]'),
    seconds: root.querySelector('[data-unit="seconds"]')
  };

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function render() {
    var diff = Math.max(0, TARGET_MS - Date.now());

    if (diff === 0) {
      if (grid) {
        grid.hidden = true;
      }
      if (message) {
        message.hidden = false;
      }
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    if (units.days) {
      units.days.textContent = String(days);
    }
    if (units.hours) {
      units.hours.textContent = pad2(hours);
    }
    if (units.minutes) {
      units.minutes.textContent = pad2(minutes);
    }
    if (units.seconds) {
      units.seconds.textContent = pad2(seconds);
      units.seconds.classList.add('is-tick');
      window.requestAnimationFrame(function () {
        units.seconds.classList.remove('is-tick');
      });
    }
  }

  render();
  window.setInterval(render, 1000);
})();
