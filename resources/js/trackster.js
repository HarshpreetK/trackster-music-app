/* API KEY   */
var Trackster = {};
const $API_KEY = '145583ad021ee4d8956cd21d0d2325b5';


$(document).ready(function(){
  $("div#search-btn").click(function(){
  Trackster.searchTracksByTitle($(".search-text").val());
  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  var $songList = $('#song-list-container');
  $songList.empty();
  //$('#song-list-container').empty();
  for(var i=0; i<tracks.length; i++){
    var track = tracks[i];
    var mediumAlbumArt = track.image[1]["#text"];
    var newTrack = '<div class="row">'+
          '<div class="col-sm-2">'+
            '<div class="col-sm-5 song-style"><a href="'+ track.url +'" target="_blank"><i class="fa fa-play-circle-o fa-2x"></i></a></div>'+
          '</div>'+
            '<div class="col-sm-2 song-style"><span>'+ track.name +'</span></div>'+
            '<div class="col-sm-2 song-style"><span>'+ track.streamable +'</span></div>'+
            '<div class="col-sm-2 song-style"><span>'+ track.artist+'</span></div>'+
            '<div class="col-sm-2 song-style"><img src="'+mediumAlbumArt+'"></div>'+
            '<div class="col-sm-2 song-style"><span>'+track.listeners +'</span></div>'+
    '</div>';
    $songList.append(newTrack);
  };

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/

Trackster.searchTracksByTitle = function(title) {
   $.ajax({url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track="+title+"&api_key="+$API_KEY+"&format=json", success: function(response){
      console.log(response);
     Trackster.renderTracks(response.results.trackmatches.track);
   }});

};
