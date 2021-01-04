const mymap = L.map('IssMap').setView([0, 0], 1.5);


const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution = '&copy: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tiles = L.tileLayer(tileUrl, { attribution });

tiles.addTo(mymap);

const ISSIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    //iconAnchor: [25, 16],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

const marker = L.marker([0, 0], { icon: ISSIcon }).addTo(mymap);

const url = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;

const latlngs = [];

async function getISS() {
    
    const response = await fetch(url);
    const data = await response.json();

    const { latitude, longitude, altitude, velocity, visibility } = data;

    marker.setLatLng([latitude, longitude]);

    const alt = altitude * .621371;
    const vel = velocity * .621371;

    if (firstTime) {
        mymap.setView([latitude, longitude], 6);
        firstTime = false;
    }
    // document.getElementById('lat').textContent = latitude.toFixed(4);
    // document.getElementById('lon').textContent = longitude.toFixed(4);
    document.getElementById('vis').textContent = visibility;
    // document.getElementById('al').textContent = alt.toFixed(2);
    // document.getElementById('vel').textContent = vel.toFixed(2);


    var arr = [new Date().toLocaleString(), alt, vel, latitude, longitude];

    latlngs.push([latitude, longitude]);
    const polyline = L.polyline(latlngs, { color: 'red' }).addTo(mymap);

    //console.log(document.getElementById('mytable'));
    //var tb = document.getElementById('mytable');
    //console.log(tb.getElementsByTagName('tr')[0]);

    var td = document.querySelectorAll('td.value');
    var j = 0;

    //console.log(td[3].innerText = alt.toFixed(2) + ' miles');

    //console.log(td.length)


    for (var i = 0; i < td.length; i++) {

        i == 0 ? td[i].innerHTML = arr[i] : td[i].innerHTML = arr[i].toFixed(4);

    }

}

getISS();

setInterval(getISS, 1000);