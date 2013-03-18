var main = function () {
  console.log("hello world!");
  
  var setUpClickHandler = function (anchor) {
    anchor.click(function () {
      var target = $(this).attr("href");
    
      $(".active").removeClass("active");
      $(this).addClass("active");
      $("#"+target).addClass("active");
      //$("#tab2").
      if (target === "tab2") {
        categorize();
      }
      return false;
    });    
  };
  
  $("#toDo").children().each(function () {
    var listClasses = $(this).attr("class").split(" ");
    $(this).append("   --Categories: " + listClasses);
  });

  function categorize() {
    var allCategories = new Array;
    $("#toDo").children().each(function () {
      var listClasses = $(this).attr("class").split(" ");
      console.log(listClasses);
      allCategories = allCategories.concat(listClasses);
    });
    //$.unique(allCategories);
    allCategories.sort();
    $.unique(allCategories);
    console.log("singles? " + allCategories);
  }
  
  
  var setUpJSONTab = function (tab) {
    var tab_a = $("<a>"+tab.title+"</a>").addClass("tab").attr("href", tab.title);
    $(".tabs").append(tab_a);
    
    var content = $("<div>"+tab.content+"</div>").addClass("tab").attr("id",tab.title);
    $(".content").append(content);
    setUpClickHandler(tab_a);    
  };

  $.getJSON("tabs/tab1.json", setUpJSONTab);
  $.getJSON("tabs/tab2.json", setUpJSONTab);  
  $.getJSON("tabs/tab3.json", setUpJSONTab);  
  
  console.log("about to set up click handlers");
  setUpClickHandler($(".tabs .tab"));
}

$(document).ready(main);