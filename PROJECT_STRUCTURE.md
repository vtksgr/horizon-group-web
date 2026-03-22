# Current Project Structure

## Root

```text
horizon-group-web/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── api/
│       │   ├── axios.js
│       │   ├── contactApi.js
│       │   ├── home.api.js
│       │   └── postApi.js
│       ├── assets/
│       │   ├── logo.svg
│       │   ├── react.svg
│       │   └── images/
│       │       ├── common/
│       │       ├── icon/
│       │       └── logo/
│       ├── components/
│       │   ├── admin/
│       │   │   ├── LogoutButton.jsx
│       │   │   ├── PostCategorySelect.jsx
│       │   │   ├── PostEditorFields.jsx
│       │   │   ├── PostImageField.jsx
│       │   │   └── PostStatusSelect.jsx
│       │   ├── public/
│       │   │   └── JobCard.jsx
│       │   └── ui/
│       │       ├── breadcrumbs/
│       │       │   └── Breadcrumbs.jsx
│       │       ├── footer/
│       │       │   └── Footer.jsx
│       │       ├── navbar/
│       │       │   ├── Navbar.jsx
│       │       │   └── Topbar.jsx
│       │       └── post/
│       │           └── PostContent.jsx
│       ├── context/
│       │   └── LanguageContext.jsx
│       ├── hooks/
│       │   ├── useLocalizedCopy.js
│       │   └── usePostForm.js
│       ├── layouts/
│       │   ├── AdminLayout.jsx
│       │   └── PublicLayout.jsx
│       ├── pages/
│       │   ├── admin/
│       │   │   ├── auth/
│       │   │   │   ├── authStorage.js
│       │   │   │   └── RequireAdminAuth.jsx
│       │   │   ├── candidateContacts/
│       │   │   │   ├── CandidateContactList.jsx
│       │   │   │   └── CandidateContactView.jsx
│       │   │   ├── companyContacts/
│       │   │   │   ├── CompanyContactList.jsx
│       │   │   │   └── CompanyContactView.jsx
│       │   │   ├── dashboard/
│       │   │   │   └── Dashboard.jsx
│       │   │   ├── itSolutionContacts/
│       │   │   │   ├── ItSolutionContactList.jsx
│       │   │   │   └── ItSolutionContactView.jsx
│       │   │   ├── jobs/
│       │   │   │   ├── JobForm.jsx
│       │   │   │   ├── JobList.jsx
│       │   │   │   └── JobView.jsx
│       │   │   ├── login/
│       │   │   │   └── AdminLogin.jsx
│       │   │   └── posts/
│       │   │       ├── PostForm.jsx
│       │   │       ├── PostList.jsx
│       │   │       └── PostView.jsx
│       │   └── public/
│       │       ├── contacts/
│       │       │   ├── CandidateContact.jsx
│       │       │   ├── CompanyContact.jsx
│       │       │   └── ItSolutionContact.jsx
│       │       ├── home/
│       │       │   ├── Home.jsx
│       │       │   └── sections/
│       │       │       ├── CareerAcademySection.jsx
│       │       │       ├── CurriculumSection.jsx
│       │       │       ├── FaqSection.jsx
│       │       │       ├── HeroSection.jsx
│       │       │       ├── LatestPost.jsx
│       │       │       ├── OurStrength.jsx
│       │       │       ├── OurVision.css
│       │       │       ├── OurVision.jsx
│       │       │       ├── ProgressSection.jsx
│       │       │       ├── ServiceFlow.jsx
│       │       │       └── ServiceSection.jsx
│       │       ├── policies/
│       │       │   └── PrivacyPolicy.jsx
│       │       ├── post/
│       │       │   ├── Post.jsx
│       │       │   └── PostDetail.jsx
│       │       ├── profile/
│       │       │   ├── AboutUs.jsx
│       │       │   ├── CompanyOverview.jsx
│       │       │   ├── CompanyProfile.jsx
│       │       │   └── Greeting.jsx
│       │       └── services/
│       │           ├── Careers.jsx
│       │           ├── EducationalServices.jsx
│       │           ├── Faq.jsx
│       │           ├── ItSolution.jsx
│       │           ├── Jobs.jsx
│       │           └── Services.jsx
│       ├── routes/
│       │   ├── AdminRoutes.jsx
│       │   └── PublicRoutes.jsx
│       └── utils/
│           └── slugify.js
└── server/
    ├── package.json
    ├── prisma/
    │   ├── schema.prisma
    │   ├── seedAdmin.js
    │   └── migrations/
    │       ├── migration_lock.toml
    │       ├── 20260216130939_init/
    │       ├── 20260216135725_make_inquiry_optional/
    │       ├── 20260217150302_db/
    │       ├── 20260219123513_update_job_structure/
    │       ├── 20260219150201/
    │       ├── 20260222132312_add_admin/
    │       ├── 20260225143533_add_post_banner_thumbnail/
    │       ├── 20260225145641_add_post_banner_thumbnail02/
    │       ├── 20260226150429_remove_post_thumbnail/
    │       ├── 20260228142002_add_contact_status_and_job_active/
    │       └── 20260321141555_add_it_solution_contact/
    └── src/
        ├── app.js
        ├── server.js
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
        ├── templates/
        │   └── emails/
        │       ├── candidateEmail.js
        │       ├── companyEmail.js
        │       └── itSolutionEmail.js
        ├── utils/
        │   └── logger.js
        └── validators/
            ├── admin.validator.js
            ├── contact.validator.js
            ├── job.validator.js
            └── post.validator.js
```

