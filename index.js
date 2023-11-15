let btnColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;


function randomNumGenerator(){
    return Math.floor(Math.random()*4);
}

$(document).keypress((e)=>{
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
})

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level " +level);

    let ranNum = randomNumGenerator();
    let randomChosenColour = btnColors[ranNum];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    makeSound(randomChosenColour);
}

//ADDING SOUNDS
function makeSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}
//HANDLING CLICKS
$(".btn").click(clickHandler);
function clickHandler(){
    var userClickedBtn = this.id;
    userClickedPattern.push(userClickedBtn);

    makeSound(userClickedBtn);
    animatePress(userClickedBtn);

    checkAnswer(userClickedPattern.length-1);
}

function animatePress(color){
    const btn = $("#"+color);
    btn.addClass("pressed");
    setTimeout(()=>{
        btn.removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
   
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("right");
            if(userClickedPattern.length == gamePattern.length){
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        }else{
            makeSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Press A Key to Restart");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
            startover();
        }
}
function startover(){
    level=0;
    started=false;
    gamePattern=[];
}