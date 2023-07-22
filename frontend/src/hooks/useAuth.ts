import { useEffect } from 'react'
import { OAuthResponse, Session, UserResponse } from '@supabase/supabase-js'
import { create } from 'zustand'

import { env } from '/src/config'
import { supabase } from '/src/libs'

export type supportedOAuthProviers = 'google' | 'github'

interface AuthStore {
  session: Session | null
  setSession: (session: Session | null) => void,
  isAuthLoading: boolean,
  setIsAuthLoading: (isAuthLoading: boolean) => void,
  signInWithOAuth: (provider: supportedOAuthProviers) => Promise<OAuthResponse>
  signOut: () => Promise<{ error: Error | null }>
  deleteUser: () => Promise<UserResponse | undefined>
}

export const useAuthStore = create<AuthStore>()(set => ({
  session: null,
  setSession: session => set({ session }),
  isAuthLoading: true,
  setIsAuthLoading: isAuthLoading => set({ isAuthLoading }),
  signInWithOAuth: async provider => supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: env.FRONTEND_URL
    }
  }),
  signOut: () => supabase.auth.signOut(),
  deleteUser: async () =>  {
    const session = await supabase.auth.getSession()
    if (!session.data.session?.user) return
    return supabase.auth.admin.deleteUser(
      session.data.session.user.id
    )
  }
}))

export const useAuthSetup = () => {
  const { setSession, setIsAuthLoading } = useAuthStore()

  useEffect(() => {
    const updateSession = async () => {
      console.log('Updating session')
      const session = await supabase.auth.getSession()
      setSession(session?.data?.session)
      setIsAuthLoading(false)
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Changed')
      setSession(session)
      setIsAuthLoading(false)
    })

    updateSession()
  }, [])
}

export default useAuthStore
