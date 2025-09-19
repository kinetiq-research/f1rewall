# f1rewall

A Next.js implementation of the f1rewall Discord invite gateway that generates unique, time-limited invite codes through a web interface with reCAPTCHA verification.

> Inspired by https://github.com/0xngmi/f1rewall

## Features

- **Discord Integration**: Creates unique, single-use Discord invites with 5-minute expiration
- **reCAPTCHA Protection**: Validates users before generating invites
- **Theme Support**: Light/dark theme toggle via configuration
- **Custom Branding**: Supports custom brand name, background and logo images
- **TypeScript**: Full type safety throughout the application
- **Modern Stack**: Built with Next.js 15, React 19, and Tailwind CSS

## Setup

### 1. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with the following variables:

```env
# Discord Configuration
DISCORD_WELCOME_ROOM=your_channel_id_here
DISCORD_BOT_TOKEN=your_bot_token_here

# reCAPTCHA Configuration
RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Optional Branding Configuration
BRAND_NAME=Your Brand Name

# Optional Image Configuration
IMAGE_BACKGROUND=https://example.com/background.jpg
IMAGE_WORDMARK=https://example.com/logo.png

# Theme Configuration
DARK_THEME=false
```

### 2. Discord Bot Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application and bot
3. Set the bot to private (not public)
4. Copy the bot token to `DISCORD_BOT_TOKEN`
5. Get your channel ID and set it as `DISCORD_WELCOME_ROOM`
6. Invite the bot with invite creation permissions

### 3. reCAPTCHA Setup

1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin/create)
2. Create a new reCAPTCHA v2 site
3. Add your domain(s)
4. Copy the site key to `RECAPTCHA_SITE_KEY`
5. Copy the secret key to `RECAPTCHA_SECRET_KEY`

### 4. Running the Application

```bash
# Install dependencies
npm install

# Run development server (with Turbopack)
npm run dev

# Build for production (with Turbopack)
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## API Routes

- `POST /api/verify` - Verifies reCAPTCHA and generates Discord invite

## Security Features

- Environment variable validation at startup
- Single-use Discord invites with 5-minute expiration
- reCAPTCHA verification before invite generation
- Proper error handling and logging
- No sensitive data stored in client

## Deployment

The application can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- Railway
- Self-hosted with Docker

Make sure to set the environment variables in your deployment platform.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
