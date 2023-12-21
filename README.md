# AutoWorx

This is a **Laravel** project with **Inertia** and **React**.

## Prerequisites

- PHP
- Composer
- Node.js
- npm

## Setup

Install PHP dependencies:

```sh
composer install
```

Copy the example environment file and modify according to your environment:

```sh
cp .env.example .env
```

Generate a new application key:

```sh
php artisan key:generate
```

Run the database migrations:

```sh
php artisan migrate
```

Install React dependencies:

```sh
npm install
```

## Running the Project

Run the frontend code:

```sh
npm run dev
```

Run laravel backend:

```sh
php artisan serve
```

Then, visit `http://localhost:8000` in your web browser.
