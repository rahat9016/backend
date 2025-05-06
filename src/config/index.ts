import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 8000,
  database_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASS,
  jwt: {
    secret: process.env.JWT_SECRET || 'your-access-token-secret',
    refreshSecret:
      process.env.JWT_REFRESH_SECRET || 'your-refresh-token-secret',
    expires: process.env.JWT_EXPIRES_IN,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  smtp: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }  
};
