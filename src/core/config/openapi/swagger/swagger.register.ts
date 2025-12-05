import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  title: process.env.APP_NAME,
  description: '',
  version: 'v1.0',
  envName: process.env.APP_ENV,
  url: process.env.SWAGGER_URL,
  tag: process.env.APP_NAME,
  path: 'api-docs',
}));
