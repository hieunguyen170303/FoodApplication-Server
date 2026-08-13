import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 FoodApplication-Server is running on http://localhost:${PORT}`);
  console.log(`📑 Swagger UI Documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`📡 Supabase URL: ${process.env.SUPABASE_URL}`);
  console.log(`✉️ Gmail App Password SMTP active for ${process.env.SMTP_USER || "hieupro120593@gmail.com"}`);
});
