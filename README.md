# 🎭 AI Avatar Portfolio Assistant (Frontend)

An interactive **AI-powered portfolio UI** that presents a developer through a talking avatar, chat interface, and dynamic project cards.

---

## 🚀 Live Demo

👉 https://ai-avatar-frontend-jdrnip2jn-priyankas-projects-a6a1fab7.vercel.app/

---

## ✨ Features

* 🎭 Animated Avatar with speaking interaction
* 💬 Chat-based UI
* 🎤 Voice input (Speech Recognition)
* 🔊 Text-to-Speech responses
* ⌨️ Typing animation
* 📱 Fully responsive design
* 🧠 Dynamic rendering of project cards
* 🔗 Live & GitHub links inside cards

---

## 🧠 How It Works

1. User sends message (text/voice)
2. Request goes to backend API
3. Response comes as:

   * Text → displayed in chat
   * Object → rendered as UI cards
4. Avatar speaks response using TTS

---

## 🛠️ Tech Stack

* React.js
* Tailwind CSS
* JavaScript
* Web Speech API

---

## 📂 Project Structure

```bash
src/
 ├── components/
 │    ├── Avatar.jsx
 │    ├── ChatPanel.jsx
 │
 ├── App.jsx
 ├── index.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone repo

```bash
git clone https://github.com/9940-pg/ai-avatar-frontend.git
cd ai-avatar-frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run project

```bash
npm start
```

---

## 🔌 Environment Variables

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## ⚠️ Notes

* Voice input may not work on some mobile browsers
* Requires backend running for full functionality

---

## 🔮 Future Improvements

* Resume → Portfolio generator
* AI-based responses
* Better avatar animations
* User personalization

---

## 👩‍💻 Author

Priyanka
Frontend Developer 🚀

---

## ⭐ Support

Give a ⭐ if you like this project!
