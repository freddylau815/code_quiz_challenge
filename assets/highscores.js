var highscoresOutput = document.querySelector(".highscores-output")

function outputHighscores() {
    var scoreData = localStorage.getItem("highscores")
    var highscores = JSON.parse(scoreData)


    for (var i = 0; i < highscores.length; i++) {
        var div = document.createElement("div")
        var h3 = document.createElement("h3")
        var p = document.createElement("p")
        var scoreObj = highscores[i]
        console.log(scoreObj)

        h3.innerText = scoreObj.initials;
        p.innerText = scoreObj.score;

        div.append(h3, p);
        highscoresOutput.append(div)
    }
}

outputHighscores()