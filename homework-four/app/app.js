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

//you should put your listeners inside their own function
function initListeners() {
  //listen for when the hashtag has changed in the url
  $(window).on("hashchange", route);
  //initialize the route function
  route();

  $("#submit").click(function (e) {
    e.preventDefault();
    let text = $("#callout-text").val();
    gsap.to($(".modal"), {
      scale: 0,
      duration: 0,
      onComplete: alert("Login successful! Welcome!"),
      onCompleteParams: [text],
    });
  });

  $("#showModal").click(function (e) {
    gsap.to($(".modal"), { scale: 1, duration: 2 });
    addModalListener();
  });
}

//you can not put a listener on elements that are not there yet
$(document).ready(function () {
  gsap.set($(".modal"), { scale: 0 });
  initListeners();
});
