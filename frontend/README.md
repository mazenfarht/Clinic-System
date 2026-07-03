# 🏥 ClinicQ – Clinic Queue Management System

A modern **Clinic Queue Management System** built with **Next.js 16**, **TypeScript**, and a clean healthcare-focused UI.

ClinicQ streamlines patient flow by providing appointment booking, real-time queue management, and an intuitive dashboard for doctors and clinic staff.

---

## 📸 Preview

> Add screenshots

---

## ✨ Features

### 👨‍⚕️ Doctor Dashboard

- Dashboard overview
- Live queue management
- Patient appointments
- Analytics page
- Settings page

### 📋 Queue Management

- Real-time queue updates
- Current patient display
- Waiting patients
- Completed patients
- Queue number tracking
- Automatic queue progression

### 📅 Appointment Booking

- Patient booking form
- Queue assignment
- Appointment confirmation

### 📺 Waiting Room Display

- Public display screen
- Current patient
- Live queue list
- Auto refresh

### 🔐 Authentication

- Secure login
- Route protection
- Cookie-based authentication
- Protected dashboard pages

---

## 🚀 Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- React Hook Form
- Axios

### Backend

- Node.js
- Express.js
- REST API

---

## 🎨 Design System

The project follows a custom healthcare UI system with:

- Modern Medical SaaS Design
- Responsive Layout
- Soft Color Palette
- Accessible Components
- Clean Typography
- Consistent Spacing
- Reusable UI Components

---

## 📂 Project Structure

```text
src/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── book/
│   │   └── page.tsx
│   ├── display/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   └── dashboard/
│       ├── page.tsx
│       ├── queue/
│       │   └── page.tsx
│       └── analytics/
│           └── page.tsx
│
├── components/
│   ├── Sidebar.tsx
│   ├── PatientForm.tsx
│   └── AnalyticsChart.tsx
│
├── hooks/
│   ├── useQueue.ts
│   └── useAuth.ts
│
├── context/
│   └── DateContext.tsx
│
├── services/
│   ├── auth.ts
│   ├── queue.ts
│   ├── patient.ts
│   ├── book.ts
│   └── slots.ts
│
├── types/
│   ├── patient.ts
│   ├── queue.ts
│   ├── auth.ts
│   └── slots.ts
│
├── lib/
│   ├── axios.ts
│   └── notify.ts
│
└── middleware.ts
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/ClinicQ.git
```

Install dependencies

```bash
npm install
```

Create environment variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

Run production

```bash
npm run start
```

---

## 🔒 Authentication

The application uses:

- JWT Authentication
- Cookies
- Route Protection
- Middleware / Proxy

---

## 📈 Future Improvements

- React Query
- WebSocket live updates
- Email notifications
- SMS notifications
- Multi-doctor support
- Patient profiles
- Dark Mode
- PWA Support
- Role-based permissions

---

## 💡 Why this project?

This project was built to simulate a real-world clinic management workflow while practicing modern frontend architecture, reusable components, API integration, and scalable application design.

---

## 👨‍💻 Author

## **Mazen Mostafa**

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
