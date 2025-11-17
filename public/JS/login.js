




/*animation play ,forms  intractive */

function resetForm(){
  $("#firstname").val("");
  $("#lastname").val("");
  $("form > #account-input-1 > #IdNumber").val("");
  $("form > #account-input-1 >  #email").val("");
  $("#school").val("");
  $("#password").val("");
  $("#confirmPassword").val("");
  $("#account-input-5 input:checked").length;
  $("#newPassword").val("");
  $("#confirmNewPassword").val("");

}


$("#accountForm").click("click",()=>{
  $(".img").css("display","none");
  $("#aniPlay > h1").css("display","none");
  $("#Account").css("display","flex");
   $("#resetAccount").css("display","none");
   $("#feedback").css("display","none");
});

$("#resetForm").click("click",()=>{
  $(".img").css("display","none");
  $("#aniPlay > h1").css("display","none");
  $("#Account").css("display","none");
  $("#resetAccount").css("display","flex");
  $("#feedback").css("display","none");
});

/*close form button*/
$("form > #account-input-6 > #Close").click("click",()=>{
  $(".img").css("display","block");
  $("#aniPlay > h1").css("display","block");
  $("#Account").css("display","none");
  $("#resetAccount").css("display","none");
  $("#feedback").css("display","none");
   resetForm();
});

/*okay feedback - message button*/
$("#feedback-B >input").click("click",()=>{
   $(".img").css("display","block");
  $("#aniPlay > h1").css("display","block");
  $("#Account").css("display","none");
  $("#resetAccount").css("display","none");
  $("#feedback").css("display","none");
   resetForm();
});




/*create acoount validation*/

$("#create").click(function (event) {
   
    var firstName = $("#firstname").val().trim();
    var lastName = $("#lastname").val().trim();
    var IdNumber = $("#IdNumber").val().trim();
    var email = $("#email").val().trim();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();
    var privacyAgreement = $("#account-input-5 input:checked").length;

    if (firstName === "") return alert("Please provide your first name");
    if (lastName === "") return alert("Please provide your last name");
    if (IdNumber === "") return alert("Please provide your ID number");
    if (!/^\d{13}$/.test(IdNumber)) {
        return alert(`ID number must be 13 digits. You entered ${IdNumber.length}`);
    }
    if (email === "") return alert("Please provide your email address");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Please enter a valid email address");
    if (password === "") return alert("Please enter your password");
    if (confirmPassword === "") return alert("Please confirm your password");
    if (password !== confirmPassword) return alert("Passwords do not match");
    if (!privacyAgreement) return alert("Please agree to the privacy policy");

   $("#create").attr("type","submit");    
   const form = document.getElementById("Account");
   form.addEventListener("submit", function (e) {
        e.preventDefault();
         $(".img").css("display","none");
         $("#aniPlay > h1").css("display","none");
         $("#Account").css("display","none");
         $("#resetAccount").css("display","none");
         $("#feedback").css("display","flex");
         resetForm();
    });


});


/*reset acoount validation*/
$("#reset").click("click",()=>{
     var IdNumber = $("#resetAccount > #account-input-1 > #IdNumber").val();
     var email =  $("#resetAccount > #account-input-1 > #email").val();
     var password = $("#newPassword").val();
     var confirmPassword = $("#confirmNewPassword").val();

    if(IdNumber !== ""){
        if(/^\d{13}$/.test(IdNumber)){

         if(email !== ""){
             if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                   if(password !== ""){
                           if(confirmPassword !== ""){  
                                if(password === confirmPassword){
                                    
                                      $("#reset").attr("type","submit");    
                                      const form = document.getElementById("resetAccount");
                                       form.addEventListener("submit", function (e) {
                                           e.preventDefault();
                                             $(".img").css("display","none");
                                             $("#aniPlay > h1").css("display","none");
                                             $("#Account").css("display","none");
                                             $("#resetAccount").css("display","none");
                                             $("#feedback").css("display","flex");
                                             resetForm();
                                       });


                              }else{
                               alert("new password amd confirm password are not the same");
                            }
                          }else{
                             alert("confirm your new password");
                        }
                     }else{
                         alert("please enter the new password");
                   }
             }else{
                  alert("Please enter a valid email address");
             }

         }else{
            alert("please provide us your email address");
         }

        }else{
          alert(`ID number should have  13 digits  only , and your id -->${IdNumber}  length--->${IdNumber.length}`);
        }
    }else{
       alert("please provide us your ID Number");
    }


});




/*menu intractive */
var isMenuClicked = false;
$("#menu").click("click",()=>{

    isMenuClicked = !isMenuClicked

    if(isMenuClicked){
        $("#infor").css("display","block");
    $("#moreInfor").css({
        "margin-left": "-200px",
    });
    }else{
         $("#infor").css("display","none");
         $("#moreInfor").css({
        "margin-left": "-0px",
    });
    }
      
});




