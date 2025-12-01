# Creator Storefront

A React-based storefront application for showcasing creator statistics including followers, engagement metrics, average views, and revenue data.

## Features

- Display creator stats in a responsive grid layout
- Shows Name, Handle, Avatar, Followers, Avg Views, Engagement, and Revenue
- Integrates with your existing API
- Fully responsive design for mobile and desktop
- Loading and error states
- Modern UI with gradient design

## Tech Stack

- React 18
- Vite (Fast build tool)
- CSS3 (with flexbox and grid)
- Fetch API for data fetching

## Prerequisites

- Node.js 18.x or higher (recommended: 20.x or 22.x)
- npm 9.x or higher

## Installation

1. Clone or navigate to the project directory:
```bash
cd creator-storefront
```

2. Install dependencies:
```bash
npm install
```

3. Configure your API endpoint:
```bash
cp .env.example .env
```

4. Edit `.env` file and set your API base URL:
```
VITE_API_BASE_URL=https://your-api-endpoint.com/api
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## API Integration

The app expects your API to have an endpoint that returns creator data:

**Endpoint**: `GET {VITE_API_BASE_URL}/creators`

**Expected Response Format**:
```json
[
  {
    "id": "1",
    "name": "Creator Name",
    "handle": "creatorhandle",
    "avatar": "https://example.com/avatar.jpg",
    "followers": 1500000,
    "avgViews": 250000,
    "engagement": 5.8,
    "revenue": 50000
  }
]
```

Alternative response formats are also supported:
```json
{
  "creators": [...],
  "data": [...]
}
```

## Project Structure

```
creator-storefront/
├── src/
│   ├── components/
│   │   ├── CreatorCard.jsx       # Individual creator card component
│   │   ├── CreatorCard.css
│   │   ├── CreatorGrid.jsx       # Grid layout for creators
│   │   └── CreatorGrid.css
│   ├── services/
│   │   └── creatorApi.js         # API service for fetching data
│   ├── App.jsx                   # Main app component
│   ├── App.css
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
├── .env                          # Environment variables
├── .env.example                  # Example environment file
├── package.json
└── README.md
```

## Customization

### Changing Colors
Edit the gradient colors in `src/App.css` and `src/components/CreatorCard.css`

### Modifying Stats Display
Edit `src/components/CreatorCard.jsx` to add or remove stat fields

### API Response Format
If your API returns data in a different format, modify `src/services/creatorApi.js`

## Troubleshooting

**Node version warnings**: The app works with Node 18.x but you may see warnings. Consider upgrading to Node 20.19+ or 22.12+ to remove warnings.

**API connection errors**: Verify your `.env` file has the correct `VITE_API_BASE_URL` and that your API is accessible.

**CORS errors**: Ensure your API server has CORS enabled for your frontend domain.
