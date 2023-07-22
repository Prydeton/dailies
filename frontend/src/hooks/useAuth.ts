// authStore.ts
import { useEffect } from 'react'
import { OAuthResponse, Session, UserResponse } from '@supabase/supabase-js'
import { create } from 'zustand'

import { env } from '/src/config'
import { supabase } from '/src/libs'

export type supportedOAuthProviers = 'google' | 'github'

interface AuthStore {
  session: Session | null;
  signInWithOAuth: (provider: supportedOAuthProviers) => Promise<OAuthResponse>
  signOut: () => Promise<{ error: Error | null }>;
  deleteUser: () => Promise<UserResponse | undefined>
}

export const useAuthStore = create<AuthStore>()((_, get) => ({
  session: null,
  signInWithOAuth: async provider => supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: env.FRONTEND_URL
    }
  }),
  signOut: () => supabase.auth.signOut(),
  deleteUser: async () =>  {
    const session = get().session
    if (!session) return
    return supabase.auth.admin.deleteUser(
      session.user.id
    )
  }
}))

const useAuth = () => {
  const session = useAuthStore(state => state.session)
  const signInWithOAuth = useAuthStore(state => state.signInWithOAuth)
  const signOut = useAuthStore(state => state.signOut)
  const deleteUser = useAuthStore(state => state.deleteUser)

  useEffect(() => {
    const handleAuthChange = (_: string, session: Session | null ) => {
      useAuthStore.setState({ session })
    }

    const authSubscription = supabase.auth.onAuthStateChange(handleAuthChange)

    return () => {
      authSubscription.data.subscription.unsubscribe()
    }
  }, [])

  return { session, signInWithOAuth, signOut, deleteUser }
}

export default useAuth
