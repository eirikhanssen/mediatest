function scrollTo(el) {
	//el.parent().scrollTop(el.offset().top - 30);
	var scroll_duration = 700;
	var childPos = el.offset()
	var parentPos = el.parent().offset()
	var childOffsetTop = childPos.top - parentPos.top

	$('html, body').animate({
		scrollTop: childOffsetTop
		}, scroll_duration);
}

var getCurrentEntryIndexFromTracks = function(player) {
	// the track with the same language as the audio will be of kind = captions
	// the tracks with other languages than the audio will be of kind = subtitles
	var tracksObj = player.tracks;
	var currentTime = player.getCurrentTime();
	for(var i=0; i<tracksObj.length; i++) {
		var currentTrack = tracksObj[i];
		if(currentTrack.kind == "captions") {
			for(var j=0; j<currentTrack.entries.length; j++) {
				var currentEntry = currentTrack.entries[j];
				if((currentTime >= currentEntry.start || (j>0 && currentTime > currentTrack.entries[j-1].stop)) && currentTime <= currentEntry.stop) {
					return j;
				}
			}
		}
	}
	return 0;
}

var getCurrentSubtitleFromTracks = function (player, kind, srclang, entryIndex) {
	// tracksObj has several tracks
	// find the track that is the right kind, has the right srclang
	// return that track's entry's text matching the entryIndex
	var tracksObj = player.tracks;
	for(var i=0; i<tracksObj.length; i++) {
		var currentTrack = tracksObj[i];
		if(currentTrack.kind == kind && currentTrack.srclang == srclang) {
			return entryIndex + ' : ' + currentTrack.entries[entryIndex].text;
		}
	}
	console.log("no entry match: " + kind + ' : ' + srclang + ' : ' + currentIdentifier);
	return "no entry match: " + kind + ' : ' + srclang + ' : ' + currentIdentifier;
}

var getTranslatedSubtitle = function(player, lang) {
	return player.getCurrentTime() + ' : ' + getCurrentSubtitleFromTracks(player, 'subtitles', lang, getCurrentEntryIndexFromTracks(player));
}

$( document ).ready(function() {
    $('article.audio_and_text').each(function(){

		var lang = ($(this).attr('data-lang'));
		var playerId = $('#audio-' + lang).closest('.mejs__container').attr('id');
		var player = mejs.players[playerId];
		var mediaEl = $(this).find('audio')[0];
		//console.log(mediaEl);
		function updateTextSync(){

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
			currentPlayerKeys = $('article[data-lang='+lang+ '] .key');
			otherPlayersKeys = $('article:not([data-lang='+lang+ ']) .key');
			currentPlayerKeys.each(function(){
				begin=time2sec($(this).attr('data-begin'));
				end=time2sec($(this).attr('data-end'));
				currentTime=player.getCurrentTime();
				if(currentTime < begin || currentTime > end) {
					if($(this).hasClass('playing')) {
						$(this).removeClass('playing');
					}
				} else {
					if(!$(this).hasClass('playing')) {
						// new cue!
						// which cue are we at now?
						
						$(this).addClass('playing');
						scrollTo($(this));
						var translatedCueText = getTranslatedSubtitle(player, 'no');
						$('#translation').html(translatedCueText);
						console.log(translatedCueText);
					}
				}
			});

		}
		$(mediaEl).on("playing", function(){
			//console.log("playing: " + lang);
		});
		$(mediaEl).on("pause", function(){
			//console.log("paused: " + lang);
		});
		$(mediaEl).on("seeking", function(){
			//console.log("seeking: " + lang);
		});
		$(mediaEl).on("seeked", function(){
			//console.log("seeked: " + lang);
		});
		$(mediaEl).on("ended", function(){
			//console.log("ended: " + lang);
		});
		$(mediaEl).on("volumechange", function(){
			//console.log("volume of " + lang + ": " + player.getVolume());
		});
		$(mediaEl).on("timeupdate", function(){
			//console.log("timeupdate of " + lang + ": " + player.getCurrentTime());
			updateTextSync();
			// finn ut hvilken cue som er aktiv
			// oppdater hvilken cue i andre språk som skal være aktiv/playing
			// f.eks .sync-no .sync-so .sync-ar .sync-ti
		});
	});
});



/*
function audioInit(media_element_id) {
	var media_el_selector = 
	var getPlayer = function(media_element_id) {
		media_element_id = "#" + media_element_id;
		var playerId = $(media_element_id).closest('.mejs__container').attr('id');	
		var player = mejs.players[playerId];
		return player;
	}

	var getLang = function(media_element_id) {
		media_element_id = "#" + media_element_id;
		lang = $(media_element_id).parent().getAttribute()
	}

	var audioselector = "#" + 

	$('#audio-so audio').on("playing", function(){
		console.log('playing');
	});

}*/

