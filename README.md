# 🏥 FHIR Learn — HL7 FHIR for Healthcare Analysts

A free, interactive learning website that teaches **HL7 FHIR** to healthcare business analysts — no coding experience required.

🔗 **Live site:** [seannguyendfw.github.io/Front-End-FHIR](https://seannguyendfw.github.io/Front-End-FHIR/)

---

## 📖 What is this?

FHIR (Fast Healthcare Interoperability Resources) is the modern standard for sharing patient data between hospitals, clinics, apps, and systems. This website explains FHIR in plain English, with:

- Real-world analogies (no jargon)
- Live JSON examples fetched from an actual FHIR server
- Interactive clickable fields with instant explanations
- Hands-on API query builder
- Knowledge quizzes after each module

Built for **healthcare BAs, PMs, and analysts** who work on EHR integrations but don't have a developer background.

---

## 🗂️ Learning Modules

| # | Module | What you'll learn |
|---|--------|------------------|
| 01 | 🔌 What is an API? | How APIs work — the waiter analogy, GET/POST/PUT/DELETE |
| 02 | 📘 FHIR Basics | What HL7 FHIR is, why it was created, R4 vs. older versions |
| 03 | 📦 FHIR Resources | Patient, Observation, Condition, MedicationRequest, Encounter |
| 04 | 🗂️ Reading JSON | JSON syntax rules, key-value pairs, arrays, objects |
| 05 | 💡 Real Examples | Live annotated JSON from a real FHIR server — click any field to see what it means |
| 06 | 🧪 API Practice | Build real FHIR queries, send them live, solve challenges |

---

## ✨ Key Features

- **🖱️ Interactive JSON viewer** — Click any underlined field name to get a plain-English explanation
- **🌐 Live FHIR data** — All examples fetch real records from the public [HAPI FHIR R4](https://hapi.fhir.org) server
- **🎯 Query builder** — Assemble FHIR URLs visually with live URL preview and color-coded annotations
- **▶️ Live API calls** — Send real GET requests and see the raw JSON response + HTTP status + timing
- **🏋️ Challenge exercises** — Build specific queries and validate them with "Check My URL"
- **🧠 Quizzes** — Knowledge checks on each module with instant feedback
- **📱 Responsive** — Works on desktop and mobile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Page structure |
| Vanilla CSS | Styling (dark theme, glassmorphism) |
| Vanilla JavaScript | Interactivity, live fetching |
| [HAPI FHIR R4](https://hapi.fhir.org/baseR4) | Free public FHIR server for live data |
| Google Fonts (Inter + JetBrains Mono) | Typography |

No frameworks, no build tools, no dependencies. Open any `.html` file directly in a browser.

---

## 🚀 Running Locally

```bash
git clone https://github.com/seannguyendfw/Front-End-FHIR.git
cd Front-End-FHIR
```

Then just open `index.html` in your browser — or use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.

---

## 📁 Project Structure

```
Du an FHIR/
├── index.html              # Home page
├── pages/
│   ├── what-is-api.html    # Module 1 — What is an API?
│   ├── fhir-basics.html    # Module 2 — FHIR Basics
│   ├── resources.html      # Module 3 — FHIR Resources
│   ├── json-intro.html     # Module 4 — Reading JSON
│   ├── examples.html       # Module 5 — Real FHIR Examples
│   └── api-practice.html   # Module 6 — API Practice
├── styles/
│   ├── main.css            # Shared styles for all pages
│   └── home.css            # Home page specific styles
└── js/
    └── app.js              # Shared JavaScript (quiz engine, JSON viewer, FHIR fetcher)
```

---

## 🌐 Free FHIR Server

All live data is fetched from the **public HAPI FHIR R4 test server**:

```
https://hapi.fhir.org/baseR4
```

This is completely free, requires no API key, and is publicly available for testing and learning.

---

## 📄 License

MIT — free to use, modify, and distribute.
