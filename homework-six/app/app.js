//hamburger nav function
function myFunction(respond) {
  var x = document.getElementById("topnav");
  if (respond === "clicked") {
    x.style.display = "none";
  } else {
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }
}

function route() {
  const pages = ["home", "create", "browse", "login"];

  //get the page id
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  //pass the page id to the model
  if (!pageID) {
    $("#home-nav").addClass("selected");
    MODEL.grabNewContent("home");
  } else if (pageID === "login") {
    MODEL.grabNewContent(pageID);
    for (const page of pages) {
      let tag = "#" + page + "-nav";
      $(tag).removeClass("selected");
    }
  } else {
    MODEL.grabNewContent(pageID);
    for (const page of pages) {
      if (pageID === page) {
        let tag = "#" + page + "-nav";
        $(tag).addClass("selected");
      } else {
        let tag = "#" + page + "-nav";
        $(tag).removeClass("selected");
      }
    }
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
