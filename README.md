# AI Avatar Portfolio Assistant (Frontend)

An interactive portfolio web application that presents a developer through a conversational interface, voice-enabled avatar, and dynamic project rendering.

---

## Live Demo

https://ai-avatar-frontend-jdrnip2jn-priyankas-projects-a6a1fab7.vercel.app/

---

## Features

* Conversational chat-based interface
* Avatar with text-to-speech responses
* Voice input using Web Speech API
* Typing animation for responses
* Dynamic rendering of project cards
* Responsive design across devices
* Integration with backend API

---

## How It Works

1. User sends a message via text or voice
2. Request is sent to the backend API
3. Backend returns either:

   * A text response
   * A structured object (e.g., project data)
4. Frontend renders the response accordingly
5. Avatar speaks the response using text-to-speech

---

## Tech Stack

* React.js
* Tailwind CSS
* JavaScript
* Web Speech API

---

## Project Structure

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

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/9940-pg/ai-avatar-frontend.git
cd ai-avatar-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
npm start
```

---

## Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Notes

* Voice input may not function on all mobile browsers
* Backend service must be running for full functionality

---

## Future Improvements

* Resume-to-portfolio generation
* AI-based response handling
* Enhanced avatar animations
* User personalization

---

## Author

Priyanka
Full Stack Developer

---

## License

This project is open-source and available for use under standard terms.
