var MODEL = (function () {
  var _getPageContent = function (pageName) {
    //get the new html page that was clicked
    $.get(`pages/${pageName}/${pageName}.html`, function (data) {
      console.log(data);

      //replace the body with that new page
      $(".app").html(data);
    });
  };

  return {
    //send the private function
    getPageContent: _getPageContent,
  };
})();
