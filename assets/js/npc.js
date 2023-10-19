// How many NPC's will be in the game (1 Always dies so if you want 20 to be a part of the game you need to start with 21)
var npcTotal = 21

// RequestURL to make an API pull from mockaroo. 
//key=d862e8b0 or key=76436720 - Cost effective
var requestUrl = `https://my.api.mockaroo.com/robo_murder.json?key=d862e8b0`

// Backup this is a backup array used if we run out of API calls. backuproo fills up instead with npcTotal amount of random from mockaroo.js which has 1000 premade pulls
var backuparoo = []

// Array to store final Robo NPC in 
var roboNPC = []

// Always holds full list of roboNPC
var fullRoboNPC = []

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
  {"avatar": "r38.png", "eye_feature": "Two Eyes", "hair_type": "Button", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Silver"},
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
  {"avatar": "r59.png", "eye_feature": "One Eye", "hair_type": "Light", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
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
  {"avatar": "r72.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Yellow"},
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

////////////////////////////////////////////////END OF GLOBAL VARIABLES///////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// Function to grab 1 random avatar with data
function generateRandomDesc() {
  var tempRand = npcDescArr[Math.floor(Math.random() * npcDescArr.length)]
  return tempRand;
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// Build the robot NPC's for the game.
function buildRoboArr() {

  //Fetch request to grab mockdata from Mockaroo using requestUrl global Variable
  fetch(requestUrl)
    .then(function (response) {
      //This is error handling. If the mockaroo API is not accessable for any reason it then switches to the local mockaroo.js file 
      if (!response.ok){
        //Specifier for below saying we are using local data
        var localMock = true;
        return localMock;
      }
      return response.json();
    })

    //if an api pull is successfull data is fresh Mockaroo data, if it fails data is a boolean that is either true or false.
    .then(function (data) {
      
      // Resetting the localMock back to false so it will try an API call the next game in case running out of keys wasn't the issue.
      localMock = false;

      // If localMock was set to true and returned above, then data will be true and it will run the backup generator
      if (data){
        
        // The data set created in backuparoo will be the same length as needed bots for the game.
        for(i = 0; i < npcTotal; i++){
          
        // A random pull is done from the length of mockMockaroo. mockMockaroo is actually a variable in the mockaroo.js with the 1000 entires. The browser does need to have loaded it for access but this should be fine by the time someone gets this far into the page.
        mockarooRandom = [Math.floor(Math.random() * mockMockaroo.length)]
        
        // After getting a random number 1-1000 this data is then put into backuparoo to create a random generated dataset for this play through.
        backuparoo.push(mockMockaroo[mockarooRandom])
        }

        // To avoid needing more if chain statements when declaring the final bot identities. We can simply make data equal to backuparoo here. This makes data the same type/set that it would be if we pulled from the API originally.
        data = backuparoo;
      }

      // Clears the roboNPC array so we can create a fresh game.
      roboNPC = []

      // Loop to build the array of Full Robo NPC's containing data from both mockaroo and hardcoded desc array uses NPC total from the top created variable
      for (i = 0; i < npcTotal; i++) {

        // This runs the generateRandomDesc() function to pull 1 of the lines from the npcDescArr to be used below as ranDesc
        var ranDesc = generateRandomDesc();

        // This builds a single variable line that contains all the data for a single NPC in the array
        var tempLine = [{
   
          //This was originally data[i].id and the reason we need to have some -1 and +1 modifiers in other parts of the code. The bot ID started at 1 from the api pull and I hadn't realized it until creating the backupdata. Since we already made the adjustments everywhere else at this point it was easier to use the i+1 here to assign ID numbers.
          'id': i+1,
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
      getRoboImage(roboNPC);
    })
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

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

      // This appends the container with boxes to put the robobts in. div id='suspect${i} is giving each robot a unique specifier for alter functionality with selecting the robots
      // The anchor a href="#" rel ="tip" is simply to add the next lines as a QTip so users are able to view the robots more detailed information by hovering them with the mouse
      // Once the Qtip is created the display for the robot image is also created.
      var roboAppend = `<div id='suspect${i}' class='robotImg card card-block content' style='width: 125px'>
      <a href="#" rel="tip" 
      
      title=" ${roboNPC[i].first_name} ${roboNPC[i].last_name}
      Id: ${roboNPC[i].id}
      Phone Number: (${roboNPC[i].areacode}) ${roboNPC[i].barcode}
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
      // Emergency error checking that should never actually pop up... should never...
      console.log("robo undefined or null");
    }
  }
  
  // Duplicates roboNPC for places we still need all the robot information at
  fullRoboNPC = Object.assign([], roboNPC);

  // Choosing a number within the range of all our bots to select who will be the murderer
  murderBotID = [Math.floor(Math.random() * npcTotal)]

  // Pinning that selection to a bot and giving the murderbot its own variable
  murderBot = roboNPC[murderBotID]

  // Taking the array of bots and removing the murderbot from them, so it cannot accidently kill itself and isn't counted towards victims
  roboNPC.splice(murderBotID, 1)

  // Function call to create the witness statements based on current murder bot and then call the first witness statement to kill the first bot
  createWitnessStatements(murderBot)

  // This kicks the game off by giving the user their first witness statement and killing the first bot (As that is part of the witness statement function)
  witnessStatementFunc()
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// Created a function for setting up the potential Witness Statements for the game. These will change with each game and be custom to the game so having it in a callable function is for convenience and organization.
// in the barcode pull the string literal is now ${String(murderBot.barcode).substr(-1)} which turns the .barcode into a string and then substr(-1) counts from the end pulling the last character out giving us the last number.
function createWitnessStatements(murderBot) {
  statementArr = ['areacode', 'barcode', 'color', 'model', 'transportation', 'location', 'eyefeature', 'hair_type', 'mouth', 'nose', 'nonose', 'mustache']
  witnessStatements = [
    {
      areacode: `I was able to see a text message from the Murderbot on his or her phone. It looks like they were trying to order some new widgets. The area code of his/her phone number was ${murderBot.areacode}.`,
      barcode: `Being a robot means you have excellent memory. I knew I wouldn't forget the last digit of the Murderbot's phone number. It was ${String(murderBot.barcode).substr(-1)}.`,
      color: `The Murderbot fled the scene of the crime in something ${murderBot.color}.`,
      model: `All this new technology these days. Self driving vehicles everywhere. The vehicle's model was ${murderBot.model}.`,
      transportation: `Beep! They sped away from the scene of the crime. He or she was seen traveling by ${murderBot.transportation}.`,
      location: `Beep boop! I was shocked to hear a loud THUMP in the ${murderBot.location}. Must be the scene of the crime.`,
      eyefeature: `Beep! Beep! I got a good look at the Murderbot. I stared right into his or her ${murderBot.eye_feature}.`,
      hair_type: `Well let me tell you - Bots these days spend lots of money on their metal bodywork.The Murderbot had the hairstyle of ${murderBot.hair_type}.`,
      mouth: `I knew the second I saw him - he had ${murderBot.mouth}.`,
      nonose: `Boop beep! It sure will be hard to find who did it. Like most of the tin cans around here, I didn't even see a nose on that robot!`,
      nose: "Beep beep! I definitely saw his shadow profile with a nose. ",
      mustache: `I saw a lot of fine metal-like wires by where that last bot was murdered. I'm sure the one who did it must have had a mustache.`,
      nomore: `While looking for a new witness you realize there are none left and the Murderbot strikes again. Another robot dies.`
    }]

   // This if set checks for having a foot as transportation then removing irrelevant witness statements, and then checking for hoverboard
   if (murderBot.transportation === "Foot"){
    statementArr.splice(statementArr.indexOf('model'), 1)
    statementArr.splice(statementArr.indexOf('color'), 1)    
   }
   else if (murderBot.transportation === "Hoverboard"){
    statementArr.splice(statementArr.indexOf('model'), 1)   
   }

   // Since we have a variety of ways to say the nose this actually checks for which type of nose the bot has and then eliminates the other two. NOTE this If statement needs to be one chain and the transportation needs to be a seperate chain of else if statements as a single bot can have features from each that would modify the array.
   if (murderBot.nose === "No Nose"){
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
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// This function gives a witness statement and calls the death of another robot.
function witnessStatementFunc() {
  
  // Selecting a random type of witness statement
  var currentWitness = [Math.floor(Math.random() * statementArr.length)]

  // Creating the append based on the statement type
  if (statementArr.length < 1 ){

    //If the statementArr is empty that means there are no more witness clues. This will then push a canned statement in saying so that will be immediately removed again and repeat with each additional attempt to find a witness when there are none.
    statementArr.push(`nomore`)
  }

  // Prepares the witness statement based on which criteria was randomly selected from the statementArr. Note that it uses [[]] notation after witnessStatements[0]
  var witnessAppend = `<div class='card witness-statement content'>${witnessStatements[0][statementArr[currentWitness]]}</div>`

  // After a witness statement is selected we remove the statement type from the statementArr array so it cannot be used again
  statementArr.splice(currentWitness,1)

  // This appends the witness statement produced in the Witness box of the game
  $("#whoDidIt").append(witnessAppend);

  // Calls a robot to be murdered
  callRobotDeath();
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// This does a check on if the accused box matches the id of the murderer, if not someone dies.
function callAccuse(){

  // We have to use the == instead of === because the data types aren't the same however the value is if the user guessed right
  if (murderBot.id == accuseSelected+1)
  {

    //The victory screen is called, all game variables are cleared on the board by removing their elements, start button is shown and board is hidden again.
    winGame()
  }
  else{

    // When the wrong choice is made you are visually told at the bottom and another robot dies.
    $("#wrongchoice").css('display', "block");

    // Wrong choices have consequences, another robot dies and you don't even get a witness statement to help out.
    callRobotDeath()
  }
  
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// This is called whenever a bot died (After a failed guess or witness statement is added)
function callRobotDeath(){

  // The death Animation is immediately called to signify another bot has died.
  deathAnimation();

  // Random number based on remaining bots of which one is going to die.
  var murderABot = [Math.floor(Math.random() * roboNPC.length)]

  // Creates the append for the image of the oil splatter
  var deathAppend = `<img src='./assets/img/event/oilsplash.png' width='100px' height='100px' class='l-2 oil-overlay'/>`
  
  // Selects the div container of the randomly selected bot that will be killed based on murderABot variable
  // The robots images are in div containers with the unique ID's suspectXX where XX is their ID number. Since their ID numbers start with 1 we find the ID number of the murdered bot and subtract 1 then append the death overlay to that bot.
  $(`#suspect${(roboNPC[murderABot].id)-1}`).append(deathAppend);

  // This if statement is so the first round the first robot that dies gets listed in the Scene information. This is calculated by using npcTotal - 1 because the murderbot was already removed from the length of the array where the round starts.
  if (roboNPC.length === npcTotal-1){

  // Adds scene text with players name
  var sceneText = (`<div class='card witness-statement content'>Detective ${playerName}, you've been called in because there was a murder at the Hoverboard factory. ${roboNPC[murderABot].first_name} ${roboNPC[murderABot].last_name} was found in a puddle of its own hydraulic fluid disabled with multiple blaster gun holes.  Can you help us discover the culprit of the heinous act....</div>`)
  
  // Appending the Scene
  $('#scene').append(sceneText);
  }

  // Splice removes the suspect that was just murdered from the roboNPC Array
  roboNPC.splice(murderABot, 1)

  // This will guarentee a gameover when there are only 3 suspects left (the murderer and 2 innocents) but also push a chance to kill a sloppy detective that is taking too long.
  // Essentially the earliest the player can die is whatever number is in this first if of roboNPC.length < X. using npcTotal - 7 gives the player 5 chances to beat the game before they too become a target.
  if (roboNPC.length  < npcTotal-7){
    
    // This is a random roll to see if the player was also murdered. As fewer suspects are left the chance of death for the player becomes greater based on the next if statement.
    var gameOverRoll = [Math.floor(Math.random() * roboNPC.length)]

    // The number in this if is the quanty of NPC's left that guarentee's the player's death. So if gameOverRoll < 2 that means if the random number rolled above is a 0, or a 1 the player loses the game. This is the reason less survivors left increases the players chance of death. 
    if (gameOverRoll < 2){

      // Calls the lose game function if player dies.
      loseGame()
    }
  }
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// Added in death animation function to be called whenever somerobo dies.
function deathAnimation(){
  
  // This sets the sound clip to making it ready to play.
  var snd = new Audio("./assets/sound/Thunder.mp3");

  // Sets soundclip volume to 20%
  snd.volume = .2;

  // Plays the sound clip
  snd.play();

  // Both our container and image start as display: none. This fades them in taking x milliseconds. at 1000 it will take 1 second to fade in. Both the container the picture is in and the picture itself need to fade in an out or nothing shows.
  $("#rcontainer").fadeIn(1000)

  // This is attached to a function that moves into a setTimeout to space out the timing of the fade in/out
  $("#reaper").fadeIn(1000, function(){
    
    // Setting the timeout for the end of function variable representing x milliseconds. at 2000 the image will stay on screen at full opacity for 2 seconds.
    setTimeout(function(){

      // Once done the container and image need to fade back out to continue the game. once again this is in milliseconds and 1000 is one second.
      $("#reaper").fadeOut(1000);
      $("#rcontainer").fadeOut(1000);

      // This cuts the sound clip short because it was kind of long for the functionality of the game and presentation.
      snd.pause();

    // This is the above mentioned end of function and where we put in the x milliseconds for the image to remain on screen at full opacity.
    }, 2000);
  }); 
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// This function is called when the game is won
function winGame(){

  // Takes the current quanity of remaining NPC's and assigns that as the players score.
  playerScore = roboNPC.length;

  // Calls the function to save the player score to the board.
  saveHighScore();

  // This is the same functionality as function deathAnimation()  so view detailed comments there.
  var snd = new Audio("./assets/sound/Victory.mp3");
  snd.volume = 0.2;
  snd.play();
  $("#vcontainer").fadeIn(5000)
  $("#victory").fadeIn(5000, function(){
    setTimeout(function(){
      $("#victory").fadeOut(5000);
      $("#vcontainer").fadeOut(5000);
    }, 10000);
  });

  // When the game is completed menuMode is called to reset the game.
  menuMode();
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// This function is called when the game is lost like winGame and deathAnimation it is functionally the same information for comments
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

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// This function swaps around visibility of elements on the page to transition from game features to the start menu.
function menuMode(){
  $(`.robotImg`).remove()
  $(`.witness-statement`).remove()  
  $('#npc-main').css('display', "none");
  $('#play-npc').css('display', 'block');
  $('#formSection').css('display', 'block');
  $("#wrongchoice").css('display', "none"); 

  // init loads the high score board and then if highscores exist places it underneath the start option.
  init();
  if (highScores.length > 0){
    $('#highscores-tag').css('display', 'block'); 
    $('#highscores').css('display', 'block'); 
    $('#clear-highscores').css('display', 'block');  
  }
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// This function swaps elements around to set up for the game mode
function gameMode(){
  $(`.robotImg`).remove()
  $(`.witness-statement`).remove()  
  $('#npc-main').css('display', 'block'); 
  $('#play-npc').css('display', "none");
  $('#formSection').css('display', "none"); 
  $('#highscores-tag').css('display', "none");
  $('#highscores').css('display', "none");
  $('#clear-highscores').css('display', "none");
  $("#wrongchoice").css('display', "none"); 
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// This is called when the start game button is hit
function startTheGame(){

  // This checks to make sure the player has entered a name before starting
  if ($('#name-input')[0].value === "")
  { 

    // If there is no input in the box it updates the placeholder and makes the border thicker and red to signal the player to type something.
    $('#name-input')[0].placeholder = 'HEY ENTER YOUR NAME HERE!!!'
    $('#name-input').css('border','5px solid #ff0000');
  }

  // If the input box is not empty the game starts
  else if ($('#name-input')[0].value != "")
  {

    // Assigns player name from input box
    playerName = $('#name-input')[0].value

    // Turns the input box back to its normal border incase it had been changed
    $('#name-input').css('border','2px solid #323232');

    // Calls the function to build the array of robots
    buildRoboArr();

    // Calls the function to switch the elements to game mode.
    gameMode();
  }

}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// Get stored scoreboard from localStorage
function init() {

  // Removes the element on the page that displays the highscore
  $('.highscore-list').remove()

  // Retrieves highscores from local storage and checks if it is empty
  highScores = JSON.parse(localStorage.getItem("robo-scores")) || []; 
  
  // If there is highscores runs a loop to display them based on length of the array
  for (i=0; i < highScores.length; i++){

    // Creates the variable to post scores to the page 
    let postScores = `<div class='highscore-list card content'>${highScores[i].player} solved the case with ${highScores[i].score} survivors left.</div>`

    // Appends variables to the highscores section of the page
    $('#highscores').append(postScores)
  }
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// Saves the new highscore
function saveHighScore (){

  // First we grab the existing highscores if available to do so
  init();

  // Make an array to build our highscore object from both the playername and playerscore
  var roboScoresObj = {
    score: playerScore,
    player: playerName
  }

  // init() updated the highScores variable with the most recent local scores. This pushes the players new highscore to the end of that array.
  highScores.push(roboScoresObj);

  // Sorts the array by scores
  highScores.sort((a,b) => b.score - a.score);

  // If there are more than 5 scores in the array after the new one is added we remove the one on the bottom(lowest score) by splicing off anything past 5 entries
  if (highScores.length > 4) highScores.splice(5)

   // Saves the scores to the robo-scores variable in local storage
  localStorage.setItem("robo-scores", JSON.stringify(highScores));

  // Runs init one more time because this also updates the scores displayed on the screen.
  init();
}

/////////////////////////////////////////////////ROOT FUNCTION START//////////////////////////////////////////////////////////////////////

// This function primarily serves for accessibility reasons on mobile devices. In the CSS there is a setting that if the screen width is less than 1000px this box is visible. This box gets called anytime a robot is selected so it can display the same information that the QTip does since on mobile QTips do not show as you can't hover your finger without it counting as a click.
function addInfoBox(i){

  // The variable is created to put QTip data in a div between the witness and accuse buttons.
  var updateSmallInfo = `Name: ${fullRoboNPC[i].first_name} ${fullRoboNPC[i].last_name}
    Id: ${fullRoboNPC[i].id}
    Phone Number: (${fullRoboNPC[i].areacode}) ${fullRoboNPC[i].barcode}
    Transportation: ${fullRoboNPC[i].transportation}: ${fullRoboNPC[i].color} ${fullRoboNPC[i].model}
    Location: ${fullRoboNPC[i].location}
    Eyes: ${fullRoboNPC[i].eye_feature}
    Hair: ${fullRoboNPC[i].hair_type} 
    Mouth: ${fullRoboNPC[i].mouth}
    Nose: ${fullRoboNPC[i].nose}
    Color: ${fullRoboNPC[i].common_color}`;
  // Updates the div by textContent with the above variable.
  $('#small-info-div')[0].textContent = updateSmallInfo
}




/////////////////////////////////////////////////EVENT LISTENERS//////////////////////////////////////////////////////////////////////

// This targets the Start button and starts the game if clicked
$('#play-npc').on('click', function(){
  startTheGame();
})

// This event listener is for when the game is being played. It allows the user to select a robot and gives visual confirmation by putting a yellow box around it
// It detects wherever there is a container class and works on the .robotImg.
$(".container").on("click", ".robotImg", function() {

    // This loop is setup to clear the box from all the robots. It uses the base npcTotal since the boxes don't disappear as robots die
    for (i = 0; i < npcTotal; i++) {

      // Since this function starts off when a user clicks a robot it targets other sibling robots cycling all the unique suspect ID's to remove the borders
      $(this).siblings(`#suspect${i}`).css('border', "none");
    }

    // After clearing off the borders from all the bots, the selected bot recieves a border
    $(this).css('border', "solid 5px yellow"); 

    // The visual wrong choice information box that pops up at the bottom is removed after the user selects another bot
    $("#wrongchoice").css('display', "none");

    //temp Accuse is made to pull the id out of the current selected box. The ID is then turned into a String instead of an Array Element.
    var tempAccuse = String($(this)[0].id)

    //With the tempAccuse being a workable string we can now use the method substr(7) on it which allows us to remove the first 7 characters from the string leaving us
    //with the remaining characters (tempAccuse at this time is = suspectXX where XX is the number and that is what we need to get. with substr we are left with this number)
    //So it can be treated like a number we also need to use the Number method to force it back in to being treated as such
    accuseSelected = Number(tempAccuse.substr(7))

    //When a bot is selected the accessibility information is added to make seeing QTip information in its own box above the bots
    addInfoBox(accuseSelected);
});

// This event listener is for the get witness and accuse buttons
$('#player-choice').on('click', 'button', function(){

  // If the button id is get-witness it calls the witness function
  if ($(this)[0].id === 'get-witness' ){
    witnessStatementFunc();

  // Or if the value is the accuse id it calls the accuse function
  } else if ($(this)[0].id === 'accuse' ){
    callAccuse();

  // Just a test log in case it was detecting something that wasn't either of those and some how still a button in this container.
  } else {
    console.log('clicked somewhere wrong');
  }
})

// This is focusing on the clear-highscores button. 
$('#clear-highscores').on('click', function(){

  // If clicked sets clearScores to an empty array
  var clearScores = []

  // Saves an empty array to local storage at robo-scores
  localStorage.setItem("robo-scores", JSON.stringify(clearScores));

  // Runs the init function to update the highscore board
  init();

  // Hides the higscore board since there are no longer any scores
  $('#highscores-tag').css('display', "none");
  $('#highscores').css('display', "none");
  $('#clear-highscores').css('display', "none");
})

// This selector specifically is attached to the input box and when the user hits the Enter or Return key which has an ID of 13. Normally this would refresh the page and submit the form. We are ignoring this functionality.
$(`#formSection`).keypress(
  function(event){

    //Checks for Enter button to be hit
    if (event.which == '13') {

      // If it is ignores the default submit
      event.preventDefault();

      // Starts the game as if you clicked the start button. This is more of an accessibility convenience
      startTheGame();
    }
});

// These are the only two functions called upon loading the page and it just sets up the page for menuMode by swapping to gameMode first then back to make sure only the proper elements are displaying on the page
gameMode();
menuMode();