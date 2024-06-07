import { env } from '$env/dynamic/public';

if (process.env.NODE_ENV == "production" && !env.PUBLIC_SERVER_SIDE_API_BASE_URL) {
  throw new Error('PUBLIC_SERVER_SIDE_API_BASE_URL MUST BE SET!');
}

export default {
  apiBaseUrl: env.PUBLIC_SERVER_SIDE_API_BASE_URL
};
