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
      $("#tab1").find("." +deleteTab1).parent().remove();
      console.log("got hre " +deleteTab1);
      if (tabCheck === 1) {
        categorize();
      }
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

  
  var ughh = $.getJSON("json/all.json", function (todos) {
    var i;
    for (i = 0; i < todos.length; i++) {
      console.log(todos[i]);
    };
    
    todos.forEach(function (todo) {
      console.log(todo.description);
      toDoItems = toDoItems + 1;
      $("#toDo").append("<div class='" + todo.categories.join(' ') + "' style = 'display:none'><div class='left toDoItem" + toDoItems +"'>" + todo.description + "<input name='submit' type='image' class = 'deleter' src='images/delete-icon.png'/></div><div class = 'right'><div class = 'cats'>" + todo.categories + "</div></div></div>");
      todo.categories.forEach(function (category) {
        console.log("  " + category);
      });
      $("#toDo").children().slideDown(1000);
      deleteButton();
    });
  });
  
  var gosh = $("#toDo").children().each(function () {
    var listClasses = $(this).attr("class").split(" ");
    //listClasses.splice(0,1);
    $(this).css("display", "none");
    $(this).children().append("<input name='submit' type='image' class = 'deleter' src='images/delete-icon.png'/>");
    $(this).append("<div class = 'right'><div class = 'cats'>" + listClasses + "</div></div>");
    $(this).slideDown(1000);
  });
  
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
  gosh();
  ughh();
  deleteButton();
  submitButton();
}

$(document).ready(main);