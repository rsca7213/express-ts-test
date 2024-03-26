interface AppConfig {
  env: 'development' | 'production'
  port: number
  jwt: {
    secret: string
    expiration_hours: number
  }
}

const RULES = {
  env: ['development', 'production'],
  port: { min: 0, max: 65535 },
  jwtSecret: { min: 32 },
  jwtExpirationHours: { min: 1 }
}

export const appConfig = {} as AppConfig

function validateAppConfig(): void {
  if (!RULES.env.includes(appConfig.env)) throw new Error('[AppConfig.env] Value is not valid')
  if (appConfig.port < RULES.port.min || appConfig.port > RULES.port.max)
    throw new Error(
      `[AppConfig.port] Value does not meet range (${RULES.port.min} - ${RULES.port.max})`
    )
  if (appConfig.jwt.secret.length < RULES.jwtSecret.min)
    throw new Error(
      `[AppConfig.jwt.secret] Value must be at least ${RULES.jwtSecret.min} characters long`
    )
  if (appConfig.jwt.expiration_hours < RULES.jwtExpirationHours.min)
    throw new Error(
      `[AppConfig.jwt.expiration_hours] Value must be at least ${RULES.jwtExpirationHours.min} hour long`
    )
}

export function setupAppConfig(): void {
  const env = process.env.ENV
  const port = process.env.PORT
  const jwtSecret = process.env.JWT_SECRET
  const jwtExpirationHours = process.env.JWT_EXPIRES_IN

  appConfig.env = env as AppConfig['env']
  appConfig.port = Number(port)
  appConfig.jwt = {
    secret: jwtSecret!,
    expiration_hours: Number(jwtExpirationHours)
  }

  validateAppConfig()
}
