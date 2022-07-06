const generateRandomCharacter = () => {
  let MIN_ALPHABET = 97;
  let MAX_ALPHABET = 122;

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
    if (i == manyWords - 1) {
      sentence += ". ";
    } else {
      sentence += " ";
    }
  }
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
