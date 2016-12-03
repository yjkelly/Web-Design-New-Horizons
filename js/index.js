$(document).ready(function(){



  //using jQuery UI: https://jqueryui.com/datepicker/
  //adds a datepicker widget to a text input element

/*
  It does this by adding a click handler, to an input text
  When its clicked it draws a div containing a datepicker
  When the datepicker is chsen it will then place the date selcted
  as the value of the input box
*/

   $( "#arrive-time" ).datepicker();
   $( "#depart-time" ).datepicker();

   /*
      .hover(fun1, fun2)
      click handlers handle click events, activate when something happens, e.g. a mouseclick

   */

   //When the search button is hovered over
   $("#search-button").hover(function(){
     //animate the search button
     $("#search-button").animate({
        backgroundColor:'#30AC978', //change the background colour to this
     });
   },
    function(){
      $("#search-button").animate({
        backgroundColor:'#50c5b3'
      });
    });


    $('#snow-box').hover(function(){
        /* When I hover over snowsports*/

        //Make the red background colour, fill the image
        $('#snow-box .activity-title-bar').animate({
            width:'250px',
            height:'230px',
            top: '-255px'
        });

        //Make the text of the title large, and centre it
        $('#snow-box .activity-title-bar span').animate({
            top: '100px',
            fontSize: '30px'
        });
    }, function(){
        /* When I hover off snowsports */

        //Put the red title bar back to it's original position
        $('#snow-box .activity-title-bar').animate({
            width:'100%',
            height:'20px',
            top: '-40px'
        });

        //Put the title text back to the way it was originally
        $('#snow-box .activity-title-bar span').animate({
            top: '0',
            fontSize: '15px'
        });
    });
    $('#hike-box').hover(function(){
        /* When I hover over snowsports*/

        //Make the red background colour, fill the image
        $('#hike-box .activity-title-bar').animate({
            width:'250px',
            height:'230px',
            top: '-255px'
        });

        //Make the text of the title large, and centre it
        $('#hike-box .activity-title-bar span').animate({
            top: '100px',
            fontSize: '30px'
        });
    }, function(){
        /* When I hover off snowsports */

        //Put the red title bar back to it's original position
        $('#hike-box .activity-title-bar').animate({
            width:'100%',
            height:'20px',
            top: '-40px'
        });

        //Put the title text back to the way it was originally
        $('#hike-box .activity-title-bar span').animate({
            top: '0',
            fontSize: '15px'
        });
    });
    $('#off-box').hover(function(){
        /* When I hover over snowsports*/

        //Make the red background colour, fill the image
        $('#off-box .activity-title-bar').animate({
            width:'250px',
            height:'230px',
            top: '-255px'
        });

        //Make the text of the title large, and centre it
        $('#off-box .activity-title-bar span').animate({
            top: '100px',
            fontSize: '30px'
        });
    }, function(){
        /* When I hover off snowsports */

        //Put the red title bar back to it's original position
        $('#off-box .activity-title-bar').animate({
            width:'100%',
            height:'20px',
            top: '-40px'
        });

        //Put the title text back to the way it was originally
        $('#off-box .activity-title-bar span').animate({
            top: '0',
            fontSize: '15px'
        });
    });
    $('#water-box').hover(function(){
        /* When I hover over snowsports*/

        //Make the red background colour, fill the image
        $('#water-box .activity-title-bar').animate({
            width:'100%',
            height:'230px',
            top: '-255px'
        });

        //Make the text of the title large, and centre it
        $('#water-box .activity-title-bar span').animate({
            top: '100px',
            fontSize: '30px'
        });
    }, function(){
        /* When I hover off snowsports */

        //Put the red title bar back to it's original position
        $('#water-box .activity-title-bar').animate({
            width:'100%',
            height:'20px',
            top: '-40px'
        });

        //Put the title text back to the way it was originally
        $('#water-box .activity-title-bar span').animate({
            top: '0',
            fontSize: '15px'
        });
    });
    $('#bike-box').hover(function(){
        /* When I hover over snowsports*/

        //Make the red background colour, fill the image
        $('#bike-box .activity-title-bar').animate({
            width:'250px',
            height:'230px',
            top: '-255px'
        });

        //Make the text of the title large, and centre it
        $('#bike-box .activity-title-bar span').animate({
            top: '100px',
            fontSize: '30px'
        });
    }, function(){
        /* When I hover off snowsports */

        //Put the red title bar back to it's original position
        $('#bike-box .activity-title-bar').animate({
            width:'100%',
            height:'20px',
            top: '-40px'
        });

        //Put the title text back to the way it was originally
        $('#bike-box .activity-title-bar span').animate({
            top: '0',
            fontSize: '15px'
        });
    });




});



/*
bar
width: 100%;
height: 100%;
top: -255px;

text
width: 100%;
position: relative;
top: 119px;
*/
