import express from "express";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON request body parser
  app.use(express.json());

  // Enable CORS middleware for robust cross-origin requests
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Verbose Request Logger Middleware
  app.use((req, res, next) => {
    console.log(`[API Request Log] Method: ${req.method} | URL: ${req.url} | Origin: ${req.headers.origin || "Same Origin"}`);
    next();
  });

  // Direct Contact Email dispatching API
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          error: "Full Name, Email, and Message are mandatory parameters." 
        });
      }

      const emailTo = process.env.EMAIL_TO || "sindoengineering@gmail.com";
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpPort = parseInt(process.env.SMTP_PORT || "587");

      console.log(`[Contact Service] Received inquiry from ${name} (${email}) for subject: "${subject || "General Inquiry"}"`);

      const emailBodyText = `
New Direct Inquiry received via Sindo Engineering Contact Form:

--------------------------------------------------
Sender Name:  ${name}
Email Address: ${email}
Phone Number:  ${phone || "Not specified"}
Subject:       ${subject || "General Commercial Inquiry"}
--------------------------------------------------

Message details:
${message}

--------------------------------------------------
This inquiry was submitted on ${new Date().toISOString()}.
`;

      const emailBodyHtml = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
  <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 0;">New Sindo Inquiry</h2>
  <p style="color: #475569; font-size: 14px;">A visitor has submitted a new inquiry through your contact form:</p>
  
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
    <tr style="background-color: #f8fafc;">
      <td style="padding: 10px; font-weight: bold; color: #475569; width: 30%;">Full Name:</td>
      <td style="padding: 10px; color: #0f172a;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold; color: #475569;">Email:</td>
      <td style="padding: 10px; color: #2563eb; font-family: monospace;">${email}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 10px; font-weight: bold; color: #475569;">Phone Number:</td>
      <td style="padding: 10px; color: #0f172a;">${phone || "<em>Not specified</em>"}</td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold; color: #475569;">Subject:</td>
      <td style="padding: 10px; color: #0f172a; font-weight: 600;">${subject || "General Commercial Inquiry"}</td>
    </tr>
  </table>

  <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; font-size: 14px; color: #334155; line-height: 1.6; margin: 20px 0;">
    <strong style="color: #0f172a; display: block; margin-bottom: 5px;">Message Details:</strong>
    ${message.replace(/\ng/, "<br />")}
  </div>

  <p style="color: #94a3b8; font-size: 11px; margin-top: 30px; text-align: center; border-t: 1px solid #e2e8f0; padding-top: 15px;">
    Submitted securely via Sindo Engineering Platform.
  </p>
</div>
`;

      // Check if SMTP environment is configured
      if (!smtpHost || !smtpUser || !smtpPass) {
        console.warn("[Contact Service Notification]");
        console.warn(">> SMTP coordinates NOT configured in environment.");
        console.warn(">> Setup these credentials in AI Studio settings (.env) to route mail directly to Gmail:");
        console.warn(`   SMTP_HOST="smtp.gmail.com"\n   SMTP_PORT=587\n   SMTP_USER="YOUR_GMAIL_USERNAME"\n   SMTP_PASS="YOUR_GMAIL_APP_PASSWORD"`);
        console.log(">> Outbox payload printed in container log successfully.");

        return res.json({
          success: true,
          mode: "logged_locally",
          message: "Inquiry registered in console. Set SMTP environment variables in properties to route actual emails directly to Gmail."
        });
      }

      // Lazy load nodemailer dynamically and send email
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      console.log(`[Contact Service] Attempting delivery of mail to ${emailTo} using SMTP: ${smtpHost}:${smtpPort}`);

      const info = await transporter.sendMail({
        from: `"${name} (Contact Form)" <${smtpUser}>`,
        to: emailTo,
        replyTo: email,
        subject: `Sindo Contact Form: ${subject || "Direct Inquiry"}`,
        text: emailBodyText,
        html: emailBodyHtml
      });

      console.log(`[Contact Service] Delivery success! MessageId: ${info.messageId}`);
      return res.json({
        success: true,
        mode: "live_smtp",
        messageId: info.messageId,
        message: "Your inquiry message has been securely sent directly to GMail via SMTP!"
      });

    } catch (error: any) {
      console.error("[Contact Service Error] Dispatch failed:", error);
      return res.status(500).json({ 
        success: false, 
        error: error?.message || "An unexpected error occurred while sending your inquiry." 
      });
    }
  });

  // Vite development middleware vs Static Production bundle
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode: loading Vite middleware...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode: serving static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
