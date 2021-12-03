
window.addEventListener("DOMContentLoaded", function() {
  //Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


});
var player;
function onYouTubeIframeAPIReady()  {

  let url

  fetch(`/api/v1/video/${roomID}/`)
        .then(validateJSON)
        .then(videoData => {
            url = videoData.url 
        })
        .catch(error => {
            console.log("Message Fetch Failed: ", error);
        });

  url = url.substring(33, 44);
  //Create an <iframe> (and YouTube player) after the API code downloads.

  
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: url,
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': onPlayerReady,
      //  'onStateChange': onPlayerStateChange
      }
    });
}


//API calls this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

//The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
//var done = false;
//function onPlayerStateChange(event) {
//  if (event.data == YT.PlayerState.PLAYING && !done) {
//    setTimeout(stopVideo, 6000);
//    done = true;
//  }
//}
function stopVideo() {
  player.stopVideo();
}




function validateJSON(response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}