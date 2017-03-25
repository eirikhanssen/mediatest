$( document ).ready(function() {
    $('article.audio_and_text').each(function(){

		var lang = ($(this).attr('data-lang'));
		var playerId = $('#audio-' + lang).closest('.mejs__container').attr('id');
		var player = mejs.players[playerId];
		var mediaEl = $(this).find('audio')[0];
		console.log(mediaEl);
		$(mediaEl).on("playing", function(){
			console.log("playing: " + lang);
		});
		$(mediaEl).on("pause", function(){
			console.log("paused: " + lang);
		});
		$(mediaEl).on("seeking", function(){
			console.log("seeking: " + lang);
		});
		$(mediaEl).on("seeked", function(){
			console.log("seeked: " + lang);
		});
		$(mediaEl).on("ended", function(){
			console.log("ended: " + lang);
		});
		$(mediaEl).on("volumechange", function(){
			console.log("volume of " + lang + ": " + player.getVolume());
		});
		$(mediaEl).on("timeupdate", function(){
			console.log("timeupdate of " + lang + ": " + player.getCurrentTime());
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

