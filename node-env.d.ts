declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_PUBLIC_TTL: number
    NEXT_PUBLIC_SECRET: string
    DATABASE_URL: string
  }
}
