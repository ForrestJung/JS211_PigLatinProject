'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pigLatin = (word) => {
  // Creating Arrays to Hold Information
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    word = word.trim().toLowerCase();
    const wordArry = word.split(' ');
    let pigLatin = [];

    console.log(`${wordArry}`);

    // let firstLetter = word.charAt(0);

  for (var i=0; i <= wordArry.length; i++) {
    if (vowels.indexOf(wordArry[i]) !== -1) {
      let vowelFirst = word + "yay";
      // console.log(`${vowelFirst}`)
      // document.getElementById("display-element").innerHTML = (`${vowelFirst}`);
      pigLatin.push(vowelFirst)
      return vowelFirst
    } else {
      console.log(i)
      let firstMatch = word.match(/[aeiou]/g) || 0;
      let vowel = word.indexOf(firstMatch[0]);
      let consFirst = word.substring(vowel) + word.substring(0, vowel) + "ay";
      // console.log(`${consFirst}`)
      // document.getElementById("display-element").innerHTML = (`${consFirst}`);
      pigLatin.push(consFirst)
      return consFirst
    }
  }
}

// const pigLatin = (str) => {
//   let vowels = ['a', 'e', 'i', 'o', 'u'];
//   let newStr = "";

//   if (vowels.indexOf(str[0]) > -1) {
//     newStr = str + "hay"
//     document.getElementById("display-element").innerHTML = (`${newStr}`);
//     return newStr
//   } else {
//     let firstMatch = str.match(/[aeiou]/g) || 0;
//     let vowel = str.indexOf(firstMatch[0]);
//     newStr = str.substring(vowel) + str.substring(0, vowel) + "ay";
//     document.getElementById("display-element").innerHTML = (`${newStr}`);
//     return newStr
//   }
// }

const getPrompt = () => {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Unit Tests
// to use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}