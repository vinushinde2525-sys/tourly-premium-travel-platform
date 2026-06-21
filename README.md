<div align="center">

# 🚀 SecretCoder

### A premium, gamified e-learning platform built with React, Three.js & Framer Motion

[![Live Demo](https://img.shields.io/badge/Live%20Demo-secretfrontend.netlify.app-6366f1?style=for-the-badge&logo=netlify&logoColor=white)](https://secretfrontend.netlify.app/)

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?style=flat-square&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.0-0055FF?style=flat-square&logo=framer&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State-orange?style=flat-square)
![Status](https://img.shields.io/badge/Status-Live-success?style=flat-square)

**[🌐 View Live App](https://secretfrontend.netlify.app/)**

</div>

---

## 📌 Overview

**SecretCoder** is a full-featured, production-quality online learning platform inspired by the design language of **Linear, Stripe, Vercel, and Apple**. It combines a free-to-learn course catalog with a gamified XP/badge system, an interactive 3D-animated UI built with **React Three Fiber**, and a fully responsive, dark-mode-ready interface.

This project was built to demonstrate real-world frontend engineering skills beyond a typical CRUD app — including **3D graphics integration, complex state management, animation choreography, and component architecture at scale.**

> 💡 **For recruiters / hiring managers:** This single project touches routing architecture, global state design, 3D rendering performance, animation systems, and design-system thinking — see the [Skills Demonstrated](#-skills-demonstrated) section below for a quick scan.

---

## ✨ Live Preview

| Home (3D Orbital Hero) | Dashboard (Glass UI) | Leaderboard |
|:---:|:---:|:---:|
| Animated planet system, particle field, video-blended hero | Glass ambient lighting, animated charts, progress rings | Glowing podium, animated rankings |

🔗 **[secretfrontend.netlify.app](https://secretfrontend.netlify.app/)**

---

## 🧠 Skills Demonstrated

| Area | What's in this repo |
|---|---|
| **React Architecture** | Lazy-loaded routes, code-splitting, custom hooks, reusable component library |
| **3D / WebGL** | 6+ custom Three.js scenes (React Three Fiber + Drei) — orbital systems, distortion materials, particle fields, cursor-reactive lighting |
| **Animation Engineering** | Framer Motion — shared layout transitions, scroll-triggered reveals, staggered grids, magnetic buttons, animated counters, text-mask reveals |
| **State Management** | Zustand store with localStorage persistence — auth, enrollment, progress tracking, gamification logic |
| **Design Systems** | Token-based Tailwind config, reusable Glass/Card/Button/Modal/Tabs/Accordion/Pagination components |
| **Performance** | IntersectionObserver-gated video/3D rendering, manual chunk-splitting, `prefers-reduced-motion` support, optimized bundle (route + vendor chunks) |
| **UX Detail** | Empty states, skeleton loaders, toast feedback, accessible focus states, dark mode, fully responsive (mobile → ultra-wide) |

---

## 🏆 Features

### 🎓 Learning Experience
- 📚 **12+ free courses** across web dev, data science, and cloud
- 🎥 Embedded video lessons with progress tracking
- 📝 Personal notes per lesson (saved locally)
- 🧪 Interactive quizzes with instant scoring + retake flow
- 🏅 Auto-generated, downloadable **completion certificates**

### 🎮 Gamification
- ⚡ **XP/points system** — earn points for lessons, quizzes, and course completion
- 🏆 **Tiered ranking** (Starter → Bronze → Silver → Gold → Diamond)
- 🥇 **Live leaderboard** with animated podium
- 🎖️ **Achievement timeline** — unlockable badges with progress tracking

### 🎨 Premium UI/UX
- 🌌 Custom **3D animated backgrounds** per page (Three.js / React Three Fiber)
- 🎬 Cinematic video-background hero sections
- ✨ Glassmorphism cards, magnetic buttons, cursor-follow lighting
- 🌗 Full dark mode support
- 📱 Fully responsive — desktop, tablet, and mobile

### 🔐 Core Functionality
- 👤 Profile management (editable identity, avatar picker)
- 🔖 Bookmark / save-for-later courses
- 🔍 Real-time search + multi-filter course discovery
- 📊 Dashboard with animated charts (Recharts) and progress visualization

---

## 🛠️ Tech Stack

```
Frontend     React 18 · Vite 5 · React Router 6
Styling      Tailwind CSS · custom design tokens
Animation    Framer Motion
3D/WebGL     Three.js · React Three Fiber · Drei
State        Zustand (persisted to localStorage)
Charts       Recharts
UI Feedback  React Hot Toast
Icons        Lucide React
```

---

## 📂 Project Structure

```
secret-coder-v3/
├── public/
│   ├── img/              # Course thumbnails, instructor photos, banners
│   └── video/            # Cinematic background video assets
├── src/
│   ├── components/
│   │   ├── common/       # PageHeader, ProgressBar, QuizComponent, VideoPlayer...
│   │   ├── course/       # CourseCard
│   │   ├── dashboard/    # DashboardStats
│   │   ├── gamification/ # CertificateComponent
│   │   ├── layout/       # Navbar, Footer
│   │   ├── three/        # 6 custom R3F scenes (Hero, Dashboard, Leaderboard, etc.)
│   │   └── ui/            # GlassCard, MagneticButton, AnimatedCounter, TextReveal,
│   │                       Dropdown, Tabs, Accordion, Pagination, VideoBackground, CursorGlow
│   ├── data/              # Course catalog, achievements, testimonials, leaderboard mock
│   ├── hooks/              # useDarkMode, useSearch, useScrollTop
│   ├── pages/               # Home, Courses, CourseDetail, Lesson, Dashboard,
│   │                          Leaderboard, Achievements, Profile, About, NotFound...
│   ├── store/                # Zustand global store
│   ├── utils/                  # Formatters, helpers
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/secret-coder.git
cd secret-coder

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🌐 Deployment

This project is deployed on **Netlify**:

🔗 **[https://secretfrontend.netlify.app/](https://secretfrontend.netlify.app/)**

To deploy your own copy:
1. Push this repo to GitHub
2. Connect the repo in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

---

## ⚡ Performance Notes

- Routes and 3D scenes are **lazy-loaded** with `React.lazy` + `Suspense`
- Manual Vite chunk-splitting separates React, Framer Motion, Three.js, Recharts, and UI libraries into independent vendor bundles for better caching
- Background videos pause automatically when scrolled out of view (`IntersectionObserver`)
- All animations respect `prefers-reduced-motion`
- WebGL canvases use capped device pixel ratios to stay performant on mid-range devices

---

## 🗺️ Roadmap

- [ ] Real backend integration (currently uses local mock data + localStorage)
- [ ] OAuth authentication
- [ ] Instructor-side course creation flow
- [ ] Real-time leaderboard via WebSocket

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](../../issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

No license file is currently included in this repository — add a `LICENSE` file (MIT is a common choice for portfolio projects) before treating this as open source.

---

<div align="center">

**[🌐 Live Demo](https://secretfrontend.netlify.app/)** · Built with ❤️ for learners worldwide

</div>
