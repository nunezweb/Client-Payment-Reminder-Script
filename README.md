# Client Payment Reminder Script ;)
## Description
A JavaScript script that gradually decreases the opacity of a client's website if payment is overdue or not pay. Customize the due date and deadline. Includes .htaccess settings for CORS and caching. Ideal for providing a gentle reminder to clients for pending payments.

## License

This work is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

You are free to share and adapt the material as long as you provide appropriate credit, a link to the license, and indicate if changes were made.

### Author

- **Alejandro Núñez**
- **Email**: alejandro@nunezweb.com

## How It Works

This script modifies the opacity of the `body` tag on a client's website, decreasing it each day after a specified due date until it reaches a minimum opacity. You can set a custom due date and a number of days after which the website will fully fade away.

```javascript
/* change these variables as you wish */
developmentMode: true,
message: "Website in development, click here to go to production.",
link: "https://www.yoursite.com",
due_date: "2024-01-20",
days_deadline: 60
/* stop changing here */
```

## Installation

### Step 1: Upload the Files

1. Upload the `development-mode.js` file to your web server. Place it in a directory where it can be accessed, for example: `https://yourdomain.com/path/to/development-mode.js`.

2. Upload the `.htaccess` file to the same directory where `development-mode.js` is located.

### Step 2: Configure the .htaccess File

The `.htaccess` file included in this repository should contain the following configuration:

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

### Step 3: Include the Script in Your Website

Include the script in the footer of your website. If you are using WordPress, you can add the following line to the `footer.php` file of your active theme, just before the closing `</body>` tag:

```php
<script src="https://yourdomain.com/path/to/development-mode.js?v=<?php echo time(); ?>"></script>
```

### How to Use

1. **Due Date and Deadline**: 
   - Set the `due_date` variable in `development-mode.js` to the date when the payment is due.
   - Set the `days_deadline` variable in `development-mode.js` to the number of days after the due date before the website completely fades away.

2. **Customization**:
   - `message`: Customize the message displayed to the client.
   - `link`: Provide a link for the client to make a payment, contact support, or email you.

### Why .htaccess?

The `.htaccess` file is used to:
- **Handle CORS**: Allow requests from specific origins to ensure the script can be loaded from your server.
- **Disable Caching**: Ensure that the latest version of the `development-mode.js` script is always loaded, preventing the browser from using a cached version.

### Notes

- Ensure your web server has `mod_rewrite` and `mod_headers` enabled.
- The link provided in the `config` object can be a payment link, support email, or any other link you choose.
