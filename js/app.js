/*TODO:
 * - Fix var for stars, update through JS
 * - Fix Animate match
 * - Add alert for winning the game and showing the score, reset game later
 */

/*
 * Create a list that holds all of your cards
 */
var player = {
  moves: 3,
  stars: 3
}
var $icons = [
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
var cards = {
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
    updateScore(2, 0);
    updateScore(1, 0);
  },
  close: function() {
    cards.card.forEach(function(c) {
      var i = document.getElementById(c.index);

      c.state = false;
      c.icon = undefined;

      i.classList = "card";
    })
  }
};

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
  for (x = 0; x < c.length; x++) {
    var $cardID = document.getElementById(x).childNodes[0]

    //Select the index on icons array and give to card
    c[x].icon = r[x];

    //Define class on DOM
    $cardID.classList = "fa " + r[x];

    //If ERR console message to debug
    if (c[x].icon === undefined) {
        console.log("ERR: Icon is undefined. Item: " + c[x] + "  ||  Icon: " + c[x].icon + "  ||  Index: " + x)
    }
  }
}
//Temmp values for selected cards
var currentIcon = undefined;
var prevIcon = undefined;
var currentItem = undefined;
var openCards = [];
var countMatch = [];
const $startOne = document.getElementById("start-one");
const $startTwo = document.getElementById("start-two");
const $startThree = document.getElementById("start-three");
const starsHTML = document.getElementById("stars");
const movesHTML = document.getElementById("moves");

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
  player.moves = 3;
  player.stars = 3;
  updateScore(2, 0);
  updateScore(1, 0);

}

//Function for modal to win the game and start new one
function animationWin() {
  window.setTimeout(function() {
    resetGame();
  }, 3000);
}

//Function to update moves on the #score-panel
function updateScore(type, score) {
  const m = movesHTML;
  const s = starsHTML;
  if (type === 1) {
    if (score) {
      player.moves += 3;
      m.innerText = player.moves;
    } else if (score === 0){
      m.innerText = player.moves;
    } else {
      m.innerText = player.moves;
    }
  } else if (type === 2) {
    if (score) {
      if (player.stars < 3) {
        player.stars += 1;
        s.innerText = player.stars;
      }
    } else if (score === 0){
      s.innerText = player.stars;
    } else {
      player.stars--;
      s.innerText = player.stars;
    }
  }
}

//Variables to control elements on page
const $card = document.getElementsByClassName("card");
const $restart = document.getElementById("restart");

$restart.addEventListener("click", function(r) {
  console.log("RESTART GAME");

  /*r.path[1].innerText = "PRESS F5 TO RESTART";*/
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
    openCards.push(obj);
  } else if (openCards.length === 1) {
    const firstCard = openCards[0];
    const firstCardID = firstCard.index;
    const $first = document.getElementById(firstCardID);
    const icoOne = firstCard.icon;
    const icoTwo = obj.icon;
    if (icoOne === icoTwo) {
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
        countMatch.push("clickNow: " + p + "  ||  clickTwo: " + $first);

        //Update value of moves ans stars and display on the #score-panel
        updateScore(1, true);
        updateScore(2, true);

        //Check if wins
        /*animationWin();*/
      }, 1000);
      //Reset value for openCards
      openCards = [];
    } else {
      p.classList += " show open";

      window.setTimeout(function(){
        wrongCards(p, $first);
      }, 1000);

      window.setTimeout(function(){
        p.classList = "card";
        o.state = false;

        $first.classList = "card";
        firstCard.state = false;
      },2000);

      //Update value of moves ans stars and display on the #score-panel
      player.moves += 1;
      updateScore(1, false);
      updateScore(2, false);

      console.log("Sorry, try again");

      openCards = [];
    }
  } else {
    //Reset value for openCards
    openCards = [];
    console.log("ERR did not compute well");
  }
}

//Open the item when clicked
function openItem (item, obj, iPath, iChild) {
  const i = item;
  const o = obj;
  const p = iPath;
  const c = iChild;

  if (o.state === false) {
    p.classList += " show open";
    o.state = true;
  }

  if (openCards.length !== 0) {
    if (o.index === openCards[0].index) {
      console.log("Choose your next card")
    } else {
      checkMatch(o, p, c);
    }
  } else {
    checkMatch(o, p, c);
  }


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

    currentItem = i;
    player.moves--;

    openItem(i, o, iPath, iChild);

    currentIcon = item.path[0].childNodes[0].classList;
    console.log(i.path[0], item.path[0].childNodes[0].classList);
  });
})
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
