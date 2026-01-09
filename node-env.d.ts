declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_PUBLIC_TTL: number
    NEXT_PUBLIC_SECRET: string
    NEXT_PUBLIC_URL: string
    NEXT_PUBLIC_REDIRECT: string
    DATABASE_URL: string
    NEXT_REDIRECT: string

    MAIL_HOST: string
    MAIL_PORT: number
    MAIL_SECURE: string
    MAIL_USER: string
    MAIL_PASS: string
    MAIL_FROM: string
  }
}
