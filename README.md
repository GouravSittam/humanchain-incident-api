# HumanChain AI Safety Incident Log API

This project implements a RESTful API service to log and manage hypothetical AI safety incidents, developed as a take-home assignment for HumanChain's Backend Intern position.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Package Manager**: npm

## Features

- RESTful API for managing AI safety incidents
- CRUD operations (Create, Read, Delete) for incidents
- MongoDB integration for data persistence
- User-friendly web interface with responsive design
- Validation of user inputs
- Error handling

## Project Structure

```
├── backend/
│   ├── controllers/      # API route handlers
│   ├── middleware/       # Express middleware
│   ├── models/           # MongoDB/Mongoose models
│   ├── routes/           # API route definitions
│   ├── utils/            # Helper utilities
│   ├── seed.js           # Sample data seeding script
│   └── server.js         # Express app setup
├── src/                  # Frontend React application
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API service functions
│   ├── types/            # TypeScript type definitions
│   └── ...
├── .env                  # Environment variables
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB connection (connection string provided in `.env`)

### Installation

1. Clone the repository (or extract the zip file)

```bash
git clone https://github.com/GouravSittam/humanchain-incident-api
cd humanchain-incident-api
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables (already included in `.env` file)

```
PORT=7777
MONGODB_URI=mongodb+srv://gouravsittam:BixBie2C7oFv2j4Z@devspark.yx5wf.mongodb.net/humanchain
NODE_ENV=development
```

### Running the Application

1. Seed the database with sample incidents (optional)

```bash
npm run seed
```

2. Start the development server (both backend and frontend)

```bash
npm run dev
```

This will start:

- Backend API server on http://localhost:7777
- Frontend development server on http://localhost:3000

### API Endpoints

#### GET /api/incidents

- Retrieves all incidents
- Response: 200 OK with a JSON array of incident objects

Example:

```
curl -X GET http://localhost:7777/api/incidents
```

#### POST /api/incidents

- Creates a new incident
- Request Body: JSON object with title, description, and severity
- Response: 201 Created with the newly created incident object

Example:

```
curl -X POST http://localhost:7777/api/incidents \
  -H "Content-Type: application/json" \
  -d '{"title":"New AI Bias Issue","description":"An AI system showed gender bias in job recommendations.","severity":"Medium"}'
```

#### GET /api/incidents/:id

- Retrieves a specific incident by ID
- Response: 200 OK with a JSON object of the incident, or 404 Not Found

Example:

```
curl -X GET http://localhost:7777/api/incidents/60f1a5b9e6b3f32d4c8b9a1b
```

#### DELETE /api/incidents/:id

- Deletes a specific incident by ID
- Response: 204 No Content if successful, or 404 Not Found

Example:

```
curl -X DELETE http://localhost:7777/api/incidents/60f1a5b9e6b3f32d4c8b9a1b
```

## Database Schema

The incident schema includes:

- `id`: Automatically generated unique identifier
- `title`: Short summary of the incident (string, required)
- `description`: Detailed description (string, required)
- `severity`: Assessment level - "Low", "Medium", or "High" (string, required)
- `reported_at`: Timestamp of when the incident was logged (date, auto-generated)

## Design Decisions

1. **Mongoose ODM**: Used for easier database operations and schema validation
2. **RESTful API Design**: Followed REST principles for clear, predictable API endpoints
3. **Error Handling**: Implemented comprehensive error handling for better user experience
4. **Validation**: Added input validation to ensure data integrity
5. **Web Interface**: Created a user-friendly UI to interact with the API
6. **MongoDB**: Used MongoDB for its flexibility and ease of use

## Challenges

- Ensuring proper error handling across the application
- Setting up proper validation for API inputs
- Creating a responsive and intuitive user interface
#
