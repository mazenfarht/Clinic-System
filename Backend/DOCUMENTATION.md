# Clinic Queue System — Backend Documentation

## Overview

This is a **Next.js App Router** backend for a hybrid **Appointment + Queue Management** system. Patients book a specific date/time slot in advance. When their appointment time arrives, they transition into the live waiting queue. The doctor advances the queue using protected endpoints.

---

## Project Structure

```
clinic-queue-system/
├── app/
│   ├── layout.tsx
│   └── api/
│       ├── auth/
│       │   └── login/
│       │       └── route.ts          # POST /api/auth/login
│       ├── book/
│       │   └── route.ts              # POST /api/book
│       ├── slots/
│       │   └── route.ts              # GET  /api/slots
│       ├── queue/
│       │   └── route.ts              # GET  /api/queue
│       ├── next/
│       │   └── route.ts              # POST /api/next  (protected)
│       ├── reset/
│       │   └── route.ts              # POST /api/reset (protected)
│       └── patient/
│           └── [id]/
│               └── route.ts          # DELETE /api/patient/:id (protected)
├── lib/
│   ├── slots.ts                      # Slot generation & availability logic
│   ├── queue.ts                      # Queue operations & booking validation
│   ├── store.ts                      # In-memory singleton store
│   ├── auth.ts                       # JWT helpers
│   └── middleware.ts                 # Auth guard & response helpers
├── types/
│   └── index.ts                      # TypeScript interfaces
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Data Models

### Patient

```ts
interface Patient {
  id: string;              // UUID v4
  name: string;            // Patient full name
  phone: string;           // Digits only, 10–15 chars

  appointmentDate: string; // "YYYY-MM-DD"
  appointmentTime: string; // "HH:mm" — must be a valid clinic slot

  queueNumber: number;     // Auto-assigned sequential number

  status:
    | "scheduled"          // Booked, appointment not yet reached
    | "waiting"            // Appointment time arrived, waiting for doctor
    | "current"            // Currently being seen
    | "done";              // Appointment complete

  bookedAt: string;        // ISO datetime of when booking was created
}
```

### QueueState (in-memory store)

```ts
interface QueueState {
  patients: Patient[];
  currentPatient: Patient | null;
  nextQueueNumber: number;
  totalServedToday: number;
}
```

---

## Clinic Slot Configuration

Slots are generated automatically in `lib/slots.ts`:

| Setting         | Value         |
|-----------------|---------------|
| Start time      | 09:00         |
| End time        | 17:00         |
| Interval        | 30 minutes    |
| Total slots/day | 17            |

Generated slots: `09:00, 09:30, 10:00, 10:30, 11:00, 11:30, 12:00, 12:30, 13:00, 13:30, 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00`

---

## Booking Flow

```
1. Frontend calls GET /api/slots?date=YYYY-MM-DD
   → Receives available slots for that day

2. Patient selects a slot and submits POST /api/book
   → Patient record created with status: "scheduled"
   → Queue number assigned

3. [At appointment time — triggered by frontend polling or server cron]
   → Patient transitions: "scheduled" → "waiting"

4. Doctor calls POST /api/next
   → Pulls the next "waiting" patient into "current"

5. Doctor calls POST /api/next again (after consultation)
   → Previous "current" becomes "done"
   → Next "waiting" patient becomes "current"
```

---

## API Reference

### Public Endpoints (no authentication required)

---

#### `GET /api/slots`

Returns available appointment slots for a date.

**Query Parameters**

| Param  | Type   | Required | Description              |
|--------|--------|----------|--------------------------|
| `date` | string | Yes      | Target date in YYYY-MM-DD |

**Success Response `200`**

```json
{
  "success": true,
  "data": {
    "date": "2026-06-15",
    "availableSlots": ["09:00", "09:30", "10:00", "11:00"]
  }
}
```

**Error Responses**

| Code | HTTP | Description |
|------|------|-------------|
| `MISSING_APPOINTMENT_DATE` | 400 | `date` query param absent |
| `INVALID_APPOINTMENT_DATE` | 400 | Not a valid YYYY-MM-DD date |
| `PAST_APPOINTMENT_DATE` | 400 | Date is before today |

---

#### `POST /api/book`

Books an appointment for a patient.

**Request Body**

```json
{
  "name": "Ahmed Hassan",
  "phone": "01012345678",
  "appointmentDate": "2026-06-15",
  "appointmentTime": "10:30"
}
```

| Field             | Type   | Validation                                  |
|-------------------|--------|---------------------------------------------|
| `name`            | string | Required, max 100 chars                     |
| `phone`           | string | Required, digits only, 10–15 chars          |
| `appointmentDate` | string | Required, YYYY-MM-DD, not in the past       |
| `appointmentTime` | string | Required, HH:mm, must be a valid clinic slot |

**Success Response `201`**

```json
{
  "success": true,
  "message": "Appointment booked successfully.",
  "data": {
    "patient": {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "name": "Ahmed Hassan",
      "phone": "01012345678",
      "appointmentDate": "2026-06-15",
      "appointmentTime": "10:30",
      "queueNumber": 5,
      "status": "scheduled",
      "bookedAt": "2026-06-05T10:00:00.000Z"
    }
  }
}
```

**Error Responses**

| Code | HTTP | Description |
|------|------|-------------|
| `MISSING_NAME` | 400 | `name` absent or empty |
| `NAME_TOO_LONG` | 400 | `name` exceeds 100 characters |
| `MISSING_PHONE` | 400 | `phone` absent |
| `INVALID_PHONE` | 400 | Non-digits or wrong length |
| `MISSING_APPOINTMENT_DATE` | 400 | `appointmentDate` absent |
| `INVALID_APPOINTMENT_DATE` | 400 | Not a valid YYYY-MM-DD date |
| `PAST_APPOINTMENT_DATE` | 400 | Date is before today |
| `MISSING_APPOINTMENT_TIME` | 400 | `appointmentTime` absent |
| `INVALID_APPOINTMENT_TIME` | 400 | Not HH:mm format |
| `INVALID_SLOT` | 400 | Time is not a clinic slot |
| `SLOT_ALREADY_BOOKED` | 409 | Slot taken by another patient |

---

#### `GET /api/queue`

Returns the current queue state.

**Success Response `200`**

```json
{
  "success": true,
  "data": {
    "currentPatient": { "...Patient" },
    "scheduled": [ "...Patient[]" ],
    "waiting": [ "...Patient[]" ],
    "done": [ "...Patient[]" ],
    "totalScheduled": 3,
    "totalWaiting": 2,
    "totalServedToday": 7,
    "nextQueueNumber": 13
  }
}
```

---

### Protected Endpoints (require `Authorization: Bearer <token>`)

---

#### `POST /api/auth/login`

Authenticate as the doctor.

**Request Body**

```json
{ "username": "doctor", "password": "your-password" }
```

**Success Response `200`**

```json
{
  "success": true,
  "data": { "token": "<jwt>" }
}
```

---

#### `POST /api/next`

Advance the queue. Marks the current patient as `done` and pulls in the next `waiting` patient.

**Success Response `200`**

```json
{
  "success": true,
  "message": "Now serving queue number 5 — Ahmed Hassan.",
  "data": {
    "currentPatient": { "...Patient" },
    "queueEmpty": false
  }
}
```

If no waiting patients:

```json
{
  "success": true,
  "message": "No more patients in the waiting queue.",
  "data": { "currentPatient": null, "queueEmpty": true }
}
```

---

#### `DELETE /api/patient/:id`

Remove a patient from the queue by UUID.

**Success Response `200`**

```json
{
  "success": true,
  "message": "Patient has been removed from the queue.",
  "data": {
    "removedId": "f47ac10b-...",
    "removedBy": "doctor",
    "removedAt": "2026-06-05T10:05:00.000Z"
  }
}
```

**Error**

| Code | HTTP | Description |
|------|------|-------------|
| `PATIENT_NOT_FOUND` | 404 | No patient with that ID |

---

#### `POST /api/reset`

Clear all queue data and reset counters.

**Success Response `200`**

```json
{
  "success": true,
  "message": "Queue has been fully reset. All data cleared.",
  "data": {
    "resetAt": "2026-06-05T11:00:00.000Z",
    "resetBy": "doctor"
  }
}
```

---

## Queue Flow (Status Transitions)

```
scheduled
    │  (appointment time arrives — frontend/cron triggers check-in)
    ▼
waiting
    │  (doctor calls POST /api/next)
    ▼
current
    │  (doctor calls POST /api/next again)
    ▼
done
```

The `advanceQueue()` function always picks the `waiting` patient with the **lowest queue number** first — preserving FIFO order among patients who have checked in.

---

## Error Codes Reference

| Code | Meaning |
|------|---------|
| `INVALID_JSON` | Request body is not valid JSON |
| `MISSING_NAME` | `name` field absent or empty |
| `NAME_TOO_LONG` | `name` exceeds 100 characters |
| `MISSING_PHONE` | `phone` field absent |
| `INVALID_PHONE` | Phone is not 10–15 digits |
| `MISSING_APPOINTMENT_DATE` | `appointmentDate` absent |
| `INVALID_APPOINTMENT_DATE` | Not a valid YYYY-MM-DD date |
| `PAST_APPOINTMENT_DATE` | Date is before today |
| `MISSING_APPOINTMENT_TIME` | `appointmentTime` absent |
| `INVALID_APPOINTMENT_TIME` | Not in HH:mm format |
| `INVALID_SLOT` | Time doesn't match a generated clinic slot |
| `SLOT_ALREADY_BOOKED` | Another patient already has this date+time |
| `PATIENT_NOT_FOUND` | No patient found with given ID |
| `MISSING_TOKEN` | No `Authorization` header |
| `EXPIRED` | JWT token has expired |
| `INVALID_SIGNATURE` | JWT signature is invalid |
| `MALFORMED` | JWT is malformed |

---

## TypeScript Interfaces

```ts
interface Patient {
  id: string;
  name: string;
  phone: string;
  appointmentDate: string;   // "YYYY-MM-DD"
  appointmentTime: string;   // "HH:mm"
  queueNumber: number;
  status: "scheduled" | "waiting" | "current" | "done";
  bookedAt: string;
}

interface QueueState {
  patients: Patient[];
  currentPatient: Patient | null;
  nextQueueNumber: number;
  totalServedToday: number;
}

interface SlotsResponse {
  date: string;
  availableSlots: string[];
}

interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

interface ApiError {
  success: false;
  error: string;
  code?: string;
}

type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;
```

---

## cURL Examples

### Get a JWT token

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"doctor","password":"your-password"}'
```

### Check available slots

```bash
curl "http://localhost:3000/api/slots?date=2026-06-15"
```

### Book an appointment

```bash
curl -X POST http://localhost:3000/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Hassan",
    "phone": "01012345678",
    "appointmentDate": "2026-06-15",
    "appointmentTime": "10:30"
  }'
```

### View queue

```bash
curl http://localhost:3000/api/queue
```

### Advance queue (doctor)

```bash
curl -X POST http://localhost:3000/api/next \
  -H "Authorization: Bearer <token>"
```

### Remove a patient (doctor)

```bash
curl -X DELETE http://localhost:3000/api/patient/<id> \
  -H "Authorization: Bearer <token>"
```

### Reset queue (doctor)

```bash
curl -X POST http://localhost:3000/api/reset \
  -H "Authorization: Bearer <token>"
```

---

## Frontend Integration Examples

### Fetch available slots

```ts
async function getAvailableSlots(date: string): Promise<string[]> {
  const res = await fetch(`/api/slots?date=${date}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data.availableSlots;
}
```

### Book an appointment

```ts
async function bookAppointment(data: {
  name: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
}) {
  const res = await fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(`[${json.code}] ${json.error}`);
  return json.data.patient;
}
```

### Poll queue state and auto-check-in scheduled patients

```ts
// Call this periodically (e.g., every 60 seconds) to transition
// "scheduled" patients to "waiting" when their appointment time arrives.
async function syncScheduledPatients(token: string) {
  const res = await fetch("/api/queue");
  const json = await res.json();
  if (!json.success) return;

  const now = new Date();
  const todayDate = now.toISOString().slice(0, 10);
  const nowTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  for (const patient of json.data.scheduled) {
    if (
      patient.appointmentDate === todayDate &&
      patient.appointmentTime <= nowTime
    ) {
      await fetch(`/api/patient/${patient.id}/checkin`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }
}
```

> **Note:** The check-in endpoint (`POST /api/patient/:id/checkin`) can be added as a protected route calling `checkInPatient(id)` from `lib/queue.ts`. The function is already implemented and exported.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
JWT_SECRET=your-strong-secret-here
DOCTOR_USERNAME=doctor
DOCTOR_PASSWORD=your-password
```

---

## Production Notes

- The in-memory store (`lib/store.ts`) is reset on every server restart. For production, replace it with a persistent database (Redis, PostgreSQL, etc.).
- The `checkInPatient()` function is ready to be wired to a scheduled job or a frontend polling mechanism to auto-promote `scheduled` → `waiting`.
- All slot generation constants (`CLINIC_START`, `CLINIC_END`, `SLOT_INTERVAL_MINUTES`) are defined in `lib/slots.ts` and can be moved to environment variables for runtime configuration.
