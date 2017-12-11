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
    updateScore(2, 0);
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



//Message object
const messages = {
  welcome: ">Welcome to Memory, hope you enjoy it!",
  tutorial: "<br />----------------------<br /><span class='console-text'>Find all matches to WIN.<br />ONE MOVE open two cards.<br />IF MATCH = +1 STAR.<br /> IF Doesn't MATCH = -1 STAR.<br />----------------------</span>",
  next: "Choose your next card.",
  match: "It's a match!!! Matched icon: ",
  wrong: "Sorry, wrong combination. Try again.<br />You lost one star.",
  moves: "+1 move. Moves: ",
  win: "<br />██╗    ██╗██╗███╗   ██╗███╗   ██╗███████╗██████╗ <br />██║    ██║██║████╗  ██║████╗  ██║██╔════╝██╔══██╗<br />██║ █╗ ██║██║██╔██╗ ██║██╔██╗ ██║█████╗  ██████╔╝<br />██║███╗██║██║██║╚██╗██║██║╚██╗██║██╔══╝  ██╔══██╗<br />╚███╔███╔╝██║██║ ╚████║██║ ╚████║███████╗██║  ██║<br /> ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝",
  finalScore: "Your finalScore is: ",
  starFull: "Nice, you have THREE STARS!",
  starZero: "You have 0 stars.",
  resetMoves: "Reseted moves. MOVES: ",
  restartGame: "<br />RESTART...<br />LOADING...<br />GAME RENEWED.<br />",
  playAgain: "|--*</br>|-YOUR SCORE: <br />|---Moves: " + player.moves + "<br />|---Stars: " + player.stars + "<br />|-You can do better...<br />|--*<br />",
  rechargeMoves: "<span class='console-text'>You have ZERO MOVES, click in RECHARGE.</span>",
  gameOver: "<br /> ██████╗  █████╗ ███╗   ███╗███████╗<br />██╔════╝ ██╔══██╗████╗ ████║██╔════╝<br />██║  ███╗███████║██╔████╔██║█████╗  <br />██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  <br />╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗<br /> ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝<br /> ██████╗ ██╗   ██╗███████╗██████╗ <br />██╔═══██╗██║   ██║██╔════╝██╔══██╗<br />██║   ██║██║   ██║█████╗  ██████╔╝<br />██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗<br />╚██████╔╝ ╚████╔╝ ███████╗██║  ██║<br /> ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝",
  movesUpdated: "Your MOVES have been updated.<br />You PAID one STAR."
}

/*
 * PRINT LOG ON SCREEN CONSOLE
 */

//Functions to get console elements
const $console = document.getElementById("console");
const $consoleBox = document.getElementById("console-box");

(function() {
  log = function(message, type) {
    var type = type || 0;
    let m;

    if (type) {
      m = "<pre class='console-ascii'>" + message + "</pre><br />";
    } else {
      m = "<span class='console-text'>" + message + "</span><br />";
    }
    $console.innerHTML += m;
    $consoleBox.scrollTop = $consoleBox.scrollHeight;
  };
})();

/*//Log messages on console screen
function log(message) {
  m = message + "<br />";
  $console.innerHTML += m;
  $consoleBox.scrollTop = $consoleBox.scrollHeight;
}*/

function welcomeMessage() {
  log(messages.welcome + messages.tutorial);
}

/*
 * GAME FUNCTIONS AND ANIMATIONS
 */

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
  /*log(r);*/

  //Give icons to cards
  for (let x = 0; x < c.length; x++) {
    var $cardID = document.getElementById(x).childNodes[0];

    //Select the index on icons array and give to card
    c[x].icon = r[x];

    //Define class on DOM
    $cardID.classList = "fa " + r[x];

    //If ERR console message to debug
    if (c[x].icon === undefined) {
        log("ERR: Icon is undefined. Item: " + c[x] + "  ||  Icon: " + c[x].icon + "  ||  Index: " + x);
    }
  }
}

//Temmp values for selected cards
var currentIcon;
var currentItem;
const openCards = [];
const countMatch = [];
const iconsMatch = $icons.slice(0, 8);
const $openConsole = document.getElementById("open-console");
const $updateMoves = document.getElementById("update-moves");
const $starOne = document.getElementById("star-one");
const $starTwo = document.getElementById("star-two");
const $starThree = document.getElementById("star-three");
const movesHTML = document.getElementById("moves");
const iconsStars = [$starOne, $starTwo, $starThree];

//Initialize a new game
function newGame() {
  welcomeMessage();
  cards.display();
  addIcons();
}

newGame();

//Reset game
function resetGame() {
  log(messages.restartGame);

  cards.close();
  addIcons();

  //Update stars and moves value on the screen
  updateScore(1, 0);
  updateScore(2, 0);

  //Clear countMatch const
  countMatch.splice(0, countMatch.length);
}

//Function for modal to win the game and start new one
function animationWin() {
  window.setTimeout(function() {
    resetGame();
  }, 3000);
}


function handleConsole() {
  if ($consoleBox.classList[0] === "console-box-open") {
    $consoleBox.classList = "console-box-closed";
  } else if ($consoleBox.classList[0] === "console-box-closed") {
    $consoleBox.classList = "console-box-open";
  } else {
    $consoleBox.classList = "console-box-open";
  }
}

function rechargeButton() {
  player.moves += 7;
  updateScore(1, true);
  updateScore(2, false);
  log(messages.movesUpdated);
  $updateMoves.classList = "btn-stats update-closed";
}

//Open console when clicked
$openConsole.addEventListener("click", function() {
  handleConsole();
});

//Rechage moves
$updateMoves.addEventListener("click", function() {
  rechargeButton();
});


/*Function to append stars on the panel-score
 *
 */
function appendStars(count, score) {
  let i = count;
  if (score === true || score === 0) {
    switch (i) {
      case 1:
        iconsStars[2].classList = "fa fa-star open-star";
        break;
      case 2:
        iconsStars[1].classList = "fa fa-star open-star";
        break;
      case 3:
        iconsStars[0].classList = "fa fa-star open-star";
        iconsStars[1].classList = "fa fa-star open-star";
        iconsStars[2].classList = "fa fa-star open-star";
        log(messages.starFull);
        break;
      case undefined:
        log("The count is undefined. Value of i: " + i + "");
        break;
    }
  } else if (score === false){
    switch (i) {
      case 0:
        iconsStars[2].classList = "fa fa-star";
        iconsStars[1].classList = "fa fa-star";
        iconsStars[0].classList = "fa fa-star";
        log(messages.starZero);
        break;
      case 1:
        iconsStars[1].classList = "fa fa-star";
        break;
      case 2:
        iconsStars[2].classList = "fa fa-star";
        break;
      case 3:
        log("The player stars is not subtracted. Value of i: " + i + "");
        break;
      case undefined:
        log("The count is undefined. Value of i: " + i + "");
        break;
    }
  }
}

/*Function to update moves on the #score-panel
 *Choose the type: [1] for MOVES; [2] for STARS.
 *Choose the score: TRUE for Card Match; FALSE normal update count; [0] to Reset;
 */
function updateScore(type, score) {
  const m = movesHTML;
  const p = player;

  if (type === 1) { /*MOVES*/
    //Count player move on panel
    if (score) { /*For score TRUE*/
      /*if (p.moves <= 0 && p.stars > 0) {
        log(messages.rechargeMoves);
        $updateMoves.classList = "btn-stats update-open";
      } else if (p.moves <= 0 && p.stars === 0) {
        log(messages.gameOver, true);
        resetGame();
      } else if (p.moves > 0) {
        p.moves--;
        m.innerText = p.moves;
      } else {
        log("ERR: moves is unexpected. Moves: " + p.moves);
      }*/
      p.moves++;
      m.innerText = p.moves;
    } else if (score === 0) { /*For score [0] reset*/
      p.moves = 0;
      m.innerText = p.moves;
      log(messages.resetMoves + p.moves);
    } else {
      log("ERR: score is unexpected. Score: " + score);
    }
  } else if (type === 2) { /*STARS*/

    if (score) { /*For score TRUE*/
      //Check if player has less than 3 stars
      if (p.stars === 3) {
        log("***");
      } else if (p.stars >= 0 && p.stars <= 3) {
        p.stars++;
      }
    } else if (score === 0) {
      p.stars = 3;
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
  //Add class w/ animation and run function to restart
  $restart.classList = "btn-stats run-restart";
  window.setTimeout(function() {
    resetGame();
    $restart.classList = "btn-stats";
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

  if (openCards.length === 0) {
    //Check error for function calling
    log("Is just one card selected, choose one card.");
  } else if (openCards.length === 1) {
    //When this is the second card
    const firstCard = openCards[0];
    const firstCardID = firstCard.index;
    const $first = document.getElementById(firstCardID);
    const icoOne = firstCard.icon;
    const icoTwo = obj.icon;
    if (icoOne === icoTwo) {
      //If both icons are equal, match cards

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

        //Log the cards on console
        log(messages.match + icoOne);

        //Check if wins
        if (countMatch.length === iconsMatch.length) {
          //Print the game result and start a new game
          log(messages.win, true);
          log(messages.playAgain);
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

        log(messages.wrong);
      }, 2000);

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
      log(messages.next);
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

    //Check if player can pick a card
    /*if (player.moves <= 0) {
      updateScore(1, true);
      return false;
    }*/

    //Function for open card
    openItem(i, o, iPath, iChild);

    //Update value of current icon and card
    currentItem = i;
    currentIcon = item.path[0].childNodes[0].classList;

    //Check on the console for selected card - icon class
    log("ITEM SELECTED: " + currentIcon["1"]);
  });
});
