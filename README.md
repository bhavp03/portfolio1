# 🚀 Professional Portfolio & Advanced Blog System

A high-performance, modern web application built for a **Vehicle Controls Engineer**, featuring a dynamic blog engine, real-time engagement tools, and a premium administrative dashboard.

## 🌟 Key Features

### 🏢 Professional Portfolio
- **Dynamic Hero Section**: Interactive branding with particle effects and smooth scroll capabilities.
- **Experience Timeline**: Detailed professional history with company branding and achievement highlights.
- **Project Showcase**: Visual grid of featured engineering projects with direct GitHub integration.
- **Interactive Skills Matrix**: Animated skill tags and domain expertise badges.
- **Smart Contact System**: Integrated contact form with automated email delivery via Nodemailer.

### ✍️ Advanced Blog Engine
- **Admin Dashboard**: Secure login system (`/blog/login`) with session persistence.
- **Full-Featured Editor**: Custom TipTap integration supporting formatting, images, and YouTube embeds.
- **Draft & Publish Workflow**: Full control over post visibility and content management.
- **Instant Management**: Direct "Edit" and "Delete" actions available for administrators across the site.
- **SEO Optimized**: Dynamic metadata generation for titles, keywords, and excerpts for every post.

### 💬 Engagement & Sharing
- **Interactive Like System**: Real-time engagement counter for readers.
- **Threaded Comments**: Optimized discussion system allowing user comments and admin replies.
- **Social Integration**: 
  - Direct share to **LinkedIn** and **X (Twitter)**.
  - "Copy Link" utility for quick sharing.
  - Consistent shared footer with your professional profiles on every page.

## 🛠️ Technical Architecture

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Custom Session-based Admin Auth |
| **Styling** | Tailwind CSS + Framer Motion |
| **Animations** | Framer Motion (Scroll, Hover, Layout transitions) |
| **Icons** | Lucide React |
| **Database ORM** | Supabase-js |
| **Editor** | TipTap Rich Text Editor |
| **Email** | Nodemailer |

## 📐 Design Philosophy
- **Rich Aesthetics**: Premium dark/light mode support using `next-themes`.
- **Micro-Animations**: Subtle hover effects and scroll-triggered transitions for a premium feel.
- **Glassmorphism**: Modern UI elements with backdrop blurs and subtle gradients.
- **Performance**: Static generation where possible, with `force-dynamic` API routes to ensure real-time data accuracy.

---

> [!NOTE]
> This repository is fully configured for automated deployment via **Netlify**, with seamless integration between the manual content management systems and the live database.

> [!TIP]
> To maintain the site, ensure your `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `ADMIN_SECRET` are always up to date in your deployment settings.
