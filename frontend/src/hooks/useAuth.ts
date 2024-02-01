// authStore.ts
import { useEffect } from 'react'
import { AuthError, OAuthResponse, Session } from '@supabase/supabase-js'
import { useQueryClient } from '@tanstack/react-query'
import { create } from 'zustand'

import { env } from '/src/config'
import { axios, supabase } from '/src/libs'

export type supportedOAuthProviers = 'google' | 'github'

interface AuthStore {
  session: Session | null;
  signInWithOAuth: (provider: supportedOAuthProviers) => Promise<OAuthResponse>
  signOut: () => Promise<{ error: Error | null }>;
  deleteUser: () => Promise<{ error: AuthError | null }>
}

export const useAuthStore = create<AuthStore>()((_, get) => ({
  session: null,
  signInWithOAuth: async provider => supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${env.FRONTEND_URL}/login`
    }
  }),
  signOut: () => supabase.auth.signOut(),
  deleteUser: async () =>  {
    const session = get().session

    await supabase.auth.signOut()
    return axios.delete('/user', {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    })
  }
}))

const useAuth = () => {
  const session = useAuthStore(state => state.session)
  const signInWithOAuth = useAuthStore(state => state.signInWithOAuth)
  const signOut = useAuthStore(state => state.signOut)
  const deleteUser = useAuthStore(state => state.deleteUser)
  const queryClient = useQueryClient()


  useEffect(() => {
    const handleAuthChange = (_: string, session: Session | null ) => {
      useAuthStore.setState({ session })
      if (!session) queryClient.setQueryData(['calendar'], undefined)
    }

    const authSubscription = supabase.auth.onAuthStateChange(handleAuthChange)

    return () => {
      authSubscription.data.subscription.unsubscribe()
    }
  }, [])

  return { session, signInWithOAuth, signOut, deleteUser }
}

export default useAuth
