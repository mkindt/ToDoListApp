var main = function () {
  console.log("hello world!");
  
  var setUpClickHandler = function (anchor) {
    anchor.click(function () {
      var target = $(this).attr("href");
    
      $(".active").removeClass("active");
      $(this).addClass("active");
      $("#"+target).addClass("active");
      //$("#tab2").
      console.log("hrmm " + target);
      if (target === "tab2") {
        categorize();
      }
      return false;
    });    
  };
  var deleteTab1 = new Array;
    var deleteButton = (function() {
    $( "button" )
      .click(function() {
        deleteTab1 = $(this).parent().siblings().attr("class").split(" ");
        deleteTab1.splice(0,1);
        //$(this).parent().parent().remove();
        $("#tab1").find("." +deleteTab1).parent().remove();
        console.log("got hre " +deleteTab1);
        categorize();
        return false;
      });
           
          
  });
  
  $("#toDo").children().each(function () {
    var listClasses = $(this).attr("class").split(" ");
    //listClasses.splice(0,1);
    $(this).append("<div class = 'right'><button>Delete</button><div class = 'cats'>" + listClasses + "</div></div>");
  });

  function categorize() {
    var allCategories = new Array;
    var foundToDo = new Array;
    $("#toDo").children().each(function () {
      var listClasses = $(this).attr("class").split(" ");
      console.log(listClasses);
      allCategories = allCategories.concat(listClasses);
    });
    //$.unique(allCategories);
    allCategories.sort();
    $.unique(allCategories);
    console.log("singles? " + allCategories);
    $("#tab2").empty();
    $(allCategories).each(function() {
      var showCat = this.toUpperCase();
      $("#tab2").append("<h3>" + showCat + "</h3>");
      $("#toDo").find($("." +this)).clone().appendTo("#tab2");
      deleteButton(); //bad form to call each time?
    })
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
  deleteButton();
}

$(document).ready(main);