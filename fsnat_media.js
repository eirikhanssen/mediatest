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

function updateActiveCues (){
	$('span.cue').each(function() {
		var current_mptime = mejs.players.mep_0.getCurrentTime();
		var this_cue_begin = time2sec($( this ).attr('data-begin'));
		var this_cue_end = time2sec($( this ).attr('data-end'));
		if(this_cue_begin <= current_mptime && current_mptime <= this_cue_end) {
			if(!$( this ).hasClass("active-cue")) {
				$( this ).addClass("active-cue");
			}
		} else if ($( this ).hasClass('active-cue')) {
			$( this ).removeClass("active-cue");
		}
	});
}

function updateActiveKeys () {
	// hvis den ikke har data-begin eller data-end, bruk første element child span sin data-begin og siste element child span sin data-end
	$('p.key').each(function() {
			var current_mptime = mejs.players.mep_0.getCurrentTime();
			var this_key_begin = time2sec($( this ).attr('data-begin'));
			var this_key_end = time2sec($( this ).attr('data-end'));
			if(this_key_begin <= current_mptime && current_mptime <= this_key_end) {
				if(!$( this ).hasClass("active-key")) {
					$( this ).addClass("active-key");

					$('.cues').animate(
						{
          					scrollTop: $( this ).offset().top
        				}, 1500);


				}
			} else if ($( this ).hasClass('active-key')) {
				$( this ).removeClass("active-key");
			}
		});
}

function startSync() {
	// 8 times a second, check the time of the audio clip, and update active-cue class in text.
	window.setInterval(updateActiveCues, 125);
	window.setInterval(updateActiveKeys, 125);
}

function scrollToActiveCue() {
	$('.cues').animate({
          scrollTop: $('.active-cue').offset().top
        }, 1500);
}

// A $( document ).ready() block.
$( document ).ready(function() {
    startSync();
});


