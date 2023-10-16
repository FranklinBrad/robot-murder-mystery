$("#scoreboard").on("click", (event) => {
  //if data-show is base the css on display block or display none
  var openModal = $('#modalBtn')
  console.log(event.target)
  if (event.target === openModal) {
    $("main").animate({
      opacity: 0.2  // Set to desired final opacity
    }, 1000);  // Duration in milliseconds
  
    $('#modal').fadeIn(2000)
    $('#modal').css({"display": "block", "border": "2px solid black", "background-color": "blue"})
  }
})





const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})