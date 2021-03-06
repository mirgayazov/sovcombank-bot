import pgPromise from "pg-promise";
import * as dotenv from "dotenv";

dotenv.config({path: "../.env"});

const pgp = pgPromise({});
const db = pgp(`postgres://postgres:${process.env.PG_PASSWORD}@localhost:5432/${process.env.DB_NAME}`);

const joy = ["joy", ["1f600", "1f603", "1f604", "1f601", "1f606", "1f602", "1f60a", "1f929", "1f973"]];
const sadness = ["sadness", ["1f644", "1f61e", "1f614", "1f61f", "1f615", "1f641", "2639", "1f629", "1f62b", "1f613"]];
const irritation = ["irritation", ["1f47f", "1f62c", "1f624", "1f621", "1f47a", "1f480", "1f620", "1f92f", "1f914"]];
const emojiGroups = [joy, sadness, irritation];

const joyAnswers = [
    "joy", [
        ["default", [
            "Вижу сегодня у тебя хорошее настроение :)",
            "Честно скажу, Вы заряжаете меня хорошим настроемнием!",
            "От Вашей улыбки на душе становится теплее!",
        ]],
        ["sadness", [
            "Почему загрустил? Ты ведь только что веселился, я всё помню...",
            "Как? Уже загрустили? Только ведь все было хорошо...",
        ]],
        ["irritation", [
            "Ну и кто испортил тебе такое чудное настроение?",
            "От веселья до раздражения - один шаг.",
        ]],
    ]
];

const sadnessAnswers = [
    "sadness", [
        ["default", [
            "Тебя кто-то обидел? Почему грустишь?",
            "Отставить грусть!",
            "В грустные моменты помогают сладости! Закажем?",
        ]],
        ["joy", [
            "Рад что ты больше не грустишь :)",
            "Долой грусть! Она тебе не к лицу :)",
            "Больше улыбок! Грусть нам ни к чему.",
        ]],
        ["irritation", [
            "С каждым сообщением все хуже, ну и кто довел тебя?",
            "От грусти до раздражения - один шаг."
        ]],
    ]
];

const irritationAnswers = [
    "irritation", [
        ["default", [
            "Сегодня Вы встали точно не с той ноги...",
            "Попробуйте медитировать, говорят помогает.",
        ]],
        ["joy", [
            "Перепады настроения? Думаю здесь Вам помогут - 03.",
            "Злиться - в пустую тратить свои нервы. Рад что Вы оптимист по жизни :)",
        ]],
        ["sadness", [
            "То что Вы перестали злиться меня радует, но и грустить я Вам не советую.",
            "Вижу уже успокаиваетесь, это радует!"
        ]],
    ]
];

const answersGroups = [joyAnswers, sadnessAnswers, irritationAnswers];

const initialize = async () => {
    for (let i = 0; i < emojiGroups.length; i++) {
        const emojiGroup = emojiGroups[i];
        const [emotion, codes] = emojiGroup;

        for (let j = 0; j < codes.length; j++) {
            const code = codes[j];
            try {
                await db.one(`insert into "emoji" (code, emotion) values ($1, $2) returning id`, [code, emotion])
                    .then(res => {
                        console.log(res.id)
                    })
            } catch (e) {
                console.log(e)
            }
        }
    }

    for (let i = 0; i < answersGroups.length; i++) {
        const answersGroup = answersGroups[i];
        const [emotionPrefix, options] = answersGroup;

        for (let j = 0; j < options.length; j++) {
            const option = options[j];
            const [emotionPostfix, answers] = option;
            const emotion = `${emotionPrefix}_${emotionPostfix}`;

            for (let k = 0; k < answers.length; k++) {
                const answer = answers[k];

                try {
                    await db.one(`insert into "answers" (text, emotion) values ($1, $2) returning id`, [answer, emotion])
                        .then(res => {
                            console.log(res.id)
                        })
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
};

db.connect()
    .then(async () => {
        await initialize()
        console.log("database filled")
    })
    .catch(err => {
        console.log(err);
    });
