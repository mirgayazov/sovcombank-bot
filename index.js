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
            let lastMessage = await db.oneOrNone(`select * from "messages" where "chat_id"=$1 and "id"=(select max("id") from "messages" where "chat_id"=$1)`, [chatId]);

            let diff = false;
            if (lastMessage) {
                let lastTime = new Date(Date.parse(lastMessage.time));
                let now = new Date();
                diff = (Math.abs(now.getTime() - lastTime.getTime()) / 1000) > 60;
            }

            let isNewSession = !lastMessage || !lastMessage.emotion || diff;

            if (isNewSession) {
                const postfix = '_default';
                let answer = 'Привет. ';
                let emotion = emotionBot.answer(message);

                if (emotion) {
                    let phrases = await db.any(`select "text" from "answers" where "emotion"=$1`, [emotion + postfix]);
                    let phrase = phrases[Math.floor(Math.random() * phrases.length)];
                    answer += phrase.text;
                } else {
                    answer = "Я тебя не понимаю";
                }

                await db.one(
                    `insert into "messages" ("text","chat_id","emotion","time") values ($1,$2,$3,$4) returning id`,
                    [message.text, chatId, emotion, 'now()']
                )
                await bot.sendMessage(chatId, answer);
            } else {
                const prefix = lastMessage.emotion;
                let answer = '';
                let emotion = emotionBot.answer(message);

                if (emotion) {
                    let em;

                    if (prefix === emotion) {
                        em = `${emotion}_default`;
                    } else {
                        em = `${prefix}_${emotion}`
                    }

                    let phrases = await db.any(`select "text" from "answers" where "emotion"=$1`, [em]);
                    let phrase = phrases[Math.floor(Math.random() * phrases.length)];
                    answer += phrase.text;

                } else {
                    answer = "Я тебя не понимаю";
                }

                await db.one(
                    `insert into "messages" ("text","chat_id","emotion","time") values ($1,$2,$3,$4) returning id`,
                    [message.text, chatId, emotion, 'now()']
                )
                await bot.sendMessage(chatId, answer);
            }
        });
    })
    .catch(err => {
        console.log(`App crashed: database connection problem: `, err.message);
    });
