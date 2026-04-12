# Horizon Group Backend API.

## Overview

The Horizon Group Backend is a Node.js/Express REST API that powers the Horizon Group recruitment website. It manages recruitment postings, job inquiries from candidates and companies, admin authentication, and content management. The API provides endpoints for public contact submissions and protected admin operations for managing jobs, posts, and contacts.

**Project**: Horizon Group Recruitment Platform  
**Version**: 1.0.0  
**License**: ISC  
**Author**: Horizon Group

---

## Tech Stack

### Core Framework
- **Node.js** with ES modules
- **Express.js** (v5.2.1) - Web framework
- **Prisma** (v6.19.2) - ORM for PostgreSQL database access

### Security
- **Helmet** (v8.1.0) - HTTP security headers
- **CORS** - Cross-Origin Resource Sharing with configurable origins
- **bcryptjs** (v3.0.3) - Password hashing and encryption
- **jsonwebtoken** (v9.0.3) - JWT authentication
- **express-rate-limit** (v8.2.1) - Rate limiting for public endpoints

### File & Media Management
- **Multer** (v2.0.2) - File upload middleware
- **Cloudinary** (v2.9.0) - Cloud media storage and optimization

### Email & Communication
- **Nodemailer** (v8.0.1) - Email service for contact notifications

### Utilities
- **Zod** (v4.3.6) - Data validation and schema management
- **Morgan** (v1.10.1) - HTTP request logging
- **dotenv** (v17.3.1) - Environment variable management

### Development
- **Nodemon** (v3.1.11) - Auto-restart on file changes

---

## Project Structure

```
server/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   ├── seedAdmin.js           # Database seeding script
│   └── migrations/            # Database migration history
│
├── src/
│   ├── server.js              # Server entry point
│   ├── app.js                 # Express app configuration & middleware
│   │
│   ├── config/
│   │   └── prisma.js          # Prisma client initialization
│   │
│   ├── controllers/           # Request handlers
│   │   ├── admin.controller.js
│   │   ├── adminAuth.controller.js
│   │   ├── contact.controller.js
│   │   ├── job.controller.js
│   │   └── post.controller.js
│   │
│   ├── routes/                # API route definitions
│   │   ├── admin.routes.js
│   │   ├── adminAuth.routes.js
│   │   ├── contact.routes.js
│   │   ├── job.routes.js
│   │   └── post.route.js
│   │
│   ├── middleware/
│   │   ├── adminAuth.middleware.js      # JWT verification & admin protection
│   │   ├── authRateLimit.middleware.js  # Rate limiting for auth endpoints
│   │   ├── contactUpload.middleware.js  # Resume upload handling
│   │   ├── postUpload.middleware.js     # Post image upload handling
│   │   └── requestId.middleware.js      # Request tracking
│   │
│   ├── services/              # Business logic & external integrations
│   │   ├── cloudinary.service.js        # Media storage operations
│   │   ├── contactEmail.service.js      # Email notifications
│   │   └── postMedia.service.js         # Post media management
│   │
│   ├── validators/            # Input validation schemas
│   │   ├── admin.validator.js
│   │   ├── contact.validator.js
│   │   ├── job.validator.js
│   │   └── post.validator.js
│   │
│   ├── utils/
│   │   └── logger.js          # Centralized logging utility
│   │
│   ├── templates/
│   │   └── emails/            # Email templates
│   │
│   └── schemas/               # (Placeholder for additional schemas)
│
├── package.json
└── README.md
```

---

## Database Schema

### Core Models

#### **Admin**
Stores admin user credentials and management.
- `id` (Int, PK)
- `username` (String, unique)
- `email` (String, unique)
- `password` (String, hashed)
- `isActive` (Boolean)
- `createdAt`, `updatedAt`

#### **Contact** (Polymorphic)
Main contact form submissions with type-specific extensions.
- `id` (Int, PK)
- `type` (enum: COMPANY, CANDIDATE, ITSOLUTION)
- `firstName`, `lastName` (String)
- `email`, `phoneNumber`, `postalCode`, `address` (String)
- `message` (String)
- `isRead`, `isArchived` (Boolean)
- Relations: `company`, `candidate`, `itSolution`

**Contact Subtypes:**

**CompanyContact**
- `companyName` (String)
- `position` (enum: MANAGER, SECTION_CHIEF_MANAGER, CHIEF_SECTION_CHIEF, GENERAL_EMPLOYEE)
- `inquiryType` (enum: RECRUITMENT, INTERNATIONAL_STUDENT_SUPPORT, etc.)

**CandidateContact**
- `inquiryType` (enum: INTERVIEWS_CONSULTATIONS, RECRUITMENT, ONLINE_CLASSES, etc.)
- `resumeUrl` (String, nullable)

**ItSolutionContact**
- `companyName` (String)
- `inquiryType` (enum: WEB_DEVELOPMENT, DESIGN_AND_BRANDING, etc.)

#### **Job**
Job posting management.
- `id` (Int, PK)
- `title`, `slug` (String, slug is unique)
- `status` (enum: URGENT_HIRE, VACANCY_AVAILABLE)
- `isActive` (Boolean)
- `companyName`, `employmentType`, `description` (String)
- `skillsRequired`, `workHours`, `holidays` (String)
- `salary`, `location`, `interviewDetails` (String)
- `createdAt`, `updatedAt`

#### **Post** (Blog Content)
Blog posts and articles.
- `id` (Int, PK)
- `title`, `slug` (String, slug is unique)
- `excerpt`, `content` (String, Text for content)
- `bannerImg` (String, nullable)
- `categoryId` (Int, FK)
- `status` (enum: DRAFT, PUBLISHED)
- `publishedAt`, `createdAt`, `updatedAt`

#### **Category**
Blog post categories.
- `id` (Int, PK)
- `name` (String, unique)
- Relations: `posts[]`
- `createdAt`

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Root Endpoint
```
GET /
Response: "Hello, Horizon Group!"
```

### Authentication Endpoints
```
POST     /admin/auth/login           # Admin login
POST     /admin/auth/logout          # Admin logout
POST     /admin/auth/refresh         # Refresh JWT token
```
**Security**: Rate limited, JWT-protected

### Admin Dashboard
```
GET      /admin/dashboard            # Get dashboard statistics
```
**Security**: JWT authentication required

### Admin Contact Management
```
GET      /admin/contacts             # List all contacts with filters
GET      /admin/contacts/:id         # Get contact details
GET      /admin/contacts/:id/resume  # Download resume attachment
PATCH    /admin/contacts/:id/status  # Update contact read/archived status
DELETE   /admin/contacts/:id         # Delete contact
```
**Security**: JWT authentication required

### Admin Job Management
```
POST     /admin/jobs                 # Create new job posting
GET      /admin/jobs                 # List all jobs
GET      /admin/jobs/:id             # Get job details
PUT      /admin/jobs/:id             # Update job posting
PATCH    /admin/jobs/:id/status      # Update job status
DELETE   /admin/jobs/:id             # Delete job
```
**Security**: JWT authentication required

### Admin Post Management
```
POST     /admin/posts                # Create blog post with image upload
GET      /admin/posts                # List all posts (admin view)
GET      /admin/posts/categories     # List all categories
GET      /admin/posts/:id            # Get post details
PUT      /admin/posts/:id            # Update post with image upload
DELETE   /admin/posts/:id            # Delete post
```
**Security**: JWT authentication required, multipart/form-data for uploads

### Public Contact Submission (Rate Limited)
```
POST     /contacts/company           # Company inquiry submission
POST     /contacts/candidate         # Candidate inquiry submission
POST     /contacts/itsolution        # IT Solution inquiry submission
```
**Rate Limiting**: 5 submissions per 15 minutes per IP

### Public Job Endpoints
```
GET      /jobs                       # List active jobs
GET      /jobs/:slug                 # Get job details by slug
```
**Security**: No authentication required

### Public Post Endpoints
```
GET      /posts                      # List published posts
GET      /posts/:slug                # Get post details by slug
```
**Security**: No authentication required

---

## Security Features

### Authentication & Authorization
- **JWT-based authentication** for admin endpoints
- **Admin middleware** (`adminAuth.middleware.js`) verifies and protects routes
- **Trusted admin origin** verification for sensitive operations (create, update, delete)
- **Password hashing** with bcryptjs

### Request Security
- **Helmet.js** for HTTP security headers
- **CORS** with configurable origins from environment
- **Content Security Policy** (CSP) configured
- **Rate limiting** on public registration and auth endpoints
- **Request ID tracking** for security audits

### File Upload Security
- **Multer** for safe file uploads
- **Resume/Document validation** in contactUpload middleware
- **Image validation** for post uploads
- **Cloudinary integration** for secure media storage

### Input Validation
- **Zod schemas** for all endpoints
- Server-side validation for contact submissions, jobs, and posts

---

## Middleware Stack

### Global Middleware (in app.js)
1. **Helmet** - Security headers
2. **CORS** - Cross-origin handling
3. **Request ID** - Tracks requests across logs
4. **Morgan** - HTTP request logging (JSON format)
5. **Express JSON** - Parse JSON bodies

### Route-Specific Middleware
- `protectAdmin` - JWT verification for admin routes
- `requireTrustedAdminOrigin` - CORS origin validation for write operations
- `uploadPostImages` - Multer for post banner and images
- `uploadCandidateResume` - Multer for candidate resumes
- `contactSubmitLimiter` - Rate limiting for contact forms
- `authLimiter` - Rate limiting for authentication attempts

---

## Services

### Cloudinary Service (`cloudinary.service.js`)
Handles cloud media storage and optimization:
- Upload images and media files
- Generate responsive image URLs
- Delete media resources
- Secure signed URLs for assets

### Contact Email Service (`contactEmail.service.js`)
Sends notifications and confirmations:
- Contact form submission confirmations
- Admin notification emails
- Email templating and HTML generation

### Post Media Service (`postMedia.service.js`)
Manages post-related media:
- Upload post banner images
- Organize media by post
- Handle media cleanup on post deletion

---

## Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/horizon_db

# Frontend Origins (CORS)
FRONTEND_ORIGINS=http://localhost:5173,https://horizon-group.com

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@horizon-group.com

# Admin Configuration
ADMIN_DEFAULT_USERNAME=admin
ADMIN_DEFAULT_PASSWORD=change_me_in_production
```

---

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 12+
- Cloudinary account (for media storage)
- SMTP credentials (for email)

### Installation Steps

1. **Clone and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Setup database**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed initial admin (optional)**
   ```bash
   node prisma/seedAdmin.js
   ```

---

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```
Server runs on `http://localhost:5000`

### Production Mode
```bash
npm start
```

### Database Management

**View data with Prisma Studio**
```bash
npx prisma studio
```

**Run migrations**
```bash
npx prisma migrate dev
```

**Reset database (development only)**
```bash
npx prisma migrate reset
```

---

## Logging

The application uses a custom logger utility that outputs structured JSON logs:

```json
{
  "requestId": "uuid-here",
  "method": "POST",
  "path": "/api/contacts/candidate",
  "status": 201,
  "responseTimeMs": 245,
  "contentLength": "1024",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "adminId": "1"
}
```

Logs include:
- Request ID for tracing
- HTTP method and path
- Response status and time
- Admin ID for sensitive operations
- IP address and user agent

---

## Key Features

### ✅ Multi-Type Contact Forms
- Separate forms for companies, candidates, and IT solution providers
- Type-specific inquiry categories
- File upload support (resumes)
- Email notifications to admin

### ✅ Admin Authentication
- Secure JWT-based login
- Session management
- Admin dashboard with statistics

### ✅ Job Management
- Create, read, update, delete job postings
- Job status management (URGENT_HIRE, VACANCY_AVAILABLE)
- Slug-based URLs for SEO
- Active/inactive status control

### ✅ Blog/Post Management
- Create posts with banner images
- Category organization
- Draft and published status
- Image upload with Cloudinary

### ✅ Security
- Rate limiting on public endpoints
- CORS with origin validation
- CSP headers for XSS protection
- JWT authentication for admin
- Input validation with Zod
- Request ID tracking

### ✅ Media Management
- Cloud storage with Cloudinary
- Automatic image optimization
- Resume file handling
- Secure file deletion

---

## Development Workflow

### Making API Changes
1. Update Prisma schema if needed
2. Run `npx prisma migrate dev --name <migration_name>`
3. Update/create controller function
4. Add validation in validator file
5. Define route in routes file
6. Test with Postman or REST client

### Database Schema Changes
1. Modify `prisma/schema.prisma`
2. Run migration: `npx prisma migrate dev --name <description>`
3. Prisma Client automatically updates

---

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Check database credentials

### CORS Errors
- Verify `FRONTEND_ORIGINS` includes your frontend URL
- Check Origin header in request

### Authentication Failures
- Verify `JWT_SECRET` is set
- Check token expiration with `JWT_EXPIRY`
- Ensure token is sent in Authorization header

### File Upload Issues
- Check Cloudinary credentials
- Verify file size limits in middleware
- Ensure CORS allows multipart/form-data

---

## API Documentation Links

For detailed endpoint documentation:
- See route files in `src/routes/`
- Check controller functions in `src/controllers/`
- Review validation schemas in `src/validators/`

---

## License

ISC © Horizon Group.

---

## Contact & Support

For issues, feature requests, or questions about the backend API, contact the Horizon Group development team.
