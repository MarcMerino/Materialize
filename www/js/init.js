(function($){
  $(function(){
 
    $('.sidenav').sidenav();
    
    
  });
})(jQuery); // end of jQuery name space

document.addEventListener('deviceready', onDeviceReady, false);
let inputFilter = document.getElementById("artistName");
 
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById("submitButton").onclick = function() {
      clearItems();
      doQuery(inputFilter.value);
    };

    M.Breadcrumb.getInstance();
    //document.getElementById('deviceready').classList.add('ready');
}

function doQuery(filter) {
  $.ajax({
    method: "GET",
    url: "https://musicbrainz.org/ws/2/artist?query=" + filter,
    dataType: "json",
  }).done(function (msg) {
    for(var item in msg.artists) {
      if (msg.artists[item].disambiguation === undefined) {
        addItem(msg.artists[item].name, msg.artists[item].area.name);
      } else {
        addItem(msg.artists[item].name, msg.artists[item].disambiguation);
      }
    };
  }).fail(function () {
    alert("No se ha encontrado ningun registro el filtro " + filter);
  });
}

function addItem(name, description) {
  $("#list-tab").append('<li class="collection-item avatar"><i class="material-icons circle red">play_arrow</i><span class="title"><b>' + name + '</b></span><p>' + description + '</p></li>');
}

function clearItems() {
  $("#list-tab").empty();
}