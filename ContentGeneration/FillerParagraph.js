const outputText = document.getElementById("output-text");
const loadingSpinner = document.getElementById("loading-spinner");

function copyOutput() {
  navigator.clipboard.writeText(outputText.innerText);
}

async function generateParagraph() {
  // Get the text from the textarea
  const textInput = document.getElementById("writing-input").value;

  loadingSpinner.style.display = "block";

  const data = {
    prompt: textInput,
    max_tokens: 100,
    temperature: 0.8,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  };

  fetch("https://api.cohere.ai/large/generate", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      Authorization: "BEARER Bz9P1eAbsWbGZn9F9Q55xEkpp28Kwjz6868HOMAX",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      loadingSpinner.style.display = "none";
      console.log("Success:", data);
      outputText.innerText = data.text;
    })
    .catch((error) => {
      loadingSpinner.style.display = "none";
      console.error("Error:", error);
    });
}
