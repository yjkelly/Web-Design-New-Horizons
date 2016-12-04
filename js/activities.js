var snowsports = [
  {
    title:"Skiing",
    description:"Ski across the snow-caped peaks and experience everything the mountains have to offer",
    picture:'<img src="./img/activities/skiing2.jpg" class="sub-activity-img" >',
    price:500
  },
  {
    title:"Snowboarding",
    description:"Enjoy our specialised snowboarding tours and experience something new",
    picture:'<img src="./img/activities/snowboarding.jpg" class="sub-activity-img">',
    price:800
  },
  {
    title:"Snowmobiling",
    description:"Race across the snowy mountains and enjoy beautiful landscapes",
    picture:'<img src="./img/activities/snowmobiling.jpg" class="sub-activity-img" >',
    price:1000
  }
];
var hiking = [
  {
    title:"Day Hike",
    description:"Take our challanging day hike across this rocky terrain",
    picture:'<img src="./img/activities/dayhike.jpg" class="sub-activity-img" >',
    price:200
  },
  {
    title:"Night Hike",
    description:"Take our night hike and explore the mountains in a whole new light",
    picture:'<img src="./img/activities/nighthike.jpg" class="sub-activity-img">',
    price:400
  },
  {
    title:"Extreme hike",
    description:"For experienced hikers explore challanging terrain and a new adventure",
    picture:'<img src="./img/activities/extremehike.jpg" class="sub-activity-img">',
    price:800
  }
];
var watersports = [
  {
    title:"Scuba Diving",
    description:"Explore new and exciting dive sites with our experienced divers",
    picture:'<img src="./img/activities/scubadiving2.jpg" class="sub-activity-img">',
    price:1000
  },
  {
    title:"Snorkeling",
    description:"Take this snorkeling tour and see what lies beneath the surface.",
    picture:'<img src="./img/activities/snorkeling.jpg" class="sub-activity-img">',
    price:500
  },
  {
    title:"White Water Rafting",
    description:"Experience this exhillarating ride throught the fast rapid rivers",
    picture:'<img src="./img/activities/whitewaterrafting.jpg" class="sub-activity-img">',
    price:400
  }
];
var biking = [
  {
    title:"Beginner Biking",
    description:"Experience our beginner biking tour to set you on the right path",
    picture:'<img src="./img/activities/beginnerbiking.jpg" class="sub-activity-img">',
    price:500
  },
  {
    title:"Intermediate Biking",
    description:"For those with more experience take our challanging tour with new routes",
    picture:'<img src="./img/activities/intermediatebiking.jpg" class="sub-activity-img">',
    price:800
  },
  {
    title:"Extreme Biking",
    description:"Experience our off road biking tour with rough terrain and extreme conditions",
    picture:'<img src="./img/activities/extremebiking.jpg" class="sub-activity-img">',
    price:1000
  }
];
var offroading = [
  {
    title:"Guided Tour",
    description:"Take our guided tour in our 4x4 vehicles, no path is too treacherous",
    picture:'<img src="./img/activities/guidedoffroad.jpg" class="sub-activity-img">',
    price:500
  },
  {
    title:"Mountain Offroad",
    description:"Experince our mountain offroad tour and climb the peaks and valleys",
    picture:'<img src="./img/activities/mountainoffroad.jpeg" class="sub-activity-img">',
    price:800
  },
  {
    title:"River Offroad",
    description:"Follow the river to its source in our new offroad tour",
    picture:'<img src="./img/activities/river-offroad.jpg" class="sub-activity-img">',
    price:1000
  }
];


function writeActivities(category){
  for(index in category){
    //make the hmtl string for the activity
    var activity = category[index];
    var htmlString = '<div class="sub-activity-box"><div class="sub-img-activity">'+activity['picture']+'</div><div class="sub-activity-title"><span class="activity-text" >'+activity['title']+'</span></div><div class="sub-activity-description"><p>'+activity['description']+'</p></div><div class="sub-activity-price-book"><span class="fa fa-eur">'+activity['price']+'</span><button onclick="updatePrice('+activity['price']+')" class="book-activity">Book</button></div></div>';
    $('#activity-container').append(htmlString); //add it to the end of the activity container box
  }

}

function updatePrice(price){
  var originalPrice=$("#activity-price").text(); //get the original price
  var newPrice = price + parseInt(originalPrice);
  $('#activity-price').text(newPrice);
  setCookie("activity-price",newPrice);
  var totalPrice = $('#tPrice').text();
  var newTotalPrice = parseInt(totalPrice)+price;
  $('#tPrice').text(newTotalPrice);
}

//called when the dropdown list is triggered
//sorting from: http://www.w3schools.com/jsref/jsref_sort.asp
function updateActivities(){
  //get the current activity
  $('#activity-container').html("");
  var activityCategory = getCookie("category");
  var activities = [];

  //what array to use
  switch(activityCategory){
    case "snowsports":
        activities = snowsports;
      break;
    case "hiking":
        activities = hiking;
      break;
    case "watersports":
        activities = watersports;
      break;
    case "biking":
        activities = biking;
      break;
    case "offroading":
        activities = offroading;
      break;
    default:
        //TODO: throw some error for unknown categories
      break;
    }

    //find out is it ascending or descending
    //get the current selected dropdown value
    var sortBy = $('#sort option:selected').text();
    if(sortBy.indexOf("ASC")!=-1){
      var sortedAscending = activities.sort(function(a,b){return a['price']-b['price']});
      writeActivities(sortedAscending);
    }
    else{
      var sortedDescending = activities.sort(function(a,b){return b['price']-a['price']});
      writeActivities(sortedDescending);
    }

    //reapply the correct color for the titles
    switch(activityCategory){
      case "snowsports":
          $('.sub-activity-title').css({'background-color':'#FF7068'});
        break;
      case "hiking":
          $('.sub-activity-title').css({'background-color':'#50C5B1'});
        break;
      case "watersports":
          $('.sub-activity-title').css({'background-color':'#5F80CB'});
        break;
      case "biking":
          $('.sub-activity-title').css({'background-color':'#97EC60'});
        break;
      case "offroading":
          $('.sub-activity-title').css({'background-color':'#FFA568'});
        break;
      default:
          //TODO: throw some error for unknown categories
        break;
    }

}

$(document).ready(function(){
  //get the destination and category cookies
  //and figure out what activities to load


  var destination = getCookie("destination");
  var activityCategory = getCookie("category");
  console.log(activityCategory);
  $('#location-activities').text(destination);
  //first check are the destination and category compatible
  //mexico snowsports
  if(destination=="Mexico" && activityCategory=="snowsports"){
    //TODO: throw some kind of error at the user
  }
  else{
    switch(activityCategory){
      case "snowsports":
          $('#activity-num').text(snowsports.length);
          $('#activity-type').text("Snowsports");
            //sort by price ascending
            var sortedSnowsports = snowsports.sort(function(a,b){a['price']-b['price']});
            writeActivities(sortedSnowsports); //write the elements on screen
          //set the backgroudn color for the title
          $('.sub-activity-title').css({'background-color':'#FF7068'});

        break;
      case "hiking":
          $('#activity-num').text(hiking.length);
          $('#activity-type').text("Hiking");
          var sortedHiking = hiking.sort(function(a,b){a['price']-b['price']});
          writeActivities(sortedHiking);
          $('.sub-activity-title').css({'background-color':'#50C5B1'});

        break;
      case "watersports":
          $('#activity-num').text(watersports.length);
          $('#activity-type').text("Watersports");
          var sortedWater = watersports.sort(function(a,b){a['price']-b['price']});
          writeActivities(sortedWater);
          $('.sub-activity-title').css({'background-color':'#5F80CB'});

        break;
      case "biking":
          $('#activity-num').text(biking.length);
          $('#activity-type').text("Biking");
          var sortedBiking = biking.sort(function(a,b){a['price']-b['price']});
          writeActivities(sortedBiking);
          $('.sub-activity-title').css({'background-color':'#97EC60'});

        break;
      case "offroading":
          $('#activity-num').text(offroading.length);
          $('#activity-type').text("Offroading");
          var sortedOff = offroading.sort(function(a,b){a['price']-b['price']});
          writeActivities(sortedOff);
          $('.sub-activity-title').css({'background-color':'#FFA568'});

        break;
      default:
          //TODO: throw some error for unknown categories
        break;
    }
  }


  $('.book-activity').hover(function(){
    $(this).animate({
      backgroundColor:'#005E82'
    });

  },
  function(){
    $(this).animate({
      backgroundColor:'#00AEF3'
    });
  });
});
