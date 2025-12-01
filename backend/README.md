# Creator Storefront Backend API

A simple Express.js backend API that serves creator statistics data.

## Features

- RESTful API endpoints for creator data
- CORS enabled for frontend integration
- Sample data for 9 creators
- Get all creators or individual creator by ID

## Prerequisites

- Node.js 18.x or higher

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Get All Creators
```
GET http://localhost:3000/api/creators
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Emma Johnson",
    "handle": "emmajohnson",
    "avatar": "https://i.pravatar.cc/150?img=1",
    "followers": 1250000,
    "avgViews": 450000,
    "engagement": 6.8,
    "revenue": 85000
  },
  ...
]
```

### Get Creator by ID
```
GET http://localhost:3000/api/creators/:id
```

**Example:**
```
GET http://localhost:3000/api/creators/1
```

**Response:**
```json
{
  "id": "1",
  "name": "Emma Johnson",
  "handle": "emmajohnson",
  "avatar": "https://i.pravatar.cc/150?img=1",
  "followers": 1250000,
  "avgViews": 450000,
  "engagement": 6.8,
  "revenue": 85000
}
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── creatorsController.js   # Controller logic
│   ├── data/
│   │   └── creators.js             # Sample creator data
│   ├── routes/
│   │   └── creators.js             # API routes
│   └── server.js                   # Express server setup
├── package.json
└── README.md
```

## Customizing Data

To modify or add creator data, edit `src/data/creators.js`:

```javascript
export const creators = [
  {
    id: "1",
    name: "Your Creator Name",
    handle: "handle",
    avatar: "url-to-avatar",
    followers: 1000000,
    avgViews: 250000,
    engagement: 7.5,
    revenue: 50000
  },
  // Add more creators...
];
```

## Environment Variables

You can optionally set the port:
```bash
PORT=3000 npm start
```

Default port is 3000.
