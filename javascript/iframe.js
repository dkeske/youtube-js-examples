var videoID;
function makeTag(videoId){
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  videoID = videoId;  
}


// 3. Ova funkcija kreira <iframe> (time i YouTube)
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoID,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. API će pozvati ovu funkciju kada video plejer bude spreman
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. API poziva ovu funkciju kada se stanje plejera izmeni.
//    U funkciji je napisano da kada video pocne da se prikazuje (state=1),
//    plejer treba da radi 6 sekundi a zatim staje.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}