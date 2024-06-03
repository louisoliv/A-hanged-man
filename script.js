let list = ["eau", "nourriture", "pingouin", "manchot", "musique", "ours", "koala", "Tapis"]

function randomWord() {
    let word = list[(Math.floor(Math.random() * list.length))];
    return word.toLowerCase()
}


console.log(randomWord())