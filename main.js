// Get references to HTML elements
var selectBands = document.getElementById("bands");
var selectArtist = document.getElementById("artists");
var selectArtistDiv = document.getElementsByClassName("artists-menu")[0];

// Create XMLHttpRequest object to handle HTTP requests
var xhrBands = new XMLHttpRequest();
var res;

// Send a GET request to fetch data from "./rockbands.json"
xhrBands.open("GET", "./rockbands.json");
xhrBands.send();

// Add an event listener to handle the response when the request state changes
xhrBands.addEventListener("readystatechange", handelRequest);

// Callback function to handle the XMLHttpRequest response
function handelRequest() {
  // Check if the request is complete and successful
  if (xhrBands.readyState === 4 && xhrBands.status === 200) {
    // Parse the JSON response
    res = JSON.parse(xhrBands.response);

    // Loop through the bands and populate the first dropdown menu
    for (let key in res) {
      let opt = document.createElement("option");
      opt.innerText = key;
      opt.value = key;
      selectBands.append(opt);
    }
  }
}

// Add an event listener to handle the band selection change
selectBands.addEventListener("change", handelSelectBand);

// Callback function to handle band selection change
function handelSelectBand(e) {
  // Clear the artist dropdown if it already has options
  if (selectArtist.children.length > 1) {
    let empty = Array.from(selectArtist.children).splice(1);
    empty.forEach((child) => selectArtist.removeChild(child));
  }

  // Display the artist dropdown
  selectArtistDiv.style.display = "flex";

  // Get the selected band
  let selectedBand = e.target.value;

  // Get the array of artists for the selected band
  let artistsArr = res[selectedBand];

  // Loop through artists and populate the second dropdown menu
  for (let i = 0; i < artistsArr.length; i++) {
    let opt = document.createElement("option");
    opt.innerText = artistsArr[i].name;
    opt.value = artistsArr[i].value;
    selectArtist.append(opt);
  }
}

// Add an event listener to handle the artist selection change
selectArtist.addEventListener("change", handelSelectArtist);

// Callback function to handle artist selection change and open a new window
function handelSelectArtist(e) {
  window.open(e.target.value);
}
