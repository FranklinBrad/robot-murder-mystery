var highScores = [];
// Sets this to blank to be used as a switch in the displaying of the highscores Admitibly it is not the best way to go about things. But getting a new line was proving excessively challening when displaying the highscores. This fixed the problems by letting me append and not needing to set up a remove/reappend everytime it was open while also ensuring it got content if it needed it.
$('#modal-highscore-list')[0].textContent = ""


$("#scoreboard").on("click", "button", (event) => {

  // Highscores is pulled from local storage
  highScores = JSON.parse(localStorage.getItem("robo-scores")) || []; 

  // If this is blank (from when it was set on page load) the following will happen
  if ($('#modal-highscore-list')[0].textContent === ""){

    //Creates a loop to take out the highscores array an ddisplay them
    for(i = 0; i < highScores.length; i++)
    {
      
      // Variable for highscores
      var displayScores = `<p>${[i+1]}. ${highScores[i].player} ${highScores[i].score}</p>`  
      
      // Appends the highscores
      $('#modal-highscore-list').append(displayScores)
    }
  }

  var openModal = $('#modalBtn')
  if (event.target === openModal) {
    $("main").animate({
      opacity: 0.2  // Set to desired final opacity
    }, 1000);  // Duration in milliseconds
  
    $('#modal').fadeIn(2000)
    $('#modal').css({"display": "block", "border": "2px solid black", "background-color": "blue"})
  }
})




const myModal = document.getElementById('scoreboard')
const myInput = document.getElementById('myInput')




////////////////////// Previous Code//////////////////////////////////
// // $("#scoreboard").on("click", (event) => {
// //   //if data-show is base the css on display block or display none
// //   var openModal = $('#modalBtn')
// //   console.log(event.target)
// //   if (event.target === openModal) {
// //     $("main").animate({
// //       opacity: 0.2  // Set to desired final opacity
// //     }, 1000);  // Duration in milliseconds
  
// //     $('#modal').fadeIn(2000)
// //     $('#modal').css({"display": "block", "border": "2px solid black", "background-color": "blue"})
// //   }
// // })


// let highScores = [];


// const myModal = document.getElementById('scoreboard')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })


