import dotenv from 'dotenv';

dotenv.config({ silent: true });

export default {
    api_version: '1.0.0',
    port: process.env.PORT || 5000,
    cache_enabled: process.env.CACHE_ENABLED,
    app_env: process.env.APP_ENV,
    database: {
      default:{
        connection_string: process.env.DB_STRING
      }
    },
    email:{
      sender:{
        name: process.env.MG_NAME || 'Chase',
        from: process.env.MG_FROM || 'xiaoxi625@hotmail.com',
        default_email: process.env.DEFAULT_EMAIL || 'chase.cammy.test@gmail.com'
      },
      mailgun: {
        domain: process.env.MG_DOMAIN,
        key: process.env.MG_KEY
      }
    }
}
