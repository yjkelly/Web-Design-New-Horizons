var useemail=0;
var trigger=0;

window.onload = function() {
 $(contactform).animate({
            "opacity": "1.0"
	}, 1000);
}
function updateHtml(id,newdata){
	document.getElementById(id).innerHTML = newdata;
}

    function handle(e){
        if(e.keyCode == 13 || e.keyCode == 9){
            e.preventDefault(); // Ensure it is only this code that runs
	var myname=(document.forms["theContactForm"]["name"].value);
	updateHtml("undername","");
	if (myname=="")
		{
		updateHtml("undername","If you don't want to use your real name, just type in anything");
		}
	else	{
		var namearray = myname.split(" ");
		updateHtml("undername","Hey "+ namearray[0] + "! Would you like us to reply to you via email?");
		slowappear("#contactemailchoice");
		}
	}
	}
    function handle2(e){
	useemail=0;
        if(e.keyCode == 13 || e.keyCode == 9){
            e.preventDefault(); // Ensure it is only this code that runs
	var myemail=(document.forms["theContactForm"]["email"].value);
	updateHtml("underemail","");
	if (myemail=="")
		{
		updateHtml("underemail","If you don't give us an email, we can't reply to you. :)");
		return false;
		}
	else	{
		var emailcheck=myemail.indexOf("@")
		var emaillength=myemail.length;
		if (emailcheck==-1)
			{
			updateHtml("underemail","You seem to be missing an @ symbol");
			return false;
			}
		else	if (emailcheck==emaillength-1)
			{
			updateHtml("underemail","You need something after the @ symbol");
			return false;
			}
		else
			{
			useemail=1;
			updateHtml("underemail","We'll use this to contact you");
			slowappear(contactcontent);
			trigger=1;
			}
		}
	}
	}
function checktext(){
	var message=document.forms["theContactForm"]["content"].value;
	if (trigger==0)
		return false;
	if (message=="")
		{
		updateHtml("undercontent","Your message is blank. Message not sent");
		}
	else {
		if (useemail==1)
			updateHtml("undercontent","Thank you for your message. We hope to reply to you within 2 days.");
		else
			updateHtml("undercontent","Thank you so much for your message.");
        //$("play").fadeOut('slow');
		//slowdisappear(play);
		changebackground();
		}

}

function slowappear(id){
$(id).fadeIn('slow');
}
function slowdisappear(id){
$(id).fadeOut('slow');
}

function changebackground()
{
 $(contactform).stop().animate({
            "backgroundColor": "#445544"
	}, 1000);
}

function yesemail()
{
updateHtml("overemail","Ok great!");
slowappear(contactemail);
}
function noemail()
{
updateHtml("overemail","That's no problem at all.");
slowdisappear(contactemail);
trigger=1;
slowappear(contactcontent);
}
