import { env } from '$env/dynamic/public';

if (!env.PUBLIC_API_BASE_URL) {
  throw new Error('PUBLIC_API_BASE_URL MUST BE SET!');
}

export default {
  apiBaseUrl: env.PUBLIC_API_BASE_URL
};
