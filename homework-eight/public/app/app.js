//global variables
var ingCount = 3;
var instrCount = 3;
var person;
var currentRec;
var yourRecipes = [];
var browseRecipes = [];

//start the connection with Firebase
function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("connected");
      showHiddenLinks(true);
      console.log(user.displayName);
      person = user.displayName;
    } else {
      console.log("user is not there");
    }
  });
}

//setup each of the web pages
function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");
  const pages = ["home", "create", "browse", "you", "login", "view", "edit"];

  for (const page of pages) {
    let tag = "#" + page + "-nav"; //for the underline on the nav link to the current page
    let back = page + "-image"; //for the background on the current page

    if (pageID === "create") {
      if (!person) {
        alert("Please login!");
        return;
      }
    }

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
    MODEL.grabNewContent("home", dynamicPageChanges);
  } else {
    MODEL.grabNewContent(pageID, dynamicPageChanges);
  }
}

//callback function connected to the model to load dynamic data
function dynamicPageChanges(pageName) {
  if (pageName === "browse") {
    getBrowseData();
  } else if (pageName === "you") {
    getYourData();
  } else if (pageName === "create") {
    ingCount = 3;
    instrCount = 3;
  } else if (pageName === "edit") {
    editRecipe(currentRec);
  } else if (pageName === "view") {
    viewRecipe(currentRec);
  }

  updateTitle();
}

//change the titles for each page dynamically
function updateTitle() {
  if (person) {
    if (yourRecipes.length < 1) {
      $(".topTitleYou").html(`Hey ${person}, your recipes list is empty!`);
    } else {
      $(".topTitleYou").html(`Hey ${person}, here are your recipes!`);
    }

    $(".topTitleCreate").html(`Hey ${person}, create your recipe!`);
    $(".topTitleEdit").html(`Hey ${person}, edit your recipe!`);
  } else {
    $(".topTitleYou").html(`Page was reloaded. Please return to the homepage.`);
    $(".topTitleCreate").html(
      `Page was reloaded. Please return to the homepage.`
    );
    $(".topTitleEdit").html(
      `Page was reloaded. Please return to the homepage.`
    );
  }
}

//hamburger menu function
function myFunction(respond) {
  var x = document.getElementById("bottomnav");
  if (respond === "clicked") {
    x.style.display = "none";
  } else {
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
}

//show or hide links based on login status
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

//create a new user in Firebase
function createUser() {
  let fName = $("#fName").val();
  let email = $("#email").val();
  let password = $("#pass").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      updateUserInFirebase(fName);
      console.log(user + " created");
      $("#fName").val("");
      $("#lName").val("");
      $("#email").val("");
      $("#pass").val("");
      showHiddenLinks(true);
      alert("Sign up successful. Welcome " + person + "!");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert("Sign up unsuccessful. Please try again.");
    });
}

//login a user in Firebase
function login() {
  let email = $("#emInput").val();
  let password = $("#passInput").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      $("#emInput").val("");
      $("#passInput").val("");
      showHiddenLinks(true);
      alert("Login successful. Welcome " + person + "!");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(
        "Login unsuccessful. Check email and password entered and try again."
      );
    });
}

//logout a user in Firebase
function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("successfully signed out");
      showHiddenLinks(false);
      person = "";
      alert("Sign out successful!");
    })
    .catch((error) => {
      console.log(error);
      alert("Sign out unsuccessful. Please try again.");
    });
}

//add a new input box for another ingredient
function addIngred(event) {
  ingCount++;
  //let newID = "ind" + ingCount;
  $(".ingred").append(
    `<input id="ind${ingCount}" type="text" placeholder="Ingredient ${ingCount}" />`
  );
}

//add a new input box for another instruction
function addInstr(event) {
  instrCount++;
  //let newID = "ind" + ingCount;
  $(".instr").append(
    `<input id="instr${instrCount}" type="text" placeholder="Instruction ${instrCount}" />`
  );
}

//update user's display name in Firebase
function updateUserInFirebase(disName) {
  //this is taking place on the firebase server, not locally
  //doesn't fully work, name doesn't update at first when a user signs up
  //only works when they sign out and re-login
  firebase.auth().currentUser.updateProfile({
    displayName: disName,
  });
  person = disName;
}

function saveCardId(event) {
  let clickedID = event.target.id;
  console.log(clickedID);
  currentRec = clickedID;

  ingCount = yourRecipes[clickedID].ingredients.length;
  instrCount = yourRecipes[clickedID].instructions.length;
}

//retrieve browse recipes data from json file
function getBrowseData() {
  let newRec = ``;

  $.each(browseRecipes, function (idx, info) {
    newRec =
      newRec +
      `<div class="card">
        <div class="left-card ${info.image}"></div>
        <div class="right-card">
          <h3>${info.name}</h3>
          <p>${info.desc}</p>
          <div class="time">
            <img src="../../images/time.svg" alt="time-icon" />
            <p>${info.time}</p>
          </div>
          <div class="serve">
            <img src="../../images/servings.svg" alt="servings-icon" />
            <p>${info.serve}</p>
          </div>
        </div>
      </div>`;
  });

  $(".all-cards").html(newRec);
}

//retrieve user recipes data from json file
function getYourData() {
  let yourNewRec = ``;

  $.each(yourRecipes, function (idx, info) {
    yourNewRec =
      yourNewRec +
      `<div class="cardAndBtns">
        <div class="card">
        <div class="left-card ${info.image}">
        <a href="#/view"><button id="${info.id}" onclick="saveCardId(event)">View</button></a>
        </div>
        <div class="right-card">
          <h3>${info.name}</h3>
          <p>${info.desc}</p>
          <div class="time">
            <img src="../../images/time.svg" alt="time-icon" />
            <p>${info.time}</p>
          </div>
          <div class="serve">
            <img src="../../images/servings.svg" alt="servings-icon" />
            <p>${info.serve}</p>
          </div>
        </div>
      </div>
      <div class="crud">
        <a href="#/edit"><button id="${info.id}" onclick="saveCardId(event)">Edit Recipe</button></a>
        <button id="${info.id}" onclick="deleteRecipe(event)">Delete</button>
      </div>
      </div>`;
  });

  $("#your-cards").html(yourNewRec);
}

function getAllData() {
  $.getJSON("../data/data.json", function (data) {
    yourRecipes = data["your-recipes"];
    browseRecipes = data["browse"];
  }).fail(function (error) {
    console.log("hello", error);
    alert("Unable to find data.");
  });
}

//get user inputs and store as a new recipe
function createRecipe(status) {
  let addImage = $("#addImage").val();
  let recName = $("#recName").val();
  let recDesc = $("#recDesc").val();
  let recTime = $("#recTime").val();
  let recSize = $("#recSize").val();
  let ingred = [];
  let instr = [];

  $(".ingred :input").each(function (e) {
    ingred.push(this.value);
  });
  $(".instr :input").each(function (e) {
    instr.push(this.value);
  });

  let saveID;
  if (status) {
    saveID = Number(currentRec);
  } else {
    saveID = yourRecipes.length;
  }

  let newUserRec = {
    id: saveID,
    name: recName,
    desc: recDesc,
    time: recTime,
    serve: recSize,
    image: addImage,
    ingredients: ingred,
    instructions: instr,
  };

  if (!status) {
    yourRecipes.push(newUserRec);
    console.log(yourRecipes);
  } else {
    yourRecipes[currentRec] = newUserRec;
    console.log(yourRecipes);
  }

  alert("Your recipe has been saved successfully!");
}

//retrieve current recipe data from json file and display in edit form
function editRecipe(cardIndex) {
  let editDetails = yourRecipes[cardIndex];

  let editHtml = `<div class="details">
  <div>
    <input
      disabled
      id="recImage"
      type="text"
      placeholder="Add Recipe Image"
    />
    <select name="Add Image" id="addImage">
      <option value="file">Attach File</option>
      <option value="pizza">Pizza</option>
      <option value="burger">Burger</option>
      <option value="pilaf">Pilaf</option>
      <option value="chow">Chow Mein</option>
    </select>
  </div>
  <input id="recName" type="text" value="${editDetails.name}" />
  <input id="recDesc" type="text" value="${editDetails.desc}" />
  <input id="recTime" type="text" value="${editDetails.time}" />
  <input id="recSize" type="text" value="${editDetails.serve}" />
  </div>
  <div class="ingred">
  <p>Enter Ingredients:</p>`;

  let editIng = ``;
  $.each(editDetails.ingredients, function (idx, newIng2) {
    editIng = editIng + `<input type="text" value="${newIng2}" />`;
  });

  editIng =
    editIng +
    `<div class="addBtn" id="ingrBtn" onclick="addIngred(event)">+</div>
  </div>`;

  let editIns = `<div class="instr">
  <p>Enter Instructions:</p>`;
  $.each(editDetails.instructions, function (idx, newIns2) {
    editIns = editIns + `<input type="text" value="${newIns2}" />`;
  });

  editIns =
    editIns +
    `<div class="addBtn" id="instrBtn" onclick="addInstr(event)">+</div>
  </div>
  <div class="subForm">
    <a href="#/you"><button type="submit" id="subRec" onclick="createRecipe(true)">
      Submit Changes
    </button></a>
  </div>`;

  editHtml = editHtml + editIng + editIns;
  $("#editForm").html(editHtml);

  $("#editForm option").each(function () {
    if (editDetails.image === $(this)[0].value) {
      $(this).attr("selected", "selected");
    }
  });
}

function deleteRecipe(event) {
  let myCardIndex = event.target.id;

  if (confirm("Are you sure you want to delete this recipe?")) {
    yourRecipes.splice(myCardIndex, 1);
    MODEL.grabNewContent("you", dynamicPageChanges);
    alert("Recipe successfully deleted!");
  }
}

//retrieve and display all recipe details
function viewRecipe(cardIndex) {
  let allDetails = yourRecipes[cardIndex];

  let viewHtml = `<div class="topRec">
    <div class="leftRec">
      <div class="sideBox">
        <h3 id="imgCap">${allDetails.name}</h3>
      </div>
      <div class="recImg ${allDetails.image}"></div>
    </div>
    <div class="rightRec">
      <h3>Description:</h3>
      <p>${allDetails.desc}</p>
      <br />
      <h3>Total Time:</h3>
      <p>${allDetails.time}</p>
      <br />
      <h3>Servings:</h3>
      <p>${allDetails.serve}</p>
      <br />
    </div>
  </div>`;

  let allIng = `<div class="ingredients">
  <h3>Ingredients</h3>`;

  $.each(allDetails.ingredients, function (idx, newIng) {
    allIng = allIng + `<p>${newIng}</p>`;
  });

  allIng = allIng + `</div>`;

  allIns = `<div class="instructions">
  <h3>Instructions</h3>
  <ol>`;

  $.each(allDetails.instructions, function (idx, newIns) {
    allIns = allIns + `<li>${newIns}</li>`;
  });

  allIns =
    allIns +
    `</ol>
    </div>
    <div class="edit">
      <a href="#/edit"><button id="${allDetails.id}" onclick="saveCardId(event)">Edit Recipe</button></a>
    </div>`;

  viewHtml = viewHtml + allIng + allIns;
  $(".view").html(viewHtml);
}

//start all event listeners
function initListeners() {
  //listen for when the hashtag has changed in the url
  $(window).on("hashchange", route);
  route();

  //if the window has been resized to desktop, hide mobile nav
  window.addEventListener(
    "resize",
    function (event) {
      if (window.innerWidth >= 768) {
        $("#bottomnav").css("display", "none");
      }
    },
    true
  );
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
    getAllData();
  } catch {
    console.error(e);
  }
});
