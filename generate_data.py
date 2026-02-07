import json

notes = {
    "Python": [
        "Python is an interpreted, high-level programming language.",
        "It supports object-oriented, procedural, and functional programming.",
        "Python is widely used in AI, ML, Web, and Data Science."
    ],
    "Web Technology": [
        "HTML is used for structure of web pages.",
        "CSS is used for styling.",
        "JavaScript adds interactivity to web pages."
    ]
}

mcqs = {
    "Python": [
        {
            "question": "Which type of language is Python?",
            "options": ["Compiled", "Interpreted", "Assembly", "Machine"],
            "answer": "Interpreted"
        },
        {
            "question": "Which keyword is used to define a function in Python?",
            "options": ["func", "define", "def", "function"],
            "answer": "def"
        }
    ],
    "Web Technology": [
        {
            "question": "Which tag is used for hyperlinks?",
            "options": ["<link>", "<a>", "<href>", "<url>"],
            "answer": "<a>"
        }
    ]
}

tips = [
    "Study for 45 minutes and take a 10-minute break.",
    "Revise notes before sleeping for better memory.",
    "Practice coding daily, even small programs help."
]

with open("../data/notes.json", "w") as f:
    json.dump(notes, f, indent=4)

with open("../data/mcqs.json", "w") as f:
    json.dump(mcqs, f, indent=4)

with open("../data/tips.json", "w") as f:
    json.dump(tips, f, indent=4)

print("Study data generated successfully!")