var socket = io();
console.log(socket.id)


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const formRoom = document.getElementById("formRoom");
  const doneBtn = document.getElementById("done");
  const joinBtn = document.getElementById("join");
  const createBtn = document.getElementById("create");
  const gameContainer = document.getElementById("gameContainer");
  const textInput = document.getElementById("textInput");
  const showWordCount = document.getElementById("showWordCount");
  const monster = document.getElementById("monster");
  const hp = document.getElementById("hp");
  const finishGame = document.getElementById("finishGame");
  var roomName = "";
  let prevPercentage = 0;
  let currentPercentage = 0;
  let friendPercentage = 0;
  let indivGoalIsReached = false;
  let monsterIsDead = false;

  localStorage.clear();  
  $("#goalModal").modal("show");

  function validateForm() {
    let x = document.forms["form"]["goal"].value;
    if (x == "") {
        alert("Goal must be filled out");
        $('#goalModal').modal('show');  
    } else {
        localStorage.setItem("goal", form.goal.value);
        $('#goalModal').modal('hide');  
        $('#roomModal').modal('show'); 
    }        
  }

  doneBtn.addEventListener("click", function (e) {
      e.preventDefault();
      validateForm();
  }); 

  createBtn.addEventListener("click", function () {
    socket.emit("create room", formRoom.roomName.value);
    roomName = formRoom.roomName.value;

    console.log("Attempted to create room", roomName);
  });

  joinBtn.addEventListener("click", function () {
    socket.emit("join room", formRoom.roomName.value);
    roomName = formRoom.roomName.value;

    console.log("Attempted to join room", roomName);

  }); 

  if (localStorage.getItem("goal") !== null) {
    gameContainer.style.display = "flex";
  } else {
    gameContainer.style.display = "none";
  }

  function startgame() {
    gameContainer.style.display = "flex";
    monster.style.display = "flex";
    finishGame.style.display = "none";
    $("#goalModal").modal("hide");
    $("#roomModal").modal("hide");
  }

  textInput.addEventListener(
    "input",
    function () {
      let input = countWord(this.value);
      showWordCount.innerHTML =
        "<br>Words: " + input.words + " out of " + localStorage.getItem("goal");

        

      if (currentPercentage - prevPercentage >= 10)
        prevPercentage = currentPercentage;
        currentPercentage = Math.floor(
        (input.words * 50) / localStorage.getItem("goal")
      );

      console.log("percentages", currentPercentage, friendPercentage);


      if (currentPercentage === 50) {
        indivGoalIsReached = true;
      }
      if (!indivGoalIsReached) {
        hp.style.width = 100 - currentPercentage - friendPercentage + "%";
        hp.innerHTML = 100 - currentPercentage - friendPercentage + "%";
      }

      if (currentPercentage - prevPercentage >= 10) {
        fetchGameState(currentPercentage); 
      }

      if (hp.innerHTML <= 0) {
        hp.innerHTML = 0 + "%";
        fetchGameState(currentPercentage);
      }
    },
    false
  );

  function countWord(val) {
    var wom = val.split(" ");

    if (monsterIsDead === true) {
      monster.style.display = "none";
      finishGame.style.display = "flex";
    }

    return {
      words: wom ? wom.length : 0,
    };
  }

  //  i call this. this is to get the friend's percentage when i lose 10% of my hp
  function fetchGameState(currentPercentage) {
    socket.emit("health update sent", roomName, currentPercentage);

    if (currentPercentage >= 50) {
        currentPercentage = 50
    }

    if (friendPercentage >= 50) {
        friendPercentage = 50
    }

    if (currentPercentage >= 50 && friendPercentage >= 50) {
        monsterIsDead = true;
        monster.style.display = "none";
        finishGame.style.display = "flex";
    }
  }

  // amelia calls this. this is what will update the friend's hp
  function listener(updatedFriendPercentage) {
    friendPercentage = updatedFriendPercentage;

    if (currentPercentage >= 50) {
        currentPercentage = 50
    }

    if (friendPercentage >= 50) {
        friendPercentage = 50
    }

    hp.style.width = 100 - currentPercentage - friendPercentage + "%";
    hp.innerHTML = 100 - currentPercentage - friendPercentage + "%";

    if (currentPercentage >= 50 && friendPercentage >= 50) {
      monsterIsDead = true;
      monster.style.display = "none";
      finishGame.style.display = "flex";
  }
  }

  ///////////////////////////////////////////////////////////////////////////////////

  // SOCKET.io event listeners

  // unable to create room as it already exists
  socket.on("room exists", () => {
    console.log("Room already exists! Please enter a different room name.");
  });

  socket.on("room created", () => {
    console.log("Room created and joined successfully!");
    startgame();
  });

  socket.on("room joined", () => {
    console.log("Room joined successfully!");
    startgame();
  });

  socket.on("room not found", () => {
    console.log("Room not found!");
    window.alert("Room not found!");
    $("#roomModal").modal("hide");
  });

  socket.on("broadcast health update", (updatedFriendPercentage) => {
    console.log("Friend's percentage: " + updatedFriendPercentage);
    listener(updatedFriendPercentage);
  });
});
