import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface AuthContextType {
  isAdmin: boolean
  login: (password: string) => boolean
  logout: () => void
}

const ADMIN_PASSWORD = '169admin'

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('169admin') === 'true')

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      sessionStorage.setItem('169admin', 'true')
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    sessionStorage.removeItem('169admin')
  }, [])

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
