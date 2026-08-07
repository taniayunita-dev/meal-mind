import  {useContext} from 'react'
import { AuthContext } from './authContext'

/**
 * Hook untuk mengakses auth state dan auth actions (login, register, logout).
 * WAJIB dipanggil di dalam komponen yang berada di bawah <AuthProvider>.
 */

const useAuth = () => {

    const context = useContext(AuthContext)

    if (context === undefined) {
    throw new Error('useAuth harus dipanggil di dalam <AuthProvider>.')
  }
  return context
}

export default useAuth