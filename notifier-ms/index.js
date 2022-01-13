require("./env");
const Kafka = require("./kafka");
const bot = require("./bot");

const kafka = new Kafka(bot);

kafka.run().catch((e) => bot.telegram.sendMessage(process.env.TELEGRAM_ID, e.message));
bot.launch();
