document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const doneBtn = document.getElementById("done");
    const gameContainer = document.getElementById("gameContainer");
    const textInput = document.getElementById("textInput");
    const showWordCount = document.getElementById("showWordCount");
    const monster = document.getElementById("monster");
    const hp = document.getElementById("hp");
    const finishGame = document.getElementById("finishGame");
    const resetBtn = document.getElementById("reset");
    let monsterIsDead = false;

    if (localStorage.getItem("goal") !== null && localStorage.getItem("goal") !== "") {
        monster.style.display = "flex";
        finishGame.style.display = "none";
        $('#goalModal').modal('hide');
    } else {
        $('#goalModal').modal('show');
    }

    doneBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.setItem("goal", form.goal.value);
        window.location.reload();
    }); 

    if (localStorage.getItem("goal") !== null) {
        gameContainer.style.display = "flex";
    } else {
        gameContainer.style.display = "none";
    }

    textInput.addEventListener("input", function(){
        let input = countWord( this.value );
        showWordCount.innerHTML = (
            "<br>Words: "+ input.words + " out of " + localStorage.getItem("goal")
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
            finishGame.style.display = "flex";
        }

        return {
            words : wom ? wom.length : 0
        };
    }

    resetBtn.addEventListener("click", function(e) {
        e.preventDefault();
        localStorage.removeItem("goal");
        window.location.reload();
    })
});