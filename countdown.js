var _solution={ firstdate : "2019-08-20 09:00:00",
				seconddate : "2019-12-05 07:00:00" };
var _solution2={ firstdate : "2019-08-20 08:00:00",
				seconddate : "2019-08-20 08:00:00" };


function getRemainingTime(endtime) {
    const milliseconds = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor(milliseconds / 1000 % 60);
    const minutes = Math.floor(milliseconds / 1000 / 60 % 60);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    return {
        'total': milliseconds,
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours,
        'days': days
    };
}

// object
function initClock(id, times) {
    var solution = times;
	var $counter = $("#"+id);
    var $daysItem = $counter.find('.js-countdown-days');
    var $hoursItem = $counter.find('.js-countdown-hours');
    var $minutesItem = $counter.find('.js-countdown-minutes');
    var $secondsItem = $counter.find('.js-countdown-seconds');
	var first = new Date(solution.firstdate);

    function updateClock() {
		var time,now = new Date();
		if (now-first >= 0 && solution.seconddate) {
			// first date has passed, take the second time
			time = getRemainingTime(solution.seconddate);
		} else {
			time = getRemainingTime(solution.firstdate);
		}
        if (time.total <= 0) {
            clearInterval(timeinterval);
			$daysItem.html('0');
			$hoursItem.html('0');
			$minutesItem.html('0');
			$secondsItem.html('0');
        } else {
			$daysItem.html(time.days);
			$hoursItem.html(('0' + time.hours).slice(-2));
			$minutesItem.html(('0' + time.minutes).slice(-2));
			$secondsItem.html(('0' + time.seconds).slice(-2));
		}
    }
    const timeinterval = setInterval(updateClock, 1000);
	updateClock();
}

initClock('js-countdown', _solution);
initClock('js-countdown2', _solution2);
