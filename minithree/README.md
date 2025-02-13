# Mini Project #3 - NextJS + MySQL
## Todo List Tracker

---
# Key Features

* Easy tracking of Todo list of daily items
* Date tracking
* Completion ticker

1.	Frontend (Next.js):
* Use Next.js to for dynamic and responsive user interface.
* Leverage server-side rendering (SSR), static site generation (SSG), or client-side rendering (CSR).
* Implement a form for user input (e.g., data submission).
* Apply Next.js features like API routes for server-side logic, dynamic routing, and modular components.
2.	Backend (Next.js API Routes):
* Set up API routes in Next.js to handle server-side logic.
* Create at least 3 API endpoints (e.g., GET, POST, and PUT/DELETE) to interact with the database.
* Use a database (e.g. MySQL via Prisma ORM) to persist data.
3.	Database Integration:
* Configure a database connection (MySQL).
* Implement CRUD operations to interact with the database.
* The database is hosted locally.
4.	Integration:
* Use native Fetch to Next/server to send requests to your Next.js API routes.


## Installation & Run

To run the application:

* cd minithree
* npm install @prisma/client prisma
* npx prisma init
* npm install -D tailwindcss@latest postcss autoprefixer
* npm run dev

---
# Thank You!

This is using template with a minimal setup to get Next.js working with local hosted MySQL.

Currently, two official libraries are used:

- [@Prisma ORM](https://github.com/prisma/prisma/README.md) uses [Prisma Client](https://www.prisma.io/docs/orm/prisma-client/)
- [@Next.js](https://nextjs.org/docs/) is a React framework for building full-stack web applications
