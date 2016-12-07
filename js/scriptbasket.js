//have a nice jquery effect on loading the page
//	$(document).ready(function(){
//	$('html').hide().fadeIn(2000);
//	        });

//This is where we validate the payment information. 
function validateBasket() {
	 var firstname = document.forms["payment"]["firstname"].value;
	 var secondname = document.forms["payment"]["secondname"].value;
	 var address = document.forms["payment"]["address"].value;
	 var cardno = document.forms["payment"]["cardno"].value;

	//clear any previous error highlighting
	document.getElementById("errormessage").style.backgroundColor = "#111";
	document.getElementById("errormessage").innerHTML="";
	document.forms["payment"]["firstname"].style.backgroundColor = "#eee";
	document.forms["payment"]["secondname"].style.backgroundColor = "#eee";
	document.forms["payment"]["address"].style.backgroundColor = "#eee";
	document.forms["payment"]["cardno"].style.backgroundColor = "#eee";
	
	//check if firstname has been entered
	if (firstname == "") {
		document.forms["payment"]["firstname"].style.backgroundColor = "red";
		document.getElementById("errormessage").style.backgroundColor = "red";
		updateHtml("errormessage","Please enter a name in the highlighted box above");
	return false;
	}

	//check if secondname has been entered
	if (secondname == "") {
		document.forms["payment"]["secondname"].style.backgroundColor = "red";
		document.getElementById("errormessage").style.backgroundColor = "red";
		updateHtml("errormessage","Please enter a name in the highlighted box above");
	return false;
	}

	//check if address has been entered
	if (address == "") {
		document.forms["payment"]["address"].style.backgroundColor = "red";
		document.getElementById("errormessage").style.backgroundColor = "red";
		updateHtml("errormessage","Please enter an address in the highlighted box above");
	return false;
	}

	//check if a card has been entered
	if (cardno == "") {
		document.forms["payment"]["cardno"].style.backgroundColor = "red";
		document.getElementById("errormessage").style.backgroundColor = "red";
		updateHtml("errormessage","Please enter a card number above");
	return false;
	}
	
	//If we get down this far, all form fields are good, and we can calculate a total cost for the customer
	//print a nice message confirming things
	document.getElementById("errormessage").style.backgroundColor = "#bfb";
	document.getElementById("errormessage").style.color = "#000";
	var finalmessage="";
	finalmessage=finalmessage+"Everything looks good! Thank you for your payment"
	
	//clean up any error highlighting
	document.forms["payment"]["firstname"].style.backgroundColor = "#eee";
	document.forms["payment"]["secondname"].style.backgroundColor = "#eee";
	document.forms["payment"]["address"].style.backgroundColor = "#eee";
	document.forms["payment"]["cardno"].style.backgroundColor = "#eee";
	updateHtml("errormessage",finalmessage);
	return false;
}


//updates a given element id with content
function updateHtml(divId,content){
	document.getElementById(divId).innerHTML=content;
}



//this function resets the fields and error highlighting on the form 
function resetfields(){
	document.getElementById("errormessage").style.backgroundColor = "#111";
	document.getElementById("errormessage").innerHTML="";
	document.forms["payment"]["firstname"].style.backgroundColor = "white";
	document.forms["payment"]["secondname"].style.backgroundColor = "white";
	document.forms["payment"]["address"].style.backgroundColor = "white";
}

