import rateLimit from "express-rate-limit";

// Rate limiter for resend email route
export const resendEmailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    status: "error",
    message: "Too many resend email requests. Please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Use email from request body as key (if available), otherwise use IP
  keyGenerator: (req) => {
    const email = req.body.email || "no-email";
  return `${email}-${req.ip}`;
  },
});

// General rate limiter for auth routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    status: "error",
    message: "Too many requests from this IP. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
