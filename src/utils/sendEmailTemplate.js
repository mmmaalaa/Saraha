const sendEmailTemplate = (username, activation_link) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activate Your Account</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 40px 30px;
            color: #333333;
            line-height: 1.6;
        }
        .content h2 {
            color: #667eea;
            font-size: 24px;
            margin-top: 0;
        }
        .content p {
            font-size: 16px;
            margin: 15px 0;
        }
        .button-container {
            text-align: center;
            margin: 35px 0;
        }
        .activate-button {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: transform 0.2s;
        }
        .activate-button:hover {
            transform: translateY(-2px);
        }
        .alternative-link {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            font-size: 14px;
            color: #666666;
        }
        .alternative-link p {
            margin: 5px 0;
        }
        .alternative-link a {
            color: #667eea;
            word-break: break-all;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #999999;
            font-size: 14px;
        }
        .footer p {
            margin: 5px 0;
        }
        .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>🔒 Saraha</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <h2>Welcome to Saraha!</h2>
            <p>Hi ${username},</p>
            <p>Thank you for signing up! We're excited to have you join our community where you can receive honest and anonymous messages from your friends.</p>
            <p>To get started, please activate your account by clicking the button below:</p>

            <!-- Activation Button -->
            <div class="button-container">
                <a href="${activation_link}" class="activate-button">Activate Your Account</a>
            </div>

            <div class="alternative-link">
                <p><strong>Button not working?</strong></p>
                <p>Copy and paste this link into your browser:</p>
                <p><a href="${activation_link}">{{activation_link}}</a></p>
            </div>

            <div class="divider"></div>

            <p style="font-size: 14px; color: #666666;">
                <strong>Note:</strong> This activation link will expire in 24 hours for security reasons. If you didn't create an account with Saraha, please ignore this email.
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Saraha Team</strong></p>
            <p>Receive honest feedback anonymously</p>
            <p style="margin-top: 15px; font-size: 12px;">
                © 2024 Saraha. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>`;
};

export default sendEmailTemplate;
