# Buchers - Unique & Vast System  

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/TypeScript-Language-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/SCSS-Styling-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-Animations-0055FF?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Lenis-SmoothScroll-111?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Biome-Linting-111?style=for-the-badge" />
</p>

<p align="center">
  A modern web application with geometric design, smooth animations, and premium interactive components.
</p>

---

## 🚀 Tech Stack  

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)  
- **Language:** [TypeScript](https://www.typescriptlang.org/)  
- **Styling:** [SCSS](https://sass-lang.com/) + [Tailwind CSS](https://tailwindcss.com/)  
- **Animations:** [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://github.com/darkroomengineering/lenis) (Smooth Scroll)  
- **Tooling:** [Biome](https://biomejs.dev/) (Linting & Formatting)  

---

## ✨ Key Features  

- **Geometric Design System:** Sharp edges and structured visual hierarchy  
- **Immersive UX:**  
  - Custom interactive cursor  
  - Smooth scrolling via Lenis  
  - Animated content reveals with Framer Motion  
- **Interactive Components:**  
  - Hero video backgrounds  
  - Sidebar navigation  
  - Live status indicators  

---

## 📂 Project Structure  

```bash
src/
├── app/
│   ├── components/      # UI Components (HeroVideo, CustomCursor, etc.)
│   ├── explore/         # Explore page route
│   ├── global/          # Global page route
│   ├── menu/            # Menu system (dynamic slug support)
│   ├── orders/          # Order management system
│   ├── layout.tsx       # Root layout with SmoothScroll & CustomCursor
│   └── page.tsx         # Landing page (System v1.0 Dashboard)
├── styles/              # Global SCSS styles
