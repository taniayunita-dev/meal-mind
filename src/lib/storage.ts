/**
 * Wrapper aman untuk localStorage.
 * Alasan wrapper ini ada (bukan panggil localStorage langsung di banyak tempat):
 * 1. localStorage.getItem() bisa return null → JSON.parse(null) akan throw.
 * 2. Kalau nanti ganti mekanisme persistence, cukup ubah file ini saja.
 */

export const storage = {
    get<T>(key:string) : T | null {
        try{
            const raw = localStorage.getItem(key)
            if(raw == null){
                return null
            }
            return JSON.parse(raw) as T
        }catch{
// Data korup / tidak valid JSON → anggap tidak ada data
      return null
        }
    },

    set<T>(key: string, value:T):void {
        try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage bisa gagal (mode private browsing, storage penuh, dll)
      // Untuk project ini, kegagalan silent cukup — tidak menghentikan alur user.
    }
    },
    remove(key: string): void {
    localStorage.removeItem(key)
  },
}

/**
 * Kunci-kunci localStorage disentralisasi di sini,
 * agar tidak ada "magic string" tersebar di banyak file
 * (sesuai requirement code quality kamu di awal).
 */

export const STORAGE_KEYS = {
    AUTH_SESSION: 'recipe-app:auth-session',
  SAVED_RECIPES: 'recipe-app:saved-recipes',
  USERS: 'recipe-app:users',
} as const