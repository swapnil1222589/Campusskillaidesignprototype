# 🎓 CampusSkill AI — Design Prototype

> A modern AI-powered campus and student career experience designed to help students discover opportunities, build skills, and navigate their academic journey.

**CampusSkill AI Design Prototype** is a frontend prototype created to explore the user experience and interface for an AI-powered student platform.

The project translates the original Figma concept into an interactive React application and focuses on building a polished, scalable foundation for a future CampusSkill AI product.

🔗 **GitHub:** https://github.com/swapnil1222589/Campusskillaidesignprototype

🎨 **Original Figma Design:**
https://www.figma.com/design/DlA3k1yvfIz0ojNHi0wXDL/CampusSkill-AI-Design-Prototype

---

## ✨ Overview

CampusSkill AI is designed around the idea of bringing important student experiences into one platform.

The prototype explores how an AI-first campus platform could support students through:

* 🎓 Academic and campus experiences
* 💼 Career development
* 🧠 Skill development
* 🚀 Opportunity discovery
* 📊 Progress tracking
* 🤖 AI-powered assistance
* 🧩 Personalized student workflows

The current repository focuses on the **frontend design and interaction layer** rather than a production backend.

---

## 🎯 Design Goals

The prototype was created with several core goals:

### Student-Centered UX

Create a clean interface where students can quickly discover information, tools, and opportunities.

### AI-First Experience

Position AI as an integrated assistant rather than a separate feature.

### Modern Interface

Use a modern component-driven UI with responsive layouts and accessible interaction patterns.

### Scalable Architecture

Structure the application so the prototype can later evolve into a complete production platform.

---

## 🧩 Key Areas

The project is structured around reusable application components and context-driven state.

Potential product areas represented by the prototype include:

* 🏠 Student dashboard
* 📚 Learning and skill development
* 💼 Career opportunities
* 🎯 Goals and progress
* 🤖 AI assistance
* 📊 Analytics and insights
* 🎨 Personalized student experience

> The repository is primarily a design prototype, so feature depth and backend functionality may differ from a production implementation.

---

## 🛠️ Technology Stack

### Frontend

* **React**
* **TypeScript**
* **Vite**

### UI & Styling

* **Tailwind CSS**
* **Material UI**
* **Emotion**
* **Lucide React**

### Components & Interaction

* Radix UI
* React Hook Form
* React Router
* Recharts
* Sonner
* Motion

The project also includes supporting UI libraries for dialogs, tabs, dropdowns, accordions, progress indicators, tooltips, sliders, and other reusable interface patterns.

---

## 🏗️ Frontend Architecture

```text
                 ┌─────────────────────┐
                 │     React App       │
                 └──────────┬──────────┘
                            ↓
                  ┌─────────────────┐
                  │   App.tsx       │
                  └────────┬────────┘
                           ↓
          ┌────────────────┼────────────────┐
          ↓                ↓                ↓
      Components        Context          Styles
          ↓                ↓                ↓
          └────────────────┼────────────────┘
                           ↓
                   Interactive UI
```

---

## 📂 Project Structure

```text
Campusskillaidesignprototype/
├── guidelines/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── components/
│   │   └── context/
│   │
│   ├── styles/
│   └── main.tsx
│
├── ATTRIBUTIONS.md
├── index.html
├── package.json
├── postcss.config.mjs
├── vite.config.ts
└── README.md
```

### Important Files

| File / Directory      | Purpose                              |
| --------------------- | ------------------------------------ |
| `src/main.tsx`        | React application entry point        |
| `src/app/App.tsx`     | Main application component           |
| `src/app/components/` | Reusable UI components               |
| `src/app/context/`    | Application state/context            |
| `src/styles/`         | Global and application styling       |
| `index.html`          | HTML entry document                  |
| `package.json`        | Dependencies and development scripts |
| `vite.config.ts`      | Vite configuration                   |
| `ATTRIBUTIONS.md`     | Design/code attribution information  |

---

## 🚀 Getting Started

### Prerequisites

Install:

* Node.js
* npm
* Git

Check your Node.js installation:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/swapnil1222589/Campusskillaidesignprototype.git
```

Move into the project:

```bash
cd Campusskillaidesignprototype
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Run Development Server

Start the Vite development server:

```bash
npm run dev
```

Vite will provide a local development URL in the terminal.

Typically:

```text
http://localhost:5173
```

---

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

The production output will be generated by Vite.

---

## 🎨 Design Source

This project originated from the following Figma design:

**CampusSkill AI Design Prototype**

https://www.figma.com/design/DlA3k1yvfIz0ojNHi0wXDL/CampusSkill-AI-Design-Prototype

The GitHub repository contains the frontend implementation of the design concept.

---

## 🧠 Product Vision

CampusSkill AI can evolve into an AI-powered student operating platform.

A possible future experience:

```text
Student
   ↓
CampusSkill AI
   ↓
Personal Student Profile
   ↓
┌──────────────┬───────────────┬──────────────┐
│ Learn        │ Build Skills  │ Find Careers │
└──────────────┴───────────────┴──────────────┘
             ↓
       AI Recommendations
             ↓
      Personalized Roadmap
             ↓
       Track Progress
```

---

## 🔮 Future Roadmap

The current project is a **frontend/design prototype**. A production version could add:

### 🤖 AI Layer

* AI student assistant
* Personalized learning recommendations
* Career recommendations
* Skill-gap analysis
* Resume assistance
* Interview preparation
* AI-generated learning plans

### 🎓 Student Platform

* Student profiles
* Course tracking
* Skill portfolios
* Certifications
* Project portfolios
* Internship discovery
* Job opportunities
* Campus events

### 📊 Analytics

* Skill progress dashboards
* Career readiness metrics
* Learning analytics
* Goal tracking
* Personalized insights

### 🔐 Platform

* Authentication
* Student accounts
* University administration
* Database integration
* Role-based access
* Notifications

---

## 🌐 Potential Production Architecture

A future production implementation could follow:

```text
                    Web / Mobile Client
                           │
                           ↓
                   ┌───────────────┐
                   │ API Gateway   │
                   └───────┬───────┘
                           ↓
                ┌─────────────────────┐
                │ Application Backend │
                └──────────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
   User Service       AI Services       Opportunity API
        ↓                  ↓                  ↓
        └──────────────────┼──────────────────┘
                           ↓
                    Database Layer
                           │
                           ↓
                    Analytics Layer
```

---

## 🎓 Learning Outcomes

This project provides practical experience with:

* React component architecture
* TypeScript
* Vite development workflows
* Responsive UI design
* Reusable component systems
* Context-based state management
* Modern UI libraries
* Frontend project structuring
* Design-to-code implementation
* Git and GitHub workflows

---

## 🤝 Contributing

Contributions and design improvements are welcome.

Create a branch:

```bash
git checkout -b feature/your-feature
```

After making changes:

```bash
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Then open a pull request.

---

## 📜 Attribution

The repository includes an `ATTRIBUTIONS.md` file for design and/or asset attribution.

Please review it before redistributing or reusing project assets.

---

## 📄 License

Refer to the repository's attribution and licensing information before using the project for external distribution.

---

## 👨‍💻 Author

**Swapnil Ghuge**

GitHub: https://github.com/swapnil1222589

---

## ⭐ Support

If you find the CampusSkill AI concept interesting, consider giving the repository a ⭐.

> **Learn. Build. Connect. Grow. — CampusSkill AI**
