const BASE_STYLE = `
  <style>
    body { margin:0; padding:0; background:#f6f8fc; font-family:Inter,Arial,sans-serif; color:#181d25; }
    .container { max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; }
    .header { background:linear-gradient(135deg,#0066ff,#00c2ff); padding:32px 40px; }
    .header h1 { color:#ffffff; margin:0; font-size:22px; }
    .body { padding:40px; font-size:15px; line-height:1.7; }
    .button { display:inline-block; margin:24px 0; padding:14px 28px; background:#0066ff; color:#ffffff !important; text-decoration:none; border-radius:12px; font-weight:600; }
    .footer { padding:24px 40px; background:#f6f8fc; color:#6e7a8e; font-size:13px; }
    .otp { font-size:32px; font-weight:700; letter-spacing:8px; color:#0066ff; }
  </style>
`;

export function renderLayout(title: string, bodyHtml: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /><title>${title}</title>${BASE_STYLE}</head>
      <body>
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr><td align="center" style="padding:24px 16px;">
            <div class="container">
              <div class="header"><h1>Pikzelkraft</h1></div>
              <div class="body">${bodyHtml}</div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} Pikzelkraft &middot; Digital Marketing &amp; IT Solutions<br/>
                This is an automated message. Please do not reply to this email.
              </div>
            </div>
          </td></tr>
        </table>
      </body>
    </html>
  `;
}

export function verificationEmail(name: string, link: string): { subject: string; html: string } {
  return {
    subject: "Verify your Pikzelkraft account",
    html: renderLayout(
      "Verify your email",
      `<p>Hi ${name},</p>
       <p>Welcome to Pikzelkraft. Please verify your email address to activate your account.</p>
       <p><a class="button" href="${link}">Verify Email</a></p>
       <p>This link expires in 24 hours. If you did not create an account, you can safely ignore this email.</p>`
    ),
  };
}

export function otpEmail(name: string, otp: string, expiresInMinutes = 10): { subject: string; html: string } {
  return {
    subject: "Your Pikzelkraft verification code",
    html: renderLayout(
      "Verification code",
      `<p>Hi ${name},</p>
       <p>Use the following code to complete your password reset:</p>
       <p class="otp">${otp}</p>
       <p>This code expires in ${expiresInMinutes} minutes. Never share it with anyone.</p>`
    ),
  };
}

export function invoiceEmail(name: string, invoiceNumber: string, amount: string): { subject: string; html: string } {
  return {
    subject: `Invoice ${invoiceNumber} from Pikzelkraft`,
    html: renderLayout(
      "Invoice",
      `<p>Hi ${name},</p>
       <p>Thank you for your payment. Your invoice <strong>${invoiceNumber}</strong> for <strong>${amount}</strong> has been generated.</p>
       <p>The invoice PDF is attached to this email. You can also download it anytime from your client dashboard.</p>`
    ),
  };
}

export function leadNotificationEmail(lead: {
  name: string;
  email: string;
  phone?: string;
  serviceSlug?: string;
  message?: string;
}): { subject: string; html: string } {
  return {
    subject: `New lead: ${lead.name}`,
    html: renderLayout(
      "New lead",
      `<p>A new lead has arrived on the website:</p>
       <ul>
         <li><strong>Name:</strong> ${lead.name}</li>
         <li><strong>Email:</strong> ${lead.email}</li>
         <li><strong>Phone:</strong> ${lead.phone ?? "—"}</li>
         <li><strong>Service:</strong> ${lead.serviceSlug ?? "—"}</li>
         <li><strong>Message:</strong> ${lead.message ?? "—"}</li>
       </ul>`
    ),
  };
}
