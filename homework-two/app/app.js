function setBindings() {
  //adding an event listener to the anchor tags
  $("nav a").click(function (e) {
    let btnID = e.currentTarget.id;
    console.log(btnID);

    if (btnID === "home") {
      $(".contain1").addClass("home-hero");
      $(".contain1").removeClass("nav");
      $(".contain2").addClass("navi");
      $(".contain2").removeClass("content");
      $(".tagline").css("display", "block");

      MODEL.getMyPage(btnID);
    } else {
      $(".contain1").addClass("nav");
      $(".contain1").removeClass("home-hero");
      $(".contain2").addClass("content");
      $(".contain2").removeClass("navi");
      $(".tagline").css("display", "none");

      MODEL.getMyPage(btnID);
    }
  });
}

$(document).ready(function () {
  console.log("ready");
  setBindings();
  MODEL.getMyPage("home");
});
