# AI Job Description

Build a web application that uses an AI API to automatically generate a Job Description based on information provided by the user.

---

## Tech Stack

### Backend

* **Runtime:** Node.js, TypeScript
* **Framework:** Express.js
* **ORM:** Prisma
* **Database:** PostgreSQL
* **AI Service:** gemini-3.1-flash-lite
* **Validation:** Zod

### Frontend

* **Framework:** React (Vite), TypeScript
* **State Management & Data Fetching:** TanStack
* **Styling:** TailwindCSS
* **Icons:** Lucide React

---

## Data Flow

Hệ thống được thiết kế theo mô hình **Kiến trúc phân tầng khép kín**, đảm bảo tính độc lập và phân chia trách nhiệm rõ ràng (Separation of Concerns):

```text
User Input
     ↓
Frontend Form
     ↓
Backend API
     ↓
AI API
     ↓
JSON Response
     ↓
Save data
     ↓
Frontend Display
```

## Installation

### Prerequisites

Before launching the project, ensure your environment has the following installed:

* Node.js
* PNPM
* PostgreSQL
* Google Gemini API Key

---

### 1. Configure Environment Variables

Install project dependencies:

```bash
pnpm install
```

Create a `.env` file in the `apps/backend` directory:

```env
DATABASE_URL="postgresql://postgres.exbnmjssqqkqmkfssyfv:your_password_here@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.exbnmjssqqkqmkfssyfv:your_password_here@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"

NODE_ENV= 'development'

FRONTEND_PORT='5173'
BACKEND_PORT='5000'

GEMINI_API_KEY='your_google_gemini_api_key_here'

```

Replace the values ​​corresponding to your PostgreSQL and Gemini API configuration.

---

### 2. Setup Database

Navigate to the Backend folder:

```bash
cd apps/backend
```

Initialize the database structure and generate the Prisma Client:

```bash
npx prisma migrate dev
npx prisma generate
```

### 3. Launching the Application

From the project root directory:

#### Run both Frontend + Backend

```bash
pnpm dev
```

#### Backend

```bash
pnpm dev:backend
```

The default backend runs at:

```text
http://localhost:5000
```

#### Frontend

```bash
cd apps/frontend
pnpm dev:frontend
```

The default frontend runs at:

```text
http://localhost:5173
```

---
