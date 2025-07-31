# Task Manager Deployment Guide

## 🚀 Backend Deployment (Render.com)

### Step 1: Prepare Your Code

1. Push your backend code to GitHub
2. Make sure your `.env` file is NOT committed to GitHub
3. Ensure all dependencies are in package.json

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: task-manager-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Environment Variables

Add these environment variables in Render dashboard:

```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=10000
```

### Step 4: Get Your Backend URL

After deployment, you'll get a URL like:
`https://task-manager-backend-xxxx.onrender.com`

---

## 🌐 Frontend Deployment (Netlify)

### Step 1: Prepare Frontend

1. Update API base URL to point to your deployed backend
2. Build the project locally to test
3. Push to GitHub

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Import from Git"
3. Connect GitHub and select your frontend repo
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

### Step 3: Environment Variables (if needed)

Add in Netlify dashboard:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

---

## 🔄 Alternative Deployment Options

### Vercel (Frontend)

- Excellent for React apps
- Automatic deployments
- Great performance
- Free tier available

### Railway (Backend)

- Good alternative to Render
- PostgreSQL/MongoDB support
- Simple deployment
- Free tier available

### Heroku (Full Stack)

- Both frontend and backend
- More expensive than alternatives
- Good documentation
- Requires credit card for free tier

---

## ✅ Post-Deployment Checklist

1. ✅ Backend API responds at `/` endpoint
2. ✅ Database connection works
3. ✅ Authentication endpoints work
4. ✅ CORS allows frontend domain
5. ✅ Frontend builds successfully
6. ✅ Frontend connects to backend API
7. ✅ All CRUD operations work
8. ✅ Authentication flow works end-to-end

---

## 🐛 Common Deployment Issues

### Backend Issues:

- **CORS errors**: Update corsOptions with your frontend URL
- **Database connection**: Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
- **Environment variables**: Make sure they're set in hosting platform
- **Port issues**: Use process.env.PORT

### Frontend Issues:

- **API calls fail**: Update base URL to production backend
- **Build errors**: Fix any TypeScript/linting errors
- **Routing issues**: Configure redirects for SPA
- **Environment variables**: Use REACT*APP* prefix
