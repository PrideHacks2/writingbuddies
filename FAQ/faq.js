document.addEventListener("DOMContentLoaded", function () {
    const questions = document.getElementById("questions");

    fetch('faq.json')
    .then((response) => response.json())
    .then((json) => 
        json.forEach(element => {
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

});