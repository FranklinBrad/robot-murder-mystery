function deathAnimation(){
  // fadeIn over 3 seconds
  $("#reaper").fadeIn(3000, function(){
    // Wait for 3 seconds after fadeIn completes
    setTimeout(function(){
        // Image fadeOut over 2 seconds
        $("#reaper").fadeOut(3000);
    }, 3000);
  });
}