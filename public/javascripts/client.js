

var product = document.getElementsByClassName('products')
var products = [];
for (var i = 0; i < product.length; i++) {
  if (product[i].innerHTML === ""){
    products.push('No products listed for this market.')
  } else {
  products.push(product[i].innerHTML)
  }
}

var address = document.getElementsByClassName('address');
var marketAddress = [];
for (var i = 0; i < address.length; i++) {
  marketAddress.push(address[i].innerHTML);
}

console.log(products);
// document.getElementById('yo').style.display='none';

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

 var bounds = new google.maps.LatLngBounds();
 var mapOptions = {
     mapTypeId: 'roadmap'
 };

 // Display a map on the page
 var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);


 // Multiple Markers
 var markers = uncoded;
 var marketName = title;
 var marketProducts = products;

 // Info Window Content


 // Display multiple markers on a map
 var infoWindow = new google.maps.InfoWindow(), marker, i;
 var infoWindowContent = marketAddress;
 var infoWindowProducts = marketProducts;
 // Loop through our array of markers & place each one on the map
 for( i = 0; i < markers.length; i++ ) {
     var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
     bounds.extend(position);
     marker = new google.maps.Marker({
         position: position,
         map: map,
         title: marketName[i]
     });

     // Allow each marker to have an info window
     google.maps.event.addListener(marker, 'click', (function(marker, i) {
         return function() {
             infoWindow.setContent(infoWindowContent[i], infoWindowProducts[i]);
             infoWindow.open(map, marker);
         }
     })(marker, i));

     // Automatically center the map fitting all markers on the screen
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


// x


  // function list() {
  //   var summer = ['tomato', 'potato', 'lime', 'cilantro'];
  //   // var list = getElementsByTagName('li')[0];
  //   for (var i = 0; i < summer.length; i++) {
  //     var now = document.createElemet('li');
  //     var node = document.createTextNode(summer[i]);
  //     now.appendChild('node').innerHtml = summer[i];
  //     var para = document.getElementsByClassName('text')[0];
  //     para.appendChild(now);
  //   }
  // }
