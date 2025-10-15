# TChat - AI-Powered Chat Application

TChat is a modern, intelligent chat application that lets you have conversations with an AI assistant. Whether you need help answering questions, want to explore ideas, or just need someone to chat with, TChat is here to help.

## What Makes TChat Special?

- **AI-Powered Conversations**: Chat with an intelligent assistant that can help answer questions and provide information
- **Easy to Use**: Simple, clean interface that anyone can navigate
- **Secure Login**: Sign in securely with your Google account
- **Modern Design**: Beautiful, responsive interface that works on all devices
- **Privacy-Focused**: Your conversations are kept private and secure

## Getting Started

### Prerequisites

Before you can run TChat on your computer, you'll need:

1. **Bun** - A fast JavaScript package manager (similar to npm but faster)
   - To install Bun, visit [bun.sh](https://bun.sh) and follow their installation guide

2. **A Google Account** - For signing into the application

3. **A Database** - TChat uses a PostgreSQL database to store your information
   - We recommend using [Neon](https://neon.tech) for an easy-to-use, free PostgreSQL database

### Installation Steps

1. **Download the code**
   - Get the code files and save them to a folder on your computer

2. **Set up your environment**
   - Create a file named `.env` in the main project folder
   - Add the following lines to this file (replace the example values with your actual information):

   ```
   # Database connection (get this from your database provider)
   DATABASE_URL=postgresql://username:password@hostname:5432/database_name
   
   # Google OAuth (get these from Google Cloud Console)
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here

   # Google AI Studio Key
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   
   # Application URL (use http://localhost:3000 for local development)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Getting your Google credentials**
   - Visit [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000` to authorized redirect URIs for local testing
   - Copy the Client ID and Client Secret to your `.env` file

4. **Install dependencies**
   - Open your terminal or command prompt
   - Navigate to the project folder
   - Run: `bun install`

5. **Set up the database**
   - Run: `bunx drizzle-kit push`
   - This will create the necessary tables in your database

6. **Start the application**
   - Run: `bun dev`
   - Open your web browser and go to: http://localhost:3000

## Using TChat

1. **Sign In**: Click the sign-in button and authenticate with your Google account
2. **Start Chatting**: Type your message in the input box and press Enter
3. **Explore**: Ask questions, get help with tasks, or just have a conversation
4. **Settings**: Access your profile and preferences through the settings menu

## Features

- **Smart Conversations**: AI assistant that understands context and provides helpful responses
- **Message History**: Your conversations are saved so you can refer back to them
- **Search**: Find specific messages or conversations quickly
- **Dark/Light Mode**: Choose the theme that's comfortable for your eyes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## Need Help?

If you run into any issues or have questions:

1. Check that you've followed all the installation steps correctly
2. Make sure your `.env` file contains the correct values
3. Ensure your database is accessible and the connection string is correct
4. Verify your Google OAuth credentials are set up properly

## For Developers

This project is built with:

- **Next.js** - A modern React framework
- **Better Auth** - For authentication
- **Drizzle ORM** - For database management
- **Neon Database** - PostgreSQL hosting
- **Tailwind CSS** - For styling
- **AI SDK** - For AI-powered conversations
