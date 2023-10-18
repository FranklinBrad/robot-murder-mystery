// How many NPC's will be in the game (1 Always dies so if you want 20 to be a part of the game you need to start with 21)
var npcTotal = 21

// RequestURL to make an API pull from mockaroo. 
//key=d862e8b0 or key=76436720 - Cost effective
var requestUrl = `https://my.api.mockaroo.com/robo_murder.json?key=76436720`

// Array to store final Robo NPC in 
var roboNPC = []

// Make variable murderBot an array
var murderBot = []

// The actual statements used for the game
var witnessStatements = []

// Statement pool that deteriorates as the game goes on
var statementArr = []

// Accuse selector
var accuseSelected = ""

// Player score which will be later set to amount of survivors
var playerScore = 0

// highScores Array that is used to pull and push highscores to local storage.
var highScores = [];

// playerName reflects what is typed in the text box and is used for the highscore board.
var playerName = '';

//These variables should never be modified so they are set as a const
const npcDescArr = [
  {"avatar": "r1.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r2.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r3.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Brown"},
  {"avatar": "r4.png", "eye_feature": "One Eye", "hair_type": "Radar", "mouth": "Teeth", "nose": "No Nose", "common_color": "Yellow"},
  {"avatar": "r5.png", "eye_feature": "No Eyes", "hair_type": "Light", "mouth": "Teeth", "nose": "No Nose", "common_color": "Green"},
  {"avatar": "r6.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "Teeth", "nose": "No Nose", "common_color": "Red"},
  {"avatar": "r7.png", "eye_feature": "Two Eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Nose", "common_color": "Blue"},
  {"avatar": "r8.png", "eye_feature": "Two Eyes", "hair_type": "Button", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Silver"},
  {"avatar": "r9.png", "eye_feature": "Two Eyes", "hair_type": "Button", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r10.png", "eye_feature": "Two Eyes", "hair_type": "Radar", "mouth": "Teeth", "nose": "No Nose", "common_color": "White"},
  {"avatar": "r11.png", "eye_feature": "Two Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Nose", "common_color": "Orange"},
  {"avatar": "r12.png", "eye_feature": "Two Eyes", "hair_type": "Button", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r13.png", "eye_feature": "Two Eyes", "hair_type": "Radar", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r14.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Mustache", "common_color": "Silver"},
  {"avatar": "r15.png", "eye_feature": "Two Eyes", "hair_type": "Ball Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Purple"},
  {"avatar": "r16.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Red"},
  {"avatar": "r17.png", "eye_feature": "No Eyes", "hair_type": "Ball Antenna", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r18.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Purple"},
  {"avatar": "r19.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r20.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r21.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r22.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Mustache", "common_color": "Silver"},
  {"avatar": "r23.png", "eye_feature": "No Eyes", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Red"},
  {"avatar": "r24.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Mustache", "common_color": "Purple"},
  {"avatar": "r25.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r26.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "Teeth", "nose": "Nose", "common_color": "Brown"},
  {"avatar": "r27.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "Teeth", "nose": "No Nose", "common_color": "Red"},
  {"avatar": "r28.png", "eye_feature": "Two Eyes", "hair_type": "Radar", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r29.png", "eye_feature": "Two Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Nose", "common_color": "Yellow"},
  {"avatar": "r30.png", "eye_feature": "No Eyes", "hair_type": "Light", "mouth": "Teeth", "nose": "No Nose", "common_color": "Green"},
  {"avatar": "r31.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Nose", "common_color": "Green"},
  {"avatar": "r32.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Brown"},
  {"avatar": "r33.png", "eye_feature": "No Eyes", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Silver"},
  {"avatar": "r34.png", "eye_feature": "Two Eyes", "hair_type": "Light", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Green"},
  {"avatar": "r35.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r36.png", "eye_feature": "No Eyes", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r37.png", "eye_feature": "Two Eyes", "hair_type": "Light", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r38.png", "eye_feature": "Two Eyes", "hair_type": "button", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Silver"},
  {"avatar": "r39.png", "eye_feature": "Two Eyes", "hair_type": "Button", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r40.png", "eye_feature": "No Eyes", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r41.png", "eye_feature": "Two Eyes", "hair_type": "Light", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Silver"},
  {"avatar": "r42.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r43.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r44.png", "eye_feature": "No Eyes", "hair_type": "Wires", "mouth": "Teeth", "nose": "No Nose", "common_color": "Yellow"},
  {"avatar": "r45.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Mustache", "common_color": "Silver"},
  {"avatar": "r46.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r47.png", "eye_feature": "One Eye", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r48.png", "eye_feature": "No Eyes", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Red"},
  {"avatar": "r49.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Mustache", "common_color": "Red"},
  {"avatar": "r50.png", "eye_feature": "Two Eyes", "hair_type": "Light", "mouth": "No Teeth ", "nose": "No Nose", "common_color": "Silver"},
  {"avatar": "r51.png", "eye_feature": "One Eye", "hair_type": "Button", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Silver"},
  {"avatar": "r52.png", "eye_feature": "No Eyes", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Silver"},
  {"avatar": "r53.png", "eye_feature": "Two Eyes", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Brown"},
  {"avatar": "r54.png", "eye_feature": "Two Eyes", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r55.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Brown"},
  {"avatar": "r56.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r57.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Mustache", "common_color": "Purple"},
  {"avatar": "r58.png", "eye_feature": "No Eyes", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r59.png", "eye_feature": "One Eye", "hair_type": "Bolt", "mouth": "No Teeth", "nose": "No Nose", "common_color": "PInk"},
  {"avatar": "r60.png", "eye_feature": "Two Eyes", "hair_type": "Ball Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Purple"},
  {"avatar": "r61.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r62.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Nose", "common_color": "Yellow"},
  {"avatar": "r63.png", "eye_feature": "Two Eyes", "hair_type": "Light", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r64.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Nose", "common_color": "Green"},
  {"avatar": "r65.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Red"},
  {"avatar": "r66.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r67.png", "eye_feature": "No Eyes", "hair_type": "Wires", "mouth": "Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r68.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "Teeth", "nose": "Mustache", "common_color": "Green"},
  {"avatar": "r69.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Yellow"},
  {"avatar": "r70.png", "eye_feature": "Two Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Nose", "common_color": "Yellow"},
  {"avatar": "r71.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Mustache", "common_color": "Silver"},
  {"avatar": "r72.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "No Nose", "common_color": "yellow"},
  {"avatar": "r73.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "White"},
  {"avatar": "r74.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "No Teeth", "nose": "No Nose", "common_color": "White"},
  {"avatar": "r75.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Purple"},
  {"avatar": "r76.png", "eye_feature": "Two Eyes", "hair_type": "Light", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Green"},
  {"avatar": "r77.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r78.png", "eye_feature": "No Eyes", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Gray"},
  {"avatar": "r79.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "No Teeth", "nose": "No Nose", "common_color": "White"},
  {"avatar": "r80.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Mustache", "common_color": "Gray"},
  {"avatar": "r81.png", "eye_feature": "Two Eyes", "hair_type": "Button", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r82.png", "eye_feature": "One Eye", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Yellow"},
  {"avatar": "r83.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No Nose", "common_color": "Brown"},
  {"avatar": "r84.png", "eye_feature": "No Eyes", "hair_type": "Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r85.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No Nose", "common_color": "White"},
  {"avatar": "r86.png", "eye_feature": "One Eye", "hair_type": "Button", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r87.png", "eye_feature": "Two Eyes", "hair_type": "Radar", "mouth": "Teeth", "nose": "No Nose", "common_color": "White"},
  {"avatar": "r88.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "White"},
  {"avatar": "r89.png", "eye_feature": "One Eye", "hair_type": "Button", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Gray"},
  {"avatar": "r90.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Purple"},
  {"avatar": "r91.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Mustache", "common_color": "Red"},
  {"avatar": "r92.png", "eye_feature": "Two Eyes", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Brown"},
  {"avatar": "r93.png", "eye_feature": "No Eyes", "hair_type": "Wires", "mouth": "Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r94.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "Teeth", "nose": "Mustache", "common_color": "Green"},
  {"avatar": "r95.png", "eye_feature": "Two Eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Nose", "common_color": "Green"},
  {"avatar": "r96.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Blue"},
  {"avatar": "r97.png", "eye_feature": "No Eyes", "hair_type": "Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r98.png", "eye_feature": "One Eye", "hair_type": "Button", "mouth": "Teeth", "nose": "No Nose", "common_color": "Gray"},
  {"avatar": "r99.png", "eye_feature": "Two Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Nose", "common_color": "Green"},
  {"avatar": "r100.png", "eye_feature": "No Eyes", "hair_type": "Antenna", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r101.png", "eye_feature": "No Eyes", "hair_type": "Radar", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Gray"}
]

// Function to grab 1 random avatar with data
function generateRandomDesc() {
  var tempRand = npcDescArr[Math.floor(Math.random() * npcDescArr.length)]
  return tempRand;
}

// Build the robot NPC's for the game.
function buildRoboArr() {

  //Fetch request to grab mockdata from Mockaroo using requestUrl global Variable
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      // Clears the roboNPC array so we can create a fresh game.
      roboNPC = []

      // Loop to build the array of Full Robo NPC's containing data from both mockaroo and hardcoded desc array uses NPC total from the top created variable
      for (i = 0; i < npcTotal; i++) {

        // This runs the generateRandomDesc() function to pull 1 of the lines from the npcDescArr to be used below as ranDesc
        var ranDesc = generateRandomDesc();

        // This builds a single variable line that contains all the data for a single NPC in the array
        var tempLine = [{
          'id': data[i].id,
          'first_name': data[i].first_name,
          'last_name': data[i].last_name,
          'barcode': data[i].barcode,
          'color': data[i].color,
          'model': data[i].model,
          'transportation': data[i].transportation,
          'location': data[i].location,
          'areacode': data[i].areacode,
          'avatar': ranDesc.avatar,
          'eye_feature': ranDesc.eye_feature,
          'hair_type': ranDesc.hair_type,
          'mouth': ranDesc.mouth,
          'nose': ranDesc.nose,
          'common_color': ranDesc.common_color
        }
        ]

        // Each time the loop runs this takes itself and adds the above tempLine to the array.
        roboNPC = [...roboNPC, ...tempLine]
      }

      // Returns roboNPC to where the function was originally called.
      return roboNPC;
    })


    // Calls image when data fetched
    .then(function (finalImage) {

      // Call RoboImage function
      getRoboImage(roboNPC);
    })
}


// Function get to set random Robo images to img src attr and show oil spill death
function getRoboImage(roboNPC) {
  // For loop to run through array based on length
  for (var i = 0; i < roboNPC.length; i++) {
    // If else to make sure that the values are not null or undefined
    if (roboNPC[i].avatar !== null || roboNPC[i].avatar !== undefined) {
      var roboImage = "./assets/img/robothugs/" + roboNPC[i].avatar;

      // This if statement checks to see if the mode of transportation is Foot or Hoverboard and if it is, the "unused" descriptors are cleared from that robot
      if (roboNPC[i].transportation === "Foot") {
        roboNPC[i].model = ""
        roboNPC[i].color = ""
      } else if (roboNPC[i].transportation === "Hoverboard") {
        roboNPC[i].model = ""
      }

      // This appends the container with boxes to put the robobts in. div id='suspect${i} is giving each robot a unique specifier for alter functionality with selecting the robots.
      // The anchor a href="#" rel ="tip" is simply to add the next lines as a QTip so users are able to view the robots more detailed information by hovering them with the mouse.
      //  
      var roboAppend = `<div id='suspect${i}' class='robotImg card card-block content' style='width: 125px'>
      <a href="#" rel="tip" 
      
      title=" ${roboNPC[i].first_name} ${roboNPC[i].last_name}
      Id: ${roboNPC[i].id}
      Barcode: (${roboNPC[i].areacode}) ${roboNPC[i].barcode}
      Transportation: ${roboNPC[i].transportation}: ${roboNPC[i].color} ${roboNPC[i].model}
      Location: ${roboNPC[i].location}
      Eyes: ${roboNPC[i].eye_feature}
      Hair: ${roboNPC[i].hair_type} 
      Mouth: ${roboNPC[i].mouth}
      Nose: ${roboNPC[i].nose}
      Color: ${roboNPC[i].common_color}">
      <img src='${roboImage}' alt='robo suspect' width='100px' height='100px'class='l-1' />
      </a>
      </div>`
      $("#robot-display").append(roboAppend);
    } else {
      console.log("robo undefined or null");
    }
    //adds border around images



  }
  var sceneText = (`<div class='card witness-statement content'>Detective ${playerName}, you've been called in because there was a murder at the Hoverboard factory.  [Insert intial robotDeath Name] was found in a puddle of its own hydraulic fluid disabled with multiple blaster gun holes.  Can you help us discover the culprit of the heinous act....</div>`)
  $('#scene').append(sceneText);
  murderBotID = [Math.floor(Math.random() * npcTotal)]
  murderBot = roboNPC[murderBotID]
  roboNPC.splice(murderBotID, 1)
  //Function call to create the witness statements based on current murder bot and then call the first witness statement to kill the first bot.
  createWitnessStatements(murderBot)
  witnessStatementFunc()
}


function addInfoBox(i){
console.log('addinfo')
  var updateSmallInfo = `Name: ${roboNPC[i].first_name} ${roboNPC[i].last_name}
    Id: ${roboNPC[i].id}
    Barcode: (${roboNPC[i].areacode}) ${roboNPC[i].barcode}
    Transportation: ${roboNPC[i].transportation}: ${roboNPC[i].color} ${roboNPC[i].model}
    Location: ${roboNPC[i].location}
    Eyes: ${roboNPC[i].eye_feature}
    Hair: ${roboNPC[i].hair_type} 
    Mouth: ${roboNPC[i].mouth}
    Nose: ${roboNPC[i].nose}
    Color: ${roboNPC[i].common_color}`;
    
console.log (updateSmallInfo + "Small Info Update")
 $('#small-info-div')[0].textContent = updateSmallInfo
 console.log($('#small-info-div'))

//  <div class="small-info"></div>

}




//Created a call function to update the witness staements and made it a global variable that gets changed when the function is called. It was having a hard time being passed around as a constant and creating it on the global scale as a constant was making it so it didn't have proper information from the murderbot. Also later on this would cause problems in the second game since we would not be able to update it for the new murderbot.
// in the barcode pull the string literal is now ${String(murderBot.barcode).substr(-1)} which turns the .barcode into a string and then substr(-1) counts from the end pulling the last character out giving us the last number.
function createWitnessStatements(murderBot){
statementArr = ['areacode', 'barcode', 'color', 'model', 'transportation', 'location', 'eyefeature', 'hair_type', 'mouth', 'nose', 'nonose', 'mustache']
witnessStatements = [
  { areacode: `I was able to see a text message from the robo-attacker on the his or her phone. It looks like they were trying to order some new widgets from Maryland. The area code was ${murderBot.areacode}.`,
   barcode: `Being a robot you have excellent memory. I knew I wouldn't forget the last digit of the barcode from the call he or she was getting. It was ${String(murderBot.barcode).substr(-1)}` ,
   color: `The robo-attacker left the scene in something ${murderBot.color}` ,
   model: `The vehicle's model was ${murderBot.model}` ,
   transportation: `He or she was seen traveling by ${murderBot.transportation}` ,
   location: `Beep boop! I was shocked to hear a loud THUMP in the ${murderBot.location}. Ragnar Robot always powers down during work (i.e. takes a nap), but I dont think it was him this time.` ,
   eyefeature: `Beep! Beep! I knew he had atleast ${murderBot.eye_feature} because most robots around here only have a visor.` ,
   hair_type: `Well let me tell you - Bots these days spend lots of money on their metal bodywork.The robo - attacker had the hairstyle of ${murderBot.hair_type}` ,
   mouth: `I knew the second I saw him - this Bot had not been to the robodentist in a while BECAUSE he had ${murderBot.mouth}.` ,
   nonose: `Boop beep! It sure will be hard to find who did it, like must of the tin cans around here I didn't even see a nose on that robot!`,
   nose: "Beep beep! The robo-sandwich was a delicacy in the Bot World filled with the finest bolts. I saw the robo-attacker eating one earlier in the day, he must have exquisite taste with his ability to use his nose to smell. ",
   mustache:`I saw a lot of fine metal like wires by where that last bot was murdered. I'm sure the one who did it must have had a mustache`,
   nomore:`While looking for a new witness you realize there are none left and another robot was murdered.` }]
  //This if set checks for having a foot as transportation then removing irrelevant witness statements, and then checking for hoverboard
   if (murderBot.transportation === "Foot"){
    statementArr.splice(statementArr.indexOf('model'), 1)
    statementArr.splice(statementArr.indexOf('color'), 1)    
   }
   else if (murderBot.transportation === "Hoverboard"){
    statementArr.splice(statementArr.indexOf('model'), 1)   
   }

   //Since we have a variety of ways to say the nose this actually checks for which type of nose the bot has and then eliminates the other two. NOTE this If statement needs to be one chain and the transportation needs to be a seperate chain of else if statements as a single bot can have features from each that would modify the array.
   console.log (murderBot.nose)
   if (murderBot.nose === "No nose"){
    statementArr.splice(statementArr.indexOf('nose'), 1)
    statementArr.splice(statementArr.indexOf('mustache'), 1)
   }
   if (murderBot.nose === "Nose"){
    statementArr.splice(statementArr.indexOf('nonose'), 1)
    statementArr.splice(statementArr.indexOf('mustache'), 1)
   }
   if (murderBot.nose === "Mustache"){
    statementArr.splice(statementArr.indexOf('nonose'), 1)
    statementArr.splice(statementArr.indexOf('nose'), 1)
   }
   console.log (statementArr)
   console.log (murderBot)
  // ,
  // { weapon: `I saw the robo-attacker with my own eyes - their ${murderBot.weapon} blinded me in the light. My visor vision focused and analyzed the weapon right away.` }

}


//witness statement function
function witnessStatementFunc() {
  
  //Constant for the types of witness statements, will delete each array as a type is used.

  //selecting a random type of witness statement
  var currentWitness = [Math.floor(Math.random() * statementArr.length)]
  //creating the append based on the statement type
  if (statementArr.length < 1 ){
    //if the statementArr is empty that means there are no more witness clues. This will then push a canned statement in saying so that will be immediately removed again and
    //repeat with each additional attempt to find a witness when there are none.
    statementArr.push(`nomore`)
  }
  var witnessAppend = `<div class='card witness-statement content'>${witnessStatements[0][statementArr[currentWitness]]}</div>`
  statementArr.splice(currentWitness,1)

  $("#whoDidIt").append(witnessAppend);
  callRobotDeath();
}
 


// This is called whenever a bot died (After a failed guess or witness statement is added)
function callRobotDeath(){
  deathAnimation();
  var murderABot = [Math.floor(Math.random() * roboNPC.length)]
  //Creates the append for the image of the oil splatter
  var deathAppend = `<img src='./assets/img/event/oilsplash.png' width='100px' height='100px' class='l-2'/>`
  //Selects the div container of the randomly selected bot that will be killed based on murderABot variable
  //The problem with the wrong robot being murdered was because the following line had $(`#suspect${roboNPC[murderABot].id}`) wasn't fully wrong we were just (or atleast I was)
  //just looking at it wrong. It was grabbing the right id however we do need a subtraction to balance out id vs location which I believe is -1.
  $(`#suspect${(roboNPC[murderABot].id)-1}`).append(deathAppend);
  //Splice removes the suspect that was just murdered from the roboNPC Array
  roboNPC.splice(murderABot, 1)
  //This is saying if there are less than 10 suspects, the game is going to roll a number based on how many suspects are left. If that roll is 0 or 1 it is gameover for the user
  //This will guarentee a gameover when there are only 3 suspects left (the murderer and 2 innocents) but also push a chance to kill a sloppy detective that is taking too long.
  if (roboNPC.length  < 15){
    var gameOverRoll = [Math.floor(Math.random() * roboNPC.length)]
    if (gameOverRoll < 2){
      loseGame()
    }
  }
}

// Added in death animation function to be called whenever somerobo dies.
function deathAnimation(){
  var snd = new Audio("./assets/sound/Thunder.mp3"); //wav is also supported
  snd.volume = .2;
  snd.play(); //plays the sound

  // fadeIn over 3 seconds
  $("#rcontainer").fadeIn(2000)
  $("#reaper").fadeIn(2000, function(){
    // Wait for 3 seconds after fadeIn completes
    setTimeout(function(){
        // Image fadeOut over 2 seconds
        $("#reaper").fadeOut(2000);
        $("#rcontainer").fadeOut(2000);
    }, 1500);
  });
  
}

//This calls a victory screen
function winGame(){
  console.log(playerName)
  playerScore = roboNPC.length;
  saveHighScore();

  var snd = new Audio("./assets/sound/Victory.mp3"); //wav is also supported
  snd.volume = 0.2;
  snd.play(); //plays the sound
  // fadeIn over 3 seconds
  $("#vcontainer").fadeIn(5000)
  $("#victory").fadeIn(5000, function(){
    // Wait for 3 seconds after fadeIn completes
    setTimeout(function(){
        // Image fadeOut over 2 seconds
        $("#victory").fadeOut(5000);
        $("#vcontainer").fadeOut(5000);
    }, 10000);
  });
  menuMode();
}

//This calls a gameover screen
function loseGame(){
  var snd = new Audio("./assets/sound/Lose.mp3"); //wav is also supported
  snd.volume = 0.2;
  snd.play(); //plays the sound
  // fadeIn over 3 seconds
  $("#lcontainer").fadeIn(5000)
  $("#loser").fadeIn(5000, function(){
    // Wait for 3 seconds after fadeIn completes
    setTimeout(function(){
        // Image fadeOut over 2 seconds
        $("#loser").fadeOut(5000);
        $("#lcontainer").fadeOut(5000);
    }, 10000);
  });
  menuMode();
}


function menuMode(){
  $(`.robotImg`).remove()
  $(`.witness-statement`).remove()  
  $('#npc-main').css('display', "none");
  $('#play-npc').css('display', 'block');
  $('#formSection').css('display', 'block'); 

  init();
  if (highScores.length > 0){
    $('#highscores-tag').css('display', 'block'); 
    $('#highscores').css('display', 'block'); 
    $('#clear-highscores').css('display', 'block');  
  }
}

function gameMode(){
  $(`.robotImg`).remove()
  $(`.witness-statement`).remove()  
  $('#npc-main').css('display', 'block'); 
  $('#play-npc').css('display', "none");
  $('#formSection').css('display', "none"); 
  $('#highscores-tag').css('display', "none");
  $('#highscores').css('display', "none");
  $('#clear-highscores').css('display', "none");
}

// This does a check on if the accused box matches the id of the murderer, if not someone dies.
function callAccuse(){
  if (murderBot.id == accuseSelected)
  {
    //The victory screen is called, all game variables are cleared on the board by removing their elements, start button is shown and board is hidden again.
    winGame()
  }
  else{
    //When the wrong choice is made you are visually told at the bottom and another robot dies.
    $("#wrongchoice").css('display', "block");
    callRobotDeath()
  }
  
}

$(".container").on("click", ".robotImg", function() {
  //changed it from roboNPC.length to NPC total Since we are removing the NPC's via death, but not the images from the board this seems to workout. And with the overylay we 
  //still can't select dead NPC's
  for (let i = 0; i < npcTotal; i++) {
   $(this).siblings(`#suspect${i}`).css('border', "none");
  }
  $(this).css('border', "solid 5px yellow"); 
  $("#wrongchoice").css('display', "none");

  //temp Accuse is made to pull the id out of the current selected box. The ID is then turned into a String instead of an Array Element.
  var tempAccuse = String($(this)[0].id)
  //With the tempAccuse being a workable string we can now use the method substr(7) on it which allows us to remove the first 7 characters from the string leaving us
  //with the remaining characters (tempAccuse at this time is = suspectXX where XX is the number and that is what we need to get. with substr we are left with this number)
  //So it can be treated like a number we also need to use the Number method to force it back in to being treated as such.
  accuseSelected = Number(tempAccuse.substr(7))+1
  addInfoBox(accuseSelected);

});

$('#play-npc').on('click', function(){
  // $('#npc-main').css('display', "block");
  //assigns player from input box
  playerName = $('#name-input')[0].value
  console.log($('#name-input')[0].value)
  if ($('#name-input')[0].value === "")
  { 
    $('#name-input')[0].placeholder = 'HEY ENTER YOUR NAME HERE!!!'
    $('#name-input').css('border','5px solid #ff0000');
  }
  else if ($('#name-input')[0].value != "")
  {
    playerName = $('#name-input')[0].value
    $('#name-input').css('border','2px solid #323232');
    buildRoboArr();
    gameMode();
  }
})



$('#player-choice').on('click', 'button', function(){
  if ($(this)[0].id === 'get-witness' ){
    //Calls witness statement
    witnessStatementFunc();
  } else if ($(this)[0].id === 'accuse' ){
    callAccuse();
  } else {
    console.log('clicked somewhere wrong');
  }
})

$('#clear-highscores').on('click', function(){
  var clearScores = []
  localStorage.setItem("robo-scores", JSON.stringify(clearScores));
  init();
  $('#highscores-tag').css('display', "none");
  $('#highscores').css('display', "none");
  $('#clear-highscores').css('display', "none");
})

// Get stored scoreboard from localStorage
function init() {
  $('.highscore-list').remove()
  highScores = JSON.parse(localStorage.getItem("robo-scores")) || [];  
  for (i=0; i < highScores.length; i++){
  postScores = `<div class='highscore-list card content'>${highScores[i].player} solved the case with ${highScores[i].score} survivors left.</div>`
  $('#highscores').append(postScores)
  }
}

gameMode();
menuMode();

function saveHighScore (){
  init();
  var roboScoresObj = {
    score: playerScore,
    player: playerName
  }
  highScores.push(roboScoresObj);
  highScores.sort((a,b) => b.score - a.score);
  if (highScores.length > 4) highScores.splice(5)

    // Update Local storage
  localStorage.setItem("robo-scores", JSON.stringify(highScores));
  init();
}