var onLoad = function(){

  var url = 'https://api.punkapi.com/v2/beers';
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();

  request.addEventListener('load', function(){

    var beers = readBeers(this);
    console.log(beers);
    loadIntoDropdown(beers);
    displayDetails(beers[0]);
  })//addEventListener
}

var displayDetails = function(beer){
  //create the html we need
  var ul = document.createElement('ul');

  var liName = document.createElement('li');
  var liTagline = document.createElement('li');
  var liDescription = document.createElement('li');
  var liAbv = document.createElement('li');
  var img = document.createElement('img');

  //set the contents
  liName.innerText = beer.name;
  liTagline.innerText = beer.tagline;
  liDescription.innerText = beer.description;
  liAbv.innerText = beer.abv;
  img.src = beer.image_url;
  img.height = 200;

  //append the contents
  ul.appendChild(liName);
  ul.appendChild(liTagline);
  ul.appendChild(liDescription);
  ul.appendChild(liAbv);
  ul.appendChild(img);

  //attach ul to the div
  var div = document.getElementById('main');
  var existingUl = document.querySelector('ul');

  if (existingUl){
    div.replaceChild(ul, existingUl);
  } else {
    console.log("here!")
    div.appendChild(ul);
  }
}

var readBeers = function(request){
  var jsonString = request.responseText;
  var beers = JSON.parse(jsonString);
  return beers;
}

var loadIntoDropdown = function(beers){
  var div = document.getElementById('main');
  var selectorBox = document.createElement('select');

  beers.forEach(function(beer){
    var optionElement = document.createElement('option');
    optionElement.innerText = beer.name;
    selectorBox.appendChild(optionElement);

    selectorBox.onchange = function(){
      var index = this.selectedIndex;
      console.log("You've selected beer at index: ", index);
      displayDetails(beers[index]);
    }
  })
  div.appendChild(selectorBox);
}//loadIntoDropdown

window.addEventListener('load', onLoad);
