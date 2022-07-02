//start
//TODO
// pertama 1 user bakalan mulai dengan /start
// abis itu user lain bisa coba /enroll atau /participate
// kalau udah semua /startrace
// generate stringnya dulu (pakai api atau apa kek)
// countdown dari 1,2,3
// mulai timer
// kirim text-nya
// hitung kecepatan peserta
// berhenti kalau
// 1. partisipan udah selesai semua
// 2. udah abis waktu
// tampilin leaderboard yang tercepat, ada wpm sama accuracy-nya
//done

module.exports = {
  callback: (message) => {
    let text = "here are your answers";

    const questions = [
      "siapa presiden pertama?",
      "siapa nama bapak kaesang?",
      "apakah ada yang terjadi di tianmen square?",
      "berapa social credit anda?",
    ];

    const correctAnswer = ["soekarno", "jokowi", "nothing", "100"];

    let counter = 0;
    console.log(message, "message");

    const filter = (m) => {
      console.log(m, "mazda");
      return m.author.id === message.user.id;
    };

    const collector = message.channel.createMessageCollector({
      filter,
      time: 15000,
      max: questions.length,
    });

    message.channel.send(questions[counter++]);

    collector.on("collect", (m) => {
      if (counter < questions.length) {
        m.channel.send(questions[counter]);
        counter++;
      }
    });

    collector.on("end", (collected) => {
      let number = 1;
      collected.forEach((answer) => {
        text += `\n ${number}. ${answer.content} by ${
          answer.author.username
        } which is ${
          correctAnswer[number - 1] === answer.content.toLowerCase()
            ? "correct"
            : "wrong"
        }`;
        number++;
      });
      message.channel.send(text);
    });
  },
};
