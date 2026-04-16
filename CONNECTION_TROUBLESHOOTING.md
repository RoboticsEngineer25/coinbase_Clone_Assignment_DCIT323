# Frontend-Backend Connection Troubleshooting Guide

## Quick Diagnostic

1. **Open your app in browser**
2. **Look for the "🔧 Debug Connection" button in the bottom-right corner**
3. **Click it to see connection status and error details**

---

## Common Issues & Solutions

### 1. **CORS Error (Most Common)**

**Error Message:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution - Backend needs CORS configuration:**

Your backend (`crypto-app-student-project-backend.onrender.com`) needs to allow requests from Netlify.

**For Node.js/Express Backend:**

```javascript
const cors = require('cors');
const app = express();

// Enable CORS with credentials
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://yourname-crypto-app.netlify.app'  // Your Netlify URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());
```

### 2. **Backend Not Running**

**Check:**
- Is the Render backend deployed and running?
- Visit: `https://crypto-app-student-project-backend.onrender.com/api/health`
- Should return JSON response (not 404 or error)

### 3. **Wrong Backend URL**

**Check `.env.local`:**
```
VITE_API_URL=https://crypto-app-student-project-backend.onrender.com/api
```

Should match your actual backend URL (no typos, correct domain)

### 4. **Network/Firewall Issues**

- Check browser DevTools → Network tab
- Look for failed requests to backend
- Check if backend has proper headers

---

## How the Connection Works

```
Frontend (Netlify)
    ↓
Sends HTTP request to: https://crypto-app-student-project-backend.onrender.com/api/...
    ↓
Backend (Render)
    ↓
Returns JSON response with CORS headers
    ↓
Frontend receives data & updates UI
```

---

## Testing the Connection Manually

Open browser console and run:

```javascript
fetch('https://crypto-app-student-project-backend.onrender.com/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e))
```

If this returns data → Backend is running ✅
If this errors → Backend issue ❌

---

## Expected API Endpoints

Your backend should have these endpoints:

```
POST   /api/auth/register      (firstName, lastName, email, password)
POST   /api/auth/login         (email, password)
GET    /api/auth/profile       (requires Authorization header)
POST   /api/auth/logout

GET    /api/health             (health check)
GET    /api/crypto             (get all cryptos)
GET    /api/crypto/gainers     (get top gainers)
GET    /api/crypto/new         (get new listings)
GET    /api/crypto/:id         (get crypto by ID)
POST   /api/crypto             (add new crypto)
```

---

## Quick Fixes Checklist

- [ ] Backend URL in `.env.local` is correct
- [ ] Backend is deployed and running on Render
- [ ] CORS is enabled on backend (allow credentials)
- [ ] All API endpoints are implemented on backend
- [ ] Authorization headers are being sent with token
- [ ] Check browser console for specific error messages
- [ ] Use the Debug Connection tool to get detailed info

---

## If Still Not Working

1. **Check Backend Logs** on Render dashboard
2. **Check Browser Console** (F12 → Console tab)
3. **Check Network Tab** (F12 → Network tab)
4. **Verify all endpoints exist** on backend
5. **Test with Postman** to verify backend works

---

**Need Help?** Check the Debug Connection tool output for specific error details!
