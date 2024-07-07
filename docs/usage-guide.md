## Usage Guide for the Client Payment Reminder Script

---

### Description

The Client Payment Reminder Script is a tool that gradually decreases the opacity of a client's website if the payment is overdue or not made. This provides a gentle and visual reminder to clients about pending payments. This script allows customization of the due date and deadline. It also includes `.htaccess` settings to handle CORS and disable caching.

---

### Installation

#### Step 1: Upload the Files

1. **Upload `development-mode.js` to the developer's web server**:
   - Upload the `development-mode.js` file to your (developer's) web server.
   - Place it in a directory where it can be accessed, for example: `https://yourdomain.com/path/to/development-mode.js`.

2. **Upload `.htaccess` to the developer's web server**:
   - Upload the `.htaccess` file to the same directory where `development-mode.js` is located.

#### Step 2: Configure the `.htaccess` File

The `.htaccess` file should contain the following configuration:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    # Allow requests from example.com, mysite.com, and testsite.com
    RewriteCond %{HTTP:Origin} ^(https?://(example\.com|mysite\.com|testsite\.com))$
    RewriteRule .* - [E=ORIGIN:%{HTTP:Origin}]
</IfModule>

<IfModule mod_headers.c>
    # Allow CORS requests from specified origins
    Header set Access-Control-Allow-Origin %{ORIGIN}e env=ORIGIN
    Header set Access-Control-Allow-Credentials "true"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>

<FilesMatch "development-mode.js">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "0"
</FilesMatch>
```

#### Step 3: Include the Script in the Client's Website

Include the script in the footer of the client's website. If you are using WordPress, add the following line to the `footer.php` file of the client's active theme, just before the closing `</body>` tag:

```php
<script src="https://yourdomain.com/path/to/development-mode.js?v=<?php echo time(); ?>"></script>
```

---

### Configuration

#### Configuration Variables

In the `development-mode.js` file, adjust the following variables as needed:

```javascript
const config = {
    developmentMode: true,
    message: "Website in development, click here to go to production.",
    link: "https://www.yoursite.com",
    due_date: "2024-01-20",
    days_deadline: 60
};
```

- **developmentMode**: Enable or disable development mode (true/false).
- **message**: Customize the message displayed to the client.
- **link**: Provide a link for the client to make a payment, contact support, or email you.
- **due_date**: Set the date when the payment is due (format YYYY-MM-DD).
- **days_deadline**: Define the number of days after the due date before the website completely fades away.

---

### How It Works

#### Adjusting Opacity

The script calculates the days from the due date to the current date and adjusts the opacity of the document's `body` accordingly:

- **Before the deadline (days_deadline)**: Opacity gradually decreases each day after the due date.
- **After the deadline**: Opacity is set to a low but readable value (0.2), and a specific message is shown indicating the development period has ended.

#### Displaying the Message

The script creates and displays a message at the bottom of the page. This message can include a link for the client to make a payment or contact support.

---

### Updating the Script

To update the script, follow these steps:

1. Make the necessary changes to the `development-mode.js` file.
2. Upload the updated file to your server.
3. The cache will be bypassed automatically due to the version query parameter in the script URL.

```php
<script src="https://yourdomain.com/path/to/development-mode.js?v=<?php echo time(); ?>"></script>
```

---

### Additional Notes

- Ensure your web server has `mod_rewrite` and `mod_headers` enabled.
- The link provided in the configuration (`config.link`) can be a payment link, support email, or any other relevant URL.
- Customize the message and opacity based on the specific needs of your client and your service's payment policy.
