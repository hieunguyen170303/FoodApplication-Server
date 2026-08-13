"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabasePublic = exports.supabaseAdmin = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL || "https://oetekelkdarwpdvtpwsk.supabase.co";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || "sb_secret_BD2Ap_BW_los5wG1pz0iNQ_MCAa8jrV";
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_sXZDcB-Kd0CDIcCSEi8ibg_vwCJ5qYS";
if (!supabaseUrl || !supabaseSecretKey) {
    console.warn("⚠️ Warning: Supabase URL or Secret Key missing in environment variables!");
}
// Supabase Admin client with service role key (for server-side DB operations)
exports.supabaseAdmin = (0, supabase_js_1.createClient)(supabaseUrl, supabaseSecretKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
// Supabase Public client with publishable key (for Auth operations like signUp/verifyOtp)
exports.supabasePublic = (0, supabase_js_1.createClient)(supabaseUrl, supabasePublishableKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
    },
});
