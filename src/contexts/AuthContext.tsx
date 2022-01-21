import { createContext, useEffect, useState } from 'react'

import { auth, firebase } from '../services/firebase'

type User = {
  id: string
  name: string | null
  avatar: string | null
}

type AuthContextData = {
  user: User | undefined
  signInWithGoogle(): Promise<void>
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  function handleVerifyUser(user: firebase.User | null) {
    if (user) {
      const { displayName, photoURL, uid } = user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const response = await auth.signInWithPopup(provider)

    handleVerifyUser(response.user)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      handleVerifyUser(user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ user, signInWithGoogle }}>{children}</AuthContext.Provider>
}
