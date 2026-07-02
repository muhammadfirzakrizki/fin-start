# 💰 fin-start — Project Blueprint

> **Personal Finance Management App**  
> Dibangun di atas TanStack Start · React 19 · TypeScript · Tailwind CSS v4 · DaisyUI

---

## 📌 Overview

**fin-start** adalah aplikasi manajemen keuangan pribadi modern yang membantu pengguna mencatat, menganalisis, dan merencanakan keuangan mereka secara cerdas. Aplikasi ini dibangun dengan stack full-stack SSR menggunakan TanStack Start (Nitro + React) dengan filosofi **"type-safe from DB to UI"**.

---

## 🧰 Tech Stack

| Layer           | Teknologi                                           |
|-----------------|-----------------------------------------------------|
| Framework       | [TanStack Start](https://tanstack.com/start) (SSR)  |
| UI Library      | React 19 (Server Components ready)                  |
| Language        | TypeScript 6                                        |
| Routing         | TanStack Router (File-based)                        |
| Styling         | Tailwind CSS v4 + DaisyUI v5                        |
| Icons           | Lucide React                                        |
| Server Runtime  | Nitro (Nightly)                                     |
| Testing         | Vitest + Testing Library                            |
| Package Manager | Bun                                                 |
| Linting         | ESLint + Prettier                                   |
| Charts          | ApexCharts (react-apexcharts)                       |
| Database (TODO) | PostgreSQL via Drizzle ORM                          |
| Auth (TODO)     | Better Auth / Lucia Auth                            |
| State (TODO)    | TanStack Query (server state)                       |

---

## 🗂️ Folder Structure (Target Architecture)

```
fin-start/
├── src/
│   ├── routes/                    # File-based routing (TanStack Router)
│   │   ├── __root.tsx             # Root layout (Navbar, Theme, Meta)
│   │   ├── index.tsx              # Landing page / redirect
│   │   ├── (auth)/                # Auth group routes
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── (app)/                 # Protected app routes (authenticated)
│   │   │   ├── _layout.tsx        # App shell (Sidebar + Header)
│   │   │   ├── dashboard.tsx      # Dashboard overview
│   │   │   ├── transactions/
│   │   │   │   ├── index.tsx      # Transactions list
│   │   │   │   └── $id.tsx        # Transaction detail
│   │   │   ├── budgets.tsx        # Budget planner
│   │   │   ├── goals.tsx          # Savings goals
│   │   │   ├── analytics.tsx      # Charts & insights
│   │   │   ├── accounts.tsx       # Bank accounts management
│   │   │   └── settings.tsx       # User preferences
│   │   └── api/                   # API routes (server-only)
│   │       ├── transactions.ts
│   │       ├── budgets.ts
│   │       └── auth.ts
│   │
│   ├── components/                # Reusable UI Components
│   │   ├── ui/                    # Base UI atoms (Button, Input, Modal, etc.)
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Skeleton.tsx
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── charts/                # Chart components
│   │   │   ├── SpendingPieChart.tsx
│   │   │   ├── BalanceTrendChart.tsx
│   │   │   └── CategoryBarChart.tsx
│   │   ├── transactions/          # Transaction-specific components
│   │   │   ├── TransactionList.tsx
│   │   │   ├── TransactionCard.tsx
│   │   │   ├── TransactionForm.tsx
│   │   │   └── TransactionFilter.tsx
│   │   ├── dashboard/             # Dashboard widgets
│   │   │   ├── BalanceCard.tsx
│   │   │   ├── QuickTransfer.tsx
│   │   │   ├── RecentActivity.tsx
│   │   │   └── SpendingOverview.tsx
│   │   └── budgets/               # Budget components
│   │       ├── BudgetCard.tsx
│   │       └── BudgetProgress.tsx
│   │
│   ├── server/                    # Server-side code
│   │   ├── db/
│   │   │   ├── index.ts           # DB connection (Drizzle)
│   │   │   ├── schema.ts          # DB schema definitions
│   │   │   └── migrations/        # DB migrations
│   │   ├── services/              # Business logic
│   │   │   ├── transactionService.ts
│   │   │   ├── budgetService.ts
│   │   │   └── analyticsService.ts
│   │   ├── functions/             # TanStack Server Functions
│   │   │   ├── transactions.ts
│   │   │   ├── budgets.ts
│   │   │   └── goals.ts
│   │   └── mockDb.ts              # [TEMP] Mock data (replace with real DB)
│   │
│   ├── lib/                       # Shared utilities & helpers
│   │   ├── utils.ts               # General utilities
│   │   ├── currency.ts            # IDR formatting helpers
│   │   ├── date.ts                # Date formatting helpers
│   │   └── validators.ts          # Zod schemas & form validators
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useTransactions.ts
│   │   ├── useBudgets.ts
│   │   └── useTheme.ts
│   │
│   ├── types/                     # Global TypeScript types
│   │   └── index.ts
│   │
│   ├── styles.css                 # Global styles + Tailwind imports
│   ├── router.tsx                 # Router configuration
│   └── routeTree.gen.ts           # Auto-generated (jangan diedit)
│
├── public/                        # Static assets
│   └── favicon.ico
│
├── tests/                         # Test files
│   ├── unit/
│   └── integration/
│
├── .env.example                   # Environment variable template
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tsr.config.json
└── PROJECT.md                     <- (file ini)
```

---

## 🎯 Feature Roadmap

### ✅ Phase 1 — Foundation (Current)
- [x] Project scaffolding (TanStack Start + Tailwind v4 + DaisyUI)
- [x] Root layout dengan Header & Footer
- [x] Theme toggle (Dark/Light mode)
- [x] Dashboard page (balance card, recent transactions, quick transfer)
- [x] Transactions page (list + filter by category & search)
- [x] Mock data (server-side mockDb)

---

### 🚧 Phase 2 — Core Features
- [ ] **Add Transaction** — Form modal untuk tambah transaksi baru (income/expense)
- [ ] **Edit & Delete Transaction** — CRUD lengkap untuk transaksi
- [ ] **Transaction Detail Page** — `/transactions/$id` halaman detail
- [ ] **Category Management** — Custom kategori pengguna
- [ ] **Export CSV** — Download laporan transaksi (tombol sudah ada, logic belum)
- [ ] **Real Database** — Migrasi dari mockDb ke PostgreSQL (Drizzle ORM)
- [ ] **Authentication** — Login, Register, Session management
- [ ] **Protected Routes** — Middleware guard untuk route yang perlu auth

---

### 📊 Phase 3 — Analytics & Budgeting
- [ ] **Analytics Page** — Chart pengeluaran per kategori, tren bulanan
- [ ] **Budget Planner** — Set limit budget per kategori per bulan
- [ ] **Budget Progress** — Progress bar visual untuk setiap budget
- [ ] **Monthly Summary** — Ringkasan pemasukan vs pengeluaran per bulan
- [ ] **Spending Insights** — AI-powered tips berdasarkan pola pengeluaran

---

### 🏦 Phase 4 — Advanced Features
- [ ] **Multiple Accounts** — Kelola beberapa rekening bank / dompet digital
- [ ] **Savings Goals** — Set target tabungan dengan progress tracker
- [ ] **Recurring Transactions** — Langganan & cicilan otomatis
- [ ] **Bill Reminders** — Notifikasi tagihan jatuh tempo
- [ ] **Quick Transfer** — Kirim uang antar kontak (simulasi)
- [ ] **Notifications** — Push notification / email digest

---

### 🌐 Phase 5 — Polish & Production
- [ ] **PWA Support** — Install sebagai app di mobile
- [ ] **Responsive Mobile UI** — Bottom navigation untuk mobile
- [ ] **Dark / Light / System Theme** — Preference tersimpan di localStorage
- [ ] **Onboarding Flow** — Wizard setup untuk pengguna baru
- [ ] **i18n** — Dukungan bahasa Indonesia & English
- [ ] **Performance Audit** — Lighthouse score > 95
- [ ] **CI/CD Pipeline** — GitHub Actions → Deploy ke Vercel/Fly.io

---

## 🗄️ Data Models

### `Transaction`
```typescript
type Transaction = {
  id: string;
  userId: string;          // FK -> User
  accountId: string;       // FK -> Account
  amount: number;          // positif = income, negatif = expense
  category: string;
  subcategory?: string;
  description: string;
  date: string;            // ISO 8601
  type: 'income' | 'expense' | 'transfer';
  tags?: string[];
  notes?: string;
  receiptUrl?: string;     // Upload bukti transaksi
  createdAt: Date;
  updatedAt: Date;
}
```

### `Account`
```typescript
type Account = {
  id: string;
  userId: string;
  name: string;            // "BCA Tabungan", "GoPay", etc.
  type: 'bank' | 'ewallet' | 'cash' | 'investment';
  balance: number;
  currency: 'IDR' | 'USD';
  color: string;           // Untuk UI display
  icon: string;
  isDefault: boolean;
  createdAt: Date;
}
```

### `Budget`
```typescript
type Budget = {
  id: string;
  userId: string;
  category: string;
  limit: number;           // Batas pengeluaran
  spent: number;           // Dihitung dari transactions
  period: 'monthly' | 'weekly';
  month: number;           // 1-12
  year: number;
  color: string;
}
```

### `SavingsGoal`
```typescript
type SavingsGoal = {
  id: string;
  userId: string;
  name: string;            // "Liburan Jepang", "MacBook Pro", etc.
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  icon: string;
  color: string;
  isCompleted: boolean;
}
```

### `User`
```typescript
type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  currency: 'IDR' | 'USD';
  locale: 'id-ID' | 'en-US';
  theme: 'dark' | 'light' | 'system';
  createdAt: Date;
}
```

---

## 🧱 Coding Conventions

### Naming
| Jenis               | Convention         | Contoh                      |
|---------------------|--------------------|-----------------------------|
| Component files     | PascalCase         | `TransactionCard.tsx`       |
| Utility files       | camelCase          | `currency.ts`               |
| Route files         | kebab-case         | `transactions.tsx`          |
| Type definitions    | PascalCase         | `type Transaction = {...}`  |
| Server functions    | camelCase + "Fn"   | `getTransactionsFn`         |
| Hooks               | camelCase + "use"  | `useTransactions`           |
| Constants           | SCREAMING_SNAKE    | `MAX_BUDGET_LIMIT`          |

### Component Pattern
```tsx
// Preferred: Named export + Props interface
interface TransactionCardProps {
  transaction: Transaction;
  onDelete?: (id: string) => void;
}

export function TransactionCard({ transaction, onDelete }: TransactionCardProps) {
  // ...
}
```

### Server Functions Pattern
```tsx
// src/server/functions/transactions.ts
import { createServerFn } from '@tanstack/react-start'
import { transactionSchema } from '#/lib/validators'

export const createTransactionFn = createServerFn({ method: 'POST' })
  .validator(transactionSchema)
  .handler(async ({ data }) => {
    // business logic here
    return await transactionService.create(data)
  })
```

### Path Aliases
```
#/*  ->  ./src/*

// Usage:
import { formatIDR } from '#/lib/currency'
import type { Transaction } from '#/types'
```

---

## 🌍 Environment Variables

Buat file `.env` berdasarkan template berikut:

```env
# App
VITE_APP_NAME=fin-start
VITE_APP_URL=http://localhost:3000

# Database (Phase 2+)
DATABASE_URL=postgresql://user:password@localhost:5432/finstart

# Auth (Phase 2+)
AUTH_SECRET=your-super-secret-key-here
AUTH_URL=http://localhost:3000

# Optional: Analytics
VITE_POSTHOG_KEY=
```

---

## 🚀 Development Commands

```bash
# Install dependencies
bun install

# Start development server (port 3000)
bun --bun run dev

# Generate TanStack Router routes
bun run generate-routes

# Run tests
bun --bun run test

# Build for production
bun --bun run build

# Preview production build
bun run preview
```

---

## 🧪 Testing Strategy

| Level              | Tool                | Coverage Target  |
|--------------------|---------------------|------------------|
| Unit Tests         | Vitest              | Utilities, hooks |
| Component Tests    | Testing Library     | UI components    |
| Integration Tests  | Vitest + jsdom      | Server functions |
| E2E Tests (TODO)   | Playwright          | Critical flows   |

### Critical Flows to Test
- [ ] Add / Edit / Delete transaction
- [ ] Filter & search transactions
- [ ] Budget limit exceeded warning
- [ ] Authentication flow
- [ ] Export CSV

---

## 📐 Design System

### Color Palette
```
Primary:    Emerald 500 (#10b981)
Secondary:  Teal 500 (#14b8a6)
Background: #080a0e (near-black)
Surface:    #0f1115
Border:     rgba(255,255,255,0.05)
Text:       White / Gray 400
Danger:     Rose 500 (#f43f5e)
Warning:    Amber 500 (#f59e0b)
```

### Design Tokens
- **Border radius**: `rounded-[2rem]` untuk cards utama, `rounded-2xl` untuk elemen kecil
- **Shadow glow**: `shadow-[0_0_20px_rgba(16,185,129,0.25)]` untuk aksi penting
- **Glassmorphism**: `bg-white/5 backdrop-blur-xl border border-white/5`

---

## 📊 Non-Functional Requirements

| Requirement       | Target                                      |
|-------------------|---------------------------------------------|
| Page Load         | < 2s (LCP)                                 |
| Bundle Size       | < 250KB gzipped (initial JS)               |
| Lighthouse Score  | > 90 (Performance, Accessibility, SEO)     |
| TypeScript        | Strict mode, no `any`                      |
| Accessibility     | WCAG 2.1 AA compliant                      |
| Mobile            | Responsive (320px – 2560px)               |
| Browser Support   | Chrome, Firefox, Safari, Edge (latest 2)   |

---

## 🔗 Useful References

- [TanStack Start Docs](https://tanstack.com/start/latest)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [DaisyUI v5 Docs](https://daisyui.com)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Nitro Docs](https://nitro.build)
- [Lucide Icons](https://lucide.dev/icons)
- [Vitest Docs](https://vitest.dev)

---

## 👤 Author

**Muhammad Firzak Rizki**  
Project started: July 2026

---

> _"Build it right, not just right now."_
