# Horizon Group Backend

Backend API for the Horizon Group recruitment website.

This server is built with Express, Prisma, and PostgreSQL. It powers:

- Admin authentication
- Contact form submissions
- Job management
- News and notice post management
- Resume uploads
- Email notifications
- Cloudinary media storage

## Tech Stack

- Node.js
- Express
- Prisma
- PostgreSQL
- JWT
- Zod
- Multer
- Cloudinary
- Nodemailer

## Project Structure

```text
server/
|-- package.json
|-- prisma/
|   |-- schema.prisma
|   |-- seedAdmin.js
|   `-- migrations/
`-- src/
    |-- app.js
    |-- server.js
    |-- config/
    |   `-- prisma.js
    |-- controllers/
    |-- middleware/
    |-- routes/
    |-- services/
    |-- templates/
    |   `-- emails/
    |-- utils/
    `-- validators/
```

## Features

- Secure Express app with `helmet`, `cors`, and structured request logging
- Admin authentication with JWT and `admin_auth` cookie
- Protected admin routes
- Contact form handling for company, candidate, and IT solution inquiries
- Candidate resume PDF upload to Cloudinary
- Post banner image upload to Cloudinary
- Email notifications for new contact submissions
- Prisma-based database access
- Request validation with Zod
- Rate limiting for login and public contact submission

## Installation

```bash
cd server
npm install
```

## Available Scripts

```bash
npm run dev
npm start
```

- `npm run dev`: starts the server with `nodemon`
- `npm start`: starts the server with Node.js

## Environment Variables

Create a `.env` file inside `server/`.

```env
NODE_ENV=
PORT=
DATABASE_URL=
JWT_SECRET=
LOG_LEVEL=
FRONTEND_ORIGINS=
ALLOW_ADMIN_REGISTER=
ADMIN_BOOTSTRAP_TOKEN=

SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=
CONTACT_COMPANY_EMAIL=
CONTACT_CANDIDATE_EMAIL=
CONTACT_IT_SOLUTION_EMAIL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Environment Variable Notes

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: secret used to sign admin tokens
- `FRONTEND_ORIGINS`: comma-separated allowlist for frontend origins
- `ALLOW_ADMIN_REGISTER`: set to `true` only if public admin registration should be enabled
- `ADMIN_BOOTSTRAP_TOKEN`: optional bootstrap token for secure one-time admin creation
- `SMTP_*`: SMTP credentials used for outgoing mail
- `EMAIL_FROM`: sender address for notification emails
- `CONTACT_COMPANY_EMAIL`: destination address for company inquiries
- `CONTACT_CANDIDATE_EMAIL`: destination address for candidate inquiries
- `CONTACT_IT_SOLUTION_EMAIL`: destination address for IT solution inquiries
- `CLOUDINARY_*`: Cloudinary credentials used for media and resume uploads

## Running the Server

```bash
cd server
npm run dev
```

By default, the server runs on:

```text
http://localhost:5000
```

Base route:

```http
GET /
```

Response:

```text
Hello, Horizon Group!
```

## Database

Prisma uses PostgreSQL.

Schema file:

```text
server/prisma/schema.prisma
```

### Main Models

- `Admin`
- `Contact`
- `CompanyContact`
- `CandidateContact`
- `ItSolutionContact`
- `Job`
- `Post`
- `Category`

### Contact Types

- `COMPANY`
- `CANDIDATE`
- `ITSOLUTION`

### Job Status

- `URGENT_HIRE`
- `VACANCY_AVAILABLE`

### Post Status

- `DRAFT`
- `PUBLISHED`

## Prisma Commands

Common local commands:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

## Authentication

Admin auth supports:

- Login with username or email
- JWT verification
- Cookie-based auth
- Bearer token fallback
- Protected admin routes

Cookie name:

```text
admin_auth
```

Notes:

- Admin login writes an HTTP-only cookie
- Non-GET admin write actions also require a trusted origin or referer
- Registration is blocked by default unless explicitly enabled or a valid bootstrap token is sent

## API Routes

### Public Routes

#### Contacts

Base path:

```text
/api/contacts
```

Endpoints:

- `POST /api/contacts/company`
- `POST /api/contacts/candidate`
- `POST /api/contacts/itsolution`

Notes:

- Candidate route accepts an optional PDF upload
- Resume field name: `resume`
- Public contact submission is rate-limited

#### Jobs

- `GET /api/jobs`

Returns active jobs only.

#### Posts

- `GET /api/posts`
- `GET /api/posts/:id`

Public post endpoints return published posts only.

Supported query params for list endpoint:

- `page`
- `limit`
- `category`
- `from`
- `to`

Allowed categories:

- `news`
- `notice`

### Admin Auth Routes

Base path:

```text
/api/admin
```

Endpoints:

- `POST /api/admin/register`
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/session`

### Admin Dashboard

- `GET /api/admin/dashboard`

### Admin Contact Routes

- `GET /api/admin/contacts`
- `GET /api/admin/contacts/:id`
- `GET /api/admin/contacts/:id/resume`
- `PATCH /api/admin/contacts/:id/status`
- `DELETE /api/admin/contacts/:id`

Supported query params:

- `type=company|candidate|itsolution|all`
- `sort=newest|oldest`
- `page`
- `limit`
- `search`
- `from`
- `to`

Status update fields:

- `isRead`
- `isArchived`

### Admin Post Routes

- `POST /api/admin/posts`
- `GET /api/admin/posts`
- `GET /api/admin/posts/categories`
- `GET /api/admin/posts/:id`
- `PUT /api/admin/posts/:id`
- `DELETE /api/admin/posts/:id`

Notes:

- Banner field name: `banner`
- Allowed image types: JPG, PNG, WEBP
- Max upload size: 5 MB

### Admin Job Routes

- `POST /api/admin/jobs`
- `GET /api/admin/jobs`
- `PUT /api/admin/jobs/:id`
- `DELETE /api/admin/jobs/:id`
- `PATCH /api/admin/jobs/:id/status`

Status update field:

- `isActive`

## File Uploads

### Candidate Resume Upload

- Field name: `resume`
- PDF only
- Max size: 5 MB
- Stored in Cloudinary as a raw file

### Post Banner Upload

- Field name: `banner`
- Allowed MIME types:
  - `image/jpeg`
  - `image/png`
  - `image/webp`
- Max size: 5 MB
- Stored in Cloudinary

## Email Notifications

When a contact is created, the server:

- Sends an internal notification email
- Sends an automatic reply email to the user

Templates exist for:

- Company inquiries
- Candidate inquiries
- IT solution inquiries

## Security

The backend includes:

- `helmet` for security headers
- CORS allowlist using `FRONTEND_ORIGINS`
- Trusted-origin checks for admin write actions
- Login rate limiting
- Contact submission rate limiting
- JWT-based admin protection

## Logging

Requests and server events are logged through:

```text
src/utils/logger.js
```

Each request also gets a request ID for easier tracing.

## Important Notes

- Public job listing only returns active jobs
- Public post listing only returns published posts
- Admin routes require authentication
- Some admin write routes also require trusted origin or referer
- Contact email failures do not block contact creation
- Resume upload failures return a service error response

## Known Issues

- `server/prisma/seedAdmin.js` is not currently safe to rely on as-is and should be fixed before documenting it as a ready-to-run setup script
