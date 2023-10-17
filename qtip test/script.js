// Create the tooltips only on document load
$(document).ready(function () {
  // Match all link elements with href attributes within the content div
  $("#claimform a[rel=tip]").qtip({
    content: { text: true },
    style: {
      width: 250,
      tip: "leftMiddle",
      color: "yellow",
      background: "#66CC33",
      name: "green",
    },
    position: {
      corner: { target: "rightMiddle", tooltip: "leftMiddle" },
      adjust: { x: 20, y: 0 },
    },
  });
});

$(document).ready(function () {
  $(".contract_quote").each(function () {
    $(this).qtip({
      content: $(this).text("fhreuifhe"),
    });
  });
});

// button sound
function sound() {
  var snd = new Audio("./thunder.mp3"); //wav is also supported
  snd.play(); //plays the sound
}

$(function () {
  $("img").click(function() {
    $(this).css('border', "solid 5px black"); 
  });
});
