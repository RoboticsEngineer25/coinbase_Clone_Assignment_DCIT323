# Backend Integration Guide

This document provides step-by-step instructions to integrate the Node.js/Express backend with your React frontend.

## What Was Changed

### Backend Updates

1. **Enhanced Crypto Model** - Now includes all fields expected by the frontend:
   - `change7d` - 7-day percentage change
   - `marketCap` - Market capitalization
   - `volume` - 24h trading volume
   - `supply` - Total supply
   - `color` - Hex color code for the asset
   - `sparkline` - Array of prices for chart visualization

2. **Updated Auth Controller** - Now accepts both formats:
   - `firstName` + `lastName` (from frontend SignUp)
   - `name` (for other clients)

3. **Improved Crypto Controller** - Supports all additional fields when creating cryptocurrencies

### Frontend Additions

1. **API Service** (`src/services/api.js`) - Central API client for all backend communication
2. **useAuth Hook** (`src/hooks/useAuth.js`) - Custom hook for authentication operations
3. **useCrypto Hook** (`src/hooks/useCrypto.js`) - Custom hook for cryptocurrency data
4. **Environment Config** (`.env.local`) - Backend URL configuration

## Setup Instructions

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure MongoDB:
   ```bash
   # Edit .env and set your MongoDB connection string
   # For local development:
   MONGODB_URI=mongodb://localhost:27017/coinbase-clone
   
   # For MongoDB Atlas:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coinbase-clone
   ```

5. Set JWT secret (change in production):
   ```bash
   JWT_SECRET=your_super_secure_secret_key_here
   ```

6. Start the backend:
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. Make sure `.env.local` is configured:
   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` (or next available port)

## Using the Hooks

### Authentication Hook

In your SignIn or SignUp components:

```jsx
import { useAuth } from '../hooks';

export default function SignUp() {
  const { register, login, loading, error, isAuthenticated } = useAuth();
  
  const handleRegister = async (firstName, lastName, email, password) => {
    const result = await register(firstName, lastName, email, password);
    if (result.success) {
      // Redirect to home or dashboard
    }
  };
  
  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      // Redirect to home
    }
  };

  return (
    // ... form JSX
  );
}
```

### Crypto Hook

In your Home, Explore, or other pages:

```jsx
import { useCrypto } from '../hooks';

export default function Explore() {
  const { cryptos, gainers, loading, error, fetchAllCrypto, fetchGainers } = useCrypto();

  useEffect(() => {
    fetchAllCrypto(); // Load all cryptocurrencies
    // fetchGainers(); // Or load gainers
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {cryptos.map((crypto) => (
        <div key={crypto.id}>
          {crypto.name} - ${crypto.price}
        </div>
      ))}
    </div>
  );
}
```

## API Endpoints Reference

### Authentication

- **POST** `/api/auth/register` - Register new user
  ```json
  { "firstName": "", "lastName": "", "email": "", "password": "" }
  ```

- **POST** `/api/auth/login` - Login user
  ```json
  { "email": "", "password": "" }
  ```

- **GET** `/api/auth/profile` - Get user profile (Protected)

- **POST** `/api/auth/logout` - Logout user (Protected)

### Cryptocurrencies

- **GET** `/api/crypto` - Get all cryptocurrencies

- **GET** `/api/crypto/gainers` - Get top 10 gainers

- **GET** `/api/crypto/new` - Get 10 newest listings

- **GET** `/api/crypto/:id` - Get single cryptocurrency by ID

- **POST** `/api/crypto` - Add new cryptocurrency (Protected)
  ```json
  {
    "name": "Bitcoin",
    "symbol": "BTC",
    "price": 45000,
    "image": "https://example.com/btc.png",
    "change24h": 2.5,
    "change7d": 8.14,
    "marketCap": 1940000000000,
    "volume": 48200000000,
    "supply": 19700000,
    "color": "#F7931A",
    "sparkline": [44000, 44500, 45000]
  }
  ```

## Testing

### Test Authentication

1. Go to SignUp page
2. Fill in the form and submit
3. Check browser console to confirm token is saved
4. Go to Profile page (should be protected)
5. Should see your profile information

### Test Crypto Data

1. Go to Home or Explore page
2. Check if cryptocurrencies load from backend
3. Try sorting/filtering
4. Try adding a new cryptocurrency (if you're logged in)

## Common Issues & Solutions

### Issue: "Cannot reach backend" or CORS errors

**Solution:**
- Ensure backend is running: `npm run dev` in backend folder
- Check `.env.local` has correct API URL
- Verify backend URL matches: `http://localhost:5000/api`

### Issue: MongoDB connection errors

**Solution:**
- Check MongoDB is running locally or have valid connection string
- Verify `MONGODB_URI` in `.env` is correct
- For MongoDB Atlas, ensure IP whitelist includes your machine

### Issue: Authentication not persisting

**Solution:**
- Check browser DevTools > Application > Cookies for `token`
- Verify token is being saved to localStorage
- Check `Authorization` header in network requests

### Issue: 404 on API endpoints

**Solution:**
- Ensure backend is running on correct port (5000)
- Verify endpoint paths match exactly (case-sensitive)
- Check backend routes are properly imported in `server.js`

## Deployment

### Deploy Backend (Recommended: Render.com)

1. Push your code to GitHub
2. Create account on render.com
3. Create new Web Service
4. Connect GitHub repository
5. Set environment variables:
   - `MONGODB_URI` (MongoDB Atlas URI)
   - `JWT_SECRET` (secure random string)
   - `NODE_ENV=production`
   - `CORS_ORIGIN` (your frontend URL)
6. Deploy

### Deploy Frontend (Recommended: Vercel)

1. Push your code to GitHub
2. Create account on vercel.com
3. Import GitHub repository
4. Set environment variable:
   - `VITE_API_URL=https://your-backend-url.render.com/api`
5. Deploy

## Next Steps

1. Update SignIn/SignUp pages to use `useAuth` hook
2. Create a Profile/Dashboard page with user data
3. Update Home/Explore pages to use `useCrypto` hook
4. Test all features locally before deployment
5. Deploy backend first, then update frontend API URL
6. Deploy frontend

For more details, see `backend/BACKEND_README.md`
