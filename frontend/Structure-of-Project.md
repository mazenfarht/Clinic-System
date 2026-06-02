src/
│
├── app/
│ ├── page.tsx
│ ├── book/
│ │ └── page.tsx
│ ├── queue/
│ │ └── page.tsx
│ ├── display/
│ │ └── page.tsx
│ ├── login/
│ │ └── page.tsx
│ └── dashboard/
│ ├── page.tsx
│ ├── loading.tsx
│ └── layout.tsx
│
├── components/
│ ├── Sidebar.tsx
│ ├── QueueCard.tsx
│ ├── PatientForm.tsx
│ ├── WaitingList.tsx
│ ├── StatsCards.tsx
│ ├── DoctorHeader.tsx
│ ├── DeletePatientModal.tsx
│ └── ResetQueueModal.tsx
│
├── hooks/
│ ├── useQueue.ts
│ ├── useAuth.ts
│ └── usePolling.ts
│
├── services/
│ ├── auth.ts
│ ├── queue.ts
│ └── patient.ts
│
├── types/
│ ├── patient.ts
│ ├── queue.ts
│ └── auth.ts
│
├── lib/
│ ├── axios.ts
│ └── utils.ts
│
└── middleware.ts
