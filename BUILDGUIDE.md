# Build Guide — Recipe & Meal Planner

Panduan ini adalah **peta jalan untuk kamu praktik menulis kode sendiri**, bukan kode jadi. Isinya: struktur folder final, design tokens, strategi responsive, dan urutan implementasi bertahap — sesuai urutan yang sudah terbukti bekerja di sepanjang proses kita berdiskusi. Kembali ke percakapan sebelumnya kapan pun kamu butuh detail kode/alasan teknis suatu bagian.

---

## 1. Design Tokens (Setup Paling Awal)

Project ini pakai **Tailwind CSS v4** — tidak ada lagi `tailwind.config.ts`/`postcss.config.js`. Konfigurasi dilakukan langsung di CSS lewat directive `@theme`, dan plugin `@tailwindcss/vite` dipasang di `vite.config.ts`. Semua warna & spacing di seluruh aplikasi bergantung pada token ini — harus ada sebelum komponen apapun ditulis.

### Instalasi

```bash
npm install tailwindcss @tailwindcss/vite
```

```diff
// vite.config.ts

  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'
  import path from 'path'

  export default defineConfig({
   plugins: [react(), tailwindcss()],
    resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  })
```

### `src/styles/global.css`

```css
@import "tailwindcss";

@theme {
  --color-primary: #2F855A;
  --color-primary-hover: #276749;
  --color-primary-light: #C6F6D5;

  --color-secondary: #DD6B20;
  --color-secondary-hover: #C05621;

  --color-background: #FAFAF9;
  --color-surface: #FFFFFF;

  --color-text: #1A202C;
  --color-text-muted: #718096;

  --color-border: #E2E8F0;

  --color-error: #E53E3E;
  --color-error-dark: #C53030;
  --color-error-light: #FED7D7;

  --color-success: #38A169;
  --color-success-light: #C6F6D5;

  --font-sans: 'Inter', system-ui, sans-serif;

  --text-heading: 1.75rem;
  --text-heading--line-height: 2.25rem;
  --text-heading--font-weight: 700;

  --text-subheading: 1.25rem;
  --text-subheading--line-height: 1.75rem;
  --text-subheading--font-weight: 600;

  --text-body: 1rem;
  --text-body--line-height: 1.5rem;

  --text-caption: 0.875rem;
  --text-caption--line-height: 1.25rem;

  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
}

@layer base {
  body {
    @apply bg-background text-text font-sans;
  }

  :focus-visible {
    @apply outline-none ring-2 ring-primary ring-offset-2;
  }
}
```

**Kenapa ini pertama:** semua komponen di step berikutnya akan pakai `bg-primary`, `text-error-dark`, `px-md`, dst. Token ini otomatis jadi utility class yang bisa langsung dipakai (`--color-primary` → class `bg-primary`/`text-primary`/`border-primary`) — tanpa `tailwind.config.ts`, tanpa `postcss.config.js` terpisah.

### Catatan Penting
- `error-dark` dipakai khusus untuk teks/icon **di atas** `error-light` (kontras WCAG AA — jangan pakai `error` biasa di situasi itu).
- Jangan pakai warna Tailwind default (`blue-500`, dst) di komponen manapun — selalu lewat token semantik di atas.
- Penamaan variable **wajib** diawali prefix yang sesuai kategori (`--color-*`, `--text-*`, `--spacing-*`, `--font-*`) — ini yang membuat Tailwind v4 tahu harus generate utility class apa dari tiap variable.
- Kalau butuh breakpoint custom di luar preset (`sm`/`md`/`lg`/`xl`/`2xl`), tambahkan lewat `--breakpoint-*` di blok `@theme` yang sama — tapi ingat dari diskusi sebelumnya, project ini tidak butuh itu karena preset default sudah pas.

---

## 2. Strategi Responsive (Prinsip yang Dipegang di Semua Halaman)

Terapkan mobile-first di **setiap** komponen sejak awal, jangan tunda ke "tahap responsive" terpisah di akhir — itu justru sumber overflow yang baru ketahuan belakangan.

| Breakpoint Tailwind | Lebar | Kapan Dipakai |
|---|---|---|
| (default, tanpa prefix) | 320px+ | Base style — mobile dulu |
| `sm:` | 640px+ | Navbar mulai tampilkan nama user, grid recipe 3 kolom |
| `md:` | 768px+ | Split-screen Login/Register aktif, grid recipe 4 kolom di `lg:` |
| `lg:` | 1024px+ | Grid recipe 4 kolom |

**Aturan yang harus konsisten dipakai:**
- Elemen yang disembunyikan di mobile → `hidden md:flex` (atau `sm:inline`), **bukan** `md:w-1/2` saja tanpa `hidden` (elemen tetap ada di DOM & bisa bikin overflow).
- Font input **minimal 16px** (`text-body`) — di bawah itu, Safari iOS auto-zoom saat tap.
- Touch target tombol minimal **44px tinggi** (`min-h-[44px]`) untuk aksi utama; boleh lebih kecil (~36px) untuk aksi sekunder seperti Logout.
- Baris info yang berisi beberapa item sejajar (waktu/porsi/kategori) → selalu `flex flex-wrap`, jangan `flex` tanpa wrap.
- Tabel/grid lebar yang secara struktural tidak bisa disusun ulang (weekly grid) → `overflow-x-auto` + gradient affordance di tepi, bukan dipaksa vertikal.

---

## 3. Struktur Folder Final

```
src/
├── assets/
│
├── components/
│   ├── ui/                          # generik, reusable lintas domain
│   │   ├── Avatar/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── EmptyState/
│   │   ├── ErrorMessage/
│   │   ├── Input/
│   │   ├── Loading/
│   │   ├── PasswordInput/
│   │   └── PasswordStrengthIndicator/
│   └── layout/                      # struktural, boleh depend ke Context
│       ├── AppLayout/
│       └── Navbar/
│
├── features/
│   ├── auth/
│   │   ├── components/              # LoginForm, RegisterForm
│   │   ├── data/                    # fake-users.data.ts
│   │   ├── services/                # authService.ts
│   │   ├── AuthContext.tsx
│   │   ├── useAuth.ts
│   │   └── auth.types.ts
│   ├── recipes/
│   │   ├── components/              # RecipeCard, SearchInput
│   │   ├── data/                    # recipes.data.ts
│   │   ├── hooks/                   # useRecipeSearch, useRecipeDetail, useSavedRecipes, useAllRecipes
│   │   ├── services/                # recipeService.ts
│   │   └── recipe.types.ts
│   └── meal-plan/
│       ├── components/              # WeeklyGrid, MealSlot, RecipePickerModal, ShoppingList
│       ├── hooks/                   # useMealPlan.ts
│       ├── shoppingList.ts
│       └── meal-plan.types.ts
│
├── hooks/                           # generik: useDebounce, usePageTitle, useFocusMainOnRouteChange
│
├── pages/
│   ├── LoginPage/  RegisterPage/  HomePage/
│   ├── RecipeDetailPage/  ProfilePage/  MealPlanPage/
│   └── NotFoundPage/
│
├── routes/
│   ├── AppRoutes.tsx
│   ├── ProtectedRoute.tsx
│   ├── GuestOnlyRoute.tsx
│   └── SessionCheckingScreen.tsx
│
├── lib/                             # infrastruktur murni TS, tidak tahu React
│   ├── cn.ts
│   ├── fakeApi.ts
│   ├── storage.ts
│   └── validators.ts
│
├── test/
│   ├── setup.ts
│   └── authWrapper.tsx
│
├── styles/global.css
├── types/index.ts
├── App.tsx
└── main.tsx

vite.config.ts   tsconfig.json
```

> Tidak ada `tailwind.config.ts` maupun `postcss.config.js` — Tailwind v4 dikonfigurasi langsung lewat `@theme` di `src/styles/global.css` (lihat §1) dan plugin `@tailwindcss/vite` di `vite.config.ts`.

**Aturan penempatan komponen (pakai ini tiap kali ragu mau taruh file baru di mana):**
> Kalau komponen ini di-copy ke project lain yang topiknya beda total, apakah masih masuk akal tanpa diubah? Ya → `components/ui/`. Tidak (butuh ubah nama field/tipe) → `features/{domain}/components/`.

---

## 4. Urutan Implementasi — Checklist Bertahap

Ikuti urutan ini. Tiap tahap dibangun di atas tahap sebelumnya — jangan lompat ke komponen sebelum fondasi di bawahnya ada.

### Fase A — Fondasi (tidak ada UI sama sekali)
- [ ] **Setup project**: Vite + React + TS, install `tailwindcss` + `@tailwindcss/vite` (lihat §1), `vite.config.ts` dengan plugin `tailwindcss()` + `resolve.alias '@' → './src'`, `src/styles/global.css` dengan `@import "tailwindcss"` + blok `@theme`, `tsconfig.json` dengan `strict: true`, `noUncheckedIndexedAccess: true`, `paths: {"@/*": ["./src/*"]}`.
- [ ] **Types dulu, sebelum logic apapun**:
  - `types/index.ts` → `AsyncState<T>` (discriminated union: idle/loading/success/error), `FieldErrors<T>`
  - `features/auth/auth.types.ts` → `User`, `LoginCredentials`, `RegisterPayload`, `AuthState`, `AuthError`, `AuthErrorCode`
  - `features/recipes/recipe.types.ts` → `Recipe`, `Ingredient`, `RecipeCategory`, `SavedRecipeEntry`
  - `features/meal-plan/meal-plan.types.ts` → `DayOfWeek`, `MealCategory`, `MealPlanEntry`, `ShoppingListItem`, plus konstanta `DAYS_ORDER`/`DAY_LABELS`
- [ ] **Fake data**: `features/auth/data/fake-users.data.ts`, `features/recipes/data/recipes.data.ts` (sengaja masukkan 2 resep dengan bahan sama untuk uji search nanti).
- [ ] **`lib/` infrastruktur** (murni TS, tidak ada React sama sekali):
  - `lib/fakeApi.ts` → `simulateDelay()`
  - `lib/storage.ts` → factory wrapper untuk localStorage & sessionStorage + `STORAGE_KEYS` terpusat
  - `lib/validators.ts` → `isRequired`, `isValidEmail`, `hasMinLength`, `passwordsMatch`, `getPasswordStrength`
  - `lib/cn.ts` → className merger sederhana

### Fase B — Auth (backend palsu → UI)
- [ ] `features/auth/services/authService.ts` — `login`, `register`, `logout`. Ingat: normalisasi email (`toLowerCase().trim()`), strip password sebelum return `User`, persist ke localStorage (lazy seeding dari fake data).
- [ ] `features/auth/AuthContext.tsx` — `useReducer` dengan 4 action (`SESSION_CHECK_START`, `SESSION_RESOLVED`, `LOGIN_SUCCESS`, `LOGOUT`), `useEffect` cek sesi saat mount, Remember Me pakai localStorage vs sessionStorage.
- [ ] `features/auth/useAuth.ts` — wrapper `useContext` yang `throw` kalau dipanggil di luar Provider.
- [ ] **Komponen UI generik dulu** sebelum form: `Button`, `Input` (pakai `forwardRef` + `useId`), `PasswordInput` (compose dari `Input`), `PasswordStrengthIndicator`, `ErrorMessage`, `Loading`, `EmptyState`, `Card`, `Avatar`.
- [ ] `features/auth/components/LoginForm.tsx` & `RegisterForm.tsx` — validasi on-blur + re-validasi realtime kalau field sudah pernah error, input tidak reset saat gagal, `isAuthError()` type guard di catch block.
- [ ] `pages/LoginPage`, `pages/RegisterPage` — layout split-screen (`hidden md:flex md:w-1/2`).
- [ ] `routes/ProtectedRoute.tsx`, `routes/GuestOnlyRoute.tsx`, `routes/SessionCheckingScreen.tsx` — tangani status `idle`/`loading` sebagai "belum tahu", jangan langsung redirect.
- [ ] `components/layout/Navbar/Navbar.tsx`, `components/layout/AppLayout/AppLayout.tsx` — skip link + `id="main-content"` + `tabIndex={-1}`.
- [ ] `routes/AppRoutes.tsx`, `App.tsx`, `main.tsx` — rangkai semua. Urutan nesting: `ProtectedRoute > AppLayout`, bukan sebaliknya.

**Checkpoint:** di titik ini kamu harus bisa register → login → lihat halaman kosong terproteksi → logout, full flow tanpa fitur resep sama sekali.

### Fase C — Recipe Discovery
- [ ] `features/recipes/services/recipeService.ts` — `searchRecipes` (union match title/ingredient, query kosong = semua resep), `getRecipeById` (return `null`, bukan throw), `getAllRecipes`.
- [ ] `hooks/useDebounce.ts` (generik, taruh di root `hooks/`, bukan di dalam `features/recipes/`).
- [ ] `features/recipes/hooks/useRecipeSearch.ts`, `useRecipeDetail.ts`, `useAllRecipes.ts` — pola `AsyncState` + `isCancelled` flag untuk cegah race condition.
- [ ] `features/recipes/hooks/useSavedRecipes.ts` — scoped per `userId`, `useCallback` untuk `isSaved`/`toggleSave`.
- [ ] `features/recipes/components/SearchInput.tsx`, `RecipeCard.tsx` (`alt=""` di gambar karena judul sudah jadi teks di sebelahnya, tombol save sibling — bukan nested — dari `<Link>`).
- [ ] `pages/HomePage/HomePage.tsx` — rangkai `useDebounce` → `useRecipeSearch`, tampilkan label kontekstual jumlah hasil.
- [ ] `pages/RecipeDetailPage/RecipeDetailPage.tsx` — `<article>`, `<ul>` untuk bahan, `<ol>` untuk langkah.
- [ ] `pages/ProfilePage/ProfilePage.tsx`, `pages/NotFoundPage/NotFoundPage.tsx`.
- [ ] Tambahkan `/recipes/:id` dan `/profile` ke `AppRoutes.tsx`.

**Checkpoint:** search realtime dengan debounce bekerja, klik resep → detail, save/unsave sinkron antara Card dan Detail.

### Fase D — Meal Planner (domain baru, validasi arsitekturmu sendiri)
- [ ] Tambah `STORAGE_KEYS.MEAL_PLAN` di `lib/storage.ts`.
- [ ] `features/meal-plan/hooks/useMealPlan.ts` — flat array `MealPlanEntry[]`, `setSlot` = filter lalu push (bukan map in-place), `clearSlot`, `getEntryFor`.
- [ ] `features/meal-plan/shoppingList.ts` — pure function `buildShoppingList(entries, recipesById)`, grouping by nama bahan ternormalisasi, **tanpa** penjumlahan kuantitas.
- [ ] `features/meal-plan/components/MealSlot.tsx`, `WeeklyGrid.tsx`, `RecipePickerModal.tsx` (reuse `useDebounce`+`useRecipeSearch`+`SearchInput` yang sudah ada — jangan tulis ulang), `ShoppingList.tsx`.
- [ ] `pages/MealPlanPage/MealPlanPage.tsx` — fetch semua resep sekali di level halaman (`useAllRecipes` + `useMemo` untuk `recipesById`), teruskan sebagai props ke `WeeklyGrid` & `buildShoppingList` (jangan fetch berulang per-slot).
- [ ] Tambah `/meal-plan` ke routing + link di Navbar.
- [ ] Modal: auto-focus ke tombol close saat terbuka + `Escape` untuk menutup.

**Checkpoint:** klik slot kosong → modal cari resep → pilih → slot terisi → tab Daftar Belanja menampilkan bahan terkelompok.

### Fase E — Review & Testing (jangan skip, ini bagian dari kualitas kode)
- [ ] Audit manual: responsive di 320px (cek overflow), accessibility (Tab dari awal sampai akhir tanpa mouse), TypeScript (`tsc --noEmit` harus bersih tanpa `any`).
- [ ] Setup Vitest (`vite.config.ts` tambah key `test`, `src/test/setup.ts` import `@testing-library/jest-dom`).
- [ ] Test pure function dulu (`validators.ts`, `shoppingList.ts`) — paling cepat ditulis, tidak butuh mock.
- [ ] Test service (`authService.ts`) — `beforeEach(() => localStorage.clear())` wajib untuk isolasi antar-test.
- [ ] Test hooks (`useDebounce` pakai `vi.useFakeTimers()`, `useMealPlan` butuh `AuthContext.Provider` manual buatan sendiri — jangan pakai `AuthProvider` asli di unit test).
- [ ] Test komponen (`LoginForm`, `RecipeCard`) — query berbasis `getByLabelText`/`getByRole`, bukan `getByTestId`.

---

## 5. Referensi Cepat: Kapan Butuh Custom Hook vs Pure Function vs Component Baru

| Situasi | Taruh di |
|---|---|
| Ada state React (`useState`/`useEffect`) yang dikelola | Custom hook |
| Transformasi data murni, `input → output`, tanpa state | Pure function (`lib/` kalau generik, `features/{domain}/` kalau spesifik) |
| Tanggung jawab visual, dipakai berulang lintas domain | `components/ui/` |
| Tanggung jawab visual, spesifik satu domain | `features/{domain}/components/` |
| Struktural, satu per halaman, boleh depend Context | `components/layout/` |

---

## 6. Kesalahan yang Sudah Kita Temukan Sendiri Saat Membangun — Jangan Diulang

- Jangan biarkan `alt` gambar mengulang teks yang sudah tampil sebagai judul di sebelahnya — pakai `alt=""`.
- Jangan taruh state loading tombol logout/save tanpa proteksi double-click.
- Jangan bandingkan email tanpa normalisasi (`toLowerCase().trim()`) — sumber bug duplikat akun.
- Jangan lupa `tabIndex={-1}` + `id` di elemen target skip link, dan pindahkan focus manual saat SPA route berganti (native browser tidak melakukan ini otomatis).
- Jangan expose seluruh objek resep ke localStorage untuk "saved"/"meal plan" — cukup simpan `id`, join ulang ke data sumber saat render (single source of truth).

---

*Gunakan file ini sebagai checklist saat kamu menulis ulang project secara mandiri. Untuk detail alasan teknis di balik tiap keputusan, kembali ke riwayat percakapan — tiap poin di atas punya penjelasan lengkap di sana.*