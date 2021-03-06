

//DECLARATION OF VARIABLES
//WE THE VARIABLES...
var images
var parent
var newText
var arrayOfBoxes
var randomboxDad
var newlyCreatedText
var textParent
var aNewGhost
var newWarnText
var ghostsVanquished = 0;
var escapedGhostCounter = 0;

var someGhosts = ["Assets/images/moreSpoopyGhosts.png", "Assets/images/superSpoopyGhost.png", "Assets/images/theSpoopiestGhost.png", "Assets/images/two-spoopy-ghosts.png"];

var getRandomGhost = function() {
  return someGhosts[Math.floor(Math.random()*someGhosts.length)]
}

//THIS FUNCTION IS CALLED LATER TO REMOVE ANY TEXT (PASSED AS A VARIABLE) FROM THE PAGE
function removeText(textToRemove) {
  //this checks to see if there is a text node to remove
  while(textToRemove.parentNode) {
    //this then removes the element if it does exist
    textParent = textToRemove.parentElement
    //THE NEWLY CREATED H2 ELEMENT IS REMOVED FROM THE DOCUMENT
    textParent.removeChild(textToRemove);
  }
}



//the function below applies an event that makes the hidden ghost "appear" when moused over for all img elements, including newly appended image elements
document.querySelector('.dad').addEventListener('mouseover', function(event) {
  if (event.target.tagName.toLowerCase() === 'img') {
    images = event.target
    images.style.opacity = "1";
    images.style.transition = "3s";
  }
});

//this is the same as the above function  but I'm trying to adapt to make it only apply to these new special hidden ghosts I want to include
// document.querySelector('.dad').addEventListener('mouseover', function(event) {
//   if (event.target.classList.includes("hidden")) {
//     images = event.target
//     images.style.opacity = "1";
//     images.style.transition = "3s";
//   }
// });



//the function below applies an event that makes the ghost "disappear" when moused off for all img elements, including newly appended image elements
document.querySelector('.dad').addEventListener('mouseout', function(event) {
  if (event.target.tagName.toLowerCase() === 'img') {
    images = event.target
    images.style.opacity = "0";
    images.style.transition = "3s";
  }
});

//the following function creates an event when users click on any image element, even newly appended ones using delegation
document.querySelector('.dad').addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'img') {
    ghostsVanquished ++
    document.querySelector(".btn-info").textContent = `Ghosts Vanquished: ${ghostsVanquished}`
    images = event.target
    //VAR IDENTIFIES PARENT OF IMAGE ELEMENT (ITS BOX)
    parent = images.parentElement
    //CREATES NEW H2 ELEMENT IN A VARIABLE
    newText = document.createElement('h2');
    //MAKES THE H2 TEXT NODE READ THE FOLLOWING
    newText.textContent = "You vanquished the ghost!";
    // MAKES THE H2 CLASSNAME 'VANQUISHED'
    newText.className = "vanquished text-center";

    //ACTUALLY PLACES THIS NEW TEXT INSIDE THE PARENT ELEMENT (BOXES)
    parent.appendChild(newText);

    //REMOVES THE IMAGE ELEMENT FROM THE DOCUMENT
    parent.removeChild(images);

    //THIS REMOVES THE VANQUISHED TEXT AFTER 2 SECONDS
    setTimeout(removeText, 2000, newText)
        }
});

//THIS FUNCTION CALCS A RANDOM AMOUNT BETWEEN 1000 AND 2000
var randomMSBetween1and2Sec = function () {
  var randomInterValUpto2Sec = Math.floor(Math.random()*2000) + 1000
  return randomInterValUpto2Sec
}

//THIS SETS THE INITAL INTERVAL TO A RANDOM INTERVAL BETWEEN 1 AND 2 SECONDS, HOWEVER, THE INTERVAL IS FIXED ONCE SET THE FIRST TIME THE PAGE LOADS. NEED TO MAKE IT SO INTERVAL IS RECALCULATED EACH TIME A NEW GHOST IS CREATED
setInterval(makeaNewGhost, randomMSBetween1and2Sec())

//HIS FUNCITON IS CALLED AT THE INTERVAL JUST SET ABOVE
function  makeaNewGhost() {

    //A NEW IMAGE ELEMENT IS CREATED
    aNewGhost = document.createElement('img');
    //THE SOURCE IS A LOCALLY STORED IMAGE WHOSE FILE PATH IS SELECTED RANDOMLY
    aNewGhost.src = getRandomGhost()
    //IT'S ALT IS BELOW
    aNewGhost.alt = "a new cute ghost click it before it pulls your heart strings!";
    aNewGhost.style.opacity = 1; //this is temporary just so I can see if the new ghost popped up, I need to call the above code to happen again, so when a user mouses over the new ghost/clicks it/etc, all the same stuff happens

    arrayOfBoxes = document.querySelectorAll('.boxes')
    //THIS SELECTS A NEW PARENT BOX AT A DENOMIZED INDEX
    randomboxDad = arrayOfBoxes[Math.floor(Math.random()*(arrayOfBoxes.length))]


    //THIS WHILE LOOP MAKES SURE THE RANDOMLY CHOSEN DIV IS EMPTY FIRST, THEN APPENDS A NEW IMAGE
    while(randomboxDad.childNodes[0]) {
      randomboxDad.removeChild(randomboxDad.childNodes[0])
    }
    randomboxDad.appendChild(aNewGhost)
    setTimeout(aGhostEscapes, 750, aNewGhost)
  }


//THIS FUNCTION IS CALLED 750 MILLISECONDS AFTER EACH GHOST IS CREATED, CAUSING THE GHOST TO "ESCAPE" FROM THE USER
function aGhostEscapes(fourSecondOldGhost) {
  if(fourSecondOldGhost.parentNode) {
    newWarnText = document.createElement('h2');
    //MAKES THE H2 TEXT NODE READ THE FOLLOWING
    newWarnText.textContent = "A ghost escaped!!";
    // MAKES THE H2 CLASSNAME 'escaped'
    newWarnText.className = "escaped text-center";
    //THIS ACTUALLY PLACES THE TEXT ON THE PAGE
    fourSecondOldGhost.parentNode.appendChild(newWarnText);
    //THIS REMOVES THE ESCAPING GHOST FROM THE PAGE AFTER THE NEW TEXT IS ADDED
    fourSecondOldGhost.parentElement.removeChild(fourSecondOldGhost);
    //THIS REMOVES THE NEWWARNTEXT AFTER 1 SECOND
    setTimeout(removeText, 1000, newWarnText)
    //THIS INCREMENTS THE ESCAPED GHOST COUNTER AT THE TOP OF THE PAGE
    escapedGhostCounter ++
    document.querySelector(".btn-danger").textContent = `Ghosts Escaped: ${escapedGhostCounter}`
  }
}





//Math.floor(Math.random()*3000) <-- THIS WILL RANDOMIZE THE AMOUNT OF TIME, REPLACE THE NEARGHOST TIMOUT TO THIS, NEED TO MAKE THIS ONLY HAPPEN AFTER TEXT IS REMOVED, MAYBE?
