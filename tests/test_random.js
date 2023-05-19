
const randomWord = require('random-word');

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function hehehe(str)
{


  var modifiers = ["girls", "-girls", "three girls", "penis", "boobs", "butt", "bob sagat"]

  var x = randomInt(0,modifiers.length + 1);
  console.log(x)
  var modStr = ''
  if (x == modifiers.length)
  {
    modStr += randomWord();
  }
  else {
    modStr = modifiers[randomInt(0,modifiers.length)];
  }

  console.log(modStr);
  return str + modStr;
}
