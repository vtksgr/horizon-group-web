📌 Why Create middleware/ Folder?

Because authentication should NOT live in controllers.

Auth middleware will:

Verify JWT

Attach req.admin

Protect /api/admin/*

This keeps architecture clean and scalable.

server/
├─ .env
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ prisma/
│  ├─ schema.prisma
│  ├─ seedAdmin.js
│  └─ migrations/
│     ├─ ...existing migration folders...
│     └─ migration_lock.toml
└─ src/
   ├─ app.js
   ├─ server.js
   ├─ config/
   │  └─ prisma.js
   ├─ controllers/
   │  ├─ admin.controller.js
   │  ├─ adminAuth.controller.js
   │  ├─ contact.controller.js
   │  ├─ job.controller.js
   │  └─ post.controller.js
   ├─ middleware/
   │  ├─ adminAuth.middleware.js
   │  ├─ authRateLimit.middleware.js
   │  ├─ contactUpload.middleware.js
   │  ├─ postUpload.middleware.js
   │  └─ requestId.middleware.js
   ├─ routes/
   │  ├─ admin.routes.js
   │  ├─ adminAuth.routes.js
   │  ├─ contact.routes.js
   │  ├─ job.routes.js
   │  └─ post.route.js
   ├─ services/
   │  ├─ cloudinary.service.js
   │  ├─ contactEmail.service.js
   │  └─ postMedia.service.js
   ├─ utils/
   │  └─ logger.js
   ├─ validators/
   │  ├─ admin.validator.js
   │  ├─ contact.validator.js
   │  ├─ job.validator.js
   │  └─ post.validator.js
   └─ schemas/   (optional; currently empty)
