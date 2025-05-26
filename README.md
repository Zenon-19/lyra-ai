# Lyra AI Assistant

A modern, responsive AI chat interface built with React, TypeScript, and TailwindCSS. Lyra provides a beautiful, intuitive interface for interacting with AI assistants.

## Overview

Lyra AI combines a sleek frontend with a powerful FastAPI backend, enabling rapid deployment to Vercel for a seamless AI chat experience. The application features a responsive design, theme options, and support for markdown rendering in chat messages.

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

### Deployment Options

You can deploy in two ways:
- Using the Vercel web interface
- Using the command line with our included scripts:
  - For Windows: `.\deploy.ps1`
  - For macOS/Linux: `./deploy.sh` (make it executable first with `chmod +x deploy.sh`)

## Features

- 💬 Beautiful chat interface with markdown support
- 🌓 Light/Dark mode
- ⌨️ Keyboard shortcuts
- 📱 Responsive design
- 🎨 Modern UI with animations
- 💾 Local storage for chat history
- 🎤 Voice input (coming soon)
- 🧠 Interactive memory panel
- 🌐 FastAPI backend for robust API capabilities
- 🚀 Easy deployment to Vercel
- 📱 Persona selection options

## Tech Stack

### Frontend
- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- Vite for bundling
- IndexedDB (for local storage)
- Emoji Picker React

### Backend
- FastAPI (Python)
- Uvicorn ASGI server
- Vercel serverless functions
- Optional: PostgreSQL, Redis, OpenAI integration

## Getting Started

### Local Development

1. Clone the repository
```bash
git clone https://github.com/laksh/lyra-ai.git
cd lyra-ai
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example` with your configuration

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Backend Development

1. Navigate to the backend directory
```bash
cd backend
```

2. Create a Python virtual environment and activate it
```bash
# For Windows
python -m venv .venv
.\.venv\Scripts\activate

# For macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

3. Install backend dependencies
```bash
pip install -r requirements.txt
```

4. Run the backend (if working on the full backend, not just Vercel functions)
```bash
uvicorn app.main:app --reload
```

## Keyboard Shortcuts

- `Ctrl+K`: Show keyboard shortcuts
- `Ctrl+,`: Open settings
- `Ctrl+D`: Toggle dark mode
- `Ctrl+L`: Clear chat history
- `Ctrl+E`: Toggle emoji picker
- `Ctrl+Alt+V`: Toggle voice input

## Project Architecture

Lyra follows a clean architecture pattern:

```
lyra-ai/
├── src/               # Frontend React application
│   ├── components/    # React components
│   ├── contexts/      # React context providers
│   ├── utils/         # Utility functions
│   └── assets/        # Static assets
├── backend/           # Backend Python application
│   ├── app/           # FastAPI application
│   └── requirements.txt  # Python dependencies
├── api/               # Vercel API routes
├── public/            # Static public files
└── dist/              # Build output directory
```

## Testing

To run the API tests:

```bash
python test_api.py
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License

## Last Updated

May 26, 2023
