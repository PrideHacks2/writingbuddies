document.addEventListener("DOMContentLoaded", function () {
    const questions = document.getElementById("questions");
    const form = document.getElementById("searchbar");
    const submit = document.getElementById("searchbutton");

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

    form.addEventListener("submit", function (e) {
        console.log("submit");
        e.preventDefault();
        let query = document.getElementById("searchinput").value.toLowerCase();
        let questions = document.getElementById("questions");
        questions.innerHTML= ``; //set the div to nothing first
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
                    element.question.toLowerCase().includes(query)
                        ? questions.appendChild(question)
                        : null;
                });
            });
    });
});
