📌 Why Create middleware/ Folder?

Because authentication should NOT live in controllers.

Auth middleware will:

Verify JWT

Attach req.admin

Protect /api/admin/*

This keeps architecture clean and scalable.