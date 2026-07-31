# 🍲 Meal Mind - Recipe & Meal Planner

A front-end learning project built to practice production-grade patterns in **React + TypeScript** — authentication flow, protected routing, async state management, and a full feature build-out from search & discovery to weekly meal planning.

This is **not** a tutorial-following project. Every architectural decision — folder structure, state management boundaries, error handling contracts, accessibility choices — was deliberated and documented as part of the build process. See [`BUILD_GUIDE.md`](./BUILD_GUIDE.md) and [`CODE_REVIEW.md`](./CODE_REVIEW.md) for the full reasoning trail.

> ⚠️ **No real backend.** Authentication and persistence are simulated with `localStorage` and artificial network delay. This is intentional — the goal is to master front-end architecture and async UI patterns in isolation, not to ship a production auth system.

---

## ✨ Features

**Authentication**
- Register / Login with full client-side validation
- "Remember Me" (persists across browser restarts vs. tab-session-only)
- Protected routes & guest-only routes (can't reach `/login` while authenticated)
- Session restore on page load without a flash of the wrong screen

**Recipe Discovery**
- Real-time search, debounced — matches by **recipe name or ingredient name**
- Empty-state handling when nothing matches
- Save/unsave recipes, synced across every screen that shows them

**Weekly Meal Planner**
- 7-day × 3-meal (breakfast/lunch/dinner) planning grid
- Pick a recipe per slot via search modal
- Auto-generated shopping list from the current week's plan, grouped by ingredient

**Cross-cutting**
- Fully responsive, mobile-first (320px and up)
- Keyboard-navigable end to end, with skip links and route-change focus management
- WCAG AA color contrast, semantic HTML, screen-reader-tested error states

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript (strict mode) |
| Build tool | Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme`) |
| State | Context API (auth) + custom hooks (everything else) — no Redux/Zustand |
| Testing | Vitest + React Testing Library |
| Persistence | `localStorage` / `sessionStorage` (simulated backend) |

No global state library. No CSS-in-JS. No backend. These are deliberate constraints — see the reasoning in `BUILD_GUIDE.md` for why.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm (or adapt commands to pnpm/yarn)

### Installation

```bash
git clone git@github.com:taniayunita-dev/meal-mind.git
cd meal-mind
npm install
```

### Run locally

```bash
npm run dev
```

App runs at `http://localhost:5173` by default.

### Test accounts (seed data)

| Email | Password |
|---|---|
| `dimas@example.com` | `password123` |
| `sarah@example.com` | `password123` |

Or register a new account — it persists in `localStorage` across refreshes.

### Run tests

```bash
npm test              # watch mode
npm run test:ui       # Vitest UI
npm run test:coverage # coverage report
```

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/          # generic, reusable across any domain
│   └── layout/       # structural (Navbar, AppLayout)
├── features/
│   ├── auth/          # types, service, context, hook, components
│   ├── recipes/        # types, service, hooks, components
│   └── meal-plan/       # types, hooks, components
├── hooks/              # generic hooks (useDebounce, usePageTitle)
├── pages/              # route-level components
├── routes/             # ProtectedRoute, GuestOnlyRoute, route config
├── lib/                # framework-agnostic infrastructure (storage, validators, fake API)
└── test/               # test setup & shared test utilities
```

Full rationale for this structure — including the rule for deciding where a new file belongs — is in [`BUILD_GUIDE.md`](./BUILD_GUIDE.md#3-struktur-folder-final).

---

## 🎨 Design System

Colors, typography, and spacing are defined as semantic design tokens (`primary`, `surface`, `text-muted`, etc.) rather than raw Tailwind defaults — see [`BUILD_GUIDE.md`](./BUILD_GUIDE.md#1-design-tokens-setup-paling-awal) for the full token reference and rationale.

| Token | Value |
|---|---|
| `primary` | `#2F855A` |
| `secondary` | `#DD6B20` |
| `background` | `#FAFAF9` |
| `error` | `#E53E3E` |

---

## 🧪 Testing Strategy

Tests are layered by cost/confidence trade-off, from cheapest to most expensive:

1. **Pure functions** (`validators.ts`, `shoppingList.ts`) — no mocking needed
2. **Services** (`authService.ts`) — mocked `localStorage`, isolated per test
3. **Custom hooks** (`useDebounce`, `useMealPlan`) — `renderHook`, fake timers, manual context injection
4. **Components** (`LoginForm`, `RecipeCard`) — full render + `userEvent`, queried the way a user (or screen reader) would find things, not by test-id

---

## 📌 Known Limitations

This project intentionally scopes out things that would matter in a real production app:

- No real backend — passwords are stored in plain text in `localStorage`. This is a simulation constraint, not a security recommendation.
- No cross-tab auth sync (a `storage` event listener would fix this).
- Shopping list groups ingredients by name but does **not** sum quantities — ingredient quantity is a free-text string (`"3 buah"`, `"secukupnya"`), so numeric aggregation isn't reliably possible without a larger data model change.
- No focus trap in the recipe picker modal (auto-focus + Escape-to-close are implemented; full trap is not).

Full findings from the review pass are documented in [`CODE_REVIEW.md`](./CODE_REVIEW.md).

---

## 🗺️ Roadmap

- [ ] Unit tests for remaining components (`RegisterForm`, `WeeklyGrid`, `RecipePickerModal`)
- [ ] Mobile navigation (bottom nav / hamburger menu) as more pages get added
- [ ] Full focus trap in modals
- [ ] Cross-tab session sync

---

## 📚 Why This Project Exists

Built as a structured learning exercise to go deep on:

React · TypeScript · React Router · Context API · Protected Routes · Async State · Form Validation · Search/Filter/Sort · Component Architecture · Accessibility · Responsive Design · Testing

Every feature was built in deliberate order — types before logic, services before UI, core flows before edge cases — with an explicit review pass afterward. That process is preserved in [`BUILD_GUIDE.md`](./BUILD_GUIDE.md) (how it was built) and [`CODE_REVIEW.md`](./CODE_REVIEW.md) (what was found and fixed on review).

---

## 📄 License

feel free to use this as a reference for your own learning.