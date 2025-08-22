# EmailJS Setup Guide

Your contact form is now configured to use EmailJS to send real emails. Follow these steps to make it work:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy your Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

**Subject**: `New message from {{from_name}} - {{subject}}`

**Content**:
```
Hello Edward,

You have received a new message through your portfolio website:

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
Sent via your portfolio contact form
```

4. **Copy your Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Copy it**

## Step 5: Update Your Code

Replace the placeholders in these files:

### In `js/main.js` (line ~5):
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key
```

### In `js/ui-modules.js` (around line ~240):
```javascript
const result = await emailjs.send(
    'YOUR_SERVICE_ID',     // Replace with your EmailJS service ID
    'YOUR_TEMPLATE_ID',    // Replace with your EmailJS template ID
    templateParams,
    'YOUR_PUBLIC_KEY'      // Replace with your EmailJS public key
);
```

## Example Configuration

After setup, your code should look like this:

```javascript
// In main.js
emailjs.init('user_abc123xyz789');

// In ui-modules.js
const result = await emailjs.send(
    'service_gmail_abc123',
    'template_contact_xyz789',
    templateParams,
    'user_abc123xyz789'
);
```

## Step 6: Test

1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email for the message
5. Check the browser console for any errors

## Troubleshooting

- **"EmailJS not loaded"**: Make sure the EmailJS script is loading from the CDN
- **"Failed to send"**: Check your Service ID, Template ID, and Public Key
- **No emails received**: Check your spam folder and EmailJS dashboard for delivery status

## Security Note

The public key is safe to expose in frontend code - it's designed for client-side use. Your private key should never be used in frontend code.

## Free Tier Limits

- 200 emails per month
- Rate limit: 50 requests per hour
- For more volume, upgrade to a paid plan

Once configured, your contact form will send real emails to your inbox!