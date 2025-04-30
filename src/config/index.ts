import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASS,
  jwt: {
    secret: process.env.JWT_SECRET || 'your-access-token-secret',
    refreshSecret:
      process.env.JWT_REFRESH_SECRET || 'your-refresh-token-secret',
    expires: process.env.JWT_EXPIRES_IN,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  
};
