class Event {
    constructor(name, desc, group, start, end, dropdown, coords, pub) {
        this.m_name = name
        this.m_desc = desc
        this.m_group = group
        this.m_start = start
        this.m_end = end
        this.m_dropdown = dropdown
        this.m_coords = coords
        this.m_pub = pub;
    }
}
Event.prototype.list = function() {
    console.log(this.m_name);
    console.log(this.m_desc);
    console.log(this.m_group);
    console.log(this.m_start);
    console.log(this.m_end);
    console.log(this.m_dropdown);
    console.log(this.m_coords);
    console.log(this.m_pub);
}

var eventList = [];
var markerList = [];

var mymap = L.map('mapid').setView([41.3140, -72.9306], 16);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiZGF2aWRrYW80MSIsImEiOiJjazI2ejc2aXowOWJ0M2NucDdudnJrYTBoIn0.ngiIIEXkQrX-AiAYBI81JA'
}).addTo(mymap);

mymap.on('click', onMapClick);

function addMarker(e){
    // Add marker to map at click location; add popup window
    var newMarker = new L.marker(e.latlng).addTo(mymap);
    markerList.push(newMarker);
}

var popup = L.popup();

function onMapClick(e) {
    if (getComputedStyle(form,).display == "none"){
        popup
        .setLatLng(e.latlng)
        .setContent("Create an event? <input type='button' value='Event' onclick='div_show()'>")
        .openOn(mymap);
    } else if (getComputedStyle(form,).display == "block"){
        document.getElementById('form').style.display = "none";
        document.getElementById('form').reset();
    }
}

document.getElementById('form').onsubmit = function() {
    document.getElementById('form').style.display = "none";
    submit(
        document.getElementById('event_name').value,
        document.getElementById('event_description').value,
        "me",
        document.getElementById('time_start').value,
        document.getElementById('time_end').value,
        document.getElementById('dropdown').value,
        popup.getLatLng(),
        document.getElementById('public').value,
    )
    return false;
};

form1 = document.getElementById('form');
form1.addEventListener

function submit(name, desc, group, start, end, dropdown, latlng, public){
    var pub;
    if (public == false) {
        pub = "Private";
    }
    else {
        pub = "Public";
    }
    var coords = [latlng.lat, latlng.lng]
    var eventNew = new Event(name, desc, "me", start, end, dropdown, coords, pub)
    eventList.push(eventNew)

    var newPopup = L.popup(minWidth = 1000, maxWidth = 2000);
    newPopup
        .setContent(eventNew.m_name + '<br><br>' + eventNew.m_desc + '<br><br>' + eventNew.m_group + '<br><br>' + 'Time: ' + eventNew.m_start + '-' + eventNew.m_end + '<br><br>' + eventNew.m_dropdown + ' Event' + '<br><br>' + eventNew.m_pub )
        .setLatLng(coords)
    
    if (dropdown == 'General Interest'){
        var newMarker = new L.marker(latlng, {icon: blackIcon})
        .addTo(mymap)
        .bindPopup(newPopup)
        .openPopup()
    }
    if (dropdown == 'Music'){
        var newMarker = new L.marker(latlng, {icon: greenIcon})
        .addTo(mymap)
        .bindPopup(newPopup)
        .openPopup()
    }
    if (dropdown == 'Social'){
        var newMarker = new L.marker(latlng, {icon: blueIcon})
        .addTo(mymap)
        .bindPopup(newPopup)
        .openPopup()
    }
    if (dropdown == 'Food & Drinks'){
        var newMarker = new L.marker(latlng, {icon: orangeIcon})
        .addTo(mymap)
        .bindPopup(newPopup)
        .openPopup()
    }
    if (dropdown == 'Political'){
        var newMarker = new L.marker(latlng, {icon: redIcon})
        .addTo(mymap)
        .bindPopup(newPopup)
        .openPopup()
    }
    markerList.push(newMarker);

}




for(var i=0;i<markerList.length;i++){
    event=eventList[i]
    markerList[i].on("click",function(event){

    newPopup
        .setContent(event.m_name + '<br><br>' + event.m_desc + '<br><br>' + event.m_group + '<br><br>' + 'Time: ' + event.m_start + '-' + event.m_end + '<br><br>' + event.m_dropdown + ' Event' + '<br><br>' + event.m_pub )
        .setLatLng(event.m_coords)
        .openOn(mymap)
    });
}

function div_show() {
    document.getElementById('form').style.display = "block";
    document.getElementById('form').reset();
}

var blueIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-blue.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var redIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-red.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-green.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-orange.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-yellow.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var violetIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-violet.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greyIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-grey.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var blackIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-black.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});