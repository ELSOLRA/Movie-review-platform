# Movie-review-platform

Examination - Filmrecensionsplattform (course examination)

The backend for a web application to manage movie reviews. A user can register and, once logged in, leave reviews for movies in the database. The backend is built using Node.js, Express, and MongoDB with Mongoose for data modeling.


## Table of Contents

- [Movie-review-platform](#movie-review-platform)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Setup](#setup)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [License](#license)


## Features

- User registration and authentication
- Secure password storage using bcrypt
- JWT-based authentication
- Role-based access control (user and admin roles)
- CRUD operations for movies and reviews


## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ELSOLRA/Movies-review-platform.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

     You can create a `.env` file manually or run the `setup-env` script to set it up interactively.

    **Manual Setup:**

    Create a `.env` file in the root of the project with the following content:

    ```plaintext
    DATABASE_URI=YOUR_DATABASE_URI
    JWT_SECRET=YOUR_JWT_SECRET
    PORT=YOUR_PORT
    URL=YOUR_URL
    ```

    **Interactive Setup:**

    To set up your `.env` file interactively follow this:

    * Run the `setup-env` script:

        ```bash
        npm run setup-env
        ```

    This script will prompt you to enter values for your MongoDB URI, server port, base URL, and JWT secret key. It will then create a `.env` file with the provided values.

4. **Start the server:**

    ```bash
    node app.js
    ```

## Usage

Once your server is running, you can use tools like Postman or Insomnia to interact with the API endpoints.

## API Endpoints

- **POST `/movies`:** Add a new movie.
- **GET `/movies`:** Get a list of all movies.
- **GET `/movies/:id`:** Get details for a specific movie.
- **PUT `/movies/:id`:** Update a specific movie.
- **GET `/movies/:id/reviews`:** Get all reviews for a specific movie.
- **DELETE `/movies/:id`:** Delete a specific movie.
- **POST `/reviews`:** Add a new review.
- **GET `/reviews`:** Get a list of all reviews.
- **GET `/reviews/:id`:** Get details for a specific review.
- **PUT `/reviews/:id`:** Update a specific review.
- **DELETE `/reviews/:id`:** Delete a specific review.
- **POST `/register`:** Register a new user.
- **POST `/login`:** Log in a user.
- **GET `/profile`:** Get user profile information.

## License

This project is licensed under the ISC License - see the [LICENSE.md](License.md) file for details.