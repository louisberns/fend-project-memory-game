/*TODO:
 * - Control the state for cards;
 * - Make a function to randomize cards;
 * - Generate cards from JS;
 * - Make cards objects{};
 */

/*
 * Create a list that holds all of your cards
 */
var $deck = document.getElementById("deck");
var $card = document.getElementsByClassName("card");

Array.from($card).forEach(function(card) {
  var c = card;
  c.addEventListener("click", function (item) {
    var i = item;
    var iPath = item.path[0];
    var iChild = iPath.childNodes[1];

    iPath.classList += " show open";
    iChild.classList += " show";

    console.log(i.path[0], item.path[0].childNodes[1].classList);
  });
})

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}





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
