// getRandomEmoji.js
const emojiList = [
    "😀", "😂", "😍", "🤔", "😎", "🥳", "😇", "🤖", "👾", "🚀", "🌟", "🔥", "💧", "🍕", "🍔", "🧁", "🎉", "🎈", "🎯", "💡", "📱", "💻", "🎮"
];

export const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojiList.length);
    return emojiList[randomIndex];
};



const citas = [
    {
        cita: "Nunca hubo una muerte más anunciada.",
        libro: "Crónicas de una muerte anunciada",
        autor: "Gabriel García Márquez",
    },
    {
        cita: "Todos los sueños con pájaros son de buena salud.",
        libro: "Crónicas de una muerte anunciada",
        autor: "Gabriel García Márquez",
    },
    {
        cita: "Imagínate: tener tanta riqueza al alcance de la mano y tener que decir que no por una simple flaqueza del espíritu.",
        libro: "Crónicas de una muerte anunciada",
        autor: "Gabriel García Márquez",
    },
    {
        cita: "El amor se aprende.",
        libro: "Crónicas de una muerte anunciada",
        autor: "Gabriel García Márquez",
    },
    {
        cita: "Lo matamos a conciencia, pero somos inocentes.",
        libro: "Crónicas de una muerte anunciada",
        autor: "Gabriel García Márquez",
    },
    {
        cita: "La gente que quería a Santiago Nasar presentía su muerte desde la madrugada.",
        libro: "Crónicas de una muerte anunciada",
        autor: "Gabriel García Márquez",
    },
    {
        cita: "No entendía cómo podía seguir viviendo después de haber sabido que lo mataban.",
        libro: "Crónicas de una muerte anunciada",
        autor: "Gabriel García Márquez",
    },
    {
        cita: "Nunca hubo una muerte más justificada.",
        libro: "Crónicas de una muerte anunciada",
        autor: "Gabriel García Márquez",
    },
    {
        cita: "La fatalidad nos hace invisibles.",
        libro: "Crónicas de una muerte anunciada",
        autor: "Gabriel García Márquez",
    },
    {
        cita: "Fue un acto de dignidad que nadie esperó.",
        libro: "Crónicas de una muerte anunciada",
        autor: "Gabriel García Márquez",
    },
];
export const getCitasRandom = () => {

    // Selecciona una cita aleatoria de la lista
    const citaAleatoria = citas[Math.floor(Math.random() * citas.length)];
    return `"${citaAleatoria.cita}" - ${citaAleatoria.libro}, ${citaAleatoria.autor}`

}
