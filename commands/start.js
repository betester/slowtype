const startRaceHandler = require("../services/StartRaceService");

let response = "here are the participants: \n";
const TIME_LIMIT = 20;
const participants = [];
const GREETING_MESSAGE = `you have 1 minute to partipate on the competition.
  - Please type !participate in order to participate.
  - !forgo to cancel the participation.
  - You can also cancel the contest by typing !cancel.
  - if all ready to start, type !startrace.`;

const sendParticipationStatusMessage = (status, username, message) => {
  if (status) {
    message.channel.send(`${username} just participated!`);
  } else {
    message.channel.send(`${username} already participated!`);
  }
};

const isAlreadyParticipated = (m) => {
  const isParticipated =
    m.content === "!participate" && !participants.includes(m.author.username);

  sendParticipationStatusMessage(isParticipated, m.author.username);

  return isParticipated;
};

const sendParticipatedMessage = (message) => {
  participants.forEach((participated) => {
    response += participated + "\n";
  });
  message.channel.send(response);
};

const sendStartingRaceMessage = (message) => {
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

module.exports = {
  callback: (message) => {
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
          startRaceHandler.handleRaceMessages(participants, message);
        }, 3000);
      }
    });
  },
};
