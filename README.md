# BadgeFlow 🎫

> Event Management, Simplified.

BadgeFlow is a modern event management platform that helps organizers create, manage, and run successful events with ease. From small meetups to large conferences, BadgeFlow provides all the tools you need in one seamless platform.

## Features 🚀

- **Event Creation & Management**: Create and manage events of any size with ease
- **Attendee Management**: Track registrations, send communications, and manage check-ins
- **Badge Generation**: Create professional badges with custom designs
- **Analytics Dashboard**: Get real-time insights about your events
- **Team Collaboration**: Work together with your team efficiently

## Tech Stack 💻

- **Frontend**: React with Vite, TailwindCSS, ShadCN, Tanstack Router
- **Backend**: Go (Golang)
- **Database**: PostgreSQL
- **Authentication**: ClerkJS
- **API**: RESTful API with Go
- **Database Operations**: SQLC for database operations

## Getting Started 🏁

### Prerequisites

- Go 1.21 or higher
- Node.js 18 or higher
- PostgreSQL 15 or higher
- Clerk account for authentication

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/badgeflow.git

# Navigate to backend directory
cd badgeflow/backend

# Install dependencies
go mod download

# Set up environment variables
cp .env.example .env

# Start the server
go run cmd/server/main.go
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

```env
# Backend
DB_HOST=localhost
DB_PORT=5432
DB_NAME=badgeflow
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_URI=yourdburi
SIGNING_SECRET=yourclerksigningsecret

# Frontend
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_URL=http://localhost:8080
```

## API Documentation 📚

API documentation is available at `/api/docs` when running the server locally.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments 🙏

- Thanks to all contributors who have helped shape BadgeFlow
- Built with ❤️ using Go and React
