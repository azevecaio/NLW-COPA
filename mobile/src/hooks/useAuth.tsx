import { useContext } from 'react'

import { AuthContext, AuthContextDataProps } from '../context/AuthContent'

export function useAuth(): AuthContextDataProps {
  const context = useContext(AuthContext)

  return context
}

