const env = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const BASE_URL = env ? 'https://crm-app.dev.crm.d-p.io' : 'https://crm-app.prod.crm.d-p.io';