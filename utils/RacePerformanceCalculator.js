const minuteDifference = (dateOne, dateTwo) => {
  var diffMs = dateTwo - dateOne;
  var diffMins = ((diffMs % 86400000) % 3600000) / 60000;
  return diffMins;
};

const getWordPerMinute = (minutes, wordCount) => {
  return wordCount / minutes;
};

const getAccuracy = (submittedWord, realWord) => {
  let correctCharacter = 0;

  for (let i = 0; i < submittedWord.length && i < realWord.length; i++) {
    if (submittedWord.charAt(i) === realWord.charAt(i)) {
      correctCharacter++;
    }
  }

  return (correctCharacter / realWord.length) * 100;
};

exports.minuteDifference = minuteDifference;
exports.getWordPerMinute = getWordPerMinute;
exports.getAccuracy = getAccuracy;
