/*TODO:
 * - Fix var for stars, update through JS
 * - Fix Animate match
 * - Add alert for winning the game and showing the score, reset game later
 */

/*
 * Create a list that holds all of your cards
 */
const player = {
  moves: 0,
  stars: 3
};
const $icons = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb"];

//Objects of cards and functions
const cards = {
  card : [{
    index: 0,
    icon: undefined,
    state: false
  },{
    index: 1,
    icon: undefined,
    state: false
  },{
    index: 2,
    icon: undefined,
    state: false
  },{
    index: 3,
    icon: undefined,
    state: false
  },{
    index: 4,
    icon: undefined,
    state: false
  },{
    index: 5,
    icon: undefined,
    state: false
  },{
    index: 6,
    icon: undefined,
    state: false
  },{
    index: 7,
    icon: undefined,
    state: false
  },{
    index: 8,
    icon: undefined,
    state: false
  },{
    index: 9,
    icon: undefined,
    state: false
  },{
    index: 10,
    icon: undefined,
    state: false
  },{
    index: 11,
    icon: undefined,
    state: false
  },{
    index: 12,
    icon: undefined,
    state: false
  },{
    index: 13,
    icon: undefined,
    state: false
  },{
    index: 14,
    icon: undefined,
    state: false
  },{
    index: 15,
    icon: undefined,
    state: false
  }],
  display: function() {
    //Function for displaying cards on the screen #deck
    cards.card.forEach(function(c) {
      var i = c.index;
      var cardHTML = "<div id='" + i + "' class='card'><i class='fa '</i></div>";

      $deck.innerHTML += cardHTML;
    });

    //Display stars and moves on the screen
    updateScore(1, 0);
    updateScore(2, true);
  },
  close: function() {
    cards.card.forEach(function(c) {
      var i = document.getElementById(c.index);

      c.state = false;
      c.icon = undefined;

      i.classList = "card";
    });
  }
};

//Rewrite console.log function
(function() {
  var old = console.log;
  var log = document.getElementById("console");
  console.log = function (message) {
    if (typeof message === "object") {
      log.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + "<br />";
    } else {
      log.innerHTML += message + "<br />";
    }
  }
})();

//Get DECK elemnt for appending content, and var to Cards objects
var $deck = document.getElementById("deck");
var $cardsObj = cards.card;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    //While there are still elements to shuffle
    while (currentIndex !== 0) {

        //Pick a remaining element..
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        //And swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Add icons to Objects and Classlist
function addIcons () {
  var c = cards.card;
  var r = $icons;

  //Shuffle array to randomize icons
  shuffle(r);
  console.log(r);

  //Give icons to cards
  for (let x = 0; x < c.length; x++) {
    var $cardID = document.getElementById(x).childNodes[0];

    //Select the index on icons array and give to card
    c[x].icon = r[x];

    //Define class on DOM
    $cardID.classList = "fa " + r[x];

    //If ERR console message to debug
    if (c[x].icon === undefined) {
        console.log("ERR: Icon is undefined. Item: " + c[x] + "  ||  Icon: " + c[x].icon + "  ||  Index: " + x);
    }
  }
}

//Temmp values for selected cards
var currentIcon;
var prevIcon;
var currentItem;
const openCards = [];
const countMatch = [];
const iconsMatch = $icons.slice(0, 8);
const $starOne = document.getElementById("star-one");
const $starTwo = document.getElementById("star-two");
const $starThree = document.getElementById("star-three");
const $winMessage = document.getElementById("win-message");
const $scoreWin = document.getElementById("score-win");
const $starsWin = document.getElementById("stars-win");
const starsHTML = document.getElementById("stars");
const movesHTML = document.getElementById("moves");
const iconsStars = [$starOne, $starTwo, $starThree];

//Initialize a new game
function newGame() {
  cards.display();
  addIcons();
}

newGame();

//Reset game
function resetGame() {
  cards.close();
  addIcons();

  //Update stars and moves value on the screen
  player.moves = 0;
  player.stars = 3;
  updateScore(1, 0);
  updateScore(2, true);

  //Clear countMatch const
  countMatch.splice(0, countMatch.length);
}

//Function for modal to win the game and start new one
function animationWin() {
  window.setTimeout(function() {
    resetGame();
  }, 3000);
}

/*Function to append stars on the panel-score
 *
 */
function appendStars(count, score) {
  let i = count;
  if (score === true) {
    switch (i) {
      case 1:
        $starThree.classList = "fa fa-star open-star";
        break;
      case 2:
        $starTwo.classList = "fa fa-star open-star";
        break;
      case 3:
        $starOne.classList = "fa fa-star open-star";
        $starTwo.classList = "fa fa-star open-star";
        $starThree.classList = "fa fa-star open-star";
        console.log("Already with THREE stars ***");
        break;
      case undefined:
        console.log("The count is undefined. Value of i: " + i + "");
        break;
    }
  } else if (score === false){
    switch (i) {
      case 0:
        $starThree.classList = "fa fa-star";
        $starTwo.classList = "fa fa-star";
        $starOne.classList = "fa fa-star";
        console.log("You have 0 stars. Value of i: " + i + "");
      case 1:
        $starTwo.classList = "fa fa-star";
        break;
      case 2:
        $starThree.classList = "fa fa-star";
        break;
      case 3:
        console.log("The player stars is not subtracted. Value of i: " + i + "");
        break;
      case undefined:
        console.log("The count is undefined. Value of i: " + i + "");
        break;
    }
  } else {
    debugger;
  }
}

/*Function to update moves on the #score-panel
 *Choose the type: [1] for MOVES; [2] for STARS.
 *Choose the score: TRUE for Card Match; FALSE normal update count; [0] to Reset;
 */
function updateScore(type, score) {
  const m = movesHTML;
  const s = starsHTML;
  const p = player;

  if (type === 1) { /*MOVES*/
    //Count player move on panel
    if (score) { /*For score TRUE*/
      p.moves++;
      m.innerText = p.moves;
    } else if (score === 0) { /*For score [0] reset*/
      p.moves = 0;
      m.innerText = p.moves;
      console.log("Reseted moves");
    } else {
      console.log("ERR: score is unexpected. Score: " + score + "");
    }
  } else if (type === 2) { /*STARS*/

    if (score) { /*For score TRUE*/
      //Check if player has less than 3 stars
      if (p.stars === 3) {
        console.log("Already w/ THREE ***");
      } else if (p.stars >= 0 && p.stars <= 3) {
        p.stars++;
      }
    } else if (score === false && p.stars > 0) { /*For score FALSE*/
      //Subtract one star of the player
      p.stars--;
    }
    appendStars(p.stars, score);
  }
}

//Variables to control elements on page
const $card = document.getElementsByClassName("card");
const $restart = document.getElementById("restart");

//Restart the game when clicked on restart icon
$restart.addEventListener("click", function(r) {
  console.log("RESTART GAME");

  //Add class w/ animation and run function to restart
  $restart.classList = "run-restart";
  window.setTimeout(function() {
    resetGame();
    $restart.classList = "";
  }, 1000);
});

//Wrong cards animation
function wrongCards (last, first) {
  last.classList = "card wrong";
  first.classList = "card wrong";
}

//Check if the cards match
function checkMatch (obj, iPath, iChild) {
  const o = obj;
  const p = iPath;
  const c = iChild;

  if (openCards.length === 0) {
    //Check error for function calling
    console.log("Is just one card selected, choose one card.");
  } else if (openCards.length === 1) {
    //When this is the second card
    const firstCard = openCards[0];
    const firstCardID = firstCard.index;
    const $first = document.getElementById(firstCardID);
    const icoOne = firstCard.icon;
    const icoTwo = obj.icon;
    if (icoOne === icoTwo) {
      //If both icons are equal, match cards

      //Log the cards on console
      console.log("It's a Match  ||  icoOne: " + icoOne + "  ||  icoTwo: " + icoTwo);

      p.classList += " show open";

      //Wait the animation runs
      window.setTimeout(function(){
        //Update classes of matched cards
        p.classList = "card match";
        $first.classList = "card match";

        //Update the object's states => 'matched'
        o.state = true;
        firstCard.state = true;

        //Push object to countMatch array
        countMatch.push(icoOne);

        //Update value of moves ans stars and display on the #score-panel
        updateScore(1, true);
        updateScore(2, true);

        //Check if wins
        if (countMatch.length === iconsMatch.length) {
          animationWin();
        }
      }, 1000);

      //Reset value for openCards
      openCards.splice(0, openCards.length);
    } else {
      //When the icons for selected cards are different, run wrongCards()

      //Open second card first
      p.classList += " show open";

      //Runs animation for wrong cards after
      window.setTimeout(function(){
        wrongCards(p, $first);
      }, 1000);

      //Update classList and close selected cards on deck and update stars
      window.setTimeout(function(){
        p.classList = "card";
        o.state = false;

        $first.classList = "card";
        firstCard.state = false;

        //Update value of moves ans stars and display on the #score-panel
        updateScore(1, true);
        updateScore(2, false);
      }, 2000);

      console.log("Sorry, try again");

      //Clear const value for openCards
      openCards.splice(0, openCards.length);
    }
  } else {
    //Reset value for openCards
    openCards.splice(0, openCards.length);
  }
}

//Open the item when clicked
function openItem (item, obj, iPath, iChild) {
  const i = item;
  const o = obj;
  const p = iPath;
  const c = iChild;

  //If this is the fisrt card chosen
  if (o.state === false) {
    p.classList += " show open";
    o.state = true;
  }

  //If is already a card open, check if match w/ first card
  if (openCards.length !== 0) {
    if (o.index === openCards[0].index) {
      console.log("Choose your next card");
    } else {
      checkMatch(o, p, c);
    }
  } else {
    //Update openCards const with the obj value
    openCards.push(o);
  }

  //Update value of current selected temp obj
  currentItem = i;
}

Array.from($card).forEach(function(card) {
  const c = card;
  c.addEventListener("click", function (item) {
    const i = item;
    const oID = item.path[0].id;
    const o = $cardsObj[oID];
    const iPath = item.path[0];
    const iChild = iPath.childNodes[0];

    //Function for open card
    openItem(i, o, iPath, iChild);

    //Update value of current icon and card
    currentItem = i;
    currentIcon = item.path[0].childNodes[0].classList;

    /*//Check on the console for selected card - icon class
    console.log(i.path[0], item.path[0].childNodes[0].classList);*/
  });
});
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
