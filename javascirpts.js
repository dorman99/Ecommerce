document.addEventListener('DOMContentLoaded', function () {

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
    
      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {
    
          // Get the target from the "data-target" attribute
          var target = $el.dataset.target;
          var $target = document.getElementById(target);
    
          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
    
        });
      });
    }
    
    });
let count = 0
  function showCategories(){
    
    if(!count){
      $(".categories").fadeIn('slow')
      $("#showcategories a").html('Hide categories')
      count = 1
      console.log(count)
    } else{
      console.log(count)
      $(".categories").fadeOut('slow')
      $("#showcategories a").html('Show categories')
      count = 0
    }
    
  }

  function showItems(){
    var buttoncek =  $("#showItems").text()
    $("#items").toggle('slow',()=>{
      if(buttoncek == 'hide item' ){
        $("#showItems ").text('Show Items')
      }else if(buttoncek == 'Show Items'){
        $("#showItems ").text('hide item')
      }
    })
    
  }

  function addItemToChart(){
    console.log('masuk sini')
  }