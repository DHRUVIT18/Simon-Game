
var userclickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];

var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextsequence();
        started=true;
    }
});


$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userclickedPattern.push(userChosenColour);
    playSound(userChosenColour);
   
    animatePress(userChosenColour);

    checkAnswer(userclickedPattern.length-1);
});




function nextsequence(){

    userclickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosencolour=buttonColours[randomNumber];

    gamePattern.push(randomChosencolour);

    $("#"+randomChosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosencolour); 
}

function playSound(colour){
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play(); 
}

function animatePress(currentColour){
   $("#"+currentColour).addClass("pressed");
   setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
   },100);
}

function checkAnswer(currentlvl){

    if(gamePattern[currentlvl]===userclickedPattern[currentlvl]){
            console.log("success");
    
    if(userclickedPattern.length===gamePattern.length){
        setTimeout(function(){

            nextsequence();
        },1000);
    }
    
}else{
        
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    }
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
  }




//setInterval(nextsequence,1450);
