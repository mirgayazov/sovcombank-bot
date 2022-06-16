import {getEmojiUnicode} from "./helpers.js";

class EmotionBot {
    constructor(emoji) {
        this.knowledge = new Map();
        this.errorMessage = "Я тебя не понимаю";

        for (let i = 0; i < emoji.length; i++) {
            const currentEmoji = emoji[i];
            const {code, emotion} = currentEmoji;

            this.knowledge.set(code, emotion);
        }
    }

    answer(message) {
        if (message.text.split('').length !== 2) {
            // занулить беседу
            return this.errorMessage
        }

        let emotion = this.classify(message.text);

        if (!emotion) {
            // занулить беседу
            return this.errorMessage
        }

        return emotion
    }

    classify(emoji) {
        return this.knowledge.get(getEmojiUnicode(emoji))
    }
}

export default EmotionBot;
