import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import EmotionBot from "./emotion-bot.js";
import pgPromise from "pg-promise";

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

const pgp = pgPromise({});
const db = pgp(`postgres://postgres:${process.env.PG_PASSWORD}@localhost:5432/${process.env.DB_NAME}`);

db.connect()
    .then((obj) => {
        console.log(`Congratulations: database connected successfully!`);
        obj.done();
    })
    .then(async () => {
        const emoji = await db.any(`select * from "emoji"`);
        const emotionBot = new EmotionBot(emoji);

        bot.on("message", async (message) => {
            const {id: chatId} = message.chat;
            await bot.sendMessage(chatId, emotionBot.answer(message));
        });
    })
    .catch(err => {
        console.log(`App crashed: database connection problem: `, err.message);
    });
