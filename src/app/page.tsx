import Image from 'next/image'
import { getConfig, getBrandedTitle } from '@/lib/config'
import RecaptchaGateway from '@/components/RecaptchaGateway'

export default function Home() {
  let config
  try {
    config = getConfig()
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Configuration Error
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error instanceof Error ? error.message : 'Please check your environment variables'}
          </p>
        </div>
      </div>
    )
  }

  const themeClasses = config.darkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'

  const cardClasses = config.darkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${themeClasses}`}
      style={{
        backgroundImage: config.images.background ? `url(${config.images.background})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-md mx-auto p-6">
        <div className={`rounded-lg border shadow-lg p-8 ${cardClasses}`}>
          <div className="text-center mb-8">
            {config.images.wordmark ? (
              <Image
                src={config.images.wordmark}
                alt="Logo"
                width={200}
                height={60}
                className="mx-auto mb-4"
                priority
              />
            ) : (
              <h1 className="text-3xl font-bold mb-4">{getBrandedTitle(config)}</h1>
            )}
            <p className={`text-md ${config.darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Complete the verification below
              <br />
              to access our Discord server
            </p>
          </div>

          <div className="flex justify-center">
            <RecaptchaGateway siteKey={config.recaptcha.siteKey} darkTheme={config.darkTheme} />
          </div>
        </div>
      </div>
    </div>
  )
}
