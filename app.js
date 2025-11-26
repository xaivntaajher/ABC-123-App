let currentAnswer = "";

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
}

function startABC() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  currentAnswer = letters[Math.floor(Math.random() * letters.length)];

  document.getElementById("game-area").innerHTML = `
    <h2>What letter is this?</h2>
    <div style="font-size: 60px;">?</div>
    <button onclick="speakLetter()">🔊 Say the Letter</button><br><br>
    <input id="guessInput" maxlength="1" />
    <button onclick="checkGuess()">Submit</button>
    <p class="feedback" id="feedback"></p>
  `;

  speakLetter();
}

function startNumbers() {
  const number = Math.floor(Math.random() * 10);
  currentAnswer = number.toString();

  document.getElementById("game-area").innerHTML = `
    <h2>What number is this?</h2>
    <div style="font-size: 60px;">?</div>
    <button onclick="speakLetter()">🔊 Say the Number</button><br><br>
    <input id="guessInput" type="number" />
    <button onclick="checkGuess()">Submit</button>
    <p class="feedback" id="feedback"></p>
  `;

  speakLetter();
}

function speakLetter() {
  speak(currentAnswer);
}

function checkGuess() {
  const input = document
    .getElementById("guessInput")
    .value.trim()
    .toUpperCase();
  const feedback = document.getElementById("feedback");

  if (input === currentAnswer.toUpperCase()) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    speak("Correct!");

    // Automatically restart the same game mode after 2 seconds
    setTimeout(() => {
      const h2Text = document.querySelector("#game-area h2")?.textContent || "";
      if (h2Text.includes("letter")) {
        startABC();
      } else if (h2Text.includes("number")) {
        startNumbers();
      }
    }, 2000);
  } else {
    feedback.textContent = "❌ Try again!";
    feedback.style.color = "red";
    speak("Try again!");
  }
}
