const isRandomLowerCase = () => {
  const determiner = Math.random();
  if (determiner <= 0.5) {
    return true;
  }

  return false;
};

const generateRandomCharacter = () => {
  let MIN_ALPHABET;
  let MAX_ALPHABET;

  if (isRandomLowerCase()) {
    MIN_ALPHABET = 97;
    MAX_ALPHABET = 122;
  } else {
    MIN_ALPHABET = 65;
    MAX_ALPHABET = 90;
  }

  const DIFFERENCE = MAX_ALPHABET - MIN_ALPHABET;

  const randomNumber = Math.floor(Math.random() * DIFFERENCE);
  const randomCharacter = String.fromCharCode(randomNumber + MIN_ALPHABET);

  return randomCharacter;
};

const generateRandomWord = () => {
  const length = Math.floor(Math.random() * 7) + 3;
  let randWord = "";

  for (let i = 0; i < length; i++) {
    randWord += generateRandomCharacter();
  }

  return randWord;
};

const generateRandomSentence = (manyWords) => {
  let sentence = "";
  for (let i = 0; i < manyWords; i++) {
    sentence += generateRandomWord();
    if (i == manyWords) {
      sentence += ". ";
    } else {
      sentence += " ";
    }
  }
  sentence += ".";
  return sentence;
};

const generateRandomParagprah = (manySentence) => {
  let paragraph = "";
  const length = Math.floor(Math.random() * 2) + 5;
  for (let i = 0; i < manySentence; i++) {
    paragraph += generateRandomSentence(length);
  }

  return paragraph;
};

exports.generateRandomCharacter = generateRandomCharacter;
exports.generateRandomSentence = generateRandomSentence;
exports.generateRandomParagprah = generateRandomParagprah;
