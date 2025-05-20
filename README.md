# Lyra AI Assistant

A modern, responsive AI chat interface built with React, TypeScript, and TailwindCSS.

## Vercel Deployment Instructions

### Prerequisites
- Vercel account
- GitHub repository with this code

### Steps to Deploy
1. Fork or clone this repository to your GitHub account
2. Log in to Vercel and click "New Project"
3. Import your GitHub repository
4. Configure your project settings:
   - Framework preset: "Other"
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
5. Add environment variables from `.env.example`
6. Deploy!

## Features

- 💬 Beautiful chat interface with markdown support
- 🌓 Light/Dark mode
- ⌨️ Keyboard shortcuts
- 📱 Responsive design
- 🎨 Modern UI with animations
- 💾 Local storage for chat history
- 🎤 Voice input (coming soon)
- 🧠 Interactive memory panel

## Tech Stack

- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- Vite
- IndexedDB (for local storage)
- Emoji Picker React

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/Zenon-19/lyra-ai.git
cd lyra-ai
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Keyboard Shortcuts

- `Ctrl+K`: Show keyboard shortcuts
- `Ctrl+,`: Open settings
- `Ctrl+D`: Toggle dark mode
- `Ctrl+L`: Clear chat history
- `Ctrl+E`: Toggle emoji picker
- `Ctrl+Alt+V`: Toggle voice input

## License

MIT License
