import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const rawEnv = Object.fromEntries(Object.entries(import.meta.env).map(([k, v]) => [k.replace('VITE_', ''), v]))

export const env = createEnv({
  clientPrefix: '',
  server: {},
  client: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    API_URL: z.string().min(1).url(),
    FRONTEND_URL: z.string().min(1).url(),
    SUPABASE_URL: z.string().min(1).url(),
    SUPABASE_SECRET_KEY: z.string().min(1),
  },
  runtimeEnv: rawEnv,
})
