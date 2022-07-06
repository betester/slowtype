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
        `${collectee.author.username} with wpm ${wpm} and accuracy ${accuracy}%`
      );
    });
  });
};

module.exports = {
  callback: (message) => {
    let response = "here are the participants: \n";
    const TIME_LIMIT = 20;
    const participants = [];

    const GREETING_MESSAGE = `you have 1 minute to partipate on the competition.
      - Please type !participate in order to participate.
      - !forgo to cancel the participation.
      - You can also cancel the contest by typing !cancel.
      - if all ready to start, type !startrace.`;

    const isAlreadyParticipated = (m) => {
      const isParticipated =
        m.content === "!participate" &&
        !participants.includes(m.author.username);

      sendParticipationStatusMessage(isParticipated, m.author.username);

      return isParticipated;
    };

    const sendParticipationStatusMessage = (status, username) => {
      if (status) {
        message.channel.send(`${username} just participated!`);
      } else {
        message.channel.send(`${username} already participated!`);
      }
    };

    const sendParticipatedMessage = () => {
      participants.forEach((participated) => {
        response += participated + "\n";
      });
      message.channel.send(response);
    };

    const sendStartingRaceMessage = () => {
      sendParticipatedMessage();
      message.channel.send("please wait, generating text just for you :)");
      message.channel.send("get ready");
      setTimeout(() => {
        message.channel.send("1");
      }, 1000);

      setTimeout(() => {
        message.channel.send("2");
      }, 1000);

      setTimeout(() => {
        message.channel.send("3");
      }, 1000);
    };

    const filter = (m) => {
      switch (m.content) {
        case "!participate":
          return isAlreadyParticipated(m);

        case "!cancel":
          return message.user.id === m.author.id;

        case "!startrace":
          return message.user.id === m.author.id;

        default:
          return false;
      }
    };

    const collector = message.channel.createMessageCollector({
      filter,
      time: 1000 * TIME_LIMIT,
    });

    // console.log(message,"whole message")

    message.channel.send(GREETING_MESSAGE);
    participants.includes(message.user.username);

    collector.on("collect", (m) => {
      if (m.content === "!cancel") {
        message.channel.send(
          `${m.author.username} has stopped the competition`
        );
        collector.stop("!cancel");
      } else if (m.content === "!startrace") {
        `${m.author.username} has started the competition`;
        collector.stop("!startrace");
      }

      participants.push(m.author.username);
    });

    collector.on("end", (collected, reason) => {
      if (reason !== "!cancel") {
        sendStartingRaceMessage();
        setTimeout(() => {
          handleRaceMessages(participants, message);
        }, 3000);
      }
    });
  },
};
