import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8082;

export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379"

export const NOTIFICATION_QUEUE = 'NOTIFICATIONS'

// CHAT HASURA URL :8113

// AUTH HASURA URL :8112

// AUTH JWT SECRET KEY

// AUTH JWT PUBLIC SECRET KEY
export const AUTH_JWT_PUBLIC_KEY = 'excbdndjska.bnvhfjgir.cjdisiw'

