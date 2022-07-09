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

// Takes in a string to turn to pig latin
const pigPhrase = (phrase) => {
  // Trim and lowercase the input
  phrase = phrase.toLowerCase().trim();
  // Split up the string if there are multiple words
  var sentence = phrase.split(' ');
  // Create an empty array to store the seperated words
  var piggedPhrase = [];

  // Each one of the words in the phrase are being pushed to be translated
  for (var i = 0; i <= sentence.length - 1; i++) {
    piggedPhrase.push(pigWord(sentence[i]));
  };
  // After translating join the phrase back into a single string/sentence/phrase
  return piggedPhrase.join(' ');
}

// Translate each word in the phrase
const pigWord = (word) => {
  //Created a variable to hold all of the consonants before the first vowel
  let firstLetters = word.slice( -word.length, findFirstVowel(word));

  // Tests to see if the word is a consonant and then translates the word appropriately (vowel first +yay; consonant first +ay)
  if (consonantTest(word) == true )  {
    // For words that start with a vowel
    return  word + 'yay';
  } else {
    // For words that start with a consonant
    return word.slice(findFirstVowel(word), word.length) + firstLetters + 'ay';
  }
}

// Function to test if a word starts with a consonant
const consonantTest = (word) => {
  // Array to store vowels
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  // Variable to hold the first letter of the word
  let findFirstLetter = word.charAt(0);

  // True if the first letter is not a vowel
  if (vowels.indexOf(findFirstLetter) != -1) {
    return true
  } else {
    return false
  }
}

// Function to find the first vowel in a string and returns its position
const findFirstVowel = (word) => {
  // Array for vowels
  let vowels = ['a', 'e', 'i', 'o', 'u'];

  // For every word, find the first vowel
  for (var i = 0; i <= word.length - 1; i++) {
    // Goes through each word and finds the first vowel
    if (vowels.indexOf(word[i]) !== -1) {
      // Returns position of first vowel
      return i;
    }
  }
  // Returns word length
  return word.length;
}

const getPrompt = () => {
  rl.question('word ', (answer) => {
    console.log( pigPhrase(answer) );
    getPrompt();
  });
}

// Unit Tests
// to use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#pigPhrase()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigPhrase('car'), 'arcay');
      assert.equal(pigPhrase('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigPhrase('create'), 'eatecray');
      assert.equal(pigPhrase('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigPhrase('egg'), 'eggyay');
      assert.equal(pigPhrase('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigPhrase('HeLlO '), 'ellohay');
      assert.equal(pigPhrase(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}