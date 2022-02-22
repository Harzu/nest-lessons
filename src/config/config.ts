import * as Joi from 'joi';

const DEFAULT_LOG_LEVEL = 'info';
const DEFAULT_JWT_EXPIRES_IN = '10m';

export const config = () =>
  Joi.object({
    PORT: Joi.number().required(),
    LOG_LEVEL: Joi.string().not('').default(DEFAULT_LOG_LEVEL),
    DATABASE_URL: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default(DEFAULT_JWT_EXPIRES_IN),
  });
