var player= {
	ready: false,
	height:$('.my-player').innerHeight(),
	width: $('.my-player').innerWidth(),
	videoId: 'M7lc1UVf-VE'
};

	function onYouTubeIframeAPIReady() {
        player.app = new YT.Player('player', {
          height: player.height,
          width: player.width,
          videoId: player.videoId,
          playerVars:{
          	autoplay:0,
          	controls:0
          },
          events: {
		      'onReady': onPlayerReady,
		      'onStateChange': onPlayerStateChange
		   }
        });
      }
       var playheadInterval=0;

      /*player is now ready*/
      onPlayerReady =function(event){
      
      }

      /*player status change**/
      onPlayerStateChange =function(event){
      		switch(event.data){
      			case -1: // unStard
      			case 0: //end 
      			case 1: //playing
      			playheadInterval = setInterval(updateSkeer, 10);
      				$('#play-pause').css('background-position', '0 0');
      				return;
      			case 2: //paused
      				clearInterval(playheadInterval);
      				$('#play-pause').css('background-position', '0 -40px');
      				return;
      			case 3: // buffering
      			case 4:
      		}
      }

      $('#seekbar').on('click', function(event){
          var locx=event.pageX-($(this).offset().left + 17)
          var ct= (player.app.getDuration() / $(this).innerWidth())* locx;
          player.app.seekTo(ct, true);
      });

	/*update skeer*/
	var updateSkeer= function (){
		if(typeof(player.app.getCurrentTime) == 'undefined') {
			clearInterval(playheadInterval);
			return;
		}
		var percentage= player.app.getCurrentTime()  / player.app.getDuration();
		var num =Math.round(percentage * $('#seekbar').innerWidth() );
		
		$('#seekbar').css('background-position', num+'px 0px');
	}

      /*Play and pause video*/
     var playPause =function(){
      	
      	switch(player.app.getPlayerState()) {
			case -1: // unstarted
			case 0: // ended
			case 2: // paused
				player.app.playVideo();
				return;
			case 1: // playing
				player.app.pauseVideo();
				return;
			default:
				player.app.playVideo();
				return;
		}
      }
      $('#play-pause').on('click', playPause);
      /*mune and unMute the player*/
      $('#mute-unmute').on('click', function(event){
      		event.preventDefault();
      		if(player.app.isMuted() === false){
	      		player.app.mute();
	      		$(this).css('background-position', '0 -40px');
      		}else{
      			player.app.unMute();
      			$(this).css('background-position', '0 0');
      		}

      });
