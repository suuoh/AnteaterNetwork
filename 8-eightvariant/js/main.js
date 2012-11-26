var map;
var markers = [];
var markersLatLng = [];
var xmlhttp;
var xmlDoc;
var filters = [
["city", ""],
["name", ""],
["zipcode", ""]];
var infowindow;
var sideboxhtml = "";
var pinDrop = false;
var mc;

// Custom marker image
var markerImage = "images/marker_anteater_small.png";

// Style Google Maps
// https://developers.google.com/maps/documentation/javascript/styling
var stylesArray = [{
    "featureType": "water",
    "stylers": [{
        "lightness": 14
    }]
}, {
    "featureType": "road",
    "stylers": [{
        "saturation": 100
    }, {
        "weight": 0.3
    }, {
        "hue": "#002bff"
    }]
}, {
    "featureType": "landscape",
    "stylers": [{
        "hue": "#00ff44"
    }]
}, {
    "featureType": "poi.school",
    "stylers": [{
        "saturation": 100
    }, {
        "hue": "#ffe500"
    }]
}];


function loadMap(divID) {
    var myOptions = {
        center: new google.maps.LatLng(33.646259, -117.842056),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: stylesArray,
		
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.TOP_RIGHT
        }
		
    };

    map = new google.maps.Map(document.getElementById(divID), myOptions);
	
    //var mcOptions = {gridSize: 50, maxZoom: 15};
	
    mc = new MarkerClusterer(map);
    

//var geocoder = new google.maps.Geocoder();

}


function populate(filter, input) {
    
    createXMLHttpRequest(function() {
        
        updatePinDrop(filter);
        xmlDoc = xmlhttp.responseXML;
        clearMarkers();
        sideboxhtml = "";
        var alumni = parseXML(xmlDoc);
        for (i in alumni) {
            var marker = createMarker(alumni[i]);
            if (marker) {
                markers.push(marker);
            }
        }
    });
    setBounds();
    
    sendXMLHttpRequest(getRequest(filter, input));
    
}


function sendXMLHttpRequest(request) {
    xmlhttp.open("GET", "andb-connect.php?" + request, true);
    xmlhttp.send();
}


function createXMLHttpRequest(callback) {
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback();
        }
    };
}


function updatePinDrop(filter) {
    // Set drop animation if there is no filter
    // This occurs on first load and on filter reset
    if (filter == "")
        pinDrop = true;
    else 
        pinDrop = false;
}


function parseXML(xml) {
    return xml.getElementsByTagName("alumnus");
}


function setBounds() {
    //  Create a new viewpoint bound
    var bounds = new google.maps.LatLngBounds();

    // If array is empty, focus map around UCI
    if (markersLatLng.length == 0) {
        markersLatLng.push(new google.maps.LatLng(33.70095,-117.710438));
        markersLatLng.push(new google.maps.LatLng(33.576899,-117.978916));
    }

    // Increase bounds for each marker
    for (i in markersLatLng) {
        bounds.extend(markersLatLng[i]);
    }

    // Fit bounds to the map
    map.fitBounds(bounds);
}


function getRequest(filter, input) {
    for (i in filters) {
        if (filters[i][0] == filter)
            filters[i][1] = input;
    }

    var request = "";
    for (i in filters) {
        if (filters[i][1] != "") {
            if (request != "")
                request += "&";
            request += filters[i][0] + "=" + filters[i][1];
        }
    }
    return request;
}


function createMarker(alumni) {
    var first_name = alumni.getAttribute("First_Name");
    var last_name = alumni.getAttribute("Last_Name");
    var class_year = alumni.getAttribute("Class_Year");
    var school_code = alumni.getAttribute("School_Code");
    var bus_title = alumni.getAttribute("Business_Title");
    var bus_name = alumni.getAttribute("Business_Name");
    var bus_street1 = alumni.getAttribute("Business_Street1");
    var bus_street2 = alumni.getAttribute("Business_Street2");
    var bus_city = alumni.getAttribute("Business_City");
    var bus_state = alumni.getAttribute("Business_State");
    var bus_zipcode = alumni.getAttribute("Business_Zipcode");
    var bus_phone = alumni.getAttribute("Business_Phone");
    var bus_lat = alumni.getAttribute("Business_Lat");
    var bus_lng = alumni.getAttribute("Business_Lng");


    // Generate HTML list for the results list on the side
    sideboxhtml +="<li> <a href='#'>" + bus_name + "<br/><span>" + bus_street1 + "<br />";
    sideboxhtml += bus_city + ", " + bus_state + " " + bus_zipcode + "<br />" + bus_phone + "</span> </a> </li>";
    var sidebox = document.getElementById("sidenav");
    sidebox.innerHTML = sideboxhtml;
    
    // Catch businesses with no latitude or longitude
    // Don't show these on the map but still list them in the results box
    if (bus_lat != "" || bus_lng != "") {
        var point = new google.maps.LatLng(parseFloat(bus_lat), parseFloat(bus_lng));

        // Add marker position to array
        markersLatLng.push(point);

        var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: markerImage,
            title: bus_name
        });
        
        // Do not have any animation when filtering
        if (pinDrop)
            marker.setAnimation(google.maps.Animation.DROP);
        else
            marker.setAnimation();


        var contentString = "<div id='infoWindow'>" +
        "<h2 id='firstHeading' class='firstHeading'>" + bus_name + "</h2>" +
        "<div id='bodyContent'>" + "" + first_name + " " + last_name +
        " (" + school_code + ", " + class_year + ")<br />" + bus_title + "<br />" + bus_name + "<br />" +
        bus_street1 + "<br />" + bus_city + ", " + bus_state + " " + bus_zipcode +
        "<br />" + bus_phone + "<br />";


        google.maps.event.addListener(marker, "click", function() {
            if (infowindow) infowindow.close();
            infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            infowindow.open(map, marker);
        });

        return(marker);
    }
    
    return false;

    

}


function clearMarkers() {
    if (markers) {
        for (i in markers) {
            markers[i].setMap(null);
        }
    }
    markers = [];
    markersLatLng = [];
}

// Incomplete
function codeAddress() {
    var address;
    geocoder.geocode(address, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geomtery.location
            });
        } else {
            if (debug) alert("Geocode was note successful: " + status);
        }
    });
}

function resetFilters() {
    clearMarkers();
    for (i in filters) {
        filters[i][1] = "";
    }
    populate("", "");
}

function clusterMarkers() {
    
   mc.addMarkers(markers);
}
