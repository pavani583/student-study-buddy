pdfjsLib.GlobalWorkerOptions.workerSrc = "libs/pdf.worker.min.js";

let extractedText = "";

function addBotMessage(msg) {
  document.getElementById("chat").innerHTML +=
    `<div class="bot">${msg}</div>`;
}

function addUserMessage(msg) {
  document.getElementById("chat").innerHTML +=
    `<div class="user">${msg}</div>`;
}

function processFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    addBotMessage("⚠️ Please upload a file first.");
    return;
  }

  addUserMessage("📂 Uploaded: " + file.name);

  if (file.type === "application/pdf") {
    readPDF(file);
  } else if (file.type === "text/plain") {
    readText(file);
  } else {
    addBotMessage("❌ Only PDF or TXT files are supported.");
  }
}

function readText(file) {
  const reader = new FileReader();
  reader.onload = function () {
    extractedText = reader.result;
    afterExtraction();
  };
  reader.readAsText(file);
}

function readPDF(file) {
  const reader = new FileReader();
  reader.onload = async function () {
    const typedarray = new Uint8Array(reader.result);
    const pdf = await pdfjsLib.getDocument(typedarray).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      content.items.forEach(item => {
        text += item.str + " ";
      });
    }

    extractedText = text;
    afterExtraction();
  };
  reader.readAsArrayBuffer(file);
}

function afterExtraction() {
  addBotMessage("✅ File processed successfully!");
  generateNotes();
  generateMCQs();
  generateTip();
}

function generateNotes() {
  const sentences = extractedText.split(".");
  let notes = "<b>📘 Notes:</b><ul>";
  let count = 0;

  sentences.forEach(s => {
    if (s.trim().length > 40 && count < 5) {
      notes += `<li>${s.trim()}</li>`;
      count++;
    }
  });

  notes += "</ul>";
  addBotMessage(notes);
}

function generateMCQs() {
  const words = extractedText.split(" ");
  const keyword = words.find(w => w.length > 6);

  if (!keyword) {
    addBotMessage("📝 MCQ: Not enough content to generate questions.");
    return;
  }

  let mcq = `
    <b>📝 MCQ:</b><br>
    ${keyword} is related to?<br>
    a) Concept A<br>
    b) Concept B<br>
    c) ${keyword} ✅<br>
    d) None
  `;

  addBotMessage(mcq);
}

async function generateTip() {
  try {
    const res = await fetch("data/tips.json");
    const tips = await res.json();
    const tip = tips[Math.floor(Math.random() * tips.length)];
    addBotMessage("💡 Study Tip: " + tip);
  } catch {
    addBotMessage("💡 Study Tip: Revise what you learned today.");
  }
}
