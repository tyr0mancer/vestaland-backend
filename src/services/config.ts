import dotenv from "dotenv";

dotenv.config();

export interface SmtpConfig {
  host: string
  port: number
  user: string
  pass: string
}

export interface DbConfig {
  connectionString: string;
  host: string;
  port: string;
}

export interface TokenConfig {
  secret: string;
  expiresIn: string;
}

export interface CookieConfig {
  name: string;
  domain: string;
  maxAge: number;
}

/**
 * Interface für Konfigurationseinstellungen
 */
export interface Config {
  host: string;
  port: number;
  uploadedFilesPath: string;
  allowedOrigins: string[];
  authToken: TokenConfig;
  refreshToken: TokenConfig;
  refreshTokenCookie: CookieConfig;
  db: DbConfig;

  testMailer: boolean;
  smtp: SmtpConfig;
  smtpTest: SmtpConfig;
}

/**
 * Config settings werden aus environment variables geladen und werden hier typsicher mit Fallback Optionen aufbereitet
 */
const config: Config = {
  host: process.env.HOST || 'http://localhost',
  port: Number(process.env.PORT) || 80,
  allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['*'],
  uploadedFilesPath:   process.env.UPLOADED_FILES_PATH || './public/uploads/',
  authToken: {
    secret: process.env.AUTH_TOKEN_SECRET || '',
    expiresIn: process.env.AUTH_TOKEN_EXPIRES || '15 Minutes',

  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET || '',
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '1 days',
  },
  refreshTokenCookie: {
    name: process.env.REFRESH_TOKEN_COOKIE_NAME || 'REFRESH_TOKEN',
    domain: process.env.REFRESH_TOKEN_COOKIE_DOMAIN || '',
    maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_MAX_AGE) || 86_400_000 // = 1days
  },
  db: {
    connectionString: process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/vestaland',
    host: process.env.DB_SERVER || 'localhost',
    port: process.env.DB_SERVER_PORT || '27017',
  },
  testMailer: Boolean(process.env.SMTP_TEST) || false,
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 465,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  },
  smtpTest: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 465,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
};

export default config;
