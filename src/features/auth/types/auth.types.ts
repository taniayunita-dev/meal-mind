export interface User {
    id: string
    username: string
    email: string
}

export interface FakeUserRecord extends User{
    password: string
}

export interface LoginCredentials {
    email: string
    password: string
    rememberMe: boolean
}

export interface RegisterPayload {
    username: string
    email: string
    password: string
}

/**
 * State auth yang di-expose lewat AuthContext.
 * `status` mencerminkan siklus hidup pengecekan sesi saat app pertama kali load,
 * BUKAN status loading tombol login (itu state lokal di form).
 */

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

export interface AuthState{
    status: AuthStatus
    user: User | null
}

/**
 * Bentuk error yang terstruktur dari authService,
 * agar UI bisa menampilkan pesan yang tepat per jenis kegagalan
 * tanpa harus parsing string error secara manual.
 */

export type AuthErrorCode = 
| 'INVALID_CREDENTIALS'
  | 'EMAIL_ALREADY_REGISTERED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR'

  export interface AuthError {
    code: AuthErrorCode
    message: string
  }
