# NextJS Todo Application

A comprehensive todo application built with Next.js, featuring user authentication, categories, priorities, sharing, notifications, and a dashboard.

![Todo App Screenshot](https://picsum.photos/800/450)

## Features

- **User Authentication**
  - Email/password authentication
  - OAuth integration with Google and GitHub
  - Protected routes for authenticated users
  - User profile management

- **Todo Management**
  - Create, read, update, and delete todos
  - Set due dates and track completion status
  - Assign priorities (Low, Medium, High, Urgent)
  - Categorize todos for better organization
  - Mark todos as complete/incomplete

- **Categories**
  - Create custom categories with color coding
  - Filter todos by category
  - Manage categories (rename, change color, delete)

- **Advanced Filtering & Sorting**
  - Filter by status (active/completed)
  - Filter by priority level
  - Filter by category
  - Search todos by text
  - Sort by due date, priority, or creation date

- **Dashboard & Analytics**
  - Overview of todo statistics
  - Completion rate tracking
  - Priority distribution
  - Category breakdown
  - Trend analysis by month

- **Collaboration**
  - Share todos with other users
  - Set permission levels (view, edit, admin)
  - Track shared todos
  - Notifications for shared activities

- **Notifications**
  - Real-time notifications for shared todos
  - Due date reminders
  - Priority updates
  - Mark notifications as read

## Technology Stack

- **Frontend**
  - Next.js 15.x
  - React 19.x
  - Tailwind CSS 4.x
  - Material UI Components

- **Backend**
  - Next.js API Routes
  - NextAuth.js for authentication
  - Prisma ORM for database operations

- **Database**
  - MySQL

- **Testing**
  - Jest
  - React Testing Library
  - MSW (Mock Service Worker)

## Prerequisites

- Node.js 18.18.0 or later
- MySQL database
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nextjs-todo-app.git
   cd nextjs-todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="mysql://username:password@localhost:3306/todo_db"

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key

   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_ID=your-github-id
   GITHUB_SECRET=your-github-secret

   # Internal API Key (for notifications system)
   INTERNAL_API_KEY=your-internal-api-key
   ```

4. Initialize the database schema:
   ```bash
   npx prisma db push
   # or
   yarn prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── src/
│   ├── app/              # App router pages
│   │   ├── api/          # API routes
│   │   │   ├── auth/     # Authentication endpoints
│   │   │   ├── todos/    # Todo endpoints
│   │   │   ├── categories/ # Category endpoints
│   │   │   └── notifications/ # Notification endpoints
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # Dashboard page
│   │   ├── profile/      # User profile page
│   │   ├── categories/   # Categories management page
│   │   └── page.js       # Home page
│   ├── components/       # Reusable components
│   │   ├── auth/         # Authentication components
│   │   ├── categories/   # Category components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── notifications/ # Notification components
│   │   ├── sharing/      # Todo sharing components
│   │   ├── TodoForm.jsx  # Todo form component
│   │   ├── TodoItem.jsx  # Todo item component
│   │   └── TodoList.jsx  # Todo list component
│   ├── lib/              # Utilities and helpers
│   │   └── prisma.js     # Prisma client
│   └── providers/        # Context providers
│       └── AuthProvider.jsx # Authentication provider
├── middleware.js         # NextAuth middleware for route protection
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest setup
└── tailwind.config.js    # Tailwind CSS configuration
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js authentication endpoints

### Todos

- `GET /api/todos` - Get all todos for the authenticated user
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `POST /api/todos/:id/share` - Share a todo with another user
- `GET /api/todos/:id/share` - Get all users who have access to a todo
- `DELETE /api/todos/:id/share` - Remove a user's access to a todo

### Categories

- `GET /api/categories` - Get all categories for the authenticated user
- `POST /api/categories` - Create a new category
- `GET /api/categories/:id` - Get a specific category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Notifications

- `GET /api/notifications` - Get all notifications for the authenticated user
- `PUT /api/notifications/:id` - Mark a notification as read
- `DELETE /api/notifications/:id` - Delete a notification

## Testing

The application includes comprehensive testing with Jest and React Testing Library:

- Unit tests for components
- Integration tests for API routes
- End-to-end tests for key user flows

Run tests with:

```bash
npm test
# or
yarn test
```

Run tests with coverage:

```bash
npm test:coverage
# or
yarn test:coverage
```

## Development Guidelines

### Code Style

- Follow the project's ESLint configuration
- Use functional components with hooks
- Implement proper error handling
- Add JSDoc comments for functions and components

### State Management

- Use React hooks for local state
- Use context providers for global state
- Leverage SWR for data fetching and caching

### Authentication

- Always use the authentication middleware for protected routes
- Implement proper permission checks for shared resources
- Use secure HTTP-only cookies for sessions

### Database Operations

- Use Prisma transactions for operations that affect multiple tables
- Implement proper error handling and validation
- Apply database constraints and indexes for performance

### Testing

- Write tests for all new features
- Maintain test coverage above 70%
- Use mock services for external dependencies

## Deployment

This application can be deployed to various platforms:

### Vercel (Recommended)

```bash
npm install -g vercel
vercel login
vercel
```

### Docker

A Dockerfile is provided for containerized deployment:

```bash
docker build -t nextjs-todo-app .
docker run -p 3000:3000 nextjs-todo-app
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Next.js team for the amazing framework
- Prisma team for the great ORM
- Tailwind CSS for the utility-first CSS framework
- NextAuth.js for the authentication solution
