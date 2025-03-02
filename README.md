### **Backend README**

# Trustcrow API

## Features

- **Express.js:** A minimalist web framework for Node.js.
- **Prisma:** An ORM for database management.
- **ESLint:** For linting JavaScript code.
- **Pre-configured Routes:** Basic routing setup to get started with.
- **Environment Variables:** Uses .env file for environment configuration.
- **Nodemon:** For auto-restarting the server during development.
- **Swagger:** API documentation using Swagger UI.

## Project Structure

```bash
trustcrow-api/
├── .env
├── .env.example
├── .gitignore
├── jest.config.ts
├── package.json
├── prisma/
│   ├── migrations/
│   │   └── 20250302173216_add_user_task_relation/
│   │       └── migration.sql
│   ├── migration_lock.toml
│   └── schema.prisma
├── README.md
├── src/
│   ├── component/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.validation.ts
│   │   ├── task/
│   │   │   ├── task.controller.ts
│   │   │   ├── task.routes.ts
│   │   │   ├── task.service.ts
│   │   │   ├── task.validation.ts
│   │   │   ├── task.repository.ts
│   │   │   └── task.response.ts
│   │   ├── user/
│   │       ├── user.repository.ts
│   │       ├── user.response.ts
│   │       └── user.service.ts
│   ├── error/
│   │   ├── error.ts
│   │   └── validation.error.ts
│   ├── index.ts
│   ├── middleware/
│   │   ├── jwt.ts
│   │   └── ValidationMiddleware.ts
│   ├── swagger.yaml
│   └── utils/
│       ├── encryption.ts
│       └── types.d.ts
├── tsconfig.json
└── types/
    └── express.d.ts
└── vercel.json
```

## Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- PostgreSQL database

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Chu-rill/trustcrow-api.git
```

2. Navigate to the project directory:

```bash
cd trustcrow-api
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file based on the .env.example:

```bash
cp .env.example .env
```

5. Update the .env file with your environment variables:

```bash
PORT=4000
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=1h
ALLOWED_URL=http://localhost:3000
DATABASE_URL=your_database_url
```

6. Initialize Prisma and run migrations:

```bash
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```

7. Start the development server:

```bash
npm run dev
```

## Usage

1. Open http://localhost:{PORT} in your browser to see the app running.
2. Access the Swagger documentation at http://localhost:{PORT}/api/v1/docs.
3. Customize routes by modifying files in the component folder.

## Available Scripts

1. npm start: Starts the server in production mode.
2. npm run dev: Starts the server with Nodemon for auto-reloading during development.

## License

This project is licensed under the MIT License.
