# Admin Authentication & Privacy Setup

## Overview
The admin token protects the Excel export endpoint so only authorized personnel can download user data.

## How It Works
1. Only requests with the correct `Authorization: Bearer <token>` header can access user data
2. Without the token, the endpoint returns `401 Unauthorized`
3. Each download is logged with timestamp and token

## Setup on Render

### Step 1: Generate a Secure Token
Use this Python command to generate a strong token:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Example output: `kH8mPqRx-2vJlWnYzAbC1DeFgHiKlMnOpQrStUvWxYz`

### Step 2: Add Token to Render Dashboard

1. Go to your Render app dashboard
2. Click **Environment** in the sidebar
3. Add new variable:
   - **Key**: `ADMIN_TOKEN`
   - **Value**: `kH8mPqRx-2vJlWnYzAbC1DeFgHiKlMnOpQrStUvWxYz` (your generated token)
4. Click **Save Changes** → App will redeploy automatically

### Step 3: Download Excel Report Securely

**Using curl (command line):**
```bash
curl -H "Authorization: Bearer kH8mPqRx-2vJlWnYzAbC1DeFgHiKlMnOpQrStUvWxYz" \
  https://sunshine-aura-ai.onrender.com/api/admin/export-users \
  --output users_report.xlsx
```

**Using Python:**
```python
import requests

token = "kH8mPqRx-2vJlWnYzAbC1DeFgHiKlMnOpQrStUvWxYz"
headers = {"Authorization": f"Bearer {token}"}
response = requests.get(
    "https://sunshine-aura-ai.onrender.com/api/admin/export-users",
    headers=headers
)

with open("users_report.xlsx", "wb") as f:
    f.write(response.content)
```

## Privacy Features

✅ **Token-based authentication** - Only authorized admins can access user data
✅ **Encrypted transmission** - HTTPS ensures token/data cannot be intercepted
✅ **No public access** - Excel endpoint returns 401 without valid token
✅ **User data encrypted in transit** - All API calls use HTTPS on Render

## Security Best Practices

1. **Keep token secret** - Never share in code, commits, or URLs
2. **Rotate token regularly** - Change it every 30-90 days
3. **Use environment variables** - Never hardcode tokens in code
4. **Grant limited access** - Only give token to authorized users
5. **Monitor downloads** - Log who downloads user data and when

## Default Token (Development Only)
If `ADMIN_TOKEN` is not set, the app uses: `sunshine-admin-secret-2026`
⚠️ **Change this in production!**

## If Token Gets Compromised
1. Generate a new token immediately
2. Update it in Render Environment variables
3. Wait for app to redeploy (usually ~2 minutes)
4. Old token becomes invalid
