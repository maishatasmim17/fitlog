# FITLOG — Workout Library & Gym Companion 🏋️‍♂️⚡

> **Train with intent. Log every set.**  
> FitLog is a dark, high-performance gym companion built for serious lifters. Pick a lift from the curated 12-movement library, lock it into today's focused training plan, track your metrics live, and keep your momentum going.

---

## 🌟 Key Features

1. **Top-Tier Aesthetic & Responsive Navbar**
   - High-contrast neon lime (`#ccff00`) and stealth dark theme inspired by modern performance gear.
   - Interactive navigation links with active pill highlighting.
   - Real-time navbar badge counters: a filled `#ccff00` badge for **Today's Plan** and an outlined pill badge for **Saved** exercises, each routing directly to `/my-plan`.
   - Collapsible mobile navigation menu with seamless touch targets.

2. **Dynamic Workout Library Grid & Live Filters**
   - Responsive 3x4 grid on desktop, 2-column on tablet, and 1-column on mobile.
   - 12 comprehensive exercises targeting all primary muscle groups (Chest, Arms, Legs, Core, Shoulders, Back, Full Body).
   - Instant search by workout name, equipment, or muscle group.
   - Interactive category tags and dynamic **Sort By** dropdown (re-order by **Duration**, **Calories**, or **Rating**).

3. **In-Depth Workout Details Page (`/workout/:id`)**
   - Immersive two-column layout with high-resolution visual demonstration.
   - Comprehensive **Key Specs** panel: Equipment, Difficulty, Sets, Reps, Duration, Calories, and Rating.
   - Step-by-step numbered instructions formatted for quick execution in the gym.
   - One-click **"Add to today's plan"** (with intelligent 5-lift daily limit cap enforcement) and **"Save for later"** bookmarking.

4. **Live My Plan Dashboard (`/my-plan`)**
   - **Metrics Summary Row**: Live metric counters calculating total **Exercises**, total **Minutes**, and total **Calories burned** in real time.
   - Dual-tab navigation between **Today's Plan** and **Saved** workouts with URL sync (`?tab=saved`).
   - Interactive workflow buttons: **"Mark as Done"** (with checkmark feedback and strikethrough state) and **"Remove" (X)**.
   - Custom **"NOTHING HERE YET"** dashed empty states with quick-link call to action back to the library.

5. **Robust State Persistence & Reactive Toast Engine**
   - LocalStorage synchronization so your active plan, saved exercises, and completed status survive page refreshes and browser restarts.
   - Sleek feedback toasts for every user action: lift added, lift saved, workout completed, limits reached, or items removed.
   - Dual-API failover engine (`https://api.abcz.workers.dev/api/fitlog` with automatic fallback to `https://api.api-store.workers.dev/api/fitlog` and local fallback data) ensuring 100% availability.

6. **Custom 404 Experience & Loading States**
   - Branded 404 page for unknown routes.
   - Shimmer skeleton loading animation while workout data is being fetched.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Modern React framework with server and client components, dynamic routing, and fast page generation |
| **React 19** | Declarative UI rendering, hooks, and Context API |
| **Tailwind CSS v4** | Modern utility-first CSS styling, custom theme tokens, responsive layouts, and animations |
| **TypeScript** | Strict static type safety for workout models, API payloads, and state handlers |
| **Lucide React** | Lightweight, modern icon set |
| **LocalStorage Web API** | Client-side persistent storage for active plans and bookmarks |

---
## 🌐 API Endpoints Used

- **Primary API**: `https://api.abcz.workers.dev/api/fitlog`
- **Primary Details**: `https://api.abcz.workers.dev/api/fitlog/:id`
- **Backup API**: `https://api.api-store.workers.dev/api/fitlog`
- **Backup Details**: `https://api.api-store.workers.dev/api/fitlog/:id`


## 📱 Responsive Breakpoints Tested

- **Mobile**: `< 640px` (single column cards, stacked hero, accessible hamburger menu)
- **Tablet**: `640px – 1024px` (2-column library grid, responsive spec panels)
- **Desktop**: `> 1024px` (3-column library grid, 2-column detailed view, side-by-side hero)

