const textGenerator = require("../utils/random_word/RandomTextGenerator");
const performanceCalculator = require("../utils/RacePerformanceCalculator");

const handleRaceMessages = (participants, message) => {
  const RACE_TIME_LIMIT = 60;
  const textTests = textGenerator.generateRandomParagprah(3);
  const submitters = [];
  let sendedMessage;

  const filter = (m) => {
    return participants.includes(m.author.username);
  };

  message.channel.send(textTests).then((result) => {
    sendedMessage = result;
  });

  const raceCollector = message.channel.createMessageCollector({
    filter,
    time: 1000 * RACE_TIME_LIMIT,
  });

  raceCollector.on("collect", (m) => {
    if (submitters.includes(m.author.username)) {
      message.channel.send(`${m.author.username} already submitted `);
    } else {
      submitters.push(m.author.username);
    }
    if (submitters.length === participants.length - 1) {
      raceCollector.stop("finished");
    }
  });

  raceCollector.on("end", (collected, reason) => {
    const sendedMessageTime = sendedMessage.createdTimestamp;
    //TODO: calculate the time for each of the anu;
    if (reason === "finished") {
      message.channel.send(
        "All have finished in time, here are the results : "
      );
    } else {
      message.channel.send("Times up! here are the results : ");
    }

    collected.forEach((collectee) => {
      const words = collectee.content.split(" ").length;
      const wpm = performanceCalculator.getWordPerMinute(
        performanceCalculator.minuteDifference(
          new Date(sendedMessageTime),
          new Date(collectee.createdTimestamp)
        ),
        words
      );

      const accuracy = performanceCalculator.getAccuracy(
        collectee.content,
        textTests
      );
      message.channel.send(
        `${collectee.author.username} with wpm ${wpm.toFixed(
          2
        )} and accuracy ${accuracy.toFixed(2)}%`
      );
    });
  });
};

exports.handleRaceMessages = handleRaceMessages;
