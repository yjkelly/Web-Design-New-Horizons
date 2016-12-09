var australia = [
  {
    title:"Local host family",
    picture:'<img src="./img/accommodation/localfamily.jpg" class="sub-activity-img" >',
    description:' Stay with a local family and immerse yourself in the culture',
    price:50
  },
  {
    title:"Local host",
    picture:'<img src="./img/accommodation/localhost.jpeg" class="sub-activity-img" >',
    description:"Experience life as one of the locals, gain an authentic experience",
    price:70
  },
  {
    title:'Camp Site',
    picture:'<img src="./img/accommodation/campsite.jpg" class="sub-activity-img" >',
    description:'For those who like to sleep under the stars',
    price:20
  }
];
var france = [];
var iceland = [];
var mexico = [];
var nepal = [];
var newZealand = [{
  title:"Hobbit hill",
  description:"",
  price:40
},
{
  title:"jungle thing",
  description:"",
  price:60
},{

}];
var turkey = [];

function writeActivities(category){
  $('#activity-container').html('');
  for(index in category){
    //make the hmtl string for the activity
    var activity = category[index];
    var htmlString = '<div class="sub-activity-box"><div class="sub-img-activity">'+activity['picture']+'</div><div class="sub-activity-title"><span class="activity-text" >'+activity['title']+'</span></div><div class="sub-activity-description"><p>'+activity['description']+'</p></div><div class="sub-activity-price-book"><span class="fa fa-eur">'+activity['price']+'</span><button onclick="updatePrice('+activity['price']+')" class="book-activity">Book</button></div></div>';
    $('#activity-container').append(htmlString); //add it to the end of the activity container box
  }
  $('.sub-activity-title').css({'background-color':'#FFA568'});
}


function updatePrice(price){
  var originalPrice=$("#accommodation-price").text(); //get the original price
  var newPrice = price + parseInt(originalPrice);
  $('#accommodation-price').text(newPrice);
  setCookie("accommodation-price",newPrice);
  var totalPrice = $('#tPrice').text();
  var newTotalPrice = parseInt(totalPrice)+price;
  $('#tPrice').text(newTotalPrice);
}


function updateAccommodation(acc){
  var sortBy = $('#sort option:selected').text();
  if(sortBy.indexOf("ASC")!=-1){
    var sortedAscending = australia.sort(function(a,b){return a['price']-b['price']});
    writeActivities(sortedAscending);
  }
  else{
    var sortedDescending = australia.sort(function(a,b){return b['price']-a['price']});
    writeActivities(sortedDescending);
  }
}

//When a user clicks next, this method will either reroute to the vaccination page or the store page
// depending on the destination the user selected
function vaccinationRequired(){
  var vaccineCountries = ['australia','mexico', 'nepal', 'new-zealand', 'turkey'];
  var destination = getCookie('destination');
  if(destination!=null){
    //taken from: http://stackoverflow.com/questions/6116474/how-to-find-if-an-array-contains-a-specific-string-in-javascript-jquery
    if($.inArray(destination, vaccineCountries) > -1){
      window.location="./vaccinations.html";
    }
    else{
      window.location="./store.html";
    }
  }
  else{
    //go to store page by default
    window.location="./store.html";
  }
}

$(document).ready(function(){

  var destination = getCookie("destination");
  if(destination!=null){
    $('#location-activities').text(destination);
  }

  var sortedAscending = australia.sort(function(a,b){return a['price']-b['price']});
  writeActivities(sortedAscending);

});
