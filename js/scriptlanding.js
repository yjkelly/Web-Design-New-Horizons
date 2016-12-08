var mousePos;
	var imx=[]; // horizontal position of each image
	var img=[];
var mastercounter=0;
var sliderDest=[];
var slidercanvas;
var slidercontext;
var destination="";
var source="Dublin";
var onewayreturn="";
var holddata;
var searchString="";
var selected=0;
var selectedArray=[];
var counter=-1;
var asleep=0;

var leaveday="";
var leavemonth="";
var leaveyear="";
var leavetime="";

var returnday="";
var returnmonth="";
var returnyear="";
var returntime="";

//http://stackoverflow.com/questions/11589387/load-txt-file-using-jquery-or-ajax
//We use this code to hold data we may need to display on the page
var datastore = {

    fileContents:"Null",
    pagePrefix:"Null",
    slides:"Null",

    init: function () {
        $.ajax({
            url: "data2.txt",
            async: true,
            success: function (data){
                datastore.fileContents = data;
		holddata=data;
		}
        });
    }
};



      function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, 300,50);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }

      function writeMessage2(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(300, 0, 600,50);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 310, 25);
      }

      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
	var cnames=['Iceland','France','Nepal','New Zealand','Mexico','Australia','Turkey'];
	var cnames2=['Reykjavik','Paris','Kathmandu','Wellington','Mexico City','Sydney','Ankara'];
	var cnames3=['iceland','France','Nepal','new zealand','Mexico','Aussie','Turkey'];
	var cimages=['iceland1.jpg','france1.jpg','nepal1.jpg','newzealand1.jpg','mexico1.jpg','australia1.jpg','turkey1.jpg'];
	var cdesc=['iceland:','france:','nepal:','newzealand:','mexico:','australia:','turkey:'];
	var radius = 3;
	var closest_place=0;
	var closest_distance = 100000;
      var xpos=[424,474,713,962,172,898,560]; 
      var ypos=[158,228,299,544,323,507,259];
	canvas.addEventListener('click', function() {
		if (destination.length>1)
			gotoUrl("activities.html");
	});
	for (i = 0 ; i<xpos.length;i++)
	{
      context.beginPath();
      context.arc(xpos[i],ypos[i], radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'red';
      context.fill();
	}	

      canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	//writeMessage(canvas, message);
	closest_place=0;
	closest_distance=100000;
	for (i = 0 ; i<xpos.length;i++)
	{
      context.beginPath();
      context.arc(xpos[i],ypos[i], radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'red';
      context.fill();
      distance = (mousePos.x-xpos[i])*(mousePos.x-xpos[i])+(mousePos.y-ypos[i])*(mousePos.y-ypos[i]);
      if (distance<closest_distance)
		{
		closest_distance=distance;
		closest_place=i;
		}
      }
	if (closest_distance<60)
		{
//		writeMessage2(canvas,'Place: ' +closest_place);
		document.getElementById("pname").innerHTML = cnames[closest_place];
		document.getElementById("pimage").innerHTML = '<img src="img/' + cimages[closest_place]+ '" width=75%>';
		descriptionData2(cdesc[closest_place]);
		destination=cnames[closest_place];
		updateCookie("destination",cnames[closest_place].toLowerCase());
		//updateOptions();
		document.getElementById("plink").color = "white";
		}
	}, false);

window.onload = function() {
	updateCookie("destination",null);
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img=document.getElementById("mapmono");
    ctx.drawImage(img,0,0,c.width,c.height);
      var xpos=[424,474,713,962,172,898,560]; 
      var ypos=[158,228,299,544,323,507,259];

//	Old temporary locations
//      var xpos=[449,474,494,470,500,267,127,234,863,898,344]; 
//      var ypos=[208,228,179,254,250,247,268,303,261,507,456];
	for (i = 0 ; i<xpos.length;i++)
	{
      context.beginPath();
      context.arc(xpos[i],ypos[i], radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'red';
      context.fill();
	}	
};

	function descriptionData2(place)
	{
	var q=0,qw=0,success=0;
	result="";

	// search holddata for our label tag
	index=holddata.search(place);
	
	// then set result to be whatever is on the rest of that line 
	index=index+place.length;
	while (holddata[index]!='\n')
		{
		result=result+holddata[index];
		index++;
		}

	// update the html in a div to be whatever is in result
	asleep=1;
	updateHtml("pdesc",result);
	}
	function guideData(place)
	{
	var q=0,qw=0,success=0;
	result="";

	// search holddata for our label tag
	index=holddata.search(place);
	
	// then set result to be whatever is on the rest of that line 
	index=index+place.length;
	while (holddata[index]!='\n')
		{
		result=result+holddata[index];
		index++;
		}
	// update the html in a div to be whatever is in result
	asleep=1;
	updateHtml("sliderpop",result);
	}

function updateHtml(id,newdata){
	document.getElementById(id).innerHTML = newdata;
	}

    function handle(e){
	result2="";
        if(e.keyCode == 13 || e.keyCode == 9){
            e.preventDefault(); // Ensure it is only this code that runs
	}
//	alert(e.keyCode);
	keypressed=e.keyCode
	if (keypressed == 13)
		{
		keypressed =9;
		if (clearoptions==1)
			{
			gotoUrl("activities.html");
			}
		clearoptions =1;
		}
	else clearoptions=0;
	if (keypressed >64 && keypressed <91)
		{
		keypressed=keypressed+32;
		}
	if (keypressed == 8||keypressed==36)
		{
		selected=0;
		searchString=searchString.slice(0,-1);
		}	
	else if (keypressed == 9&& counter>-1)
		{
		updateinput(selectedArray[selected]);
		highlightdiv();
		}
	else if (keypressed == 40)
		{
		selected=selected+1;
		if (selected>counter)
			selected=counter;
		}
	else if (keypressed == 38)
		{
		selected=selected-1;
		if (selected<0)
			selected=0;
		}
	else if (keypressed>95&&keypressed<123)
		{
		searchString=searchString+String.fromCharCode(keypressed);
		}

	counter=-1;
	if (searchString.length>0)
	{
	for (q=0;q<cnames.length;q++)
		{
		success=0;
		success2=0;
		success3=0;
		lower=cnames[q].toLowerCase();
		lower2=cnames2[q].toLowerCase();
		lower3=cnames3[q].toLowerCase();
		for (qw=0;qw<cnames[q].length;qw++)
			{	
			if (qw>searchString.length)
				break;
			if (lower[qw]==searchString[qw])
				success++;
			}	
		for (qw=0;qw<cnames2[q].length;qw++)
			{	
			if (qw>searchString.length)
				break;
			if (lower2[qw]==searchString[qw])
				success2++;
			}	
		for (qw=0;qw<cnames3[q].length;qw++)
			{	
			if (qw>searchString.length)
				break;
			if (lower3[qw]==searchString[qw])
				success3++;
			}	
		if (success==searchString.length||success2==searchString.length||success3==searchString.length)		
			{
			counter++;
			selectedArray[counter]=q;
			result2=result2+"<div class='";
			if (selected==counter)
				result2=result2+"highlight'>"
			else result2=result2+"normal'>"
			result2=result2+cnames[q]+", "+cnames2[q]+"</div>";
				asleep=1;
			updateHtml("searchpop",result2);
			}
		}
	}
if (result2.length>0&&clearoptions==0)
	visible("searchpop");
else
	hidden("searchpop");
}

function visible(id){
    document.getElementById(id).style.display = "block";
}

function hidden(id){
    document.getElementById(id).style.display = "none";
}

function updateinput(place){
	document.forms["maplocator"]["place"].value = cnames[place];
	document.getElementById("pname").innerHTML = cnames[place];
	document.getElementById("pimage").innerHTML = '<img src="img/' + cimages[place]+ '" width=270px>';
	descriptionData2(cdesc[place]);
	destination=cnames[place];
	updateCookie("destination",cnames[place].toLowerCase());
	//updateOptions();
	document.getElementById("plink").color = "white";
	tempString= cnames[place].toLowerCase();
	searchString=tempString;
}

function whatPlace(){
        var place=getCookie("destination");
        if (place=='dublin')
                {  updateHtml("testplace","You selected Dublin, right?");}
        else if (place=='rome')
                {  updateHtml("testplace","You selected Rome, right?");}
        else 
                {  place=place+" activities go here";
			updateHtml("testplace",place);}
        }
function updateCookie(nameofcookie,cookiedata){
	str=nameofcookie+"=";
	str=str+cookiedata;
	document.cookie=str;
}  
function updateOptions(){
	deststr="<div class='flyingtext'>Flying to:</div> <select id ='flightselect' onchange='updateDest();'>"
	for (var q=0;q<cnames.length;q++)
		{
		if (cnames[q]!=destination)
			deststr = deststr + "<option value = '" + cnames[q]+ "'>" + cnames[q] + "</option>";
		else deststr = deststr + "<option value = '" + cnames[q] + "' selected>" + cnames[q] + "</option>"; 
		}
	deststr=deststr + "</select>";
	updateHtml("destoptions",deststr);
}

function updateDest(){
var e = document.getElementById("flightselect");
var str = e.options[e.selectedIndex].text;
destination=str;
updateCookie("destination",str.toLowerCase());
}

function updateSource(){
var e = document.getElementById("flightsourceselect");
var str = e.options[e.selectedIndex].text;
source=str;
updateCookie("source",str.toLowerCase());
}

function updateLeaveDay(){
var e = document.getElementById("leaveday");
var str = e.options[e.selectedIndex].text;
updateCookie("leaveday",str);
leaveday=str;
}
function updateLeaveMonth(){
var e = document.getElementById("leavemonth");
var str = e.options[e.selectedIndex].text;
updateCookie("leavemonth",str);
leavemonth=str;
}
function updateLeaveYear(){
var e = document.getElementById("leaveyear");
var str = e.options[e.selectedIndex].text;
updateCookie("leaveyear",str);
leaveyear=str;
}
function updateLeaveTime(){
var e = document.getElementById("leavetime");
var str = e.options[e.selectedIndex].text;
updateCookie("leavetime",str);
leavetime=str;
}
function updatereturnDay(){
var e = document.getElementById("returnday");
var str = e.options[e.selectedIndex].text;
updateCookie("returnday",str);
returnday=str;
}
function updatereturnMonth(){
var e = document.getElementById("returnmonth");
var str = e.options[e.selectedIndex].text;
updateCookie("returnmonth",str);
returnmonth=str;
}
function updatereturnYear(){
var e = document.getElementById("returnyear");
var str = e.options[e.selectedIndex].text;
updateCookie("returnyear",str);
returnyear=str;
}
function updatereturnTime(){
var e = document.getElementById("returntime");
var str = e.options[e.selectedIndex].text;
updateCookie("returntime",str);
returntime=str;
}


function getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++)
                {
                var c = ca[i].trim();
                if (c.indexOf(name)==0)
                        return c.substring(name.length,c.length);
                }
}

        $(document).ready(function (){
            $("#click").click(function (){
                $('html, body').animate({
                    scrollTop: $("#newcontainer").offset().top
                }, 1000);
            });
            $("#plink").click(function (){
		if (destination.length>1)
		gotoUrl("activities.html");

            });

        });

//Makes our link flash briefly
function highlightdiv(){
	$('#plink').animate({    'opacity': '0.4'}, 500);
	$('#plink').animate({    'opacity': '1.0'}, 500);
	$('#plink').animate({    'opacity': '0.4'}, 500);
	$('#plink').animate({    'opacity': '1.0'}, 500);
}

function gotoUrl(url){
	window.location.href=url;
}

function appear(id){
document.getElementById(id).style.display='block';
}
function disappear(id){
document.getElementById(id).style.display='none';
}
function oneway(x){
if (x==1)
	{
	onewayreturn="oneway";
	returnday="";
	updateCookie("returnday",null);
	returnmonth="";
	updateCookie("returnmonth",null);
	returnyear="";
	updateCookie("returnyear",null);
	returntime="";
	updateCookie("returntime",null);
	}
else onewayreturn="return";
}
function slowappear(id){
$(id).fadeIn('slow');
}
function slowdisappear(id){
$(id).fadeOut('slow');
}

function checkDates(){
//clear the error div if there's anything in it
updateHtml("errorflight","");

//Also check if the destination and source are the same
if (destination==source)
	{
	updateHtml("errorflight","You can travel to and from the same place any time you like<br>You're doing it right now!<br>Check above and make sure both places are different.");
	return;
	}


updateLeaveDay();
updateLeaveMonth();
updateLeaveYear();
updateLeaveTime();

if (onewayreturn=="return")
	{
	updatereturnDay();
	updatereturnMonth();
	updatereturnYear();
	updatereturnTime();
	}

var montharray=["January","February","March","April","May","June","July","August","September","October","November","December"];
var dayarray=[31,29,31,30,31,30,31,31,30,31,30,31];

var tmplday=parseInt(leaveday);
for (var counter=0;counter<montharray.length;counter++)
	{
	if (leavemonth==montharray[counter])
		var tmplmonth=counter;
	}
var tmplyear=parseInt(leaveyear);
var tmpltime=parseInt(leavetime);
var tmpleave=10000*tmplyear+750*tmplmonth+24*tmplday+tmpltime;

if(onewayreturn=="return")
	{
	var tmprday=parseInt(returnday);
	for (var counter=0;counter<montharray.length;counter++)
		{
		if (returnmonth==montharray[counter])
			var tmprmonth=counter;
		}
	var tmpryear=parseInt(returnyear);
	var tmprtime=parseInt(returntime);		
	var tmpreturn=10000*tmpryear+750*tmprmonth+24*tmprday+tmprtime;
	if (tmpreturn<tmpleave)
		{
		updateHtml("errorflight","Temporal Prime Directive:<br>" + "Returning before you leave is not allowed");
		return;
		}
	else if (tmpreturn==tmpleave)
		{
		updateHtml("errorflight","Problem: You're attempting to leave and return at the same time<br>" + "This is bad for your digestion.");
		return;
		}
	}
if (dayarray[tmplmonth]<tmplday)
	{
	updateHtml("errorflight","There is a small problem with your departure date:<br>" + leavemonth + " only has " + dayarray[tmplmonth] + " days");	
		return;
	}
if (onewayreturn=="return")
	{
	if (dayarray[tmprmonth]<tmprday)
		{
		updateHtml("errorflight","There is a small problem with your Return date:<br>" + returnmonth + " only has " + dayarray[tmprmonth] + " days");	
		return;
		}

	}
if (onewayreturn=="return")
		updateHtml("errorflight","These look good!<br><button id='cheap' onclick='cheapflights()'>Find Affordable Flights</button> or <button id='fancy' onclick='flightsoffancy()'>Find Luxurious Flights</button>");	
else
		updateHtml("errorflight","This looks good!<br><button id='cheap' onclick='cheapflights()'>Find Affordable Flights</button> or <button id='fancy' onclick='flightsoffancy()'>Find Luxurious Flights</button>");	


}

function cheapflights(){

var baseprice=0;
for (q=0;q<cnames.length;q++)
	{
	if (cnames[q]==source)
		var tmpsource=q;
	if (cnames[q]==destination)
		var tmpdestination=q;
	}
var tmpdist=Math.sqrt((xpos[tmpsource]-xpos[tmpdestination])*(xpos[tmpsource]-xpos[tmpdestination])+(ypos[tmpsource]-ypos[tmpdestination])*(ypos[tmpsource]-ypos[tmpdestination]));
baseprice=Math.round(tmpdist);
if (onewayreturn=="return")
baseprice=Math.round(baseprice*1.6);
//we're going to generate 4 flights to choose from
var flightdata="";
flightdata=flightdata+"Click a flight below<br>"
flightdata=flightdata+"<div id='flightdetails' onclick='highdetail();'><div class='airlinelogo'><img src='plane1.jpg' width=80%></div><div class='airline'>Cheapo Airlines</div>"
if (onewayreturn=="return")
{
flightdata=flightdata+"<div class='routereturn'>";
flightdata=flightdata+source+" -> " +destination+"<br>"+leaveday+" "+leavemonth+" "+leaveyear+" "+leavetime+"<br><br>";
flightdata=flightdata+destination+" -> " +source+"<br>"+returnday+" "+returnmonth+" "+returnyear+" "+returntime+"<br><br>";
}
else
{
flightdata=flightdata+"<div class='routeoneway'>";
flightdata=flightdata+source+" -> " +destination+"<br>"+leaveday+" "+leavemonth+" "+leaveyear+" "+leavetime+"<br><br>";
}
flightdata=flightdata+ "</div><div class='price'>&euro;"+baseprice;
flightdata=flightdata+"</div><div class='rad'><input type='radio' name='chosenflight' value='2'></input></div></div>"

flightdata=flightdata+"<div id='flightdetails2' onclick='highdetail2();'><div class='airlinelogo'><img src='plane2.jpg' width=80%></div><div class='airline'>Budget Airlines</div>"
if (onewayreturn=="return")
{
flightdata=flightdata+"<div class='routereturn'>";
flightdata=flightdata+source+" -> " +destination+"<br>"+leaveday+" "+leavemonth+" "+leaveyear+" "+leavetime+"<br><br>";
flightdata=flightdata+destination+" -> " +source+"<br>"+returnday+" "+returnmonth+" "+returnyear+" "+returntime+"<br><br>";
}
else
{
flightdata=flightdata+"<div class='routeoneway'>";
flightdata=flightdata+source+" -> " +destination+"<br>"+leaveday+" "+leavemonth+" "+leaveyear+" "+leavetime+"<br><br>";
}
flightdata=flightdata+ "</div><div class='price'>&euro;"+Math.round(baseprice*1.2);
flightdata=flightdata+"</div><div class='rad'><input type='radio' name='chosenflight' value='3'></input></div></div>"

flightdata=flightdata+"<div id='flightdetails3' onclick='highdetail3();'><div class='airlinelogo'><img src='plane3.jpg' width=80%></div><div class='airline'>Fast Travel</div>"
if (onewayreturn=="return")
{
flightdata=flightdata+"<div class='routereturn'>";
flightdata=flightdata+source+" -> " +destination+"<br>"+leaveday+" "+leavemonth+" "+leaveyear+" "+leavetime+"<br><br>";
flightdata=flightdata+destination+" -> " +source+"<br>"+returnday+" "+returnmonth+" "+returnyear+" "+returntime+"<br><br>";
}
else
{
flightdata=flightdata+"<div class='routeoneway'>";
flightdata=flightdata+source+" -> " +destination+"<br>"+leaveday+" "+leavemonth+" "+leaveyear+" "+leavetime+"<br><br>";
}
flightdata=flightdata+ "</div><div class='price'>&euro;"+Math.round(baseprice*1.4);
flightdata=flightdata+"</div><div class='rad'><input type='radio' name='chosenflight' value='4'></input></div></div>"

flightdata=flightdata+"<div id='flightdetails4' onclick='highdetail4();'><div class='airlinelogo'><img src='plane4.jpg' width=80%></div><div class='airline'>Sleek Air</div>"
if (onewayreturn=="return")
{
flightdata=flightdata+"<div class='routereturn'>";
flightdata=flightdata+source+" -> " +destination+"<br>"+leaveday+" "+leavemonth+" "+leaveyear+" "+leavetime+"<br><br>";
flightdata=flightdata+destination+" -> " +source+"<br>"+returnday+" "+returnmonth+" "+returnyear+" "+returntime+"<br><br>";
}
else
{
flightdata=flightdata+"<div class='routeoneway'>";
flightdata=flightdata+source+" -> " +destination+"<br>"+leaveday+" "+leavemonth+" "+leaveyear+" "+leavetime+"<br><br>";
}
flightdata=flightdata+ "</div><div class='price'>&euro;"+Math.round(baseprice*1.6);
flightdata=flightdata+"</div><div class='rad'><input type='radio' name='chosenflight' value='1'></input></div></div>"


updateHtml("flightrightcontent",flightdata);

}

function flightsoffancy(){

}

function highdetail(){
document.getElementById("flightdetails").style.backgroundColor="#dfd";
document.getElementById("flightdetails2").style.backgroundColor="#fff";
document.getElementById("flightdetails3").style.backgroundColor="#fff";
document.getElementById("flightdetails4").style.backgroundColor="#fff";
}
function highdetail2(){
document.getElementById("flightdetails").style.backgroundColor="#fff";
document.getElementById("flightdetails2").style.backgroundColor="#dfd";
document.getElementById("flightdetails3").style.backgroundColor="#fff";
document.getElementById("flightdetails4").style.backgroundColor="#fff";
}
function highdetail3(){
document.getElementById("flightdetails").style.backgroundColor="#fff";
document.getElementById("flightdetails2").style.backgroundColor="#fff";
document.getElementById("flightdetails3").style.backgroundColor="#dfd";
document.getElementById("flightdetails4").style.backgroundColor="#fff";
}
function highdetail4(){
document.getElementById("flightdetails").style.backgroundColor="#fff";
document.getElementById("flightdetails2").style.backgroundColor="#fff";
document.getElementById("flightdetails3").style.backgroundColor="#fff";
document.getElementById("flightdetails4").style.backgroundColor="#dfd";
}

$(document).ready(function(){
  setTimeout(function(){
      $('#faded').fadeIn('slow');
    },1500); //1.5 seconds
});
$(document).ready(function(){
  setTimeout(function(){
      $('#faded2').fadeIn('slow');
    },2500); //2.5 seconds
});
function showabout()
{
slowappear('#about');
slowappear('#aboutdarken');
}
function hideabout()
{
slowdisappear('#about');
slowdisappear('#aboutdarken');
}
function hideslider()
{
slowdisappear('#sliderpop');
slowdisappear('#sliderdarken');
  setTimeout(function(){
document.getElementById("sliderdarken").style.zIndex="-999";
document.getElementById("sliderpop").style.zIndex="-1000";
	},500);
	
}

//Yvette's cool code idea for the sun
$(document).ready(function(){
  setTimeout(function(){
    $('#sun').animate({
      top:'64px'
    },2500);
  },2000);
  setTimeout(function(){
    $('#sun').animate({
      width:'50px',
    },{queue:false},1500);
  },4500);
  setTimeout(function(){
    $('#sun').animate({
      height:'50px',
    },{queue:false},1500);
  },4500);
  setTimeout(function(){
    $('#sun').animate({
      top:'59px',
    },{queue:false},1500);
  },4500);
  setTimeout(function(){
    $('#sun').animate({
      left:'275px',
    },{queue:false},1500);
  },4500);
  setTimeout(function(){
    $('#sun').fadeOut('slow');
  },5000);
 setTimeout(function(){
    $('#cover').animate({
      opacity:0.2,
    },300);
  },4700);
 setTimeout(function(){
document.getElementById("cover").style.zIndex = "1000";
  },4700);
 setTimeout(function(){
    $('#cover').animate({
      opacity:0.0,
    },300);
  },5000);
 setTimeout(function(){
document.getElementById("cover").style.zIndex = "-1000";
  },5300);
  setTimeout(function(){
	updateHtml("imagechange","<img src='img/downarrowsun2.png' height=40px'>");
	},5000);
});
$(document).ready(function(){
  $('#main-heading').animate({opacity:1},'slow');
});
function scrollfurther(){
                $('html, body').animate({
                    scrollTop: $("#third").offset().top
                }, 1000);
}
function scrollback(){
                $('html, body').animate({
                    scrollTop: $("#newcontainer").offset().top
                }, 1000);
}


$(window).on("load", function() {
       	slidercanvas = document.getElementById('mySlider');
       	slidercontext = slidercanvas.getContext('2d');
	slidercanvas.addEventListener('click', function() {
//	alert(mousePos.x);
	var clicked=-1;
	if (mousePos.y>50&&mousePos.y<250)
		if (mousePos.x>25&&mousePos.x<225)
			{
			clicked=0;
			}
		else if (mousePos.x>275&&mousePos.x<475)
			{
			clicked=1;
			}
		else if (mousePos.x>525&&mousePos.x<725)
			{
			clicked=2;
			}
	var guideplace=-1;
	if (clicked!=-1)
		{
		for (q=0;q<7;q++)
			{
			if (imx[q]-250==clicked*250+25)
				guideplace=q;
			}
		if (guideplace>-1)
			{
			guideData(cnamesguide[guideplace]);
			document.getElementById("sliderdarken").style.zIndex="99";
			document.getElementById("sliderpop").style.zIndex="100";
			slowappear('#sliderpop');
			slowappear('#sliderdarken');
			}
		}
	});
	var cnamesguide=['icelandguide:','newzealandguide:','mexicoguide:','franceguide:','turkeyguide:','australiaguide:','nepalguide:'];
	sliderdest=["  Iceland","New Zealand","  Mexico","  France","  Turkey","Australia","   Nepal"];
        img[0]=document.getElementById("ice");
        img[1]=document.getElementById("new");
        img[2]=document.getElementById("mex");
        img[3]=document.getElementById("fra");
        img[4]=document.getElementById("tur");
        img[5]=document.getElementById("aus");
        img[6]=document.getElementById("nep");
	var q;
	for (q=0;q<7;q++)
		{
		imx[q]=25+250*q;
		}
	for (q=0;q<7;q++)
		{
		slidercontext.drawImage(img[q],imx[q]-250,50,200,200)
       	 	}
        slidercontext.font = '18pt Calibri';
        slidercontext.fillStyle = 'black';
	for (q=0;q<7;q++)
		{
        	slidercontext.fillText(sliderdest[q], 55+imx[q]-250, 280);
		}
        slidercanvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(slidercanvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	//writeMessage(slidercanvas, message);
	
        });
});

function slideover(){
	requestAnimationFrame(moveit);
}
function slideback(){
	requestAnimationFrame(moveitback);
}

function moveit(){
	mastercounter=mastercounter+10;
       	slidercanvas = document.getElementById('mySlider');
       	slidercontext = slidercanvas.getContext('2d');
  	slidercontext.clearRect(0, 0, slidercanvas.width, slidercanvas.height); // clear the canvas
	for (q=0;q<7;q++)
		{
		imx[q]=imx[q]+10;
		if (imx[q]==1775)
			imx[q]=25;
		}
	for (q=0;q<7;q++)
		{
		slidercontext.drawImage(img[q],imx[q]-250,50,200,200)
       	 	}
	        slidercontext.font = '18pt Calibri';
       	 	slidercontext.fillStyle = 'black';
		for (q=0;q<7;q++)
			{
        		slidercontext.fillText(sliderdest[q], 55+imx[q]-250, 280);
			}

if (mastercounter%250==0)
	return;
requestAnimationFrame(moveit);
}

function moveitback(){
	mastercounter=mastercounter+10;
       	slidercanvas = document.getElementById('mySlider');
       	slidercontext = slidercanvas.getContext('2d');
  	slidercontext.clearRect(0, 0, slidercanvas.width, slidercanvas.height); // clear the canvas
	for (q=0;q<7;q++)
		{
		imx[q]=imx[q]-10;
		if (imx[q]==15)
			imx[q]=1765;
		}
	for (q=0;q<7;q++)
		{
		slidercontext.drawImage(img[q],imx[q]-250,50,200,200)
       	 	}
	        slidercontext.font = '18pt Calibri';
       	 	slidercontext.fillStyle = 'black';
		for (q=0;q<7;q++)
			{
        		slidercontext.fillText(sliderdest[q], 55+imx[q]-250, 280);
			}
if (mastercounter%250==0)
	return;
requestAnimationFrame(moveitback);
}


