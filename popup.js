$(document).ready(function() {
  var imgUrl = chrome.extension.getURL("banner.png");
  $("#banner").replaceWith("<img src='"+imgUrl+"'>");

  var prev = JSON.parse(localStorage.getItem("prev"));
  var songs = [];
  $("#hit_list_main tbody").children().each(function() {

    var song = $(this).context.outerText.split(/\t/g).slice(0,2).join(" ")
    songs.push(song);
    if (prev && prev.indexOf(song) === -1){
      $(this).children('td, th').css("background-color", "yellow");
      console.log($(this));
    }

    $(this).click(function(){
      if ($(this).next().children().length == 1){
        $(this).next().remove();
        return;
      }
        
      var title = $(this).context.outerText.split(/\t/g).slice(0,2).join(" ");

      var youtubequery = "https://gdata.youtube.com/feeds/api/videos?q=" + encodeURIComponent(title)+"&max-results=1";
      var xhr = new XMLHttpRequest();
      xhr.open("GET", youtubequery, false);
      xhr.overrideMimeType('text/xml')
      xhr.send(null);
      var results = xhr.responseXML;
      var blah = results.getElementsByTagName('link')
      var vidcode = blah[5].getAttribute('href').replace("https://www.youtube.com/watch?v=", "").replace("&amp;feature=youtube_gdata","").replace("&feature=youtube_gdata","");

      var embed = '<iframe width="600" height="400" src="//www.youtube.com/embed/'+vidcode+'" frameborder="0" allowfullscreen></iframe>';

      $(this).after("<tr><td colspan='3'>"+embed+"</td></tr>");
    });
  });

  localStorage.setItem("prev", JSON.stringify(songs));

});




