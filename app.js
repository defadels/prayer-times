function prayerTimes(latitude, longitude) {
    fetch('https://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=2')
    .then(response => response.json())
    .then(function(response) {

        let date  = new Date();
        let today = date.getDate();
        let data  = response.data[0].timings;
        
        let app         = getElementById('app');
        let table       = createElement('table');
        let tableTbody  = createElement('tbody');

        for(i in data) {
          let row        = tableTbody.insertRow();
          let name       = row.insertCell(0);
          let time       = row.insertCell(1);
          name.innerHTML = i;
          time.innerHTML = data[i];
          tableTbody.appendChild(row); 
        }

        table.appendChild(tableTbody);
        app.appendChild(table);

        
        // console.log(response.data[today]);
    });
}

function success(position) {
    prayerTimes(position.coords.latitude, position.coords.longitude);
}

function error() {
    alert('Posisi tidak dapat diakses');
}

function userLocation() {
    if(!navigator.geolocation) {
        alert('Geolocation tidak didukung dalam browser Anda. Silahkan gunakan browser lain');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}


function index() {
    let app = document.getElementById('app');
    let h3  = document.createElement('h3');
    h3.innerHTML = 'Prayer Times';
    
    app.appendChild(h3);

    userLocation();
}

index();