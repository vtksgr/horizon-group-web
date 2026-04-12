# Horizon Group Web

**Horizon Group Web** is a full-stack web application that serves as both a corporate website and an admin dashboard for recruitment management. It features a modern React frontend, a robust Express.js backend with Prisma ORM, and comprehensive admin controls for managing job postings, blog posts, and client inquiries.

## Project Overview

This project consists of two main applications:
- **Frontend**: A React-based public website and admin dashboard
- **Backend**: An Express.js API server with database management

---

## Frontend

### Technology Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Rich Text Editing**: TipTap
- **Markdown Support**: React Markdown
- **Styling**: CSS
- **Icons**: React Icons

### Key Features
- **Public Website**: Corporate website showcasing company information and job opportunities
- **Job Portal**: Display and filter job postings with detailed job cards
- **Blog/Posts**: Publish and manage blog content with rich text editing
- **Admin Dashboard**: Comprehensive admin panel for content management
- **Authentication**: Secure admin login system
- **Multi-language Support**: Language context for internationalization
- **Rich Text Editor**: TipTap-based editor for creating formatted content
- **Image Upload**: Integration with Cloudinary for media management
- **Responsive Design**: Mobile-friendly UI components (Navbar, Footer, Breadcrumbs)
- **Content Validation**: Contact form validation and submission

### Project Structure
```
client/
├── src/
│   ├── api/           # API integration (Axios, endpoints)
│   ├── components/    # Reusable React components
│   │   ├── admin/     # Admin-specific components
│   │   ├── public/    # Public-facing components
│   │   └── ui/        # Shared UI components
│   ├── pages/         # Page components
│   ├── layouts/       # Layout wrappers
│   ├── routes/        # Route definitions
│   ├── context/       # React context (Language)
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── validators/    # Form validation
│   └── assets/        # Images and static files
```

---

## Backend

### Technology Stack
- **Framework**: Express.js
- **Database**: Prisma ORM
- **Database**: PostgreSQL (managed via Prisma migrations)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcryptjs
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan
- **File Upload**: Multer

### Key Features
- **Admin Authentication**: JWT-based login with secure token management
- **Job Management**: CRUD operations for job postings
- **Post/Blog Management**: Create, edit, and publish blog content
- **Contact Management**: Handle customer inquiries and contact submissions
- **Email Notifications**: Automated email responses for contact forms
- **Image Management**: Cloudinary integration for image storage and optimization
- **Rate Limiting**: Protect against brute force and DoS attacks
- **Request Logging**: Morgan middleware for HTTP request tracking
- **Data Validation**: Zod for schema validation
- **Security Headers**: Helmet middleware for security best practices
- **Error Handling**: Structured error handling and logging

### API Endpoints
- **Authentication**: `/api/auth/` - Admin login/logout
- **Admin Routes**: `/api/admin/` - Admin content management
- **Jobs**: `/api/jobs/` - Job posting endpoints
- **Posts**: `/api/posts/` - Blog post endpoints
- **Contacts**: `/api/contacts/` - Contact form submissions

### Project Structure
```
server/
├── src/
│   ├── controllers/   # Request handlers
│   ├── routes/        # API route definitions
│   ├── middleware/    # Custom middleware
│   ├── services/      # Business logic (Email, Cloudinary, etc.)
│   ├── validators/    # Zod validation schemas
│   ├── schemas/       # Database schemas
│   ├── utils/         # Utility functions
│   ├── templates/     # Email templates
│   ├── config/        # Configuration files
│   ├── app.js         # Express app setup
│   └── server.js      # Server entry point
├── prisma/
│   ├── schema.prisma  # Prisma database schema
│   ├── migrations/    # Database migration history
│   └── seedAdmin.js   # Database seeding script
```

### Database Schema
- **Users**: Admin users with authentication
- **Jobs**: Job postings with status and metadata
- **Posts**: Blog posts with rich content support
- **Contacts**: Customer inquiries and contact submissions
- **Categories**: Post categorization

---

## Setup & Installation

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- PostgreSQL (for backend)
- Cloudinary account (for image storage)

### Environment Variables

Create `.env` files in both `client/` and `server/` directories:

**server/.env**
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@example.com
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
```

**client/.env**
```
VITE_API_BASE_URL=http://localhost:5000
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd horizon-group-web
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   npx prisma migrate dev
   npm run dev
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

---

## Development

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend Scripts
- `npm run dev` - Start development server with auto-reload (Nodemon)
- `npm start` - Start production server

---

## Contributing

Follow these guidelines when contributing:
1. Create feature branches from `main`
2. Follow the existing code structure and naming conventions
3. Write clear commit messages
4. Test changes before submitting

---

## License

UNLICENSED - This project is proprietary to Horizon Group.

---

## Author

Horizon Group
