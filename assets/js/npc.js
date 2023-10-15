//How many NPC's will be in the game (1 Always dies so if you want 20 to be a part of the game you need to start with 21)
var npcTotal = 21

//RequestURL to make an API pull from mockaroo. 
var requestUrl = `https://my.api.mockaroo.com/robo_murder.json?key=d862e8b0`

//Array to store final Robo NPC in 
var roboNPC = []

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
  {"avatar": "r14.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Moustache", "common_color": "Silver"},
  {"avatar": "r15.png", "eye_feature": "Two Eyes", "hair_type": "Ball Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Purple"},
  {"avatar": "r16.png", "eye_feature": "Two Eyes", "hair_type": "Antenna", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Red"},
  {"avatar": "r17.png", "eye_feature": "No Eyes", "hair_type": "Ball Antenna", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r18.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Purple"},
  {"avatar": "r19.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r20.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r21.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No Nose", "common_color": "Orange"},
  {"avatar": "r22.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Moustache", "common_color": "Silver"},
  {"avatar": "r23.png", "eye_feature": "No Eyes", "hair_type": "Plate 7", "mouth": "No Teeth", "nose": "No Nose", "common_color": "Red"},
  {"avatar": "r24.png", "eye_feature": "No Eyes", "hair_type": "Bald", "mouth": "No Teeth", "nose": "Moustache", "common_color": "Purple"},
  {"avatar": "r25.png", "eye_feature": "Two Eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r26.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "Teeth", "nose": "Nose", "common_color": "Brown"},
  {"avatar": "r27.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "Teeth", "nose": "No Nose", "common_color": "Red"},
  {"avatar": "r28.png", "eye_feature": "Two eyes", "hair_type": "Radar", "mouth": "Teeth", "nose": "No Nose", "common_color": "Pink"},
  {"avatar": "r29.png", "eye_feature": "Two eyes", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Yellow"},
  {"avatar": "r30.png", "eye_feature": "No eyes", "hair_type": "Light", "mouth": "Teeth", "nose": "No Nose", "common_color": "Green"},
  {"avatar": "r31.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Green"},
  {"avatar": "r32.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "No teeth", "nose": "No Nose", "common_color": "Brown"},
  {"avatar": "r33.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No Nose", "common_color": "Silver"},
  {"avatar": "r34.png", "eye_feature": "Two eyes", "hair_type": "Light", "mouth": "No teeth", "nose": "No Nose", "common_color": "Green"},
  {"avatar": "r35.png", "eye_feature": "One Eye", "hair_type": "Spike", "mouth": "Teeth", "nose": "No nose", "common_color": "Orange"},
  {"avatar": "r36.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink"},
  {"avatar": "r37.png", "eye_feature": "Two eyes", "hair_type": "Light", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue"},
  {"avatar": "r38.png", "eye_feature": "Two eyes", "hair_type": "button", "mouth": "No teeth", "nose": "No nose", "common_color": "Silver"},
  {"avatar": "r39.png", "eye_feature": "Two eyes", "hair_type": "Button", "mouth": "Teeth", "nose": "No nose", "common_color": "Orange"},
  {"avatar": "r40.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue"},
  {"avatar": "r41.png", "eye_feature": "Two eyes", "hair_type": "Light", "mouth": "No teeth", "nose": "No nose", "common_color": "silver"},
  {"avatar": "r42.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Orange"},
  {"avatar": "r43.png", "eye_feature": "One Eye", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue"},
  {"avatar": "r44.png", "eye_feature": "No eyes", "hair_type": "Wires", "mouth": "Teeth", "nose": "No nose", "common_color": "Yellow"},
  {"avatar": "r45.png", "eye_feature": "No eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Moustache", "common_color": "Silver"},
  {"avatar": "r46.png", "eye_feature": "One Eye", "hair_type": "Wires", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue"},
  {"avatar": "r47.png", "eye_feature": "One Eye", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue"},
  {"avatar": "r48.png", "eye_feature": "No eyes", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "Red"},
  {"avatar": "r49.png", "eye_feature": "One Eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Moustache", "common_color": "Red"},
  {"avatar": "r50.png", "eye_feature": "Two eyes", "hair_type": "Light", "mouth": "No teeth ", "nose": "No nose", "common_color": "Silver"},
  {"avatar": "r51.png", "eye_feature": "One eye", "hair_type": "Button", "mouth": "No teeth", "nose": "No nose", "common_color": "Silver"},
  {"avatar": "r52.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Silver"},
  {"avatar": "r53.png", "eye_feature": "Two eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Brown"},
  {"avatar": "r54.png", "eye_feature": "Two eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Orange"},
  {"avatar": "r55.png", "eye_feature": "One eye", "hair_type": "Spike", "mouth": "No teeth", "nose": "No nose", "common_color": "Brown"},
  {"avatar": "r56.png", "eye_feature": "One eye", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink"},
  {"avatar": "r57.png", "eye_feature": "No eyes", "hair_type": "Bald", "mouth": "No teeth", "nose": "Moustache", "common_color": "Purple"},
  {"avatar": "r58.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink"},
  {"avatar": "r59.png", "eye_feature": "One eye", "hair_type": "Bolt", "mouth": "No teeth", "nose": "No nose", "common_color": "PInk"},
  {"avatar": "r60.png", "eye_feature": "Two eyes", "hair_type": "Ball Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Purple"},
  {"avatar": "r61.png", "eye_feature": "One eye", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink"},
  {"avatar": "r62.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Yellow"},
  {"avatar": "r63.png", "eye_feature": "Two eyes", "hair_type": "Light", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue"},
  {"avatar": "r64.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Green"},
  {"avatar": "r65.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Red"},
  {"avatar": "r66.png", "eye_feature": "One eye", "hair_type": "Spike", "mouth": "Teeth", "nose": "No nose", "common_color": "Orange"},
  {"avatar": "r67.png", "eye_feature": "No eyes", "hair_type": "Wires", "mouth": "Teeth", "nose": "No nose", "common_color": "Blue"},
  {"avatar": "r68.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "Teeth", "nose": "Moustache", "common_color": "Green"},
  {"avatar": "r69.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Yellow"},
  {"avatar": "r70.png", "eye_feature": "Two eyes", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Yellow"},
  {"avatar": "r71.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Moustache", "common_color": "Silver"},
  {"avatar": "r72.png", "eye_feature": "No eyes", "hair_type": "Bald", "mouth": "No teeth", "nose": "No nose", "common_color": "yellow"},
  {"avatar": "r73.png", "eye_feature": "Two eyes", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "White"},
  {"avatar": "r74.png", "eye_feature": "One eye", "hair_type": "Wires", "mouth": "No teeth", "nose": "No nose", "common_color": "White"},
  {"avatar": "r75.png", "eye_feature": "One eye", "hair_type": "Spike", "mouth": "No teeth", "nose": "No nose", "common_color": "Purple"},
  {"avatar": "r76.png", "eye_feature": "Two Eyes", "hair_type": "Light", "mouth": "No teeth", "nose": "No nose", "common_color": "Green"},
  {"avatar": "r77.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "Teeth", "nose": "No nose", "common_color": "Blue"},
  {"avatar": "r78.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Gray"},
  {"avatar": "r79.png", "eye_feature": "One eye", "hair_type": "Wires", "mouth": "No teeth", "nose": "No nose", "common_color": "White"},
  {"avatar": "r80.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Mustache", "common_color": "Gray"},
  {"avatar": "r81.png", "eye_feature": "Two eyes", "hair_type": "Button", "mouth": "Teeth", "nose": "No nose", "common_color": "Orange"},
  {"avatar": "r82.png", "eye_feature": "One eye", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Yellow"},
  {"avatar": "r83.png", "eye_feature": "Two eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No nose", "common_color": "Brown"},
  {"avatar": "r84.png", "eye_feature": "No eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Orange"},
  {"avatar": "r85.png", "eye_feature": "Two eyes", "hair_type": "Plate 7", "mouth": "Teeth", "nose": "No nose", "common_color": "White"},
  {"avatar": "r86.png", "eye_feature": "One eye", "hair_type": "Button", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink"},
  {"avatar": "r87.png", "eye_feature": "Two eyes", "hair_type": "Radar", "mouth": "Teeth", "nose": "No nose", "common_color": "White"},
  {"avatar": "r88.png", "eye_feature": "Two eyes", "hair_type": "Plate 7", "mouth": "No teeth", "nose": "No nose", "common_color": "White"},
  {"avatar": "r89.png", "eye_feature": "One eye", "hair_type": "Button", "mouth": "No teeth", "nose": "No nose", "common_color": "Gray"},
  {"avatar": "r90.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Purple"},
  {"avatar": "r91.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "No teeth", "nose": "Mustache", "common_color": "Red"},
  {"avatar": "r92.png", "eye_feature": "Two eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Brown"},
  {"avatar": "r93.png", "eye_feature": "No eyes", "hair_type": "Wires", "mouth": "Teeth", "nose": "No nose", "common_color": "Blue"},
  {"avatar": "r94.png", "eye_feature": "One eye", "hair_type": "Bald", "mouth": "Teeth", "nose": "Mustache", "common_color": "Green"},
  {"avatar": "r95.png", "eye_feature": "Two eyes", "hair_type": "Bald", "mouth": "Teeth", "nose": "Nose", "common_color": "Green"},
  {"avatar": "r96.png", "eye_feature": "Two eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Blue"},
  {"avatar": "r97.png", "eye_feature": "No eyes", "hair_type": "Antenna", "mouth": "No teeth", "nose": "No nose", "common_color": "Pink"},
  {"avatar": "r98.png", "eye_feature": "One eye", "hair_type": "Button", "mouth": "Teeth", "nose": "No nose", "common_color": "Gray"},
  {"avatar": "r99.png", "eye_feature": "Two eyes", "hair_type": "Bald", "mouth": "No teeth", "nose": "Nose", "common_color": "Green"},
  {"avatar": "r100.png", "eye_feature": "No eyes", "hair_type": "Antenna", "mouth": "Teeth", "nose": "No nose", "common_color": "Pink"},
  {"avatar": "r101.png", "eye_feature": "No eyes", "hair_type": "Radar", "mouth": "No teeth", "nose": "No nose", "common_color": "Gray"}
]

//Function to grab 1 random avatar with data
function generateRandomDesc(){
    var tempRand = npcDescArr[Math.floor(Math.random()*npcDescArr.length)]
    return tempRand;
}

function buildRoboArr(){
  //Fetch request to grab mockata
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

    //clears the roboNPC array
    roboNPC = []
      //Loop to build the array of Full Robo NPC's containing data from both mockaroo and hardcoded desc array
    for (i=0; i < npcTotal; i++){
      // This runs the generateRandomDesc() function to pull 1 of the lines from the npcDescArr to be used below as ranDesc
      var ranDesc = generateRandomDesc();

      //This builds a single variable line that contains all the data for a single NPC in the array
      var tempLine = [{'id': data[i].id,
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
      'common_color': ranDesc.common_color}  
    ]
    //Each time the loop runs this takes itself and adds the above tempLine to the array.
    roboNPC = [...roboNPC, ...tempLine]
    }
    console.log (roboNPC)
    //When the fetch is done this returns roboNPC to the function
    return roboNPC;
  })
  //Returns roboNPC to where the function was originally called.
}

//Callsf or buildRoboArr function
buildRoboArr()

