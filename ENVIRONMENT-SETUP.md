# 🔧 Environment Variables Checklist for Render

## Required Environment Variables

Add these in your Render Dashboard → Web Service → Environment:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_32_character_minimum_secret_key
JWT_EXPIRES_IN=7d
PORT=10000
```

## ⚠️ Critical Notes:

### MongoDB URI

- Must include database name: `/taskmanager`
- Must include retry options: `?retryWrites=true&w=majority`
- Username/password must be URL encoded if they contain special characters

### JWT Secret

- Must be at least 32 characters long
- Use a random generator: https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
- Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`

### PORT

- Render requires PORT=10000 for free tier
- Your app must use process.env.PORT

## 🔍 How to Verify:

1. Go to Render Dashboard
2. Click your web service
3. Go to "Environment" tab
4. Check all variables are set
5. Redeploy if you made changes

## 🚨 Common Issues:

❌ **MongoDB Connection Failed**

- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
- Verify connection string format
- Test connection string locally first

❌ **JWT Errors**

- JWT_SECRET must be set in production
- Must be long enough (32+ characters)
- Cannot contain special characters that break environment variables

❌ **CORS Errors**

- Make sure your frontend URL is in the CORS origin list
- Redeploy backend after updating CORS settings
