// Realtime (Pub/Sub)
import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
const REDIS_URL = process.env.REDIS_URL;

export const redisClientPublisher = new Redis(REDIS_URL);
export const redisClientSubscriber = new Redis(REDIS_URL);
