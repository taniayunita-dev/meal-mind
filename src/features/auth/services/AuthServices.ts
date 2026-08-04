import { simulateDelay } from "@/lib/fakeApi";
import { FakeUserData } from "../data/auth.data";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import type { User, LoginCredentials, RegisterPayload, AuthError, FakeUserRecord } from "../types/auth.types";

/**
 * In-memory mutable copy dari fake database.
 * Kenapa di-copy (bukan mutate fakeUsersDatabase langsung)?
 * → agar file data (fake-users.data.ts) tetap murni "seed data",
 *   dan perubahan (user baru dari register) tidak mengubah source file itu sendiri.
 * Catatan: karena ini in-memory, data register akan HILANG saat page di-refresh.
 * Ini keterbatasan yang disadari untuk fake auth tanpa backend.
 */

// let usersInMemory : FakeUserRecord[] = [...FakeUserData]

/**
 * Menghapus field password sebelum data user "keluar" dari service.
 * Password TIDAK PERNAH boleh sampai ke Context atau komponen UI.
 */

function getUsersFromStorage(): FakeUserRecord[] {
  const stored = storage.get<FakeUserRecord[]>(STORAGE_KEYS.USERS)

  if (stored !== null) {
    return stored
  }

  storage.set(STORAGE_KEYS.USERS, FakeUserData)
  return FakeUserData
}

function saveUsersToStorage(users: FakeUserRecord[]): void {
  storage.set(STORAGE_KEYS.USERS, users)
}

function toSafeUser(record:FakeUserRecord) : User {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...safeUser} = record

    return safeUser
}

function createAuthError(code: AuthError['code'], message: string) : AuthError{
    return {code, message}
}

export async function login(credential:LoginCredentials) : Promise<User>{
    await simulateDelay(600)

    const users = getUsersFromStorage()
    const record = users.find(u => u.email === credential.email)
    if(!record || record.password !== credential.password){
        throw createAuthError('INVALID_CREDENTIALS', "Email atau password yang Anda masukkan salah.")
    }

    return toSafeUser(record)
}

export async function register(payload:RegisterPayload) : Promise<User>{
    await simulateDelay(600)

    const users = getUsersFromStorage()
    const emailTaken = users.find(u => u.email === payload.email)

    if(emailTaken){
        throw createAuthError('EMAIL_ALREADY_REGISTERED',"Email ini sudah terdaftar. Silakan gunakan email lain atau login.")
    }

    const newRecord : FakeUserRecord = {
        id: `u${Date.now()}`,
        email: payload.email,
        password: payload.password,
        username: payload.username
    }

    const updatedUsers = [...users, newRecord]
    saveUsersToStorage(updatedUsers)

    return toSafeUser(newRecord)
}

export async function logout() : Promise<void>{
    await simulateDelay(600)

    // Tidak ada operasi lain — penghapusan session dari localStorage
  // adalah tanggung jawab AuthContext (STEP 7), bukan service ini.
}