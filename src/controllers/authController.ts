import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: "Email và mật khẩu là bắt buộc!" });
        return;
      }

      const result = await AuthService.register({ fullName, email, password });
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || "Đăng ký thất bại!" });
    }
  }

  static async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, token } = req.body;
      if (!email || !token) {
        res.status(400).json({ error: "Email và mã OTP 6 chữ số là bắt buộc!" });
        return;
      }

      const user = await AuthService.verifyOtp({ email, token });
      res.status(200).json({ success: true, user });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || "Xác minh OTP thất bại!" });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: "Email và mật khẩu là bắt buộc!" });
        return;
      }

      const user = await AuthService.login({ email, password });
      res.status(200).json({ success: true, user });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || "Đăng nhập thất bại!" });
    }
  }
}
