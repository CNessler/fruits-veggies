
// function setVisibility() {
//   document.getElementById('seasonal').style.display = 'inline';
// }

function showDiv() {
   document.getElementById('change').style.display = "block";
}

function mapping() {
  var link = document.getElementsByClassName('google');
  var uncoded = [];
  for (var i = 0; i < link.length; i++) {
    var uncode = unescape(link[i].innerHTML);
    var uncode = uncode.split(new RegExp('[()=,%+]', 'g'));
    uncoded.push(uncode)
  }

  var title = [];
  for (var i = 0; i < uncoded.length; i++) {
    var name = '';
    for (var j = 3; j < uncoded[i].length; j++) {
      name += uncoded[i][j] + ' ';
    }
    title[i] = name;
  }

  var address = document.getElementsByClassName('address');
  var marketAddress = [];
  for (var i = 0; i < address.length; i++) {
    marketAddress.push(address[i].innerHTML);
  }

  var product = document.getElementsByClassName('products')
  var products = [];
  for (var i = 0; i < product.length; i++) {
    if (product[i].innerHTML === ""){
      products.push('No products listed for this market.')
    } else {
    products.push(product[i].innerHTML)
    }
  }

  var schedule = document.getElementsByClassName('schedule');
  var marketSched = [];
  for (var i =  0; i < schedule.length; i++) {
     marketSched.push(schedule[i].innerHTML);
  }

  var final =[];
  for (var i = 0; i < marketSched.length; i++) {
    final.push(marketSched[i].split(';'));
  }

  var completeSchedule = [];
  for(var i=0; i<final.length; i++){
      for(var j=0; j<1; j++){
          completeSchedule.push(final[i][0])
      }
  }

 var bounds = new google.maps.LatLngBounds();
 var mapOptions = {
     mapTypeId: 'roadmap'
 };

 var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

 var markers = uncoded;
 var marketName = title;
 var marketProducts = products;
 var marketSchedule = completeSchedule;

 var infoWindow = new google.maps.InfoWindow(), marker, i;
 var infoWindowContent = marketAddress;
 var infoWindowProducts = marketProducts;
 var infoWindowSchedule = marketSchedule;

 for( i = 0; i < markers.length; i++ ) {
   var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
   bounds.extend(position);
   marker = new google.maps.Marker({
       position: position,
       map: map,
       title: marketName[i]
   });

   google.maps.event.addListener(marker, 'click', (function(marker, i) {
     var change = document.getElementById("change");
       return function() {
           infoWindow.setContent('<div id="info_window">' + '<b>' + infoWindowContent[i]
           + '</b>'
           +'<div id="toggle" style="display:none">' + infoWindowProducts[i] + '</div>'
           + '<p>' + '<div>' + infoWindowSchedule[i] + '</div>');
           infoWindow.open(map, marker);
           change.innerHTML = toggle.innerHTML.replace(/[;<]/g, '<p>');
       }
   })(marker, i));
   map.fitBounds(bounds);
 }

}

function loadScript() {
 var script = document.createElement('script');
 script.type = 'text/javascript';
 script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&callback=mapping';
 document.body.appendChild(script);
}

window.onload = loadScript;
