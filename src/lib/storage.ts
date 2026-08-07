/**
 * Wrapper aman untuk localStorage.
 * Alasan wrapper ini ada (bukan panggil localStorage langsung di banyak tempat):
 * 1. localStorage.getItem() bisa return null → JSON.parse(null) akan throw.
 * 2. Kalau nanti ganti mekanisme persistence, cukup ubah file ini saja.
 */

/**
 * membuat wrapper storage yang aman,
 * bisa dipakai untuk localStorage MAUPUN sessionStorage
 * (keduanya punya interface Web Storage API yang identik).
 */

function createStorageWrapper(engine : Storage){
   return { get<T>(key: string): T | null {
      try {
        const raw = engine.getItem(key)
        if (raw === null) return null
        return JSON.parse(raw) as T
      } catch {
        return null
      }
    },

    set<T>(key: string, value: T): void {
      try {
        engine.setItem(key, JSON.stringify(value))
      } catch {
        // Storage penuh / private mode — gagal secara silent, tidak menghentikan alur user.
      }
    },

    remove(key: string): void {
      engine.removeItem(key)
    },
  }
}

/** Persist sampai user hapus manual / clear browser data — untuk "Remember Me" = true */
export const storage = createStorageWrapper(localStorage)

/** Persist hanya selama tab terbuka — untuk "Remember Me" = false */
export const sessionOnlyStorage = createStorageWrapper(sessionStorage)

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