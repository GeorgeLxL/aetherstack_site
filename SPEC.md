# Senior Team Systems - Landing Page Specification

## Project Overview
- **Project Name**: Senior Team Systems Landing Page
- **Type**: Marketing website with admin panel
- **Core Functionality**: Showcase IoT/web/mobile development services, team portfolio, client evaluations; admin panel for CRUD operations
- **Target Users**: Business clients seeking senior-level development teams

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Supabase (Auth + Database)

## UI/UX Specification

### Color Palette
- **Background**: `#FAFAFA` (neutral off-white)
- **Surface**: `#FFFFFF` (white)
- **Text Primary**: `#0A0A0A` (near black)
- **Text Secondary**: `#6B7280` (gray-500)
- **Accent Primary**: `#2563EB` (blue-600)
- **Accent Secondary**: `#10B981` (emerald-500)
- **Accent Tertiary**: `#F97316` (orange-500)
- **Dark Background**: `#0F172A` (slate-900)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: H1: 48px/56px, H2: 36px/44px, H3: 24px/32px
- **Body**: 16px/24px

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Page Sections

### 1. Hero Section
- Full-width banner, split layout (50/50)
- Left: Headline + subheadline + CTA buttons
- Right: Abstract connected system illustration (SVG)

### 2. Services Section
- 2x2 grid on desktop, stacked on mobile
- 4 service tiles with icons (Web/ERP, IoT, Mobile, Architecture)

### 3. Process Section
- Horizontal timeline with 4 steps

### 4. Portfolio Section
- Grid of case study cards
- Data fetched from Supabase (work_items table)

### 5. Differentiation Section
- 4 boxes: No junior developers, No outsourcing, No half-finished systems, No "we'll figure it out later"

### 6. Team Section
- 4 team member cards with skills
- Data fetched from Supabase (team_members table)

### 7. Client Evaluations Section
- Grid of client testimonial cards with ratings
- Data fetched from Supabase (client_evaluations table)

### 8. CTA Section
- Full-width with dark background

### 9. Footer
- 3-4 columns with links

## Admin Page (`/admin`)

### Authentication
- Supabase Auth (email/password)
- Protected route with login page

### Dashboard Sections
1. **Team Members** (`/admin/team`) - CRUD operations
2. **Work Items** (`/admin/work`) - CRUD operations
3. **Client Evaluations** (`/admin/evaluations`) - CRUD operations

## Database Schema (Supabase)

Create these tables in your Supabase project:

```sql
-- Team Members table
create table team_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  skills text[] default '{}',
  icon text,
  created_at timestamp with time zone default now()
);

-- Work Items table
create table work_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  challenge text,
  solution text,
  result text,
  created_at timestamp with time zone default now()
);

-- Client Evaluations table
create table client_evaluations (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  company text,
  rating integer default 5 check (rating >= 1 and rating <= 5),
  feedback text,
  created_at timestamp with time zone default now()
);
```

## Admin Setup

1. Go to `/admin/login`
2. First user to sign up will become the admin
3. Subsequent users cannot register - only the admin can sign in

> **Important:** After creating the admin account, remove the `service_role_key` from client-side code or ensure only admin users can access the admin panel.

## Environment Variables

Add these to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Running the Project

```bash
npm install
npm run dev
```

## Access

- **Landing Page**: `http://localhost:3000/`
- **Admin Login**: `http://localhost:3000/admin/login`
- **Admin Panel**: `http://localhost:3000/admin` (after login)

## Acceptance Criteria

1. Landing page renders all 9 sections correctly
2. Responsive design works on mobile/tablet/desktop
3. Admin page accessible at /admin (manual URL)
4. Authentication works for admin
5. CRUD operations work for team members, work items, client evaluations
6. No console errors on page load
