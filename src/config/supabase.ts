import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "https://oetekelkdarwpdvtpwsk.supabase.co";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || "sb_secret_BD2Ap_BW_los5wG1pz0iNQ_MCAa8jrV";
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_sXZDcB-Kd0CDIcCSEi8ibg_vwCJ5qYS";

if (!supabaseUrl || !supabaseSecretKey) {
  console.warn("⚠️ Warning: Supabase URL or Secret Key missing in environment variables!");
}

// Supabase Admin client with service role key (for server-side DB operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Supabase Public client with publishable key (for Auth operations like signUp/verifyOtp)
export const supabasePublic = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});
