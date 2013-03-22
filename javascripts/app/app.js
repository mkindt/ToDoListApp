var main = function () {
  console.log("hello world!");
  var toDoItems = 6;
  var tabCheck = 0;
  var setUpClickHandler = function (anchor) {
    anchor.click(function () {
      var target = $(this).attr("href");
      $("#"+target).css("display", "none");
      $(".active").removeClass("active");
      $(this).addClass("active");
      $("#"+target).addClass("active");
      //$("#tab2").
      console.log("hrmm " + target);
      if (target === "tab2") {
        categorize();
        tabCheck = 1;
      }
      else {
        tabCheck = 0;
      }
      $("#"+target).fadeIn(1000);
      return false;
    });    
  };
  var deleteTab1 = new Array;
  var deleteButton = (function() {
    $(".deleter").click(function() { 
      deleteTab1 = $(this).parent().attr("class").split(" ");
      deleteTab1.splice(0,1);
      //$(this).parent().parent().remove();
      $("#tab1").find("." +deleteTab1).parent().hide("scale", function() {
        $("#tab1").find("." +deleteTab1).parent().remove();
      });
      console.log("got hre " +deleteTab1);
      //if (tabCheck === 1) {
        categorize();
      //}
      return false;
    });     
  });
  
  var submitButton = (function() {
    $( "#newEdit" )
      .click(function() {
        console.log($("#newToDo").val());
        console.log($("#newCats").val());
        var listClasses = $("#newCats").val().split(","); //entering with spaces breaks categorize()
        var newItem = $("#newToDo").val();
        toDoItems = toDoItems + 1;
        $("#toDo").append("<div class='" + listClasses.join(' ') + "'><div class='left toDoItem" + toDoItems +"'>" + newItem + "<input name='submit' type='image' class = 'deleter' src='images/delete-icon.png'/></div><div class = 'right'><div class = 'cats'>"+ listClasses + "</div></div></div>");
        $("#tab3").append("<div>'" + newItem + "' added.</div>");
        deleteButton();
        return false;
      });     
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
      //$("#tab2").css("display", "none");
      $("#tab2").append("<h3>" + showCat + "</h3>");
      $("#toDo").find($("." +this)).clone().appendTo("#tab2");
      //$("#tab2").slideDown(500);
      deleteButton(); //bad form to call each time?
    });
  };

  
  $.getJSON("json/all.json", function (todos) {
    todos.forEach(function (todo) {
      toDoItems = toDoItems + 1;
      $("#toDo").append("<div class='" + todo.categories.join(' ') + "' style = 'display:none'><div class='left toDoItem" + toDoItems +"'>" + todo.description + "<input name='submit' type='image' class = 'deleter' src='images/delete-icon.png'/></div><div class = 'right'><div class = 'cats'>" + todo.categories + "</div></div></div>");
      $("#toDo").children().slideDown(1000);
    });
    deleteButton();
  });
  
  $("#toDo").children().each(function () {
    var listClasses = $(this).attr("class").split(" ");
    $(this).css("display", "none");
    $(this).children().append("<input name='submit' type='image' class = 'deleter' src='images/delete-icon.png'/>");
    $(this).append("<div class = 'right'><div class = 'cats'>" + listClasses + "</div></div>");
    $(this).slideDown(1000);
  });

  console.log("about to set up click handlers");
  setUpClickHandler($(".tabs .tab"));
  deleteButton();
  submitButton();
}

$(document).ready(main);