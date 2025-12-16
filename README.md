## Devlog API

Devlog API adalah backend service untuk aplikasi Devlog, sebuah personal project & task management system yang dirancang untuk developer dalam mencatat aktivitas kerja harian (worklogs) per project.

API ini dibangun dengan pendekatan clean architecture, role-based access control, dan soft delete, sehingga siap dipakai sebagai fondasi aplikasi production-grade.

---

## 🚀 Tech Stack

- Node.js
- NestJS
- PostgreSQL (Supabase)
- Supabase Client (tanpa Prisma)
- JWT Authentication
- Docker (opsional)

---

## 🧠 Core Concepts

- User & Admin Separation (RBAC)
- Projects & Daily Worklogs
- Soft Delete (Archive & Restore)
- Audit Logs untuk monitoring admin
- Secure JWT-based Authentication

---

## 📁 Main Features

### Authentication
- Register
- Login
- Get current user (`/auth/me`)

### User Features
- Create & manage projects
- Daily worklog logging
- Edit & soft-delete worklogs
- Profile management

### Admin Features
- User management
- Role assignment
- Project moderation (archive / restore)
- Audit logs monitoring

---

## 🗂️ Database Design (Ringkas)

Main tables:
- `users`
- `roles`
- `projects`
- `worklogs`
- `audit_logs`

---

## 🔐 Authentication & Authorization

- JWT digunakan untuk autentikasi.
- Role-based access control:
  - USER
  - ADMIN
- Ownership checks ditegakkan di level API.

---

## 🧩 Struktur Direktori (Ringkas)

```
src/
├── main.ts
├── app.module.ts
├── infrastructure/
│   ├── supabase.module.ts
│   └── logger/
│       └── audit-logger.module.ts
├── middleware/
│   └── access-token.middleware.ts
├── modules/
│   ├── auth/
│   ├── users/            # termasuk Admin (controllers & guards)
│   ├── project/          # projects + nested worklogs
│   └── audit-logs/
└── ...
```

---

## ⚙️ Environment Variables

Buat file `.env` dengan isi berikut (contoh Anda saat ini):

```env
# Supabase
SUPABASE_URL=https://dwfnszyikmwehldzntcl.supabase.co
DATABASE_URL=postgresql://postgres:0NhcnUsyfTr8j6by@db.dwfnszyikmwehldzntcl.supabase.co:5432/postgres
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Zm5zenlpa213ZWhsZHpudGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MTYyNDUsImV4cCI6MjA4MTE5MjI0NX0.wo7MdXNtN_EgP4ZWn-VL1LQSqQ7YKIqUHmni8OmAWGM
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Zm5zenlpa213ZWhsZHpudGNsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTYxNjI0NSwiZXhwIjoyMDgxMTkyMjQ1fQ.zIqRhHix2wMeXxulya76l2HoJwYOx_DKRWVc-plBrGk
```

Catatan: Jangan commit kredensial sensitif ke repository publik.

---

## ▶️ Menjalankan Proyek

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run start:dev
```

---

## 📌 Notes

- Menggunakan Supabase PostgreSQL (free tier).
- Hanya menggunakan schema publik.
- Tidak ada dependensi cloud eksternal lain.

