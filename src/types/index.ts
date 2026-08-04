/**
 * Merepresentasikan state dari operasi asynchronous apapun.
 * Menggunakan discriminated union agar "impossible state" 
 * (misal: loading=true DAN error bersamaan) tidak bisa direpresentasikan.
 * 
 * 
 * Ini adalah discriminated union — field status berperan sebagai "penanda" yang 
 * memungkinkan TypeScript melakukan narrowing otomatis.
 */

export type AsyncState <TData, TError = string> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: TData }
  | { status: 'error'; error: TError }

export type FieldErrors<TFields extends string> = Partial<Record<TFields, string>>