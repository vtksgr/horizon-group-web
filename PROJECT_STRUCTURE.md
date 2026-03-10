# Current Project Structure

## Root

```text
horizon-group-web/
├── client/
│   └── src/
│       ├── api/
│       │   ├── axios.js
│       │   └── home.api.js
│       ├── assets/
│       │   ├── images/
│       │   │   ├── common/
│       │   │   ├── icon/
│       │   │   └── logo/
│       │   ├── logo.svg
│       │   └── react.svg
│       ├── components/
│       │   ├── public/
│       │   │   └── JobCard.jsx
│       │   └── ui/
│       │       ├── breadcrumbs/
│       │       ├── footer/
│       │       └── navbar/
│       ├── layouts/
│       │   ├── AdminLayout.jsx
│       │   └── PublicLayout.jsx
│       ├── pages/
│       │   └── public/
│       │       ├── home/
│       │       │   ├── Home.jsx
│       │       │   └── sections/
│       │       ├── AboutUs.jsx
│       │       ├── CandidateContact.jsx
│       │       ├── Careers.jsx
│       │       ├── CompanyContact.jsx
│       │       ├── CompanyOverview.jsx
│       │       ├── CompanyProfile.jsx
│       │       ├── EducationalServices.jsx
│       │       ├── Faq.jsx
│       │       ├── Greeting.jsx
│       │       ├── Jobs.jsx
│       │       ├── Post.jsx
│       │       ├── PostDetail.jsx
│       │       ├── PrivacyPolicy.jsx
│       │       └── Services.jsx
│       ├── routes/
│       │   ├── AdminRoutes.jsx
│       │   └── PublicRoutes.jsx
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
└── server/
    └── src/
        ├── config/
        │   └── prisma.js
        ├── controllers/
        │   ├── admin.controller.js
        │   ├── adminAuth.controller.js
        │   ├── contact.controller.js
        │   ├── job.controller.js
        │   └── post.controller.js
        ├── middleware/
        │   ├── READEME.md
        │   ├── adminAuth.middleware.js
        │   ├── authRateLimit.middleware.js
        │   ├── contactUpload.middleware.js
        │   ├── postUpload.middleware.js
        │   └── requestId.middleware.js
        ├── routes/
        │   ├── admin.routes.js
        │   ├── adminAuth.routes.js
        │   ├── contact.routes.js
        │   ├── job.routes.js
        │   └── post.route.js
        ├── services/
        │   ├── cloudinary.service.js
        │   ├── contactEmail.service.js
        │   └── postMedia.service.js
        ├── utils/
        │   └── logger.js
        ├── validators/
        │   ├── admin.validator.js
        │   ├── contact.validator.js
        │   ├── job.validator.js
        │   └── post.validator.js
        ├── app.js
        └── server.js
```

## Current Empty Files (0 bytes)

- `client/src/routes/AdminRoutes.jsx`
- `client/src/routes/PublicRoutes.jsx`
- `client/src/layouts/AdminLayout.jsx`
- `client/src/pages/public/Jobs.jsx`

