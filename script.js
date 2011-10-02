/* JavaScript goes here */

jQuery(document).ready(function($) {
  initializeMap();
  initializeForm();
});

function initializeForm() {
  $("#address_form").submit(function(e){
    $.ajax({
      type: 'get',
      datatype: 'json',
      url: 'http://where.yahooapis.com/geocode',
      data: { 
        appid: '[yourappidhere]',
        flags: 'J',
        q: $("#address_input_field").val()
      },
      success: function(data, textStatus, jqXHR){        
        lat = data.ResultSet.Results[0].latitude;
        lng = data.ResultSet.Results[0].longitude;
        
        initializeMap(lat, lng);
		initializePics(lat, lng);
      },
      error: function(e){
        alert("AJAX call to API FAILED");
      }
    });
    return false;
  });
};

function initializeMap(lat, lng) {
  lat = lat || 	40.7550;
  lng = lng || -73.9866;
  
  var myOptions = {
    zoom: 14,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
}

function initializePics(lat, lng){
	lat = lat || 40.7550;
	lng = lng || -73.9866;
	
	var beaches = {'tag': 'beaches'};
	
	var myOptions = {
	  'width': 300,
	  'height': 200,
	};
	
	var wapiblock = document.getElementById('wapiblock');
	var widget = new panoramio.PhotoWidget(wapiblock, beaches, myOptions);
	widget.setPosition(0);
}
