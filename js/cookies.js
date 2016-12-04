function cookiesExist(cookieName){
  var cookieString = document.cookie;
  return cookieString.indexOf(cookieName)!=-1;//as long as indexof returns positive number the cookie exist
}
  function getCookie(cookieName){
    //First see if the cookie exists
    if (cookiesExist(cookieName)){
      //it exists,
      //break the cookie string into an array
      var cookieArray=document.cookie.split(";");
      for(cookie in cookieArray){
        //search through each cookie for the one we're looking for
        console.log(cookieArray[cookie]);
        if(cookieArray[cookie].indexOf(cookieName+"=")!=-1){
          //the cookie has been found
          //get the value
          var cookieVal=cookieArray[cookie].split("=");
          //remove the semicolon and return it
          return cookieVal[1].replace(";", '');
         }
       }
     }
    else{
      //if the cookie doesn't exist return nothing
      return null;
    }
  }


  function setCookie(cookieName, cookieValue){
      document.cookie = cookieName+"="+cookieValue+";";
  }
