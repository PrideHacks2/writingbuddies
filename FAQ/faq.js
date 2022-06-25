document.addEventListener("DOMContentLoaded", function () {
    const questions = document.getElementById("questions");
    const form = document.getElementById("searchbar");
    const loadingSpinner = document.getElementById("loading-spinner");
    const clearButton = document.getElementById("clearbutton");

    // fetch all questions on first load
    fetch("faq.json")
    .then((response) => response.json())
    .then((json) =>
        json.forEach((element) => {
            let question = document.createElement("div");
            question.innerHTML = `
        <div class="card" id="question">
        <h5 class="card-title">${element.question}</h5>
        <p class="card-text">${element.answer}</p>
        </div>
        `;
            questions.appendChild(question);
        })
    ); 

    clearButton.addEventListener("click", function () {
        form.reset();
        location.reload();
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        loadingSpinner.style.display = "flex";

        let query = document.getElementById("searchinput").value.toLowerCase();
        let questions = document.getElementById("questions");
        questions.innerHTML= ``; //set the div to nothing first
        const data = {
            taskDescription: '',
            outputIndicator: '',
            inputs: [query],
            examples: [{"text": "What is NLP?", "label": "Natural Language Processing"}, {"text": "What is ML?", "label": "Natural Language Processing"}, {"text": "What is AI?", "label": "Natural Language Processing"}, {"text": "What is text summarization?", "label": "Natural Language Processing"}, {"text": "Do I need to use my own samples to use the filler paragraph generation tool?", "label": "Natural Language Processing"}, {"text": "Can I use the text summarization without any samples?", "label": "Natural Language Processing"}, {"text": "What are the speed typing games?", "label": "Typing Game"}, {"text": "How does the solo typing game work?", "label": "Typing Game"}, {"text": "What is the goal of the solo typing game?", "label": "Typing Game"}, {"text": "How do I play the typing games?", "label": "Typing Game"}, {"text": "Can I play the typing games with my friends?", "label": "Typing Game"}, {"text": "How do I write a good story?", "label": "Writing Tips"}, {"text": "How do I improve my vocabulary?", "label": "Writing Tips"}, {"text": "How do I come up with more ideas for my story?", "label": "Writing Tips"}, {"text": "How do I improve my writing skills?", "label": "Writing Tips"}, {"text": "How long should a good story be?", "label": "Writing Tips"}]
        };
    
          fetch("https://api.cohere.ai/medium/classify", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
              Authorization: "BEARER Bz9P1eAbsWbGZn9F9Q55xEkpp28Kwjz6868HOMAX",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
                let category = data.classifications[0].prediction;

                fetch("faq.json")
                .then((response) => response.json())
                .then((json) => {
                    json.forEach((element) => {
                        let question = document.createElement("div");
                        question.innerHTML = `
                    <div class="card" id="question">
                    <h5 class="card-title">${element.question}</h5>
                    <p class="card-text">${element.answer}</p>
                    </div>
                    `;
                        element.category.includes(category)
                            ? questions.appendChild(question)
                            : null;
                    });
                });
                console.log("Success:", data);
                loadingSpinner.style.display = "none";
            })
            .catch((error) => {
                loadingSpinner.style.display = "none";
                console.error("Error:", error);
            }); 
    }); 
});
