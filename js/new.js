const $newLoad = document.getElementById("new-load");
const $loadPages = document.getElementById("load-pages");
const loadClosed = "new-load-closed";
const loadOpen = "new-load-open";
const pagesClosed = "load-pages-closed";
const pagesOpen = "load-pages-open";


//To skip initial animation and start the game
$newLoad.addEventListener("click", function() {
  window.setTimeout(function() {
    $newLoad.classList = loadClosed;
    $loadPages.classList = pagesClosed;
  }, 100);
});

//Runs animation for initial load page
(function newLoad() {
  $newLoad.classList = loadOpen;
  $loadPages.classList = pagesOpen;

  window.setTimeout(function() {
    $newLoad.classList = loadClosed;
    $loadPages.classList = pagesClosed;
  }, 10000);
})();
