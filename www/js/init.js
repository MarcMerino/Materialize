(function($){
  $(function(){
 
    $('.sidenav').sidenav();
    $('.tabs').tabs({"swipeable":true});
    
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

      var tabs = document.getElementById("tabs-swipe");
      var tabsInstance = M.Tabs.getInstance(tabs);
      tabsInstance.select("tab2");

      inputFilter.value = "";
    };

    $(".carousel")[0].style = "height: 100%; overflow-y: scroll";

    //document.getElementById('deviceready').classList.add('ready');
}

function doQuery(filter) {
  filter = filter.replace(/([^\w_\-,.?])+/g,"").replace(/([\s+])/g," ");
  
  $.ajax({
    method: "GET",
    url: "https://musicbrainz.org/ws/2/artist?query=" + filter,
    dataType: "json",
  }).done(function (msg) {
    for(var item in msg.artists) {
      console.log(msg.artists[item]);
      if (msg.artists[item].disambiguation === undefined) {
        if (msg.artists[item].area === undefined) {
          addItem(msg.artists[item].name, " ");
        } else {
          addItem(msg.artists[item].name, msg.artists[item].area.name);
        }
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