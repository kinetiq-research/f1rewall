'use client'

import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

interface RecaptchaGatewayProps {
  siteKey: string
  darkTheme: boolean
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function RecaptchaGateway({
  siteKey,
  darkTheme,
  onSuccess,
  onError,
}: RecaptchaGatewayProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleRecaptchaChange = async (token: string | null) => {
    if (!token) {
      setError('Please complete the reCAPTCHA verification')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recaptchaToken: token }),
      })

      const data = await response.json()

      if (data.success && data.inviteUrl) {
        onSuccess?.()
        // Redirect to Discord invite
        window.location.href = data.inviteUrl
      } else {
        setError(data.error || 'Verification failed. Please try again.')
        recaptchaRef.current?.reset()
        onError?.(data.error || 'Verification failed')
      }
    } catch {
      const errorMessage = 'Network error. Please try again.'
      setError(errorMessage)
      recaptchaRef.current?.reset()
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecaptchaError = () => {
    setError('reCAPTCHA failed to load. Please refresh the page and try again.')
    onError?.('reCAPTCHA failed to load')
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={handleRecaptchaChange}
        onError={handleRecaptchaError}
        theme={darkTheme ? 'dark' : 'light'}
        size="normal"
      />

      {isLoading && (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          <span>Verifying...</span>
        </div>
      )}

      {error && (
        <div
          className={`text-center p-3 rounded-md ${
            darkTheme
              ? 'bg-red-900/20 text-red-300 border border-red-800'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {error}
        </div>
      )}
    </div>
  )
}
