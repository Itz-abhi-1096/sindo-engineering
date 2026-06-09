import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables for local testing
dotenv.config();

export default async function handler(req: any, res: any) {
  // CORS Configuration
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed. Use POST.`
    });
  }

  console.log("[Serverless RFQ API Request Received]");
  console.log("- Payload:", JSON.stringify(req.body));

  try {
    const { rfqId, contactName, companyName, phone, email, industry, items, message, createdAt } = req.body;

    if (!contactName || !phone || !email || !items || !Array.isArray(items)) {
      console.warn("[Validation Failure] Missing mandatory fields.");
      return res.status(400).json({
        success: false,
        error: "Missing required fields (contactName, phone, email, and items are mandatory)."
      });
    }

    console.log(`- RFQ ID: ${rfqId}`);
    console.log(`- Contact: ${contactName} (${email}) | Phone: ${phone}`);
    console.log(`- Company: ${companyName || "N/A"} | Industry: ${industry || "N/A"}`);
    console.log(`- Items Count: ${items.length}`);

    // Generate HTML and Text email bodies
    const itemsHtml = items.map((item: any, idx: number) => {
      return `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 8px; font-weight: bold; color: #0f172a;">
            ${idx + 1}. ${item.product?.name || "SS Fitting"}
          </td>
          <td style="padding: 12px 8px; text-align: center; color: #475569;">
            ${item.selectedGrade || "N/A"}
          </td>
          <td style="padding: 12px 8px; text-align: center; color: #475569; font-family: monospace;">
            ${item.selectedSize || "N/A"}
          </td>
          <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #0f172a; font-family: monospace;">
            ${item.quantity || 1} pcs
          </td>
        </tr>
      `;
    }).join("");

    const plainTextContent = `
Dear Sindo Engineering Sales Team,

You have received a new commercial price quotation request.

--- RFQ OVERVIEW ---
Reference ID: ${rfqId}
Contact Person: ${contactName}
Company Name: ${companyName || "Not Provided (Direct/Retail)"}
Direct Phone: ${phone}
Registered Email: ${email}
Industry Sector: ${industry || "General Piping"}
Submitted On: ${createdAt || new Date().toLocaleString()}

--- INQUIRY ITEMS ---
${items.map((item: any, idx: number) => {
  return `${idx + 1}. ${item.product?.name || "SS Fitting"} - Size: ${item.selectedSize || "N/A"} (Grade: ${item.selectedGrade || "N/A"}) - Qty: ${item.quantity || 1} pcs`;
}).join("\n")}

${message ? `--- CUSTOM REQUIREMENTS & DRAWING SPECS ---\n"${message}"\n` : ""}

Please review these specifications and send your official quotation to the customer's email address (${email}) as soon as possible.

Best regards,
Sindo Engineering Automated System
    `;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; letter-spacing: 0.05em; font-weight: 800;">SINDO ENGINEERING</h2>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8; font-family: monospace; text-transform: uppercase;">RFQ Commercial Quotation Specheet</p>
        </div>
        
        <div style="padding: 24px 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
            <div style="width: 50%;">
              <span style="font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: bold; display: block;">RFQ Reference</span>
              <strong style="font-size: 15px; color: #1e3a8a; font-family: monospace;">${rfqId}</strong>
            </div>
            <div style="width: 50%; text-align: right;">
              <span style="font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: bold; display: block;">Date Submitted</span>
              <span style="font-size: 12px; color: #0f172a; font-family: monospace;">${createdAt || new Date().toLocaleString()}</span>
            </div>
          </div>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 24px; font-size: 13px;">
            <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 12px; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">Contact Procurement Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.5;">
              <tr>
                <td style="color: #64748b; width: 40%; padding: 4px 0;">Customer Name:</td>
                <td style="color: #0f172a; font-weight: bold;">${contactName}</td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 4px 0;">Company Profile:</td>
                <td style="color: #0f172a;">${companyName || "Not Provided (Direct/Retail)"}</td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 4px 0;">Direct Phone:</td>
                <td style="color: #0f172a; font-family: monospace; font-weight: 600;">${phone}</td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 4px 0;">Email:</td>
                <td style="color: #2563eb; font-weight: 600;">${email}</td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 4px 0;">Industry Sector:</td>
                <td style="color: #475569; font-weight: 500;">${industry || "General Piping"}</td>
              </tr>
            </table>
          </div>

          <h3 style="font-size: 12px; text-transform: uppercase; color: #475569; margin-bottom: 8px; font-weight: 700;">Requested Components Specs</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 24px;">
            <thead>
              <tr style="border-bottom: 2px solid #cbd5e1; text-align: left; color: #64748b; text-transform: uppercase; font-size: 10px;">
                <th style="padding: 8px; width: 50%;">Item Specification</th>
                <th style="padding: 8px; text-align: center;">Grade</th>
                <th style="padding: 8px; text-align: center;">Size</th>
                <th style="padding: 8px; text-align: right;">Qty</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          ${message ? `
            <div style="margin-top: 20px; border-left: 3px solid #2563eb; padding-left: 12px; margin-bottom: 24px;">
              <span style="font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: bold; display: block; margin-bottom: 3px;">Custom Fabrication Instructions</span>
              <p style="margin: 0; font-size: 12px; color: #475569; font-style: italic;">"${message}"</p>
            </div>
          ` : ""}

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 11px;">
            <p style="margin: 0;">This inquiry was dynamically generated and transmitted securely via the Sindo Engineering digital catalog system.</p>
          </div>
        </div>
      </div>
    `;

    // 2. Load SMTP config from process.env
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailFrom = process.env.EMAIL_FROM || smtpUser || "no-reply@sindoengineering.com";
    const emailTo = process.env.EMAIL_TO || "sindoengineering@gmail.com";

    console.log("[Verifying serverless SMTP Configuration keys]");
    console.log(`- SMTP_HOST: ${smtpHost || "(empty)"}`);
    console.log(`- SMTP_USER: ${smtpUser || "(empty)"}`);
    console.log(`- EMAIL_FROM: ${emailFrom}`);
    console.log(`- EMAIL_TO: ${emailTo}`);

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("[SMTP Config Error] Missing SMTP credentials.");
      return res.status(500).json({
        success: false,
        error: "SMTP delivery service is not configured. (Missing SMTP_HOST, SMTP_USER, or SMTP_PASS on backend)"
      });
    }

    console.log(`[SMTP Transmission] Attempting direct delivery to: ${emailTo}`);

    // Build transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const info = await transporter.sendMail({
      from: `"Sindo RFQ System" <${emailFrom}>`,
      to: emailTo,
      cc: email, // CC the customer directly to confirm receipt!
      subject: `[RFQ Client Intake] ID: ${rfqId} - From ${companyName || contactName}`,
      text: plainTextContent,
      html: htmlContent,
    });

    console.log(`[SMTP Direct Email Transmit Success] Message ID: ${info.messageId}`);
    return res.status(200).json({
      success: true,
      mode: "direct",
      message: "Commercial quotation requested successfully. Check email inbox for receipt reference!",
      messageId: info.messageId
    });

  } catch (error: any) {
    console.error("[Serverless API Exception Handled]", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to process the quotation request via mail service."
    });
  }
}
