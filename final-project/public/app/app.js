let coffeeMakers = [];
let cart = [];
let loginStatus;
let person;

//start the connection with Firebase
function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("connected");
      person = user.displayName;
      loginStatus = true;
      $("#out-btn").css("display", "block");
      $(".log, .sign").css("display", "none");
    } else {
      console.log("user is not there");
      loginStatus = false;
      $("#out-btn").css("display", "none");
      $(".log, .sign").css("display", "block");
    }
  });
}

//setup each of the site pages
function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  //pass the page id to the model
  if (!pageID) {
    MODEL.grabNewContent("home", dynamicChanges);
  } else {
    MODEL.grabNewContent(pageID, dynamicChanges);
  }
}

//callback function connected to the model to load dynamic data
function dynamicChanges(pageName) {
  if (pageName === "home" || !pageName) {
    displayInventory();
  } else if (pageName === "cart") {
    displayCart();
    displayCartSummary();
    setCartEvents();
  }
}

//start all dynamic cart event listeners
function setCartEvents() {
  //clear cart listener
  $("#clear").on("click", function (event) {
    cart = [];
    route();
    //toast alert
    $(".toast").toast("show");
    $(".toast-head").html("Success!");
    $(".toast-body").html("Cart cleared.");
    countCart();
  });

  //remove item listener
  $(".closeItem").on("click", function (event) {
    cart.splice(event.currentTarget.id, 1);
    route();
    //toast alert
    $(".toast").toast("show");
    $(".toast-head").html("Success!");
    $(".toast-body").html("Item removed.");
    countCart();
  });

  //change item count listener
  $(".numOfItem").on("change", function (event) {
    cart[event.currentTarget.id].count = this.value;
    route();
    countCart();
  });

  //checkout
  $("#checkout").on("click", function (event) {
    cart = [];
    route();
    //toast alert
    $(".toast").toast("show");
    $(".toast-head").html("Success!");
    $(".toast-body").html("Checkout successful, thank you.");
    countCart();
  });
}

//count how many items are in the cart
function countCart() {
  let countForNav = 0;
  $.each(cart, function (index, purchase) {
    countForNav = countForNav + Number(purchase.count);
  });
  $(".navCount").html(countForNav);

  if (countForNav <= 0) {
    $(".navCount").css("display", "none");
  } else {
    $(".navCount").css("display", "block");
  }
}

//retrieve json data
function getAllData() {
  $.getJSON("../data/data.json", function (data) {
    coffeeMakers = data["coffee-makers"];
    console.log(coffeeMakers);
    displayInventory();
  }).fail(function (error) {
    console.log("hello", error);
    //toast alert
    $(".toast").toast("show");
    $(".toast-head").html("Warning!");
    $(".toast-body").html("Unable to find data.");
  });
}

//show items in inventory on page
function displayInventory() {
  inventoryHtml = ``;

  $.each(coffeeMakers, function (index, info) {
    item = `
    <div class="card">
        <img src="img/${info.image}" alt="${info.image}" />
        <div class="colors">
    `;

    let availColors = ``;
    $.each(info.colors, function (index, color) {
      if (color === "#ffffff") {
        availColors =
          availColors +
          `<div style="background-color: ${color}; border: solid 2px #d2d2d2"></div>`;
      } else {
        availColors =
          availColors +
          `<div style="background-color: ${color}; border: solid 2px ${color};"></div>`;
      }
    });
    item = item + availColors;

    item =
      item +
      `
        </div>
        <h3>${info.name}</h3>
        <p>$${info.price}</p>
        <div class="stars">
    `;

    let halfStar = `<i class="fa fa-star-half checked"></i>`;
    let numStars = [
      `<i class="fa fa-star checked"></i>`,
      `<i class="fa fa-star checked"></i><i class="fa fa-star checked"></i>`,
      `<i class="fa fa-star checked"></i><i class="fa fa-star checked"></i><i class="fa fa-star checked"></i>`,
      `<i class="fa fa-star checked"></i><i class="fa fa-star checked"></i><i class="fa fa-star checked"></i><i class="fa fa-star checked"></i>`,
      `<i class="fa fa-star checked"></i><i class="fa fa-star checked"></i><i class="fa fa-star checked"></i><i class="fa fa-star checked"></i><i class="fa fa-star checked"></i>`,
    ];
    let allStars = ``;

    if (
      info.rating === 0.5 ||
      info.rating === 1.5 ||
      info.rating === 2.5 ||
      info.rating === 3.5 ||
      info.rating === 4.5
    ) {
      let sub = info.rating - 1.5;
      allStars = numStars[sub] + halfStar;
    } else {
      let roundRat = Math.round(info.rating) - 1;
      allStars = numStars[roundRat];
    }

    item = item + allStars;
    item =
      item +
      `
        <p>${info.rating.toFixed(1)} | (${info.reviews})</p>
        </div>
        <div class="ship">
        <i class="fa fa-truck"></i>
        <p>Free shipping</p>
        </div>
        <label class="container"
        >Compare
        <input type="checkbox" />
        <span class="checkmark"></span>
        </label>
        <button onclick="addCart(${info.id})">Buy Now</button>
    </div>
    `;

    inventoryHtml = inventoryHtml + item;
  });

  $(".inventory").html(inventoryHtml);
}

//add items to cart array
function addCart(idx) {
  if (!loginStatus) {
    //toast alert
    $(".toast").toast("show");
    $(".toast-head").html("Warning!");
    $(".toast-body").html("Please login.");
    return;
  }

  let check = false;
  $.each(cart, function (index, thing) {
    if (thing.data.id === idx) {
      if (Number(thing.count) < 5) {
        cart[index].count = Number(thing.count) + 1;
        check = true;

        //toast alert
        $(".toast").toast("show");
        $(".toast-head").html("Success!");
        $(".toast-body").html("Item added to cart.");
      } else {
        check = true;

        //toast alert
        $(".toast").toast("show");
        $(".toast-head").html("Warning!");
        $(".toast-body").html("Max number (5) of a single item reached.");
      }
    }
  });

  if (!check) {
    let initialItem = {
      data: coffeeMakers[idx],
      count: 1,
    };
    cart.push(initialItem);

    //toast alert
    $(".toast").toast("show");
    $(".toast-head").html("Success!");
    $(".toast-body").html("Item added to cart.");
  }

  countCart();
}

//show items in cart on page
function displayCart() {
  let cartHtml = ``;

  if (cart.length === 0) {
    cartHtml = `<div id="empty"><p>0 ITEMS</p><h1>You don't have any items in your shopping cart</h1></div>`;
    $(".details").html(cartHtml);
    $(".ship").css("display", "none");
  } else {
    $.each(cart, function (index, purchase) {
      cartHtml = `<div class="selection">
        <div class="delete">
          <a href="#">Save For Later</a>
          <span class="closeItem" id="${index}"><i class="fa fa-close"></i></span>
        </div>
        <div class="item">
        <div class="main">
          <img src="../img/${purchase.data.image}" alt="${
        purchase.data.image
      }" />
          <h4>${purchase.data.name}</h4>
          </div>
          <div class="selectNum">
            <p>$${purchase.data.price} each</p>
            <select name="num" class="numOfItem" id="${index}">
              <option value="1" ${
                purchase.count == 1 ? "selected" : ""
              }>1</option>
              <option value="2" ${
                purchase.count == 2 ? "selected" : ""
              }>2</option>
              <option value="3" ${
                purchase.count == 3 ? "selected" : ""
              }>3</option>
              <option value="4" ${
                purchase.count == 4 ? "selected" : ""
              }>4</option>
              <option value="5" ${
                purchase.count == 5 ? "selected" : ""
              }>5</option>
            </select>
            <p>$${(purchase.data.price * purchase.count).toFixed(2)}</p>
          </div>
        </div>
      </div>`;
      $(".purchases").append(cartHtml);
    });
  }
}

//show cart summary details on page
function displayCartSummary() {
  let cartSummary = ``;
  let totalCount = 0;
  let totalPrice = 0;

  $.each(cart, function (index, purchase) {
    totalCount = totalCount + Number(purchase.count);
    totalPrice = totalPrice + purchase.count * purchase.data.price;
  });

  if (totalPrice < 29) {
    $(".ship").css("display", "none");
  }

  let oneItem = totalCount + " item";
  let multiple = totalCount + " items";

  cartSummary = `<div id="first"><p>Subtotal (${
    totalCount == 1 ? oneItem : multiple
  })</p><p>$${totalPrice.toFixed(2)}</p></div>
  <div class="sub"><p>Savings & Discounts</p><p id="save">-$0.00</p></div>
  <div class="sub"><a>Add coupon</a></div>
  <div class="sub"><p>Shipping</p><p id="free">FREE</p></div>
  <div id="order" class="sub"><h4>Order Total <i class="fa fa-info-circle"></i></h4><p>$${totalPrice.toFixed(
    2
  )}</p></div>
  <div id="checkout"><button id="secure">SECURE CHECKOUT</button><button id="paypal">Check out with PayPal</button></div>`;
  $(".total").append(cartSummary);
}

//modal functionality
function addModal() {
  var modal = document.getElementById("logModal");

  $("#profile").hover(function (e) {
    modal.style.display = "block"; //hover profile icon to open modal
  });

  $("#mobProfile").click(function (e) {
    modal.style.display = "block"; //click profile icon to open modal
  });

  $(".user").on("click", function (event) {
    modal.style.display = "block"; //click login or create link to open modal
  });

  $("#close").click(function (e) {
    modal.style.display = "none"; //click x to close modal
  });

  $(".bgLayer").click(function (event) {
    modal.style.display = "none"; //click outside to close modal
  });

  $("#out-btn, #log-btn, #sign-btn").click(function (event) {
    modal.style.display = "none"; //click submit button on modal
  });
}

//create a new user in firebase
function createUser() {
  let fName = $("#fName").val();
  let email = $("#email").val();
  let password = $("#pass").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      updateUserInFirebase(fName);
      $("#fName").val("");
      $("#lName").val("");
      $("#email").val("");
      $("#pass").val("");

      $("#out-btn").css("display", "block");
      $(".log, .sign").css("display", "none");
      loginStatus = true;
      //toast alert
      $(".toast").toast("show");
      $(".toast-head").html("Success!");
      $(".toast-body").html("Sign up successful. Welcome " + fName + ".");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      //toast alert
      $(".toast").toast("show");
      $(".toast-head").html("Warning!");
      $(".toast-body").html("Sign up unsuccessful. Please try again.");
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
      $("#emInput").val("");
      $("#passInput").val("");
      //toast alert
      $(".toast").toast("show");
      $(".toast-head").html("Success!");
      $(".toast-body").html("Login successful. Welcome " + person + ".");

      $("#out-btn").css("display", "block");
      $(".log, .sign").css("display", "none");
      loginStatus = true;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      //toast alert
      $(".toast").toast("show");
      $(".toast-head").html("Warning!");
      $(".toast-body").html(
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
      loginStatus = false;
      $("#out-btn").css("display", "none");
      $(".log, .sign").css("display", "block");

      //toast alert
      $(".toast").toast("show");
      $(".toast-head").html("Success!");
      $(".toast-body").html("Sign out successful.");
    })
    .catch((error) => {
      console.log(error);
      //toast alert
      $(".toast").toast("show");
      $(".toast-head").html("Warning!");
      $(".toast-body").html("Sign out unsuccessful. Please try again.");
    });
}

//update user's display name in Firebase
function updateUserInFirebase(disName) {
  firebase.auth().currentUser.updateProfile({
    displayName: disName,
  });
}

//start all event listeners
function initListeners() {
  //listen for when the hashtag has changed in the url
  $(window).on("hashchange", route);
  route();
  addModal();

  //close mobile-nav if link clicked
  $("#meny").on("click", "a", function (event) {
    $("#menyAvPaa").prop("checked", false);
  });
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
