"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    static async register(req, res) {
        try {
            const { fullName, email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: "Email và mật khẩu là bắt buộc!" });
                return;
            }
            const result = await authService_1.AuthService.register({ fullName, email, password });
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            res.status(400).json({ success: false, error: err.message || "Đăng ký thất bại!" });
        }
    }
    static async verifyOtp(req, res) {
        try {
            const { email, token } = req.body;
            if (!email || !token) {
                res.status(400).json({ error: "Email và mã OTP 6 chữ số là bắt buộc!" });
                return;
            }
            const user = await authService_1.AuthService.verifyOtp({ email, token });
            res.status(200).json({ success: true, user });
        }
        catch (err) {
            res.status(400).json({ success: false, error: err.message || "Xác minh OTP thất bại!" });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: "Email và mật khẩu là bắt buộc!" });
                return;
            }
            const user = await authService_1.AuthService.login({ email, password });
            res.status(200).json({ success: true, user });
        }
        catch (err) {
            res.status(400).json({ success: false, error: err.message || "Đăng nhập thất bại!" });
        }
    }
}
exports.AuthController = AuthController;
