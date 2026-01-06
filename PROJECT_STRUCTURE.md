# 📦 McNab Ventures - Project Structure

## 🎯 Complete File Tree

```
mcnabventures/
│
├── 📄 Configuration Files
│   ├── .env.local                     ✅ Environment variables (your PocketBase URL)
│   ├── .env.example                   ✅ Template for environment setup
│   ├── .gitignore                     ✅ Protects .env.local and sensitive files
│   ├── package.json                   ✅ Updated with project name
│   ├── pnpm-lock.yaml                 ✅ Locked dependencies
│   ├── jsconfig.json                  ✅ Path aliases (@/* → src/*)
│   ├── next.config.mjs                ✅ Next.js configuration
│   ├── postcss.config.mjs             ✅ Tailwind CSS config
│   └── eslint.config.mjs              ✅ ESLint configuration
│
├── 📚 Documentation
│   ├── README.md                      ✅ Complete project documentation
│   ├── SETUP_COMPLETE.md              ✅ Setup summary & next steps
│   ├── POCKETBASE_GUIDE.md            ✅ Comprehensive usage guide
│   ├── QUICK_REFERENCE.md             ✅ Quick command reference
│   └── PROJECT_STRUCTURE.md           ✅ This file (project overview)
│
├── 🎨 Public Assets
│   └── public/
│       ├── next.svg
│       ├── vercel.svg
│       └── ... (other assets)
│
└── 💻 Source Code
    └── src/
        │
        ├── 📱 Application (App Router)
        │   └── app/
        │       ├── page.js            ✅ Home page with demo UI
        │       ├── layout.js          ✅ Root layout (updated metadata)
        │       ├── globals.css        ✅ Global styles (Tailwind)
        │       └── favicon.ico        ✅ Favicon
        │       │
        │       └── api/               ✅ API Routes
        │           ├── health/
        │           │   └── route.js   ✅ Health check endpoint
        │           └── collections/
        │               └── [name]/
        │                   └── route.js ✅ Dynamic collection API
        │
        ├── 🧩 Components
        │   └── components/
        │       └── CollectionsList.js ✅ Interactive demo component
        │
        └── 🛠️ Library & Services
            └── lib/
                ├── pocketbase.js      ✅ PocketBase client singleton
                │
                ├── hooks/             ✅ Custom React Hooks
                │   └── usePocketBase.js
                │       ├── useCollection()        - Fetch collections
                │       ├── useRecord()            - Fetch single record
                │       ├── useRealtimeCollection() - WebSocket updates
                │       └── useAuth()              - Auth state
                │
                └── services/          ✅ Service Layer (Business Logic)
                    ├── collections.js
                    │   ├── getRecords()           - Paginated fetch
                    │   ├── getFullList()          - Fetch all
                    │   ├── getRecord()            - Single record
                    │   ├── createRecord()         - Create new
                    │   ├── updateRecord()         - Update existing
                    │   ├── deleteRecord()         - Delete record
                    │   └── subscribeToCollection() - Real-time
                    │
                    └── auth.js
                        ├── loginWithPassword()    - User login
                        ├── register()             - User signup
                        ├── logout()               - Clear auth
                        ├── isAuthenticated()      - Check status
                        ├── getCurrentUser()       - Get user data
                        ├── requestPasswordReset() - Reset flow
                        ├── confirmPasswordReset() - Confirm reset
                        ├── refreshAuth()          - Refresh token
                        └── updateProfile()        - Update user
```

---

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm

### Backend
- **BaaS**: PocketBase
- **SDK**: pocketbase@0.26.5
- **API URL**: https://mcnabventuresapi.up.railway.app

### Features
- ✅ Server-Side Rendering (SSR)
- ✅ Client-Side Rendering (CSR)
- ✅ Real-time WebSocket subscriptions
- ✅ Authentication & Authorization
- ✅ File uploads
- ✅ Dark mode support
- ✅ Responsive design
- ✅ API routes

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────┐         ┌────────────────┐             │
│  │ Server Comps   │         │ Client Comps   │             │
│  │ (SSR, SEO)     │         │ (Interactive)  │             │
│  └────────┬───────┘         └───────┬────────┘             │
│           │                         │                       │
│           └──────────┬──────────────┘                       │
│                      │                                      │
│           ┌──────────▼──────────┐                           │
│           │   Service Layer     │                           │
│           │  - collections.js   │                           │
│           │  - auth.js          │                           │
│           └──────────┬──────────┘                           │
│                      │                                      │
│           ┌──────────▼──────────┐                           │
│           │  PocketBase Client  │                           │
│           │   (Singleton)       │                           │
│           └──────────┬──────────┘                           │
│                      │                                      │
└──────────────────────┼──────────────────────────────────────┘
                       │
                       │ HTTPS/WebSocket
                       │
           ┌───────────▼───────────┐
           │   PocketBase API      │
           │   (Railway Hosted)    │
           └───────────────────────┘
```

---

## 🔄 Data Flow Patterns

### Pattern 1: Server Component (Initial Load)

```
User Request → Next.js Server → PocketBase Client → PocketBase API
                    ↓
              HTML Response (with data)
```

**Use for**: SEO-critical pages, initial page loads

### Pattern 2: Client Component with Hook

```
User Action → React Hook → Service Layer → PocketBase Client → PocketBase API
                                                    ↓
                                          Update Component State
```

**Use for**: Interactive features, dynamic updates

### Pattern 3: Real-time Updates

```
PocketBase API (change) → WebSocket → PocketBase Client → Subscription Callback
                                              ↓
                                      Update Component State
```

**Use for**: Live data, collaborative features

### Pattern 4: API Route

```
Client Request → Next.js API Route → Service Layer → PocketBase API
                        ↓
                  JSON Response
```

**Use for**: Server-side operations, webhooks, integrations

---

## 📊 Component Hierarchy

```
app/layout.js (Root Layout)
│
└── app/page.js (Home Page)
    │
    ├── Server Component: Connection Status
    │   └── Fetches data from PocketBase
    │
    ├── Server Component: Feature Grid
    │   └── Static content
    │
    └── Client Component: CollectionsList
        └── Uses useCollection() hook
            └── Fetches & displays collection data
```

---

## 🎨 Styling Architecture

```
Tailwind CSS 4
│
├── postcss.config.mjs         → PostCSS configuration
├── src/app/globals.css        → Global styles & Tailwind directives
└── Inline Tailwind classes    → Component-level styling
```

**Design System**:
- Color Palette: Zinc grays with dark mode support
- Typography: Geist Sans & Geist Mono fonts
- Responsive: Mobile-first breakpoints
- Dark Mode: System preference based

---

## 🔐 Security Layers

```
1. Environment Variables
   └── .env.local (gitignored)
       └── NEXT_PUBLIC_POCKETBASE_URL

2. PocketBase API Rules
   └── Define in PocketBase Admin Dashboard
       ├── Collection-level permissions
       ├── Record-level rules
       └── Field-level access

3. Authentication
   └── src/lib/services/auth.js
       ├── Token-based auth (stored in authStore)
       ├── Automatic token refresh
       └── Secure logout

4. Next.js API Routes
   └── Server-side validation
       └── Request sanitization
```

---

## 📁 Import Aliases

```javascript
// Configured in jsconfig.json

@/lib/pocketbase           → src/lib/pocketbase.js
@/lib/services/auth        → src/lib/services/auth.js
@/lib/hooks/usePocketBase  → src/lib/hooks/usePocketBase.js
@/components/CollectionsList → src/components/CollectionsList.js
```

---

## 🚀 Development Workflow

```
1. Development
   └── pnpm dev → http://localhost:3000

2. Build
   └── pnpm build → Optimized production build

3. Production
   └── pnpm start → Run production server

4. Linting
   └── pnpm lint → Check code quality
```

---

## 📦 Dependencies

### Production
```json
{
  "next": "16.1.1",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "pocketbase": "0.26.5"
}
```

### Development
```json
{
  "@tailwindcss/postcss": "^4",
  "eslint": "^9",
  "eslint-config-next": "16.1.1",
  "tailwindcss": "^4"
}
```

---

## 🎯 Feature Implementation Status

| Feature | Status | Location |
|---------|--------|----------|
| PocketBase Client | ✅ Done | `lib/pocketbase.js` |
| Collections Service | ✅ Done | `lib/services/collections.js` |
| Auth Service | ✅ Done | `lib/services/auth.js` |
| React Hooks | ✅ Done | `lib/hooks/usePocketBase.js` |
| Demo Home Page | ✅ Done | `app/page.js` |
| Collection Browser | ✅ Done | `components/CollectionsList.js` |
| Health Check API | ✅ Done | `app/api/health/route.js` |
| Collection API | ✅ Done | `app/api/collections/[name]/route.js` |
| Environment Config | ✅ Done | `.env.local`, `.env.example` |
| Documentation | ✅ Done | `README.md`, `POCKETBASE_GUIDE.md`, etc. |
| Git Security | ✅ Done | `.gitignore` |

---

## 🎨 UI Components Catalog

### Built-in Components
- **Home Page** (`app/page.js`)
  - Connection status indicator
  - Feature cards grid
  - Quick links section
  - Responsive layout

- **Collections List** (`components/CollectionsList.js`)
  - Search form
  - Loading states
  - Error handling
  - Data display
  - Refresh functionality

### Component Patterns
```
✅ Server Components for initial data
✅ Client Components for interactivity
✅ Loading states with spinners
✅ Error boundaries with user-friendly messages
✅ Dark mode support throughout
✅ Responsive mobile-first design
```

---

## 📝 Code Quality

```
✅ No linter errors
✅ Follows Next.js 16 best practices
✅ SOLID principles applied
✅ Service layer pattern
✅ Error handling throughout
✅ Comprehensive documentation
✅ Type-safe operations
✅ Secure environment variables
```

---

## 🌐 Deployment Checklist

- [ ] Push code to GitHub
- [ ] Connect to Vercel/Netlify
- [ ] Add environment variables:
  - `NEXT_PUBLIC_POCKETBASE_URL`
- [ ] Configure PocketBase CORS
- [ ] Test production build
- [ ] Set up custom domain (optional)

---

## 🎓 Learning Resources

| Topic | File |
|-------|------|
| Getting Started | `SETUP_COMPLETE.md` |
| Quick Commands | `QUICK_REFERENCE.md` |
| Detailed Guide | `POCKETBASE_GUIDE.md` |
| Full Docs | `README.md` |
| Structure | `PROJECT_STRUCTURE.md` (this file) |

---

**Your Next.js + PocketBase app is fully configured and ready for development! 🚀**

Start building by running: `pnpm dev`
