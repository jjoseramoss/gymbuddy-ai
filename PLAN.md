# GymBuddy AI — Plan

## Project Snapshot (Current)

- Tech: Next.js (App Router), React 19, TypeScript, Tailwind CSS v4
- Status: Frontend-only MVP prototype using `localStorage` for data
- Routes:
  - `/` redirects to `/home`
  - `/home` dashboard-like home screen with shortcuts
  - `/workouts` lists workouts + small stats (total, last 7 days)
  - `/workouts/new` create a workout (title, exercises, sets, optional notes)
  - `/coach` mock “AI Coach” chat with canned replies (saved in `localStorage`)
  - `/profile` simple goal selector (saved in `localStorage`)
- Navigation:
  - Mobile: bottom tab bar (Home / Workouts / Coach / Profile)
  - Desktop: top nav header + “Log workout” button

## MVP Definition (Target)

### 1) Landing Page + Auth

**Goal**: A polished public landing experience with signup/login.

- Landing page
  - Strong brand/design
  - Explains purpose and how it works
  - Clear CTA buttons: `Sign up` / `Log in`
- Authentication
  - Email/password sign up + login
  - Session handling (protected routes)
  - Log out

### 2) Main Dashboard

**Goal**: First screen after login; quick insights + entry points.

- Key graphs (v1)
  - Workouts per week
  - Total volume trend (or sets/reps trend)
  - Streak / consistency indicator
- Quick actions
  - Create workout
  - View workouts
  - Jump to AI Buddy

### 3) Workouts (CRUD)

**Goal**: Full workout management tied to the logged-in user.

- Create workout
- Read/list workouts
- View workout detail
- Update workout
- Delete workout
- Optional v1 extras
  - Search/filter
  - Templates
  - Exercise history (per exercise)

### 4) AI Buddy Tab (Workout-Aware Chat)

**Goal**: Chatbot can read your workouts and reference them.

- Chat UI (keep the current UX direction)
- Backend chat endpoint
  - Provides workout context (recent workouts, PRs, patterns)
  - Returns assistant responses
- Behaviors (v1)
  - Summarize last workout
  - Suggest next session based on history
  - Answer questions like “what did I bench last week?”

## Future (Post-MVP)

### Social System

- User profiles
  - Public-facing profile + customization
- Friends/following
- Feed
  - Post workouts
  - Like/comment
  - Basic privacy controls

## Implementation Roadmap (Order)

1. Replace `/home` as the authenticated dashboard and add a public landing route (e.g. `/` landing, `/app` authenticated).
2. Implement auth + protected routing.
3. Move `localStorage` data model to a backend database and per-user ownership.
4. Implement full workouts CRUD via API.
5. Implement AI Buddy endpoint that uses workouts as context.

## Notes / Decisions To Confirm

- Auth provider choice (e.g. Supabase/Auth.js/Clerk)
- DB choice (e.g. Postgres via Supabase)
- AI provider choice (OpenAI, etc.) and whether responses should be streamed
- Data model details (exercise set structure looks good already: `sets: { reps?, weightLb? }[]`)
