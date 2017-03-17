function time2sec(timestring) {
	// convert timestring to seconds
	var timereg = new RegExp(/(\d\d):(\d\d):([0-9.]+)/);
	if(!timestring.match(timereg)) {
		return 0;
	}
	var sec_in_hours = Number(timestring.replace(timereg, '$1'))*3600;
	var sec_in_minutes = Number(timestring.replace(timereg, '$2'))*60;
	var sec_in_seconds = Number(timestring.replace(timereg, '$3'));
	var sec_total = sec_in_hours + sec_in_minutes + sec_in_seconds;
	return sec_total;
}

function showTimes(node) {
	console.log('begin: ' + time2sec(node.getAttribute('data-begin')));
}

function updateCues (){
	$('span.cue').each(function() {
		console.log(time2sec($( this ).attr('data-begin')));
	});
}
