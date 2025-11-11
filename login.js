




/*animation play ,forms  intractive */

$("#accountForm").click("click",()=>{
  $(".img").css("display","none");
  $("#aniPlay > h1").css("display","none");
  $("#Account").css("display","flex");
   $("#resetAccount").css("display","none");
});

$("#resetForm").click("click",()=>{
  $(".img").css("display","none");
  $("#aniPlay > h1").css("display","none");
  $("#Account").css("display","none");
  $("#resetAccount").css("display","flex");
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