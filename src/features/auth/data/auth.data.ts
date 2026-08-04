/**
 * Representasi "row" user di fake database, TERMASUK password.
 * File ini TIDAK PERNAH diimport langsung oleh komponen UI —
 * hanya diakses oleh authService, persis seperti backend nyata
 * yang tidak pernah expose tabel user mentah ke client.
 */

import type { FakeUserRecord } from "../types/auth.types";

export const FakeUserData : FakeUserRecord[] = [
    {
    id: 'u001',
    username: 'Dimas Pratama',
    email: 'dimas@example.com',
    password: 'password123',
  },
  {
    id: 'u002',
    username: 'Sarah Amelia',
    email: 'sarah@example.com',
    password: 'password123',
  },
]