# Usage Guide

## How to Use the Client-Opacity-Reminder Script

1. **Due Date and Deadline**:

   - Set the `due_date` variable in `development-mode.js` to the date when the payment is due.
   - Set the `days_deadline` variable in `development-mode.js` to the number of days after the due date before the website completely fades away.

2. **Customization**:
   - `message`: Customize the message displayed to the client.
   - `link`: Provide a link for the client to make a payment, contact support, or email you.

## How to Update

- **To update the script**:
  - Make changes to the `development-mode.js` file.
  - Upload the updated file to your server.
  - The cache will be bypassed automatically due to the version query parameter in the script URL.
    """
