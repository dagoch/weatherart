/*  
 *  getWeatherArt
 *  takes weather object as returned from simpleweather.js (using Yahoo's weather api)
 *  call Cooper-Hewitt museum's Coolection Api to pull a piece of artwork from the collection
 *  somehow related to today's weather, where you are....
 *
 */



function getWeatherArt(weather) {
	
	//alert("in getArt");

	// jquery ajax call to cooper hewitt museum api
	var token = 'ab2420224c8ad118c80f216fc888d045';  // sorry guys, should hide this server side somewhere, but this is quick-and-dirty

	var CHapi = "https://api.collection.cooperhewitt.org/rest/";
	var method = "method=cooperhewitt.search.objects";

	// Weather info
	var tempLow = weather.low; 
	var tempHigh = weather.high; 
	var yearRange = "19" + tempLow + "-19" + tempHigh; 
	var currentTemp = weather.temp;
	var currentCode = weather.code;
	console.log("Current weather: temp = "+currentTemp+" and code = "+currentCode+" which means "+weather.currently);


	var url = CHapi + "?" + method + "&access_token=" + token;
	url += "&has_images=true";  // Only get objects with images
	
	// Tried limiting search objects to years within the temperature range for the day, but this is 
	//  both too restrictive, and too abstract a connection
	//url += "&year_end="+yearRange;
	//url += "&year_start="+yearRange;

	//url += weather.currently+"+"+weather.forecast;  // tried doing this, but things like "partly cloudy" return results for 'partly'
	
	// so use some prepared search terms, based on the current weather code
	url += "&query="+queryFromCondition(currentCode);

	// some info for debugging
	var ch_out = $("#ch_output").html();
	console.log("Got from art: \n"+ch_out);
	ch_out += "<p>Querying API URL = " + url + "</p>\n";
	$("#ch_output").html(ch_out);	
	//$("#ch_output").show();
	
	// show 'loading' spinner
	$("#loading").show();

	// Call the museum api
	$.getJSON(url,
		function(resp) {
			 // log each key in the response data
			$.each( resp, function( key, value ) {
				console.log( key + " : " + value );
			});

			var artInfo = '';

			var numObjects = resp.total;
			ch_out += "<p>Found "+numObjects+" Objects</p>\n";
			var perPage = resp.per_page;
			if (numObjects>perPage) {
				numObjects = perPage;  // Don't pick an object that's not in the first page 
			}

			if (numObjects>0) {
				var pick = Math.floor(Math.random()*numObjects);
				console.log("Picking Object number "+pick);
				var yourObject = resp.objects[pick];
				console.log(JSON.stringify(yourObject));
				var objTitle = yourObject.title;
		 		var objUrl = yourObject.url;
		 		ch_out += '<p><a href="' + objUrl + '">' + objTitle + '</a></p>\n';

		 		// console.log(JSON.stringify(yourObject.images[0].b));
		 		// $.each(yourObject.images[0], function(key, value) {
		 		// 	console.log( key + " : " + value );
		 		// 	if (value.is_primary == 1) {
		 		// 		console.log("Primary url = "+value.url);
		 		// 	}
		 		// });
				var imageUrl = yourObject.images[0].b.url;
				var imageHeight = yourObject.images[0].b.height;
				$("#art").css('background-image', 'url(' + imageUrl + ')');
				$("#art").css('height',imageHeight);

				artInfo = '<p><a href="' + objUrl + '">' + objTitle + '</a></p>\n';
	 		} else {
	 			// no objects returned.  Bummer
	 			artInfo = 'No objects in the Cooper-Hewitt collection matched the current weather.  Try again later.';

	 		}
	 		$("#loading").hide();
			$("#ch_output").html(ch_out);	


			$("#art_info").html(artInfo);
			$("#art_info").show();


		}
	);
		
}

// Docs at http://simpleweatherjs.com

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
  $('.cant-geolocate').show();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});


function loadWeather(location, woeid) {
	$("#weather").show();
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
    	// default behavior (from sample code)
      // html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      // html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      // html += '<li class="currently">'+weather.currently+'</li>';
      // html += '<li>'+weather.tempAlt+'&deg;C</li></ul>';  
      
      html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<li class="currently">'+weather.currently+'</li>'; 

      $("#weather").html(html);

      $("#heading").html("Current "+weather.title);
      $("#heading").show();

      listAllInfo(weather); // debugging -- see all info from yahoo weather

      getWeatherArt(weather);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

function listAllInfo(weather) {
// takes weather object as returned from simpleweather.js (using Yahoo's weather api)
// lists all of the fields returned (for testing)

	var keys = Object.keys(weather);
	var len = keys.length;
	//alert(len + ' keys: ' + keys);
	var i =0;
	var str = "<ul>";
	for (var i=0; i<len; i++) {
		str += '<li>' + keys[i] + " = " + weather[keys[i]] + "</li>\n";
	}
	str += "</ul>";

	//alert (str);
	$("#allfields").html(str);
    //$("#allfields").show();
}



