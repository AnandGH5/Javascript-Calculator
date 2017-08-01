
var expression="";
var status=0;
var decimalset=0;
var operator=0;
var lastdecimal=0;  
var muldivstate=0;

$( document ).ready(function() {
    $("#clear").click();
}); 
document.addEventListener('keydown', function(event) {  
    if(event.keyCode == 48 || event.keyCode == 96) {$("#0").click();} 
    else if(event.keyCode == 49 || event.keyCode == 97) {$("#1").click();}
    else if(event.keyCode == 50 || event.keyCode == 98) {$("#2").click();} 
    else if(event.keyCode == 51 || event.keyCode == 99) {$("#3").click();}
    else if(event.keyCode == 52 || event.keyCode == 100) {$("#4").click();}
    else if(event.keyCode == 53 || event.keyCode == 101) {$("#5").click();} 
    else if(event.keyCode == 54 || event.keyCode == 102) {$("#6").click();}
    else if(event.keyCode == 55 || event.keyCode == 103) {$("#7").click();}  
    else if(event.keyCode == 56 || event.keyCode == 104) {$("#8").click();}
    else if(event.keyCode == 57 || event.keyCode == 105) {$("#9").click();} 
   
    else if(event.keyCode == 110 || event.keyCode == 190) {$("#decimal").click();}
    else if(event.keyCode == 107) {$("#add").click();}
    else if(event.keyCode == 109) {$("#subtract").click();}
    else if(event.keyCode == 106) {$("#multiply").click();} 
    else if(event.keyCode == 111) {$("#divide").click();}
  
    else if(event.keyCode == 8 || event.keyCode == 46) {$("#backspace").click();} 
    else if(event.keyCode == 27) {$("#clear").click();}  
    else if(event.keyCode == 187) {$("#equals").click();}   
});


$("#0").click(function(){ 
  numbers("0");
});
$("#1").click(function(){ 
    numbers("1");
});
$("#2").click(function(){ 
    numbers("2");
});   
$("#3").click(function(){ 
    numbers("3");
});
$("#4").click(function(){ 
    numbers("4");
});
$("#5").click(function(){ 
    numbers("5");
});
$("#6").click(function(){ 
    numbers("6");
});
$("#7").click(function(){ 
    numbers("7");
});
$("#8").click(function(){ 
    numbers("8");
});
$("#9").click(function(){ 
   numbers("9");
});

function numbers(val){
  if($(".display").html()==="Too long!")
    $(".display").empty();
  
  if(val==="0"){
    if(CheckLength() &&  /[^0]/g.test($(".display").text())){
      CheckStatus();
    $(".display").append(val);  
  expression+=val;
     lastdecimal=0; 
       DisplayNumbers();
    }
    return;
  }
     CheckStatus();
  if(CheckLength()){
      $(".display").append(val); 
    expression+=val;
    lastdecimal=0;
    DisplayNumbers();
  }
}

$("#decimal").click(function(){ 
    CheckStatus();
  if(CheckLength()){
   if(decimalset===0)
     { 
    $(".display").append("."); 
       if( $(".display").text()===".")          //if decimal is entered before number eg: .45 becomes 0.45
           $(".display").html( $(".display").text().replace(/./,"0."));
       
    expression+="."; 
  lastdecimal=1;
  decimalset=1;
     }
  }
});


$("#add").click(function() {
  status=1;
  if(muldivstate===1  && /-/g.test(expression[expression.length-1]))
    {
      muldivstate=0;
      expression=expression.slice(0,expression.length-2);
    }
  if(lastdecimal || LastOperator("+")){expression=expression.slice(0,expression.length-1);}
   $(".display").empty();
  decimalset=0;
    expression+="+";
   $(".display").append("+"); 
}); 


$("#subtract").click(function(){
  status=1;
  if(expression[expression.length-1]==="*" || expression[expression.length-1]==="÷")
    muldivstate=1;
   if(lastdecimal || LastOperator("-")){expression=expression.slice(0,expression.length-1);}
   $(".display").empty();
  decimalset=0;
    expression+="-";
   if(muldivstate && expression[expression.length-2]==="*")
   $(".display").append("x-"); 
  else if(muldivstate && expression[expression.length-2]==="÷")
     $(".display").append("÷-"); 
  else
    $(".display").append("-");  
});  



$("#multiply").click(function(){  
  status=1;
   if(muldivstate===1 && /-/g.test(expression[expression.length-1]))
    {
      muldivstate=0;
      expression=expression.slice(0,expression.length-2);
    }
   if(lastdecimal || LastOperator("*")){expression=expression.slice(0,expression.length-1);}
   $(".display").empty();
  decimalset=0;
    expression+="*";    
   $(".display").append("x"); 
});  



$("#divide").click(function(){  
  status=1;
   if(muldivstate===1 && /-/g.test(expression[expression.length-1]))
    {
      muldivstate=0;
      expression=expression.slice(0,expression.length-2);
    }
   if(lastdecimal || LastOperator("÷")){expression=expression.slice(0,expression.length-1);}
   $(".display").empty();
  decimalset=0;
    expression+="÷"; 
   $(".display").append("÷"); 
});  


    
$("#clear").click(function(){
   $(".display").html("0");   
   status=1;
  decimalset=0;
   expression="0"; 
  muldivstate=0;
}); 



function CheckStatus(){
   if(status==="1"){
     status=0;
     $(".display").html("");
   }
  return;
}



function CheckLength(){
  return $(".display").text().length<=11; 
}



function DisplayNumbers(){
  var temp = $(".display").text().replace(/,/g, '').split(".");
   if(temp[1])
  $(".display").html(temp[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"."+temp[1]); 
  else
    $(".display").html(temp[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); 
}



function LastOperator(val){ 
  var l=expression.length-1;
  if(expression[l]==="*" && val==="-"){
      muldivstate=1;
    return 0; 
    }
  else if(expression[l]==="÷" && val==="-"){
      muldivstate=1;
    return 0; 
    }
  else if(expression[l]==="+" || expression[l]==="-" || expression[l]==="*" || expression[l]==="÷")
    return 1;
  else
    return 0;
}
  
$("#backspace").click(function(){    
   var temp= ""+$(".display").text(); 
          
  if(expression[expression.length-2]==="+" || expression[expression.length-2]==="-" || expression[expression.length-2]==="*" || expression[expression.length-2]==="/"){
    status=1;
   $(".display").html("0"); 
    expression=expression.slice(0,expression.length-1); 
  }
  
  else if(temp.length===1 || (temp==="0.") || temp==="Too long!") 
   $("#clear").click();

  else{
     $(".display").html("");  
      if(temp[temp.length-2]===",")
        temp=temp.slice(0,temp.length-2); 
      else{
          if(temp[temp.length-1]===".")
            decimalset=0;
            temp=temp.slice(0,temp.length-1);  
        }
  expression=expression.slice(0,expression.length-1); 
       $(".display").append(temp);    
      if(temp==="")
        $("#clear").click();
    }
});

$("#equals").click(function(){ 
  expression=expression.replace(/-0/g, "-"); 
  expression=expression.replace(/\+0/g, "+"); 
  expression=expression.replace(/\*0/g, "*"); 
                     
  if(lastdecimal){
       expression=expression.slice(0,expression.length-1);
      lastdecimal=0;
    }
   
  
  if(expression[0]==="0" && !(expression[1]==="+" || expression[1]==="-" || expression[1]==="÷" || expression[1]==="*"))
    expression=expression.slice(1,expression.length);
       
  if(expression.length===2 && (expression==="0-" || expression==="0+" || expression==="0÷" || expression==="0*") ){
    expression=expression.slice(0,expression.length-1);
      $(".display").html("0");   
    }
  else if(expression.length===3 && (expression==="0÷-" || expression==="0*-")){
    expression=expression.slice(0,expression.length-2);
      $(".display").html("0");   
    }
  
   else if((expression[expression.length-1]=="-" && expression[expression.length-2]=="*" )||(expression[expression.length-1]=="-" && expression[expression.length-2]=="÷") )
           expression=expression.slice(0,expression.length-2);
        
  
      else if(expression[expression.length-1]=="+" || expression[expression.length-1]=="-" ||expression[expression.length-1]=="*" || expression[expression.length-1]=="÷" )
           expression=expression.slice(0,expression.length-1);
 
   if(expression==="")
     expression="0";
 
  if(expression==="÷0")
    expression="0÷0";
  expression=expression.replace("÷","/");
 
  var finalresult=eval(expression);
 
    if(finalresult.toString().length>=11 && finalresult.toFixed(2).toString().length>=11){
             $(".display").html("Too long!");
             expression="0";
            return ;
          }
  
  
    if(finalresult.toString().length>= 17) 
      {
                finalresult= finalresult.toFixed(2);
                while(finalresult[finalresult.length-1]==="0")
                    finalresult=finalresult.slice(0,finalresult.length-1);
             if(finalresult[finalresult.length-1]===".")
                finalresult=finalresult.slice(0,finalresult.length-1);
                  
      }
  if(isNaN(finalresult)) 
      $(".display").html("NaN");
  else  {
    $(".display").html(finalresult); 
            DisplayNumbers();
    }
   expression=""+finalresult;
  if(/\./g.test(expression))
    decimalset=1;
});
 
