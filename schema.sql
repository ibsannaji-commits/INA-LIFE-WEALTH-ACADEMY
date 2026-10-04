create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role text not null default 'student' check (role in ('student','instructor','mentor','admin','finance')),
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  duration_days integer not null default 30,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id),
  membership_tier text not null,
  status text not null default 'pending' check (status in ('pending','active','completed','cancelled')),
  created_at timestamptz not null default now(),
  unique(student_id, course_id)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) on delete set null,
  enrollment_id uuid references public.enrollments(id) on delete set null,
  amount numeric(12,2) not null,
  currency text not null default 'ETB',
  method text,
  transaction_ref text unique,
  status text not null default 'pending' check (status in ('pending','confirmed','failed','refunded')),
  verified_by uuid references public.profiles(id) on delete set null,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  certificate_id text unique not null,
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id),
  completion_date date not null,
  duration_hours integer default 30,
  status text not null default 'issued' check (status in ('pending','issued','revoked')),
  created_at timestamptz not null default now()
);

create index if not exists enrollments_student_idx on public.enrollments(student_id);
create index if not exists payments_ref_idx on public.payments(transaction_ref);
create index if not exists certificates_id_idx on public.certificates(certificate_id);

insert into public.courses (title, slug, description) values
('Mindset Jijjiiruu','mindset','Mindset, confidence, discipline, goals, habits, resilience and leadership.'),
('Financial Literacy & Wealth Creation','wealth','Budgeting, saving, debt, business basics, risk and long-term planning.'),
('Kaartaa Jaalalaa','love','Self-worth, communication, trust, boundaries and conflict resolution.'),
('Digital Marketing & Online Income','digital','Brand, content, marketing, funnels and digital product launch.'),
('Entrepreneurship & Small Business Building','entrepreneurship','Customer discovery, business model, pricing and a 90-day plan.'),
('AI, Productivity & Digital Work Skills','ai','Responsible AI workflows, productivity and digital portfolio.'),
('Leadership, Communication & Teamwork','leadership','Ethical leadership, feedback, teams, conflict and decisions.'),
('Trainer, Instructor & Mentor Development','instructor','Learning outcomes, lesson plans, facilitation, rubrics and micro-teaching.')
on conflict (slug) do nothing;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.payments enable row level security;
alter table public.certificates enable row level security;

drop policy if exists "public active courses" on public.courses;
create policy "public active courses" on public.courses for select to anon, authenticated using (active = true);

drop policy if exists "own profile select" on public.profiles;
create policy "own profile select" on public.profiles for select to authenticated using (id = auth.uid());

drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "own enrollment select" on public.enrollments;
create policy "own enrollment select" on public.enrollments for select to authenticated using (student_id = auth.uid());

drop policy if exists "own enrollment insert" on public.enrollments;
create policy "own enrollment insert" on public.enrollments for insert to authenticated with check (student_id = auth.uid());

drop policy if exists "own payment select" on public.payments;
create policy "own payment select" on public.payments for select to authenticated using (student_id = auth.uid());

drop policy if exists "public issued certificate verify" on public.certificates;
create policy "public issued certificate verify" on public.certificates for select to anon, authenticated using (status = 'issued');

-- Admin writes should go through a protected server function until your RBAC policies are complete.
