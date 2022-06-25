document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const form = document.getElementById("form");
    const gameContainer = document.getElementById("gameContainer");
    const textInput = document.getElementById("textInput");
    const showWordCount = document.getElementById("showWordCount");
    const monster = document.getElementById("monster");
    const hp = document.getElementById("hp");
    let monsterIsDead = false;

    localStorage.setItem("goal", 123);

    if (localStorage.getItem("goal") !== null) {
        modal.style.display = "none";
        monster.style.display = "flex";
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log(form.goal.value);
        localStorage.setItem("goal", form.goal.value);
    }); 

    if (localStorage.getItem("goal") !== null) {
        gameContainer.style.display = "flex";
    } else {
        gameContainer.style.display = "none";
    }

    textInput.addEventListener("input", function(){
        let input = countWord( this.value );
        showWordCount.innerHTML = (
            "<br>Words: "+ input.words
        ); 

        hp.style.width = 100 - Math.floor(input.words*100/localStorage.getItem("goal")) + "%";
        hp.innerHTML = 100 - Math.floor(input.words/localStorage.getItem("goal")*100) + "%";
        if(hp.innerHTML <= 0) hp.innerHTML = 0 + "%";
      }, false);

    function countWord( val ){
        var wom = val.match(/\S+/g);
        if (wom.length >= localStorage.getItem("goal")) monsterIsDead = true;

        if (monsterIsDead === true) {
            monster.style.display = "none";
        }

        return {
            words : wom ? wom.length : 0
        };
    }
});