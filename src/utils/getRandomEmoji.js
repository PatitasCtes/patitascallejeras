// getRandomEmoji.js
const emojiList = ["🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐈", "😺", "😸", "😹", "😻", "😼", "🐈‍⬛", "🐱", "😾", "😿", "🙀", "😽", "🦁", "🐺", "🦝", "🐹", "🐭", "🐗", "🐻", "🐻‍❄️", "🐅", "🐈", "🐆", "🐇", "🐿️", "🦦"];

export const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojiList.length);
    return emojiList[randomIndex];
};



const citas = [
    {
        cita: "Tu perro solo conocerá el mundo que tú le muestres.",
        libro: "Patitas Callejeras",
        autor: "Corrientes",
    },
    {
        cita: "Algunos ángeles no tienen alas. Tienen 4 patas, un cuerpo peludo, nariz de pelotita, orejas de atención y un amor incondicional.",
        libro: "Patitas Callejeras",
        autor: "Corrientes",
    }
];
export const getCitasRandom = () => {

    // Selecciona una cita aleatoria de la lista
    const citaAleatoria = citas[Math.floor(Math.random() * citas.length)];
    return `"${citaAleatoria.cita}" - ${citaAleatoria.libro}, ${citaAleatoria.autor}`

}
