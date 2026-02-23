server/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   │
│   ├── config/
│   │   ├── prisma.js
│   │   ├── cloudinary.js
│   │   └── mailer.js
│   │
│   ├── controllers/
│   │   └── admin.controller.js
│   │   ├── contact.controller.js
│   │   ├── news.controller.js
│   │   └── job.controller.js
│   │
│   ├── routes/
│   │   ├── contact.routes.js
│   │   ├── admin.routes.js
│   │   ├── news.routes.js
│   │   └── job.routes.js
│   │
│   ├── middleware/
│   │   ├── adminAuth.middleware
│   │
│   ├── validators/
│   │   ├── admin.validator.js
│   │   ├── contact.validator.js
│   │   ├── news.validator.js
│   │   └── job.validator.js
│   │
│   ├── utils/
│   │   └── slugify.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── package.json
└── README.md
