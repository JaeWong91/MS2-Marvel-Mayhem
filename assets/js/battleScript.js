//Defining all our global variables pointing to th e different DIVs we need reference to
var bottomRow = document.getElementById('bottomRow');
var stats = document.getElementsByClassName('stats');
var spidermanStats = document.getElementById('spidermanStats');
var spidermanHP = document.getElementById('spidermanHP'); // this is the HP bar
var greenGoblinHP = document.getElementById('greenGoblinHP'); //this is the HP bar
var spidermanMoves = document.getElementById('spidermanMoves'); // the buttons for spiderman's moves NOT WORKING
var spidermanMoves = Array.from(document.getElementsByClassName('spidermanMove'));
let overlays = Array.from(document.getElementsByClassName('overlay-text'));

var spidermanImage = document.getElementsByClassName('spiderman-battle'); // TESTING TO GET SPIDERMAN TO ANIMATE FOR EACH CLICK OF A MOVE

//Define health variables
var spiderHP = 100; // initial values for the HP, starting at 100
var goblinHP = 100;

//music and sound controls
var musicControls = document.getElementById('music-controls');
var state = "on"; //default music is on/unmuted

var battleMusic = document.getElementById('spidermanMusic');
battleMusic.loop = true;
var webShootSound = new Audio('assets/audio/web-shoot.wav');
var webSwingSound = new Audio('assets/audio/swing-kick.wav');
var punchSound = new Audio('assets/audio/punch.wav');


//disabling all spiderman moves for 2 seconds when clicked to allow animations/audio and goblin retaliation to play out.
function disableMoves(){
    for (var x=0; x < spidermanMoves.length; x++) {      // loop to change all stats elements (there are 2 of them, 1 for spiderman and 1 for green goblin) from hidden to visible
        spidermanMoves[x].disabled = true;
    }
}

function enableMoves() {
    for (var y=0; y <spidermanMoves.length; y++) {
        spidermanMoves[y].disabled = false;
    }
}

//spidermanMoves.disabled = true;
    //setTimeout(function(){spidermanMoves = false;}, 2000);

function mute(){
    if (state == "off"){
        state = "on";
        musicControls.innerHTML = "<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-up\"></i></button>";
        battleMusic.play();
    } else {
        state = "off";
        musicControls.innerHTML = "<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-mute\"></i></button>";
        battleMusic.pause();
    }
}



//Battle functions

function beginBattle() {
    bottomRow.innerHTML = "Pick Spiderman's ability by clicking the button above.";  // here we change everything inside bottomRow element into 1 text line.
    for (var x=0; x < stats.length; x++) {      // loop to change all stats elements (there are 2 of them, 1 for spiderman and 1 for green goblin) from hidden to visible
        stats[x].style.visibility = "visible";
        battleMusic.play();
        battleMusic.volume = 0.2;
        
    }
    
}

function goblinAttack() {   //goblin moves - glider sweep, pumpkin bomb, , poison gas
    var attackChoice = Math.ceil(Math.random()*3) // 3 for goblin moves, used Math.ceil so it rounds up, we don't want it to round down to 0
    if (attackChoice == 1) {  // GLIDER ATTACK
        var hitChance = Math.round(Math.random() * 10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
        if (hitChance <= 7) { 
            var dmg = Math.round(Math.random() * 10) + 10; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
            spiderHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
            if (spiderHP < 0) {  // if hp goes negative, it will bring it to 0
                spiderHP = 0;
            }
            bottomRow.innerHTML += "<br>Green Goblin attacked you with his glider, dealing " + dmg + " damage. Spiderman now has " + spiderHP + " HP."
            var spiderHPBarWidth = (spiderHP / 100) * 144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
            spidermanHP.style.width = spiderHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
        } else {
            bottomRow.innerHTML += "<br>Spiderman dodged Green Goblin's glider sweep!!"
        }
    } else if (attackChoice == 2) { 
        var hitChance = Math.round(Math.random() * 10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
        if (hitChance <= 4) {
            var dmg = Math.round(Math.random() * 10) + 15; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
            spiderHP -= dmg;     // 
            if (spiderHP < 0) {  
                spiderHP = 0;
            }
            bottomRow.innerHTML += "<br>Green Goblin used poison gas, dealing " + dmg + " damage. Spiderman now has " + spiderHP + " HP."
            var spiderHPBarWidth = (spiderHP / 100) * 144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
            spidermanHP.style.width = spiderHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
        } else {
            bottomRow.innerHTML += "<br>Spiderman avoided Green Goblin's gas!!"
        }
    } else {
        var hitChance = Math.round(Math.random() * 10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
        if (hitChance <= 3) { //PUMKPIN BOMB
            var dmg = Math.round(Math.random() * 10) + 20; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
            spiderHP -= dmg;     // 
            if (spiderHP < 0) {  // 
                spiderHP = 0;
            }
            bottomRow.innerHTML += "<br>Green Goblin threw a Pumpkin Bomb, dealing " + dmg + " damage. Spiderman now has " + spiderHP + " HP."
            var spiderHPBarWidth = (spiderHP / 100) * 144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
            spidermanHP.style.width = spiderHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
        } else {
            bottomRow.innerHTML += "<br>Spiderman's spider sense helped him avoid the Pumpkin Bomb!!"
        }
    }
    if (spiderHP == 0){ // When the health is 0, the below executes
        disableMoves();
        setTimeout(loseOverlay, 2000);  //TESTING
        //document.getElementById('game-over-text').classList.add('visible');
        //bottomRow.innerHTML += "<br>Spiderman has fallen! Green Goblin is victorious!!<br><br><button onclick='restartGame()'>Play Again?</button>";
    }
}

function webShooter() {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    webShootAnimation();
    webShootSound.play(); 
    if (hitChance <=7){      
        var dmg = Math.round(Math.random()*10)+6; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
        goblinHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
        if(goblinHP < 0){  // if hp goes negative, it will bring it to 0
            goblinHP = 0;
        }
            bottomRow.innerHTML = "You hit Green Goblin with your web shooter, doing " + dmg + " damage. Green Goblin now has " + goblinHP + " HP.";
        var goblinHPBarWidth = (goblinHP/100)*144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
        greenGoblinHP.style.width =  goblinHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
    } else {
        bottomRow.innerHTML = "Spiderman's attack missed!"
    }
    if (goblinHP == 0){ // When the health is 0, the below executes
        disableMoves();
        setTimeout(victoryOverlay, 2000);
        //document.getElementById('victory-text').classList.add('visible'); 
        //bottomRow.innerHTML += "<br>You have defeated Green Goblin!!<br><br><button onclick='restartGame()'>Play Again?</button>";
    } else {
        disableMoves();
        setTimeout(enableMoves, 1700);
        setTimeout(goblinAttack, 1700); // while Green Goblin is alive, each time user clicks a spiderman move, green goblin will also attack.
        
    }
}

function webSwing () {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    webSwingAnimation();
    webSwingSound.play(); 
    if (hitChance <=5){      
        var dmg = Math.round(Math.random()*10)+13; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
        goblinHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
        if(goblinHP < 0){  // if hp goes negative, it will bring it to 0
            goblinHP = 0;
        }
        bottomRow.innerHTML = "You swing and kick Green Goblin with force, doing " + dmg + " damage. Green Goblin now has " + goblinHP + " HP."
        var goblinHPBarWidth = (goblinHP/100)*144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
        greenGoblinHP.style.width =  goblinHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
    } else {
        bottomRow.innerHTML = "Spiderman's attack missed!"
    }
    if (goblinHP == 0){ // When the health is 0, the below executes
        disableMoves();
        setTimeout(victoryOverlay, 2000);
        //document.getElementById('victory-text').classList.add('visible'); 
        //bottomRow.innerHTML += "<br>You have defeated Green Goblin!!<br><br><button onclick='restartGame()'>Play Again?</button>";
        //spidermanMoves.style.visibility = "hidden";
    } else {
        disableMoves();
        setTimeout(enableMoves, 2000);
        setTimeout(goblinAttack, 2000); // while Green Goblin is alive, each time user clicks a spiderman move, green goblin will also attack.
    }
}

function punch () {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    punchSound.play(); 
    punchAnimation();
    if (hitChance <=7){      
        var dmg = Math.round(Math.random()*10)+8; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
        goblinHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
        if(goblinHP < 0){  // if hp goes negative, it will bring it to 0
            goblinHP = 0;
        }
        bottomRow.innerHTML = "You hit Green Goblin with a strong punch, doing " + dmg + " damage. Green Goblin now has " + goblinHP + " HP."
        var goblinHPBarWidth = (goblinHP/100)*144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
        greenGoblinHP.style.width =  goblinHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
    } else {
        bottomRow.innerHTML = "Spiderman's attack missed!"
    }
    if (goblinHP == 0){ // When the health is 0, the below executes
        disableMoves();
        setTimeout(victoryOverlay, 2000);
        //document.getElementById('victory-text').classList.add('visible');
        //bottomRow.innerHTML += "<br>You have defeated Green Goblin!!<br><br><button onclick='restartGame()'>Play Again?</button>";
        //spidermanMoves.style.visibility = "hidden"; Removes this as may not need again
    } else {
        disableMoves();
        setTimeout(enableMoves, 1000);
        setTimeout(goblinAttack, 1000); // while Green Goblin is alive, each time user clicks a spiderman move, green goblin will also attack.
    }
}

//PUNCH ANIMATION!!
function punchAnimation() {
    spidermanImage[0].classList.add('punchAnimation');
    setTimeout(function() {
        spidermanImage[0].classList.remove('punchAnimation');
        }, 1000);
}

//Webshoot animation
function webShootAnimation() {
    spidermanImage[0].classList.add('webShootAnimation');
    setTimeout(function() {
        spidermanImage[0].classList.remove('webShootAnimation');
        }, 1500);
}

function webSwingAnimation() {
    spidermanImage[0].classList.add('webSwingAnimation');
    setTimeout(function() {
        spidermanImage[0].classList.remove('webSwingAnimation');
        }, 1700);
}

function victoryOverlay() {
    document.getElementById('victory-text').classList.add('visible');
}

function loseOverlay () {
    document.getElementById('game-over-text').classList.add('visible');
}

function restartGame() {
    spiderHP = 100;
    goblinHP = 100;
    var spiderHPBarWidth = (spiderHP / 100) * 144; 
    spidermanHP.style.width = spiderHPBarWidth + "px";
    var goblinHPBarWidth = (goblinHP/100)*144; 
    greenGoblinHP.style.width =  goblinHPBarWidth + "px";
    //spidermanMoves.style.visibility = "visible";
    //document.getElementById('victory-text').classList.remove('visible'); 
    //document.getElementById('game-over-text').classList.remove('visible'); 
    bottomRow.innerHTML = "Use any of Spiderman's attacks to defeat Green Goblin.";
    document.getElementById('victory-text').classList.remove('visible'); 
    document.getElementById('game-over-text').classList.remove('visible');
    enableMoves();
}