import { NextRequest, NextResponse } from 'next/server'
import { getConfig } from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const { recaptchaToken } = await request.json()

    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA token is required' },
        { status: 400 }
      )
    }

    const config = getConfig()
    const clientIP =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    console.log(`Verifying reCAPTCHA token: ${recaptchaToken.substring(0, 15)}...`)

    // Verify reCAPTCHA with Google
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: config.recaptcha.secretKey,
        response: recaptchaToken,
        remoteip: clientIP,
      }),
    })

    const recaptchaResult = await recaptchaResponse.json()

    if (recaptchaResult.success) {
      console.log(`reCAPTCHA token verified successfully: ${recaptchaToken.substring(0, 30)}...`)

      // Generate Discord invite
      const inviteResponse = await fetch(
        `https://discord.com/api/channels/${config.discord.welcomeRoom}/invites`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bot ${config.discord.botToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            max_uses: 1,
            unique: true,
            max_age: 300, // 5 minutes
          }),
        }
      )

      if (!inviteResponse.ok) {
        console.error('Failed to create Discord invite:', await inviteResponse.text())
        return NextResponse.json(
          { success: false, error: 'Failed to generate Discord invite' },
          { status: 500 }
        )
      }

      const inviteData = await inviteResponse.json()

      if (inviteData.code) {
        console.log('Generated new Discord invite')
        return NextResponse.json({
          success: true,
          inviteUrl: `https://discord.gg/${inviteData.code}`,
        })
      } else {
        console.error('Invalid invite response:', inviteData)
        return NextResponse.json(
          { success: false, error: 'Invalid invite response from Discord' },
          { status: 500 }
        )
      }
    } else {
      console.log(`reCAPTCHA verification failed: ${recaptchaToken.substring(0, 30)}...`)
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error in verify API:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
