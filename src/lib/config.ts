export interface Config {
  darkTheme: boolean
  brandName?: string
  recaptcha: {
    siteKey: string
    secretKey: string
  }
  discord: {
    welcomeRoom: string
    botToken: string
  }
  images: {
    background?: string
    wordmark?: string
  }
}

export function getConfig(): Config {
  const config: Config = {
    darkTheme: process.env.DARK_THEME === 'true',
    brandName: process.env.BRAND_NAME,
    recaptcha: {
      siteKey: process.env.RECAPTCHA_SITE_KEY || '',
      secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
    },
    discord: {
      welcomeRoom: process.env.DISCORD_WELCOME_ROOM || '',
      botToken: process.env.DISCORD_BOT_TOKEN || '',
    },
    images: {
      background: process.env.IMAGE_BACKGROUND,
      wordmark: process.env.IMAGE_WORDMARK,
    },
  }

  // Validate required configuration
  if (!config.recaptcha.siteKey) {
    throw new Error('RECAPTCHA_SITE_KEY is required')
  }
  if (!config.recaptcha.secretKey) {
    throw new Error('RECAPTCHA_SECRET_KEY is required')
  }
  if (!config.discord.welcomeRoom) {
    throw new Error('DISCORD_WELCOME_ROOM is required')
  }
  if (!config.discord.botToken) {
    throw new Error('DISCORD_BOT_TOKEN is required')
  }

  return config
}

export function getBrandedTitle(config: { brandName?: string }, suffix = 'Discord Gateway'): string {
  return config.brandName ? `${config.brandName} ${suffix}` : suffix
}
