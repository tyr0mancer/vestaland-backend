import dotenv from "dotenv";
dotenv.config();

//@TS
interface SmtpConfig {
  host: string
  port: number
  user: string
  pass: string
}

interface DbConfig {
  connectionString: string;
  host: string;
  port: string;
}

interface Config {
  authTokenSecret: string;
  refreshTokenSecret: string;
  host: string;
  port: number;

  refreshTokenCookieName: string;
  db: DbConfig;
  smtpTest: boolean;
  smtp: SmtpConfig;
}


const config: Config = {

  host: process.env.HOST || 'https://api.vestaland.de',
  port: Number(process.env.PORT) || 80,
  authTokenSecret: process.env.AUTH_TOKEN_SECRET || '',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  refreshTokenCookieName: process.env.REFRESH_TOKEN_COOKIE || 'REFRESH_TOKEN_COOKIE',
  db: {
    connectionString: process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/vestaland',
    host: process.env.DB_SERVER || 'localhost',
    port: process.env.DB_SERVER_PORT || '27017',
  },
  smtpTest: Boolean(process.env.SMTP_TEST) || false,
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 465,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }

};

export default config;
