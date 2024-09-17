// getRandomEmoji.js
const emojiList = [
    "😀", "😂", "😍", "🤔", "😎", "🥳", "😇", "🤖", "👾", "🚀", "🌟", "🔥", "💧", "🍕", "🍔", "🧁", "🎉", "🎈", "🎯", "💡", "📱", "💻", "🎮"
];

const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojiList.length);
    return emojiList[randomIndex];
};

export default getRandomEmoji