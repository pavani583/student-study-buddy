let extractedText = "";

function addBotMessage(msg) {
  document.getElementById("chat").innerHTML +=
    `<div class="bot">${msg}</div>`;
}

function addUserMessage(msg) {
  document.getElementById("chat").innerHTML +=
    `<div class="user">${msg}</div>`;
}

async function processFile() {
  const file = document.getElementById("fileInput").files[0];

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
    addBotMessage("❌ Unsupported file type.");
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

async function readPDF(file) {
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
  addBotMessage("✅ File read successfully!");
  generateNotes();
  generateMCQs();
  generateTip();
}
