//How many NPC's will be in the game (1 Always dies so if you want 20 to be a part of the game you need to start with 21)
var npcTotal = 21

//RequestURL to make an API pull from mockaroo. 
var requestUrl = `https://my.api.mockaroo.com/robo_murder.json?key=d862e8b0`

//Array to store final Robo NPC in 
var roboNPC = []

//These variables should never be modified so they are set as a const
const npcDescArr = [
  { "avatar": "r1.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange" },
  { "avatar": "r2.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "Teeth", "nose": "No Nose", "common_color": "Blue" },
  { "avatar": "r3.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Brown" },
  { "avatar": "r4.png", "eye_feature": "One Eye", "hair_type": "Radar", "mouth": "Teeth", "nose": "No Nose", "common_color": "Yellow" },
  { "avatar": "r5.png", "eye_feature": "No Eyes", "hair_type": "Light", "mouth": "Teeth", "nose": "No Nose", "common_color": "Green" },
  { "avatar": "r6.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "Teeth", "nose": "No Nose", "common_color": "Red" },
  { "avatar": "r7.png", "eye_feature": "Two Eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Nose", "common_color": "Blue" },
  { "avatar": "r8.png", "eye_feature": "Two Eyes", "hair_type": "Button", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Silver" },
  { "avatar": "r9.png", "eye_feature": "Two Eyes", "hair_type": "Button", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange" },
  { "avatar": "r10.png", "eye_feature": "Two Eyes", "hair_type": "Radar", "mouth": "Teeth", "nose": "No Nose", "common_color": "White" },
  { "avatar": "r11.png", "eye_feature": "Two Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Nose", "common_color": "Orange" },
  { "avatar": "r12.png", "eye_feature": "Two Eyes", "hair_type": "Button", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange" },
  { "avatar": "r13.png", "eye_feature": "Two Eyes", "hair_type": "Radar", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink" },
  { "avatar": "r14.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Moustache", "common_color": "Silver" },
  { "avatar": "r15.png", "eye_feature": "Two Eyes", "hair_type": "Ball Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Purple" },
  { "avatar": "r16.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Red" },
  { "avatar": "r17.png", "eye_feature": "No Eyes", "hair_type": "Ball Antenna", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink" },
  { "avatar": "r18.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Purple" },
  { "avatar": "r19.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink" },
  { "avatar": "r20.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink" },
  { "avatar": "r21.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange" },
  { "avatar": "r22.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Moustache", "common_color": "Silver" },
  { "avatar": "r23.png", "eye_feature": "No Eyes", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Red" },
  { "avatar": "r24.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Moustache", "common_color": "Purple" },
  { "avatar": "r25.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink" },
  { "avatar": "r26.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "Teeth", "nose": "Nose", "common_color": "Brown" },
  { "avatar": "r27.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "Teeth", "nose": "No Nose", "common_color": "Red" },
  { "avatar": "r28.png", "eye_feature": "Two eyes", "hair_type": "Radar", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink" },
  { "avatar": "r29.png", "eye_feature": "Two eyes", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Yellow" },
  { "avatar": "r30.png", "eye_feature": "No eyes", "hair_type": "Light", "mouth": "Teeth", "nose": "No Nose", "common_color": "Green" },
  { "avatar": "r31.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Green" },
  { "avatar": "r32.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "No teeth", "nose": "No Nose", "common_color": "Brown" },
  { "avatar": "r33.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No Nose", "common_color": "Silver" },
  { "avatar": "r34.png", "eye_feature": "Two eyes", "hair_type": "Light", "mouth": "No teeth", "nose": "No Nose", "common_color": "Green" },
  { "avatar": "r35.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "Teeth", "nose": "No nose", "common_color": "Orange" },
  { "avatar": "r36.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink" },
  { "avatar": "r37.png", "eye_feature": "Two eyes", "hair_type": "Light", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue" },
  { "avatar": "r38.png", "eye_feature": "Two eyes", "hair_type": "button", "mouth": "No teeth", "nose": "No nose", "common_color": "Silver" },
  { "avatar": "r39.png", "eye_feature": "Two eyes", "hair_type": "Button", "mouth": "Teeth", "nose": "No nose", "common_color": "Orange" },
  { "avatar": "r40.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue" },
  { "avatar": "r41.png", "eye_feature": "Two eyes", "hair_type": "Light", "mouth": "No teeth", "nose": "No nose", "common_color": "silver" },
  { "avatar": "r42.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Orange" },
  { "avatar": "r43.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue" },
  { "avatar": "r44.png", "eye_feature": "No eyes", "hair_type": "Wires", "mouth": "Teeth", "nose": "No nose", "common_color": "Yellow" },
  { "avatar": "r45.png", "eye_feature": "No eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Moustache", "common_color": "Silver" },
  { "avatar": "r46.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue" },
  { "avatar": "r47.png", "eye_feature": "One Eye", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue" },
  { "avatar": "r48.png", "eye_feature": "No eyes", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "Red" },
  { "avatar": "r49.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Moustache", "common_color": "Red" },
  { "avatar": "r50.png", "eye_feature": "Two eyes", "hair_type": "Light", "mouth": "No teeth ", "nose": "No nose", "common_color": "Silver" },
  { "avatar": "r51.png", "eye_feature": "One eye", "hair_type": "Button", "mouth": "No teeth", "nose": "No nose", "common_color": "Silver" },
  { "avatar": "r52.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Silver" },
  { "avatar": "r53.png", "eye_feature": "Two eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Brown" },
  { "avatar": "r54.png", "eye_feature": "Two eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Orange" },
  { "avatar": "r55.png", "eye_feature": "One eye", "hair_type": "Spike", "mouth": "No teeth", "nose": "No nose", "common_color": "Brown" },
  { "avatar": "r56.png", "eye_feature": "One eye", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink" },
  { "avatar": "r57.png", "eye_feature": "No eyes", "hair_type": "Bald", "mouth": "No teeth", "nose": "Moustache", "common_color": "Purple" },
  { "avatar": "r58.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink" },
  { "avatar": "r59.png", "eye_feature": "One eye", "hair_type": "Bolt", "mouth": "No teeth", "nose": "No nose", "common_color": "PInk" },
  { "avatar": "r60.png", "eye_feature": "Two eyes", "hair_type": "Ball Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Purple" },
  { "avatar": "r61.png", "eye_feature": "One eye", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink" },
  { "avatar": "r62.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Yellow" },
  { "avatar": "r63.png", "eye_feature": "Two eyes", "hair_type": "Light", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue" },
  { "avatar": "r64.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Green" },
  { "avatar": "r65.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Red" },
  { "avatar": "r66.png", "eye_feature": "One eye", "hair_type": "Spike", "mouth": "Teeth", "nose": "No nose", "common_color": "Orange" },
  { "avatar": "r67.png", "eye_feature": "No eyes", "hair_type": "Wires", "mouth": "Teeth", "nose": "No nose", "common_color": "Blue" },
  { "avatar": "r68.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "Teeth", "nose": "Moustache", "common_color": "Green" },
  { "avatar": "r69.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Yellow" },
  { "avatar": "r70.png", "eye_feature": "Two eyes", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Yellow" },
  { "avatar": "r71.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Moustache", "common_color": "Silver" },
  { "avatar": "r72.png", "eye_feature": "No eyes", "hair_type": "Bald", "mouth": "No teeth", "nose": "No nose", "common_color": "yellow" },
  { "avatar": "r73.png", "eye_feature": "Two eyes", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "White" },
  { "avatar": "r74.png", "eye_feature": "One eye", "hair_type": "Wires", "mouth": "No teeth", "nose": "No nose", "common_color": "White" },
  { "avatar": "r75.png", "eye_feature": "One eye", "hair_type": "Spike", "mouth": "No teeth", "nose": "No nose", "common_color": "Purple" },
  { "avatar": "r76.png", "eye_feature": "Two Eyes", "hair_type": "Light", "mouth": "No teeth", "nose": "No nose", "common_color": "Green" },
  { "avatar": "r77.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "Teeth", "nose": "No nose", "common_color": "Blue" },
  { "avatar": "r78.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Gray" },
  { "avatar": "r79.png", "eye_feature": "One eye", "hair_type": "Wires", "mouth": "No teeth", "nose": "No nose", "common_color": "White" },
  { "avatar": "r80.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Mustache", "common_color": "Gray" },
  { "avatar": "r81.png", "eye_feature": "Two eyes", "hair_type": "Button", "mouth": "Teeth", "nose": "No nose", "common_color": "Orange" },
  { "avatar": "r82.png", "eye_feature": "One eye", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Yellow" },
  { "avatar": "r83.png", "eye_feature": "Two eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No nose", "common_color": "Brown" },
  { "avatar": "r84.png", "eye_feature": "No eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Orange" },
  { "avatar": "r85.png", "eye_feature": "Two eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No nose", "common_color": "White" },
  { "avatar": "r86.png", "eye_feature": "One eye", "hair_type": "Button", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink" },
  { "avatar": "r87.png", "eye_feature": "Two eyes", "hair_type": "Radar", "mouth": "Teeth", "nose": "No nose", "common_color": "White" },
  { "avatar": "r88.png", "eye_feature": "Two eyes", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "White" },
  { "avatar": "r89.png", "eye_feature": "One eye", "hair_type": "Button", "mouth": "No teeth", "nose": "No nose", "common_color": "Gray" },
  { "avatar": "r90.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Purple" },
  { "avatar": "r91.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Mustache", "common_color": "Red" },
  { "avatar": "r92.png", "eye_feature": "Two eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Brown" },
  { "avatar": "r93.png", "eye_feature": "No eyes", "hair_type": "Wires", "mouth": "Teeth", "nose": "No nose", "common_color": "Blue" },
  { "avatar": "r94.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "Teeth", "nose": "Mustache", "common_color": "Green" },
  { "avatar": "r95.png", "eye_feature": "Two eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Nose", "common_color": "Green" },
  { "avatar": "r96.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue" },
  { "avatar": "r97.png", "eye_feature": "No eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink" },
  { "avatar": "r98.png", "eye_feature": "One eye", "hair_type": "Button", "mouth": "Teeth", "nose": "No nose", "common_color": "Gray" },
  { "avatar": "r99.png", "eye_feature": "Two eyes", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Green" },
  { "avatar": "r100.png", "eye_feature": "No eyes", "hair_type": "Antenna", "mouth": "Teeth", "nose": "No nose", "common_color": "Pink" },
  { "avatar": "r101.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Gray" }
]

//Function to grab 1 random avatar with data
function generateRandomDesc() {
  var tempRand = npcDescArr[Math.floor(Math.random() * npcDescArr.length)]
  return tempRand;
}

function buildRoboArr() {
  //Fetch request to grab mockata
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      //clears the roboNPC array
      roboNPC = []
      //Loop to build the array of Full Robo NPC's containing data from both mockaroo and hardcoded desc array uses NPC total from the top created variable
      for (i = 0; i < npcTotal; i++) {
        // This runs the generateRandomDesc() function to pull 1 of the lines from the npcDescArr to be used below as ranDesc
        var ranDesc = generateRandomDesc();

        //This builds a single variable line that contains all the data for a single NPC in the array
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
        //Each time the loop runs this takes itself and adds the above tempLine to the array.
        roboNPC = [...roboNPC, ...tempLine]
      }
      var murderBot = roboNPC[Math.floor(Math.random() * npcTotal)]
      console.log(murderBot)

      console.log(roboNPC)
      //When the fetch is done this returns roboNPC to the function
      return roboNPC, murderBot;

    })
    //Returns roboNPC to where the function was originally called.

    //calls image when data fetched
    .then(function (finalImage) {
      //call RoboImage function
      getRoboImage(roboNPC);
    })

    // calls murderBot information to put into witness statements
    .then(function () {
      witnessStatementFunc(murderBot);
    })
}

//Calls for buildRoboArr function 
buildRoboArr()


// function get to set random Robo images to img src attr and show oil spill death
function getRoboImage(roboNPC) {
  console.log(roboNPC[0].avatar);
  // for loop to run through array based on length
  for (var i = 0; i < roboNPC.length; i++) {
    // if else to make sure that the values are not null or undefined
    if (roboNPC[i].avatar !== null || roboNPC[i].avatar !== undefined) {
      var roboImage = "./assets/img/robothugs/" + roboNPC[i].avatar;
      if (roboNPC[i].transportation === "Foot") {
        roboNPC[i].model = ""
        roboNPC[i].color = ""
      } else if (roboNPC[i].transportation === "Hoverboard") {
        roboNPC[i].model = ""
      }
      var roboAppend = `<div id='suspect${i}' class='card card-block' style='width: 150px'>
      <a href="#" rel="tip" 
      title="${roboNPC[i].first_name} ${roboNPC[i].last_name}
      barcode:(${roboNPC[i].areacode}) ${roboNPC[i].barcode}
      transportation: ${roboNPC[i].transportation}: ${roboNPC[i].color} ${roboNPC[i].model}
      location: ${roboNPC[i].location}
      eyes: ${roboNPC[i].eye_feature}
      hair: ${roboNPC[i].hair_type} 
      mouth: ${roboNPC[i].mouth}
      nose: ${roboNPC[i].nose}
      color: ${roboNPC[i].common_color}">
      <img src='${roboImage}' alt='robo suspect' width='100px' height='100px'class='l-1' />
      </a>
      </div>`
      $("#robot-display").append(roboAppend);
    } else {
      console.log("robo undefined or null");
    }
  }
  var deathAppend = `<img src='./assets/img/event/oilsplash.png' width='100px' height='100px' class='l-2'/>`
  $('#suspect5').append(deathAppend);
  $('#suspect19').append(deathAppend);
  $('#suspect1').append(deathAppend);
  $('#suspect3').append(deathAppend);
  $('#suspect15').append(deathAppend);

  console.log(deathAppend)
  console.log(`#suspect${5}`)
  console.log(roboAppend)
}


//witness statement function
function witnessStatementFunc() {

  //witness statement array (example)
  const witnessStatements = [
    { areacode: `I was able to see a text message from the robo-attacker on the his or her phone. It looks like they were trying to order some new widgets from Maryland. The area code was ${roboNPC[i].areacode}.` },
    { barcode: `Being a robot you have excellent memory. I knew I wouldn't forget the last four digits of the barcode from the call he or she was getting. It was ${roboNPC[i].barcode}` },
    { color: "The robo-attacker left the scene in a __ vehicle" },
    { model: "The vehicle's model was ___" },
    { transportation: "He or she drove a ____" },
    { location: "Beep boop! I was shocked to hear a loud THUMP in the LOCATION. Ragnar Robot always powers down during work (i.e. takes a nap), but I dont think it was him this time." },
    { eyefeature: "Beep! Beep! I knew he had atleast two eyes because most robots around here only have a visor." },
    { hair_type: "Well let me tell you - Bots these days spend lots of money on their metal bodywork.The robo - attacker had the hairstyle of antenna" },
    { mouthNoTeeth: "I knew the second I saw him - this Bot had not been to the robodentist in a while BECAUSE he had no metal teeth." },
    { mouthTeeth: "It was odd that their teeth looked like piano keys. Most Bots did not have teeth these days." },
    { nose: "Beep beep! The robo-sandwich was a delicacy in the Bot World filled with the finest bolts. I saw the robo-attacker eating one earlier in the day, he must have exquisite taste with his ability to smell as well. " },
    { weapon: "I saw the robo-attacker with my own eyes - their BLANK blinded me in the light. My visor vision focused and analyzed the weapon right away." },
  ]

  for (var x = 0; x < witnessStatements.length; x++) {
    console.log(witnessStatement[x]);
  }
}

//calling witness statement function
witness()