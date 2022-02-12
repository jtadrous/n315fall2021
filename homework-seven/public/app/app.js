function initFirebase() {
  //to sign in with email/password using Web version 8
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("connected");
      showHiddenLinks(true);
    } else {
      console.log("user is not there");
    }
  });
}

function route() {
  //get the page id
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");
  const pages = ["home", "create", "browse", "you", "login"];

  for (const page of pages) {
    let tag = "#" + page + "-nav"; //for the underline on the nav link to the current page
    let back = page + "-image"; //for the background on the current page

    if (!pageID) {
      $("#home-nav").addClass("selected");
      $("body").addClass("home-image");
    } else if (pageID === "login") {
      $(tag).removeClass("selected");
      $("body").removeAttr("class");
      $("body").addClass("login-image");
    } else if (pageID === page) {
      $(tag).addClass("selected");
      $("body").addClass(back);
    } else {
      $(tag).removeClass("selected");
      $("body").removeClass(back);
    }
  }

  //pass the page id to the model
  if (!pageID) {
    MODEL.grabNewContent("home");
  } else {
    MODEL.grabNewContent(pageID);
  }
}

//hamburger menu function
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

function showHiddenLinks(status) {
  var hiddenEle = document.getElementsByClassName("hide-btn");
  var hiddenLog = document.getElementsByClassName("hide-log");

  if (status) {
    console.log(status);
    for (const x of hiddenEle) {
      x.style.display = "block";
    }
    for (const x of hiddenLog) {
      x.style.display = "none";
    }
  } else {
    console.log(status);
    for (const x of hiddenEle) {
      x.style.display = "none";
    }
    for (const x of hiddenLog) {
      x.style.display = "block";
    }
  }
}

function createUser() {
  //to retrieve from input boxes
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  let email = $("#email").val();
  let password = $("#pass").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user + " created");
      $("#fName").val("");
      $("#lName").val("");
      $("#email").val("");
      $("#pass").val("");
      showHiddenLinks(true);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function login() {
  let email = $("#emInput").val();
  let password = $("#passInput").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("logged in");
      $("#emInput").val("");
      $("#passInput").val("");
      showHiddenLinks(true);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("successfully signed out");
      showHiddenLinks(false);
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

function initListeners() {
  //listen for when the hashtag has changed in the url
  $(window).on("hashchange", route);
  //initialize the route function
  route();
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    //start the event listener
    initListeners();
  } catch {
    console.error(e);
  }
});
