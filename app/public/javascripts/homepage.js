
//create a map
function initMap() {
    //map options
    const defaultOption = {
        zoom: 12,
        center: { lat: -27.4705, lng: 153.0260 },
    };
    //new map 
    const map = new google.maps.Map(document.getElementById("map"), defaultOption); 

    const input = document.getElementById("searchInput");
    
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    //create loaction info window
    const infowindow = new google.maps.InfoWindow();

    //create a marker for location
    const marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -30)
    });



    autocomplete.addListener('place_changed', function(){
        infowindow.close();
        marker.setVisible(false);

        const place = autocomplete.getPlace();

        if(!place.geometry) {
            alert("Location contains no germetry");
            return;
        }

        if(place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        }else{
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71,71),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35,35)
        }));

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        let address = '';
        if(place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><button onclick="getImages(\'' + place.name + '\')">' + place.name + '</button><br>' + address);
        infowindow.open(map, marker);

    });
}

//backend server api on localhost 
const API_URL = "http://localhost:3000";

//get images from backend 
async function getImages(place) {
    let p = place.replaceAll(' ', '');
    const url = `${API_URL}/search/${p}/50`;
    await fetch(url).then((rsp) => {
        if(rsp.ok) {
            return rsp.json()
        } else {
            alert("there is no image for the location, try another one");
            throw new Error("there is no image for searched location");
        }
    }).then((data) => { 
        parsePhotoRsp(data)
        console.log(data)
    }
       
    ).catch((error) => {
        console.log(error.message)
    })
}

//get comments 
async function getComments(id) {

    const url = `${API_URL}/search/${id}`;

    await fetch(url).then((rsp) => {
        if(rsp.ok) {
            return rsp.json()
        } else {
            throw new Error("Something went wrong");
        }
    }).then((data) => { 
        console.log(data)
        parseCommentsRsp(data)
    }
    ).catch((error) => {
        console.log(error.message)
    })
}

//parse response then display comments 
function parseCommentsRsp(rsp) {
    let s = "";
    const appDiv = document.getElementById("comments");
    //if response does not have comments, display "image has no comments" 
    if('comment' in rsp.comments) {
        for (let i = 0; i < rsp.comments.comment.length; i++) {
            comment = rsp.comments.comment[i];
            s += `<p><strong>${comment.authorname}</strong>: ${comment._content}</p>`
        }
        appDiv.innerHTML = s;
    } else {
        appDiv.innerHTML = '<p>image has no comments</p>'
    }
    
    
    
}

//parse photo elements then render photos 
function parsePhotoRsp(rsp) {
    let s = "";
    for (let i = 0; i < rsp.photos.photo.length; i++) {
        photo = rsp.photos.photo[i];
        t_url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`;

        s += `<div id="image-container"><img alt="${photo.title}" src="${t_url}" onclick="getComments(${photo.id})" /><br><p>${photo.title}</p></div>`;
    }
    const appDiv = document.getElementById("results");
    appDiv.innerHTML = s;
}

//display visit count 
function displayCount(count) {
    const appDiv = document.getElementById("counter");
    appDiv.innerHTML = `<h2>Page Viewed: ${count} times </h2>`
}

fetch(`${API_URL}/count`).then((rsp) => 
    rsp.json()).then((data) => {
        console.log(data);
        displayCount(data);
    }).catch((err) => {
        console.log(err);
})