document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const doneBtn = document.getElementById("done");
    const joinBtn = document.getElementById("join");
    const createBtn = document.getElementById("create");
    const gameContainer = document.getElementById("gameContainer");
    const textInput = document.getElementById("textInput");
    const showWordCount = document.getElementById("showWordCount");
    const monster = document.getElementById("monster");
    const hp = document.getElementById("hp");
    const finishGame = document.getElementById("finishGame");

    let hasJoinedRoom = false;
    let prevPercentage = 0;
    let currentPercentage = 0;
    let friendPercentage = 0;
    let indivGoalIsReached = false;
    let monsterIsDead = false;

    if (localStorage.getItem("goal") !== null && localStorage.getItem("goal") !== "" && !hasJoinedRoom) {
        $('#roomModal').modal('show');
    } else {
        $('#goalModal').modal('show');
        $('#roomModal').modal('hide');
    }

    doneBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.setItem("goal", form.goal.value);
        location.reload();
    }); 

    createBtn.addEventListener("click", function() {
        //if successfully created room 
        hasJoinedRoom = true;
        startgame();
    }); // TOOD: AMELIA TYPE HERE

    joinBtn.addEventListener("click", function() {
        //if successfully created room 
        hasJoinedRoom = true;
        startgame();
    }); // TOOD: AMELIA TYPE HERE

    if (localStorage.getItem("goal") !== null) {
        gameContainer.style.display = "flex";
    } else {
        gameContainer.style.display = "none";
    }

    function startgame() {
        monster.style.display = "flex";
        finishGame.style.display = "none";
        $('#goalModal').modal('hide');
        $('#roomModal').modal('hide');
    }

    textInput.addEventListener("input", function(){
        let input = countWord( this.value );
        showWordCount.innerHTML = (
            "<br>Words: "+ input.words + " out of " + localStorage.getItem("goal")
        ); 

        if(currentPercentage - prevPercentage >= 10) prevPercentage = currentPercentage;
        currentPercentage = Math.floor(input.words*50/localStorage.getItem("goal"));

        if(currentPercentage === 50) { indivGoalIsReached = true; }
        if (!indivGoalIsReached) {
            hp.style.width = 100 - currentPercentage - friendPercentage + "%";
            hp.innerHTML = 100 - currentPercentage - friendPercentage + "%";            
        }

        if (currentPercentage - prevPercentage >= 10) friendPercentage = fetchGameState(currentPercentage); // ADD HERE 

        if(hp.innerHTML <= 0) {
            hp.innerHTML = 0 + "%";
            fetchGameState(currentPercentage);
        }
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

    //  i call this. this is to get the friend's percentage when i lose 10% of my hp
    function fetchGameState(currentPercentage) {
        // TODO Amelia 
    }

    // amelia calls this. this is what will update the friend's hp
    function listener(updatedFriendPercentage) {
        friendPercentage = updatedFriendPercentage;
        hp.style.width = 100 - currentPercentage - friendPercentage + "%";
        hp.innerHTML = 100 - currentPercentage -friendPercentage + "%";  
    }
});