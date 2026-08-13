import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtpUser = process.env.SMTP_USER || "hieupro120593@gmail.com";
const smtpPass = process.env.SMTP_PASS || "lskhwwzfaskycfjb";

// Initialize Nodemailer transporter with Gmail App Password
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export class EmailService {
  /**
   * Send 6-digit OTP verification email to user
   */
  static async sendOtpEmail(toEmail: string, otpCode: string, fullName?: string): Promise<boolean> {
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background-color: #FAFAFA; border-radius: 20px; border: 1px solid #F3F4F6;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #FE8C00; font-size: 24px; margin: 0; font-weight: 800;">🍔 FoodApplication</h2>
          <p style="color: #6B7280; font-size: 14px; margin-top: 4px;">Xác thực tài khoản người dùng</p>
        </div>

        <div style="background-color: #FFFFFF; padding: 24px; border-radius: 16px; border: 1px solid #E5E7EB;">
          <p style="color: #1F2937; font-size: 15px; margin-top: 0;">Xin chào <strong>${fullName || toEmail}</strong>,</p>
          <p style="color: #4B5563; font-size: 14px; line-height: 1.5;">Cảm ơn bạn đã đăng ký tài khoản tại FoodApplication! Dưới đây là mã OTP 6 chữ số để xác thực tài khoản của bạn:</p>

          <div style="text-align: center; margin: 28px 0;">
            <span style="font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #FE8C00; background-color: #FFF7ED; padding: 12px 28px; border-radius: 12px; border: 2px dashed #FE8C00; display: inline-block;">
              ${otpCode}
            </span>
          </div>

          <p style="color: #9CA3AF; font-size: 13px; text-align: center; margin-bottom: 0;">Mã OTP này có hiệu lực trong vòng <strong>10 phút</strong>. Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #9CA3AF; font-size: 12px; margin: 0;">© 2026 FoodApplication System. All rights reserved.</p>
        </div>
      </div>
    `;

    try {
      const info = await transporter.sendMail({
        from: `"FoodApplication" <${smtpUser}>`,
        to: toEmail,
        subject: `[FoodApplication] Mã OTP xác nhận tài khoản của bạn: ${otpCode}`,
        html: htmlContent,
      });

      console.log(`✉️ OTP Email successfully sent to ${toEmail}. Message ID: ${info.messageId}`);
      return true;
    } catch (err: any) {
      console.error("❌ Nodemailer sendMail error:", err.message);
      return false;
    }
  }
}
