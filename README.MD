# AI Job Description

## Setup Environment Variables

From the project's root directory (`ai-job-description`), create the environment files from the template:

### Backend

```bash
cd backend
cp .env.example .env
```

Open the `.env` file and update the necessary values:

### Frontend

```bash
cd frontend
cp .env.example .env
```

Open the `.env` file and update the necessary values:

## Run with Docker

Go back to the project's root directory and restart the entire system:

```bash
docker compose up --build -d
```

## Verify Services

Sau khi khởi động thành công:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

Kiểm tra trạng thái container:

```bash
docker compose ps
```

Xem log:

```bash
docker compose logs -f
```

## Stop Services

```bash
docker compose down
```
