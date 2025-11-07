document.getElementById("search-button").addEventListener("click", async () => {
    const wordInput = document.getElementById("word-input").value.trim();
    const resultContainer = document.getElementById("result-container");

    resultContainer.innerHTML = "";

    if (!wordInput) {
        resultContainer.innerHTML = "Please enter a word.";
        return;
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`);
        if (!response.ok) {
            throw new Error("Word not found.");
        }

        const data = await response.json();
        const entry = data[0];

        let output = `<b>Word:</b> ${entry.word}<br><br>`;

        if (entry.phonetic) {
            output += `<b>Phonetic:</b> ${entry.phonetic}<br><br>`;
        }

        entry.meanings.forEach((meaning) => {
            output += `<b>Part of Speech:</b> ${meaning.partOfSpeech}<br>`;
            meaning.definitions.forEach((def, index) => {
                output += `<b>${index + 1}.</b> ${def.definition}<br>`;
            });
            output += "<br>";
        });

        resultContainer.innerHTML = output;
    } catch (error) {
        resultContainer.innerHTML = `<b>Error:</b> ${error.message}`;
    }
});