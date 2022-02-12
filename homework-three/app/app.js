function route() {
  //get the page id
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  //pass the page id to the model
  if (!pageID) {
    MODEL.getPageContent("home");
  } else {
    MODEL.getPageContent(pageID);
  }
}

function initListeners() {
  //listen for when the hashtag has changed in the url
  $(window).on("hashchange", route);
  //initialize the route function
  route();
}

$(document).ready(function () {
  //start the event listener
  initListeners();
});
