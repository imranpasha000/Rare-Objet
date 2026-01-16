# EmailJS Setup Guide

This guide will help you configure EmailJS to send emails from the contact form.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use the following template variables in your email template:

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})
Phone: {{phone}}
Company: {{company}}

Message:
{{message}}

---
This email was sent from the Just A Click contact form.
```

4. Set the **To Email** field to your email address
5. Set the **From Name** field to: `{{from_name}}`
6. Set the **Reply To** field to: `{{from_email}}`
7. Save the template and note your **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxxxxxxxxx`)

## Step 5: Configure the Website

1. Open `script.js` file
2. Find the `EMAILJS_CONFIG` section (around line 327)
3. Replace the placeholder values:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here',      // e.g., 'service_abc123'
  TEMPLATE_ID: 'your_template_id_here',    // e.g., 'template_xyz789'
  PUBLIC_KEY: 'your_public_key_here'       // e.g., 'abcdefghijklmnopqrst'
};
```

## Step 6: Test the Form

1. Open your website
2. Fill out the contact form
3. Submit the form
4. Check your email inbox for the message

## Template Variables Reference

The form sends the following variables to EmailJS:

- `from_name` - Full name (First Name + Last Name)
- `from_email` - Email address
- `phone` - Phone number (or "Not provided")
- `company` - Company name (or "Not provided")
- `subject` - Selected subject
- `message` - Message content
- `to_name` - Always "Just A Click Team"

## Troubleshooting

### Form shows "Email service not configured"
- Make sure you've updated the `EMAILJS_CONFIG` in `script.js`
- Check that all three values are set (not the placeholder values)

### Form shows "Email service library not loaded"
- Check your internet connection
- Verify the EmailJS script is loading in the browser console
- Make sure the CDN link is accessible

### Emails not being received
- Check your EmailJS dashboard for error logs
- Verify your email service is properly connected
- Check spam/junk folder
- Verify the "To Email" in your template is correct

### Error in browser console
- Open browser Developer Tools (F12)
- Check the Console tab for error messages
- Verify your Service ID, Template ID, and Public Key are correct

## Security Note

The Public Key is safe to use in client-side code. However, for production use, consider:
- Setting up rate limiting in EmailJS dashboard
- Using EmailJS's built-in spam protection
- Monitoring your email usage

## Support

For EmailJS support, visit: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
