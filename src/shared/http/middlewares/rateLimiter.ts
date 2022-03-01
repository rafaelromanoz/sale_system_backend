import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import createErrorMessage from 'src/utils/functions';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw createErrorMessage(429, 'Too many requests.');
  }
}
