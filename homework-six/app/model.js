var MODEL = (function () {
  var _grabNewContent = function (pageName) {
    //get the new html page that was clicked
    $.get(`pages/${pageName}/${pageName}.html`, function (data) {
      //console.log(data);
      //replace the body with that new page
      $(".app").html(data);
    });
  };

  return {
    //send the private function
    grabNewContent: _grabNewContent,
  };
})();
