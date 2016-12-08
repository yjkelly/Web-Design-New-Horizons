

$(document).ready(function(){
  $('#date').datepicker();

  //validate form
  $('#submit').click(function(){
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var gender = $('input[name=gender]:checked').val();
    var email = $('#email').val();
    var tel = $('#tel').val();
    var clinic = $('#clinic option:selected').val();
    var date = $('#date').val();
    var valid = true;
    if(firstName=="" || firstName==null){
      alert("Please enter your first name");
      valid = false;
    }
    if(lastName=="" || lastName==null){
      alert("Please enter your last name");
      valid = false;
    }
    if(email == "" || email==null){
      alert("Please enter your email address");
      valid = false;
    }
    if(tel=="" || tel==null){
      alert("Please enter your contact number");
      valid = false;
    }
    if(clinic=="default"){
      alert("Please select a clinic");
      valid = false;
    }
    if(date=="" || date==null){
      alert("Please enter your preferred apointment date");
      valid = false;
    }
    if(valid){
      //modal dialog
      // https://jqueryui.com/dialog/#modal-message
      $('#modal-confirmation').dialog({
        modal:true,
        buttons:{
          Ok:function(){
            //add vaccination price
            var vaccinprice = getCookie('vaccination-price');
            var old = parseInt(vaccinprice);
            if(vaccinprice==null){
              vaccinprice=0;
            }
            vaccinprice+=100;
            setCookie('vaccination-price',vaccinprice);
            $('#vaccination-price').text(vaccinprice);
            var oldtotal = $('#tPrice').text();
            $('#tPrice').text(vaccinprice+(parseInt(oldtotal)- old));
            $(this).dialog("close");
            window.location='./store.html';
          }
        }
      })
    }
  });


});
