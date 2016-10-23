document.addEventListener("DOMContentLoaded", homeload);

var usrname;
var usrId="";
var token;
var markers = [];
var content = [];
var centerLat = 38.6270;
var centerLng = -90.1994;
var map;
var infoBubbles = [];

//This functoon loads the map when the website is first loaded
function homeload(){
	//Centers at location
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: new google.maps.LatLng(centerLat, centerLng),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
	});

	var pdata;
	
	$.ajax({type:'POST', url: 'fetchUsrId.php', data: pdata, dataType: 'json', success: function(response) {
		usrId = response[0].userid;
		if(usrId){
			$(".update").show();
			toggleState($("#userlogin"));
		}
	}});

	$.ajax({type:'POST', url: 'fetchInfo.php', data: pdata, dataType: 'json', success: function(response) {

		var marker, i;

		for (i = 0; i < response.length; i++) {  
			//Creates each of the contents for each marker
			content[i] = '<div class=shelter_name style="text-align: center; font-family: Calibri; color: white; font-weight: bold; padding-top: 10px;">' 
			content[i] += '<div class="beds">Beds: '+response[i].bed[0].bed_avail+'</div>';
			content[i] +='<div class="food">Food: '+ response[i].food[0].food_avail+'</div>';
			content[i] += '</div>';

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(response[i].lat, response[i].lng),
				map: map,
				icon: 'home.png'
			});
			markers[i] = marker;
			infoBubbles[i] = new InfoBubble({
	      map: map,
	      content: content[i],
	      shadowStyle: 0,
	      padding: 0,
	      backgroundColor: 'rgba(66, 134, 244, 0.5)',
	      borderColor: 'rgba(66, 134, 244, 0.5)',
	      borderRadius: 50,
	      arrowSize: 0,
	      minWidth: 48,
	      minHeight: 48,
	      maxWidth: 48,
	      maxHeight: 48,
	      borderWidth: 0,
	      disableAutoPan: true,
	      hideCloseButton: true,
	      arrowSize: 0,
	      backgroundClassName: 'transparent',
	      position: marker.position
			});
			if(response[i].bed[0].bed_avail == 0 && response[i].food[0].food_avail == 0){
				infoBubbles[i] = new InfoBubble({
		      map: map,
		      content: content[i],
		      shadowStyle: 0,
		      padding: 0,
		      backgroundColor: 'rgba(244, 100, 66, 0.5)',
		      borderColor: 'rgba(66, 134, 244, 0.5)',
		      borderRadius: 50,
		      arrowSize: 0,
		      minWidth: 48,
		      minHeight: 48,
		      maxWidth: 48,
		      maxHeight: 48,
		      borderWidth: 0,
		      disableAutoPan: true,
		      hideCloseButton: true,
		      arrowSize: 0,
		      backgroundClassName: 'transparent',
		      position: marker.position
				});
			}
			else if(response[i].bed[0].bed_avail == 0 || response[i].food[0].food_avail == 0){
				infoBubbles[i] = new InfoBubble({
		      map: map,
		      content: content[i],
		      shadowStyle: 0,
		      padding: 0,
		      backgroundColor: 'rgba(160, 134, 24, 0.5)',
		      borderColor: 'rgba(66, 134, 244, 0.5)',
		      borderRadius: 50,
		      arrowSize: 0,
		      minWidth: 48,
		      minHeight: 48,
		      maxWidth: 48,
		      maxHeight: 48,
		      borderWidth: 0,
		      disableAutoPan: true,
		      hideCloseButton: true,
		      arrowSize: 0,
		      backgroundClassName: 'transparent',
		      position: marker.position
				});
			}
			markers[i] = marker;
			infoBubbles[i].open(map, marker);
		}
	}});
  setTimeout(function() {
        window.location.reload(1);
      }, 60000);
}

//Helper function used for dealing with the logins
function toggleState(item){
	if($(item).attr("data-tog") == "0") {
		$(item).attr("data-tog","1");
	} 
	else {
		$(item).attr("data-tog", "0");
	}
}

$("#update").click( function(){
	var beds_update = $("#beds_update").val();
	var food_update = $("#food_update").val();
	var pdata = {
		beds_avail : beds_update,
		food_avail : food_update,
		user_id : usrId
	};
	if (beds_update === "" || food_update === ""){
		$("#updateMsg").empty();
		$("#updateMsg").append('<div class="failText">Failed</div>');
		return;
	}
	$.ajax({type:'POST', url: 'update_avail.php', data: pdata, dataType: 'json', success: function(response) {
		if(response.success){ 
			token=response.token;
			
			$("#updateMsg").empty();
			$("#updateMsg").append('<div class="successText">Success</div>');
		}
		else{
			$("#loginUserMsg").empty();
			$("#loginUserMsg").append('<div class="failText">'+response.message+'</div>');
		}
	}
});
});
