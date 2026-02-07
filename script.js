async function loadNotes() {
    const subject = document.getElementById("subject").value;
    const output = document.getElementById("output");

    const res = await fetch("data/notes.json");
    const data = await res.json();

    if (!data[subject]) {
        output.innerHTML = "<p style='color:red'>No notes found for this subject</p>";
        return;
    }

    let html = "<h3>📖 Notes</h3><ul>";
    data[subject].forEach(note => {
        html += `<li>${note}</li>`;
    });
    html += "</ul>";

    output.innerHTML = html;
}

async function loadMCQs() {
    const subject = document.getElementById("subject").value;
    const output = document.getElementById("output");

    const res = await fetch("data/mcqs.json");
    const data = await res.json();

    if (!data[subject]) {
        output.innerHTML = "<p style='color:red'>No MCQs found</p>";
        return;
    }

    let html = "<h3>📝 MCQs</h3>";
    data[subject].forEach(q => {
        html += `<p><b>${q.question}</b></p>`;
        q.options.forEach(opt => {
            html += `<p>• ${opt}</p>`;
        });
        html += `<p><i>Answer: ${q.answer}</i></p><hr>`;
    });

    output.innerHTML = html;
}

async function loadTip() {
    const output = document.getElementById("output");

    const res = await fetch("data/tips.json");
    const tips = await res.json();

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    output.innerHTML = `<h3>🌟 Daily Study Tip</h3><p>${randomTip}</p>`;
}

function clearOutput() {
    document.getElementById("output").innerHTML = "";
}

/* ⭐ FIXED VERSION */
async function showAll() {
    const subject = document.getElementById("subject").value;
    const output = document.getElementById("output");

    output.innerHTML = ""; // clear once

    // NOTES
    const notesRes = await fetch("data/notes.json");
    const notesData = await notesRes.json();

    if (notesData[subject]) {
        output.innerHTML += "<h3>📖 Notes</h3><ul>";
        notesData[subject].forEach(note => {
            output.innerHTML += `<li>${note}</li>`;
        });
        output.innerHTML += "</ul>";
    }

    // MCQs
    const mcqRes = await fetch("data/mcqs.json");
    const mcqData = await mcqRes.json();

    if (mcqData[subject]) {
        output.innerHTML += "<h3>📝 MCQs</h3>";
        mcqData[subject].forEach(q => {
            output.innerHTML += `<p><b>${q.question}</b></p>`;
            q.options.forEach(opt => {
                output.innerHTML += `<p>• ${opt}</p>`;
            });
            output.innerHTML += `<p><i>Answer: ${q.answer}</i></p><hr>`;
        });
    }

    // TIP
    const tipRes = await fetch("data/tips.json");
    const tips = await tipRes.json();

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    output.innerHTML += `<h3>🌟 Daily Study Tip</h3><p>${randomTip}</p>`;
}