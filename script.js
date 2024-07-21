
    const stopAlarmButton = document.getElementById('stopAlarm');
    const alarmAudio = document.getElementById('alarmAudio');
    const stationDropdown = document.getElementById('stationDropdown');
    // Map initialization 
    var map = L.map('map', {center:[51.505,-0.09], zoom: 13}).setView([14.0860746, 100.608406], 6);

    //osm layer
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

    if(!navigator.geolocation) {
        console.log("Your browser doesn't support geolocation feature!")
    } else {
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(getPosition)
        }, 5000);
    }

     // Define station names and their coordinates
     const stations = [
            { name: 'Kailash Colony', latitude:28.555313, longitude:77.241998},
            { name: 'Kalka Ji Mandir', latitude: 28.549474, longitude: 77.259088 },
            { name: 'GovindPuri', latitude: 28.544455, longitude:77.264206 },
            { name: 'Harkesh Nagar', latitude: 28.543082, longitude:77.275388 },
            { name: 'Jasola Apollo', latitude:28.538148, longitude:77.283241 },
            { name: 'Sarita vihar', latitude: 28.528581, longitude:77.288291 },
            { name: 'Nehru Place', latitude:28.551428, longitude:77.251723},
           
            // Add more stations as needed
        ];

        // Populate the dropdown menu with station names
        stations.forEach(station => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a class="dropdown-item" href="#" data-latitude="${station.latitude}" data-longitude="${station.longitude}">${station.name}</a>`;
            stationDropdown.appendChild(listItem);
        });

       //position javascript
    var marker, circle;

    function getPosition(position){
        // console.log(position)
        var lat = position.coords.latitude
        var long = position.coords.longitude
        var accuracy = position.coords.accuracy

        if(marker) {
            map.removeLayer(marker)
        }

        if(circle) {
            map.removeLayer(circle)
        }

        marker = L.marker([lat, long])
        circle = L.circle([lat, long], {radius: accuracy})

        var featureGroup = L.featureGroup([marker, circle]).addTo(map)

        map.fitBounds(featureGroup.getBounds())

        

        let  destinationLatitude = parseFloat(document.getElementById('latitude').value);
      let  destinationLongitude = parseFloat(document.getElementById('longitude').value);
    console.log(destinationLatitude)
    console.log(lat)
     // Add event listener to dropdown menu items
     const latitudeInput = document.getElementById('latitude');
        const longitudeInput = document.getElementById('longitude');
  
        stationDropdown.addEventListener('click', function(event) {
            if (event.target.classList.contains('dropdown-item')) {
                const latitude = event.target.dataset.latitude;
                const longitude = event.target.dataset.longitude;
                latitudeInput.value = latitude;
                longitudeInput.value = longitude;

            }
        });
//condition for test two coords equal or not------------------------------------------------

      if(destinationLatitude==lat) 
      {
          console.log("both long & lat are equal")
       if(destinationLongitude==long)
      {       
        
            alarmAudio.play();
            console.log('reached destination playing.');
        }
    }
        
 console.log("Your coordinate is: Lat: "+ lat +" Long: "+ long+ " Accuracy: "+ accuracy)


//test for stop alarm
    }
    stopAlarmButton.addEventListener('click', function() {
        alarmAudio.pause();
    });

