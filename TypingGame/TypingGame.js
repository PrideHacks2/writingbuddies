document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const form = document.getElementById("form");
    const gameContainer = document.getElementById("gameContainer");
    const textInput = document.getElementById("textInput");
    const showWordCount = document.getElementById("showWordCount");

    //localStorage.clear();
    if (localStorage.getItem("goal") !== null) {
        modal.style.display = "none";
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
        var v = count_word( this.value );
        showWordCount.innerHTML = (
            "<br>Words: "+ v.words
        );
      }, false);

    function count_word( val ){
        var wom = val.match(/\S+/g);
        return {
            words : wom ? wom.length : 0
        };
    }
});